from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field, ConfigDict
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path
from datetime import datetime, timezone
from typing import List, Optional
import uuid
import os
import logging
import certifi

# -----------------------------
# ENV SETUP
# -----------------------------
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

MONGO_URL = os.getenv("MONGO_URL")
DB_NAME = os.getenv("DB_NAME")
CORS_ORIGINS = os.getenv("CORS_ORIGINS")

if not MONGO_URL or not DB_NAME:
    raise RuntimeError("❌ MONGO_URL or DB_NAME missing in .env")

# -----------------------------
# MONGODB SETUP
# -----------------------------
client = AsyncIOMotorClient(
    MONGO_URL,
    tls=True,
    tlsCAFile=certifi.where(),
    serverSelectionTimeoutMS=10000,
)
db = client[DB_NAME]

# -----------------------------
# FASTAPI SETUP
# -----------------------------
app = FastAPI(title="Legal Professional API")
api_router = APIRouter(prefix="/api")

origins = [origin.strip() for origin in CORS_ORIGINS.split(",")] if CORS_ORIGINS else ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# LOGGING
# -----------------------------
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# -----------------------------
# MODELS
# -----------------------------
class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    message: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    message: str

class AppointmentRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    date: str
    time: str
    message: Optional[str] = None
    status: str = "pending"
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class AppointmentRequestCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    date: str
    time: str
    message: Optional[str] = None

class BlogArticle(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    title: str
    excerpt: str
    content: str
    category: str
    author: str
    published_date: datetime
    read_time: int

# -----------------------------
# ROUTES
# -----------------------------
@api_router.get("/")
async def root():
    return {"message": "Legal Professional Website API 🚀"}

# CONTACT
@api_router.post("/contact", response_model=ContactMessage)
async def create_contact_message(data: ContactMessageCreate):
    try:
        obj = ContactMessage(**data.model_dump())
        await db.contact_messages.insert_one(obj.model_dump())
        return obj
    except Exception as e:
        logger.error(f"Failed to create contact message: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit contact message.")

@api_router.get("/contact", response_model=List[ContactMessage])
async def get_all_contacts():
    contacts = await db.contact_messages.find({}, {"_id": 0}).to_list(100)
    return contacts

# APPOINTMENTS
@api_router.post("/appointments", response_model=AppointmentRequest)
async def create_appointment(data: AppointmentRequestCreate):
    try:
        obj = AppointmentRequest(**data.model_dump())
        await db.appointments.insert_one(obj.model_dump())
        return obj
    except Exception as e:
        logger.error(f"Failed to create appointment: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit appointment request.")

@api_router.get("/appointments", response_model=List[AppointmentRequest])
async def get_all_appointments():
    appointments = await db.appointments.find({}, {"_id": 0}).to_list(100)
    return appointments

# BLOG
@api_router.get("/blog", response_model=List[BlogArticle])
async def get_blog_articles():
    articles = await db.blog_articles.find({}, {"_id": 0}).sort("published_date", -1).to_list(100)
    return articles

@api_router.get("/blog/{article_id}", response_model=BlogArticle)
async def get_blog_article(article_id: str):
    article = await db.blog_articles.find_one({"id": article_id}, {"_id": 0})
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    return article

app.include_router(api_router)

# -----------------------------
# STARTUP / SHUTDOWN
# -----------------------------
@app.on_event("startup")
async def startup_seed_blog():
    try:
        await client.admin.command("ping")
        logger.info("✅ MongoDB connected")

        count = await db.blog_articles.count_documents({})
        if count == 0:
            sample_articles = [
                {
                    "id": str(uuid.uuid4()),
                    "title": "Understanding Your Legal Rights in Civil Disputes",
                    "excerpt": "Know your civil rights and remedies.",
                    "content": "Civil disputes arise in property, contracts, and more...",
                    "category": "Civil Law",
                    "author": "Legal Awareness",
                    "published_date": datetime.now(timezone.utc),
                    "read_time": 5,
                },
                {
                    "id": str(uuid.uuid4()),
                    "title": "Corporate Compliance for Indian Businesses",
                    "excerpt": "Legal obligations every company must follow.",
                    "content": "Corporate compliance ensures lawful operations...",
                    "category": "Corporate Law",
                    "author": "Legal Awareness",
                    "published_date": datetime.now(timezone.utc),
                    "read_time": 6,
                },
            ]
            await db.blog_articles.insert_many(sample_articles)
            logger.info("✅ Blog seed data inserted")

    except Exception as e:
        logger.error(f"❌ Startup failed: {e}")

@app.on_event("shutdown")
async def shutdown():
    client.close()
    logger.info("MongoDB connection closed")

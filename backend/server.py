from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")


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
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    excerpt: str
    content: str
    category: str
    author: str = "Legal Awareness"
    published_date: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    read_time: int = 5


@api_router.get("/")
async def root():
    return {"message": "Legal Professional Website API"}

@api_router.post("/contact", response_model=ContactMessage)
async def create_contact_message(input: ContactMessageCreate):
    contact_dict = input.model_dump()
    contact_obj = ContactMessage(**contact_dict)
    
    doc = contact_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.contact_messages.insert_one(doc)
    return contact_obj

@api_router.post("/appointments", response_model=AppointmentRequest)
async def create_appointment(input: AppointmentRequestCreate):
    appointment_dict = input.model_dump()
    appointment_obj = AppointmentRequest(**appointment_dict)
    
    doc = appointment_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.appointments.insert_one(doc)
    return appointment_obj

@api_router.get("/blog", response_model=List[BlogArticle])
async def get_blog_articles():
    articles = await db.blog_articles.find({}, {"_id": 0}).sort("published_date", -1).to_list(100)
    
    for article in articles:
        if isinstance(article['published_date'], str):
            article['published_date'] = datetime.fromisoformat(article['published_date'])
    
    return articles

@api_router.get("/blog/{article_id}", response_model=BlogArticle)
async def get_blog_article(article_id: str):
    article = await db.blog_articles.find_one({"id": article_id}, {"_id": 0})
    
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    
    if isinstance(article['published_date'], str):
        article['published_date'] = datetime.fromisoformat(article['published_date'])
    
    return article


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

@app.on_event("startup")
async def startup_seed_blog():
    count = await db.blog_articles.count_documents({})
    if count == 0:
        sample_articles = [
            {
                "id": str(uuid.uuid4()),
                "title": "Understanding Your Legal Rights in Civil Disputes",
                "excerpt": "An informative guide on civil rights and legal procedures that every citizen should be aware of.",
                "content": "Civil disputes can arise in various situations, from property matters to contractual disagreements. Understanding your legal rights is the first step toward resolving such issues effectively. This article provides an overview of the legal framework governing civil disputes in India, the role of courts, and the importance of proper documentation. Remember, legal awareness is your best defense.",
                "category": "Civil Law",
                "author": "Legal Awareness",
                "published_date": datetime.now(timezone.utc).isoformat(),
                "read_time": 5
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Corporate Compliance: Key Legal Requirements for Businesses",
                "excerpt": "Essential information about corporate legal compliance that business owners must know.",
                "content": "Corporate compliance involves adhering to laws, regulations, and ethical practices. This article covers key legal requirements including company registration, tax compliance, labor laws, and regulatory filings. Understanding these obligations helps businesses operate smoothly and avoid legal complications. Proper legal guidance ensures your business remains compliant with all applicable laws.",
                "category": "Corporate Law",
                "author": "Legal Awareness",
                "published_date": datetime.now(timezone.utc).isoformat(),
                "read_time": 6
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Family Law Basics: Rights and Responsibilities",
                "excerpt": "Learn about family law matters including marriage, divorce, and custody rights in India.",
                "content": "Family law encompasses various personal matters including marriage, divorce, child custody, and property rights. This informational article outlines the basic legal framework governing family matters in India. Understanding these laws helps individuals make informed decisions during challenging times. Legal awareness in family matters is crucial for protecting your rights and those of your loved ones.",
                "category": "Family Law",
                "author": "Legal Awareness",
                "published_date": datetime.now(timezone.utc).isoformat(),
                "read_time": 5
            }
        ]
        await db.blog_articles.insert_many(sample_articles)
import requests
import sys
import json
from datetime import datetime

class LegalWebsiteAPITester:
    def __init__(self, base_url="https://legaldeck.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.blog_articles = []

    def run_test(self, name, method, endpoint, expected_status, data=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}" if endpoint else self.base_url
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            print(f"Response Status: {response.status_code}")
            
            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"Response preview: {str(response_data)[:200]}...")
                    return True, response_data
                except:
                    return True, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_data = response.json()
                    print(f"Error response: {error_data}")
                except:
                    print(f"Error response text: {response.text[:200]}")
                return False, {}

        except requests.exceptions.Timeout:
            print(f"❌ Failed - Request timeout")
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test root API endpoint"""
        return self.run_test("Root API Endpoint", "GET", "", 200)

    def test_contact_submission(self):
        """Test contact message submission"""
        contact_data = {
            "name": "Test User",
            "email": "test@example.com",
            "message": "This is a test contact message for API testing."
        }
        
        success, response = self.run_test(
            "Contact Message Submission",
            "POST",
            "contact",
            200,
            data=contact_data
        )
        
        if success and response:
            # Verify response structure
            required_fields = ['id', 'name', 'email', 'message', 'timestamp']
            missing_fields = [field for field in required_fields if field not in response]
            if missing_fields:
                print(f"⚠️  Warning: Missing fields in response: {missing_fields}")
            else:
                print("✅ Contact response has all required fields")
        
        return success

    def test_appointment_request(self):
        """Test appointment request submission"""
        appointment_data = {
            "name": "Test Client",
            "email": "client@example.com",
            "phone": "9876543210",
            "date": "2024-12-25",
            "time": "10:00",
            "message": "Test appointment request for legal consultation."
        }
        
        success, response = self.run_test(
            "Appointment Request Submission",
            "POST",
            "appointments",
            200,
            data=appointment_data
        )
        
        if success and response:
            # Verify response structure
            required_fields = ['id', 'name', 'email', 'phone', 'date', 'time', 'status', 'timestamp']
            missing_fields = [field for field in required_fields if field not in response]
            if missing_fields:
                print(f"⚠️  Warning: Missing fields in response: {missing_fields}")
            else:
                print("✅ Appointment response has all required fields")
                if response.get('status') == 'pending':
                    print("✅ Default status set to 'pending'")
        
        return success

    def test_blog_articles_list(self):
        """Test fetching blog articles list"""
        success, response = self.run_test(
            "Blog Articles List",
            "GET",
            "blog",
            200
        )
        
        if success and response:
            if isinstance(response, list):
                print(f"✅ Received {len(response)} blog articles")
                self.blog_articles = response
                
                # Check if we have the expected 3 sample articles
                if len(response) >= 3:
                    print("✅ Found expected sample articles")
                    
                    # Verify article structure
                    for i, article in enumerate(response[:3]):
                        required_fields = ['id', 'title', 'excerpt', 'content', 'category', 'author', 'published_date', 'read_time']
                        missing_fields = [field for field in required_fields if field not in article]
                        if missing_fields:
                            print(f"⚠️  Article {i+1} missing fields: {missing_fields}")
                        else:
                            print(f"✅ Article {i+1} structure valid: {article['title'][:50]}...")
                else:
                    print(f"⚠️  Expected at least 3 articles, got {len(response)}")
            else:
                print("❌ Response is not a list")
                return False
        
        return success

    def test_blog_article_detail(self):
        """Test fetching individual blog article"""
        if not self.blog_articles:
            print("⚠️  No blog articles available for detail testing")
            return False
        
        # Test with first article ID
        article_id = self.blog_articles[0]['id']
        success, response = self.run_test(
            f"Blog Article Detail (ID: {article_id[:8]}...)",
            "GET",
            f"blog/{article_id}",
            200
        )
        
        if success and response:
            # Verify it's the same article
            if response.get('id') == article_id:
                print("✅ Correct article returned")
                print(f"Article title: {response.get('title', 'N/A')}")
                print(f"Article category: {response.get('category', 'N/A')}")
            else:
                print("❌ Wrong article returned")
                return False
        
        return success

    def test_blog_article_not_found(self):
        """Test fetching non-existent blog article"""
        fake_id = "non-existent-article-id"
        success, response = self.run_test(
            "Blog Article Not Found",
            "GET",
            f"blog/{fake_id}",
            404
        )
        
        if success:
            print("✅ Correctly returned 404 for non-existent article")
        
        return success

    def test_invalid_contact_data(self):
        """Test contact submission with invalid data"""
        invalid_data = {
            "name": "",  # Empty name
            "email": "invalid-email",  # Invalid email
            "message": ""  # Empty message
        }
        
        success, response = self.run_test(
            "Invalid Contact Data",
            "POST",
            "contact",
            422  # Expecting validation error
        )
        
        if success:
            print("✅ Correctly rejected invalid contact data")
        
        return success

def main():
    print("🚀 Starting Legal Website API Tests")
    print("=" * 50)
    
    tester = LegalWebsiteAPITester()
    
    # Test sequence
    tests = [
        ("Root Endpoint", tester.test_root_endpoint),
        ("Contact Submission", tester.test_contact_submission),
        ("Appointment Request", tester.test_appointment_request),
        ("Blog Articles List", tester.test_blog_articles_list),
        ("Blog Article Detail", tester.test_blog_article_detail),
        ("Blog Article Not Found", tester.test_blog_article_not_found),
        ("Invalid Contact Data", tester.test_invalid_contact_data),
    ]
    
    for test_name, test_func in tests:
        try:
            test_func()
        except Exception as e:
            print(f"❌ {test_name} failed with exception: {str(e)}")
    
    # Print final results
    print("\n" + "=" * 50)
    print(f"📊 Final Results: {tester.tests_passed}/{tester.tests_run} tests passed")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All API tests passed!")
        return 0
    else:
        print(f"⚠️  {tester.tests_run - tester.tests_passed} tests failed")
        return 1

if __name__ == "__main__":
    sys.exit(main())
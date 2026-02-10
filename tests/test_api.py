"""
Tests for the High School Management System API endpoints.
"""

import pytest
from fastapi.testclient import TestClient
from src.app import app, activities


@pytest.fixture
def client():
    """Create a test client for the FastAPI app."""
    return TestClient(app)


@pytest.fixture(autouse=True)
def reset_activities():
    """Reset activities data before each test."""
    # Store original state
    original_activities = {
        "Chess Club": {
            "description": "Learn strategies and compete in chess tournaments",
            "schedule": "Fridays, 3:30 PM - 5:00 PM",
            "max_participants": 12,
            "participants": ["michael@mergington.edu", "daniel@mergington.edu"]
        },
        "Programming Class": {
            "description": "Learn programming fundamentals and build software projects",
            "schedule": "Tuesdays and Thursdays, 3:30 PM - 4:30 PM",
            "max_participants": 20,
            "participants": ["emma@mergington.edu", "sophia@mergington.edu"]
        },
        "Gym Class": {
            "description": "Physical education and sports activities",
            "schedule": "Mondays, Wednesdays, Fridays, 2:00 PM - 3:00 PM",
            "max_participants": 30,
            "participants": ["john@mergington.edu", "olivia@mergington.edu"]
        },
        "Soccer Team": {
            "description": "Join the school soccer team and compete in local leagues",
            "schedule": "Tuesdays and Thursdays, 4:00 PM - 5:30 PM",
            "max_participants": 22,
            "participants": ["lucas@mergington.edu", "mia@mergington.edu"]
        },
        "Basketball Club": {
            "description": "Practice basketball skills and play friendly matches",
            "schedule": "Wednesdays, 3:30 PM - 5:00 PM",
            "max_participants": 15,
            "participants": ["liam@mergington.edu", "ava@mergington.edu"]
        },
        "Drama Club": {
            "description": "Act, direct, and participate in school theater productions",
            "schedule": "Mondays, 4:00 PM - 5:30 PM",
            "max_participants": 18,
            "participants": ["noah@mergington.edu", "isabella@mergington.edu"]
        },
        "Art Workshop": {
            "description": "Explore painting, drawing, and sculpture techniques",
            "schedule": "Fridays, 2:00 PM - 3:30 PM",
            "max_participants": 16,
            "participants": ["amelia@mergington.edu", "benjamin@mergington.edu"]
        },
        "Math Olympiad": {
            "description": "Prepare for math competitions and solve challenging problems",
            "schedule": "Thursdays, 3:30 PM - 5:00 PM",
            "max_participants": 10,
            "participants": ["charlotte@mergington.edu", "ethan@mergington.edu"]
        },
        "Science Club": {
            "description": "Conduct experiments and explore scientific concepts",
            "schedule": "Wednesdays, 4:00 PM - 5:00 PM",
            "max_participants": 14,
            "participants": ["harper@mergington.edu", "jackson@mergington.edu"]
        }
    }
    
    # Reset to original state
    activities.clear()
    activities.update(original_activities)
    yield
    # Cleanup after test
    activities.clear()
    activities.update(original_activities)


class TestRootEndpoint:
    """Tests for the root endpoint."""

    def test_root_redirects_to_static(self, client):
        """Test that root redirects to static/index.html."""
        response = client.get("/", follow_redirects=False)
        assert response.status_code == 307
        assert response.headers["location"] == "/static/index.html"


class TestGetActivities:
    """Tests for the GET /activities endpoint."""

    def test_get_activities_returns_all(self, client):
        """Test that all activities are returned."""
        response = client.get("/activities")
        assert response.status_code == 200
        data = response.json()
        assert len(data) == 9
        assert "Chess Club" in data
        assert "Programming Class" in data
        assert "Gym Class" in data

    def test_get_activities_structure(self, client):
        """Test that activity structure is correct."""
        response = client.get("/activities")
        data = response.json()
        
        chess_club = data["Chess Club"]
        assert "description" in chess_club
        assert "schedule" in chess_club
        assert "max_participants" in chess_club
        assert "participants" in chess_club
        assert isinstance(chess_club["participants"], list)

    def test_get_activities_has_correct_participants(self, client):
        """Test that activities have the correct initial participants."""
        response = client.get("/activities")
        data = response.json()
        
        assert "michael@mergington.edu" in data["Chess Club"]["participants"]
        assert "daniel@mergington.edu" in data["Chess Club"]["participants"]


class TestSignupForActivity:
    """Tests for the POST /activities/{activity_name}/signup endpoint."""

    def test_signup_for_existing_activity(self, client):
        """Test successful signup for an existing activity."""
        response = client.post(
            "/activities/Chess Club/signup",
            params={"email": "newstudent@mergington.edu"}
        )
        assert response.status_code == 200
        data = response.json()
        assert data["message"] == "Signed up newstudent@mergington.edu for Chess Club"

    def test_signup_adds_participant(self, client):
        """Test that signup actually adds the participant."""
        email = "newstudent@mergington.edu"
        client.post(
            "/activities/Chess Club/signup",
            params={"email": email}
        )
        
        # Verify the participant was added
        response = client.get("/activities")
        data = response.json()
        assert email in data["Chess Club"]["participants"]

    def test_signup_for_nonexistent_activity(self, client):
        """Test signup for an activity that doesn't exist."""
        response = client.post(
            "/activities/Nonexistent Club/signup",
            params={"email": "student@mergington.edu"}
        )
        assert response.status_code == 404
        assert response.json()["detail"] == "Activity not found"

    def test_duplicate_signup(self, client):
        """Test that a student cannot sign up twice for the same activity."""
        email = "michael@mergington.edu"  # Already in Chess Club
        response = client.post(
            "/activities/Chess Club/signup",
            params={"email": email}
        )
        assert response.status_code == 400
        assert response.json()["detail"] == "Student already signed up for this activity"

    def test_signup_for_multiple_activities(self, client):
        """Test that a student can sign up for multiple different activities."""
        email = "newstudent@mergington.edu"
        
        # Sign up for Chess Club
        response1 = client.post(
            "/activities/Chess Club/signup",
            params={"email": email}
        )
        assert response1.status_code == 200
        
        # Sign up for Programming Class
        response2 = client.post(
            "/activities/Programming Class/signup",
            params={"email": email}
        )
        assert response2.status_code == 200
        
        # Verify both signups
        activities_response = client.get("/activities")
        data = activities_response.json()
        assert email in data["Chess Club"]["participants"]
        assert email in data["Programming Class"]["participants"]


class TestUnregisterFromActivity:
    """Tests for the DELETE /activities/{activity_name}/unregister endpoint."""

    def test_unregister_from_activity(self, client):
        """Test successful unregistration from an activity."""
        email = "michael@mergington.edu"  # Already in Chess Club
        response = client.delete(
            "/activities/Chess Club/unregister",
            params={"email": email}
        )
        assert response.status_code == 200
        data = response.json()
        assert data["message"] == "Unregistered michael@mergington.edu from Chess Club"

    def test_unregister_removes_participant(self, client):
        """Test that unregister actually removes the participant."""
        email = "michael@mergington.edu"
        client.delete(
            "/activities/Chess Club/unregister",
            params={"email": email}
        )
        
        # Verify the participant was removed
        response = client.get("/activities")
        data = response.json()
        assert email not in data["Chess Club"]["participants"]

    def test_unregister_from_nonexistent_activity(self, client):
        """Test unregister from an activity that doesn't exist."""
        response = client.delete(
            "/activities/Nonexistent Club/unregister",
            params={"email": "student@mergington.edu"}
        )
        assert response.status_code == 404
        assert response.json()["detail"] == "Activity not found"

    def test_unregister_when_not_signed_up(self, client):
        """Test unregister when student is not signed up for the activity."""
        email = "notsignedup@mergington.edu"
        response = client.delete(
            "/activities/Chess Club/unregister",
            params={"email": email}
        )
        assert response.status_code == 400
        assert response.json()["detail"] == "Student not signed up for this activity"

    def test_signup_after_unregister(self, client):
        """Test that a student can sign up again after unregistering."""
        email = "michael@mergington.edu"
        
        # Unregister
        response1 = client.delete(
            "/activities/Chess Club/unregister",
            params={"email": email}
        )
        assert response1.status_code == 200
        
        # Sign up again
        response2 = client.post(
            "/activities/Chess Club/signup",
            params={"email": email}
        )
        assert response2.status_code == 200
        
        # Verify participant is back
        activities_response = client.get("/activities")
        data = activities_response.json()
        assert email in data["Chess Club"]["participants"]


class TestIntegrationScenarios:
    """Integration tests for common user scenarios."""

    def test_complete_student_journey(self, client):
        """Test a complete journey: view activities, sign up, unregister."""
        email = "newstudent@mergington.edu"
        
        # View activities
        response = client.get("/activities")
        assert response.status_code == 200
        activities_data = response.json()
        assert "Drama Club" in activities_data
        
        # Sign up for Drama Club
        signup_response = client.post(
            "/activities/Drama Club/signup",
            params={"email": email}
        )
        assert signup_response.status_code == 200
        
        # Verify signup
        check_response = client.get("/activities")
        assert email in check_response.json()["Drama Club"]["participants"]
        
        # Unregister
        unregister_response = client.delete(
            "/activities/Drama Club/unregister",
            params={"email": email}
        )
        assert unregister_response.status_code == 200
        
        # Verify unregistration
        final_response = client.get("/activities")
        assert email not in final_response.json()["Drama Club"]["participants"]

    def test_multiple_students_same_activity(self, client):
        """Test multiple students signing up for the same activity."""
        emails = [
            "student1@mergington.edu",
            "student2@mergington.edu",
            "student3@mergington.edu"
        ]
        
        for email in emails:
            response = client.post(
                "/activities/Science Club/signup",
                params={"email": email}
            )
            assert response.status_code == 200
        
        # Verify all students are signed up
        activities_response = client.get("/activities")
        participants = activities_response.json()["Science Club"]["participants"]
        for email in emails:
            assert email in participants

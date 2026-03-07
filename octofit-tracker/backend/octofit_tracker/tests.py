from django.test import TestCase
from .models import User, Team, Activity, Leaderboard, Workout

class ModelSmokeTest(TestCase):
    def test_user_create(self):
        u = User.objects.create(name='Test', email='test@example.com', team='Testers')
        self.assertEqual(User.objects.count(), 1)
    def test_team_create(self):
        t = Team.objects.create(name='Testers', members=['A', 'B'])
        self.assertEqual(Team.objects.count(), 1)
    def test_activity_create(self):
        a = Activity.objects.create(user='Test', activity='Run', reps=5)
        self.assertEqual(Activity.objects.count(), 1)
    def test_leaderboard_create(self):
        l = Leaderboard.objects.create(team='Testers', points=10)
        self.assertEqual(Leaderboard.objects.count(), 1)
    def test_workout_create(self):
        w = Workout.objects.create(name='Test Workout', suggested_for=['A'])
        self.assertEqual(Workout.objects.count(), 1)

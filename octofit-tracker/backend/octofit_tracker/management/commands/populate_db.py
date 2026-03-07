from django.core.management.base import BaseCommand
from django.conf import settings
from pymongo import MongoClient, ASCENDING

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Подключение к MongoDB напрямую для создания индекса
        client = MongoClient('localhost', 27017)
        db = client['octofit_db']

        # Очистка коллекций
        db.users.delete_many({})
        db.teams.delete_many({})
        db.activities.delete_many({})
        db.leaderboard.delete_many({})
        db.workouts.delete_many({})

        # Создание уникального индекса по email
        db.users.create_index([('email', ASCENDING)], unique=True)

        # Тестовые данные
        marvel_team = {'name': 'Team Marvel', 'members': ['Iron Man', 'Captain America', 'Thor', 'Hulk']}
        dc_team = {'name': 'Team DC', 'members': ['Superman', 'Batman', 'Wonder Woman', 'Flash']}
        marvel_id = db.teams.insert_one(marvel_team).inserted_id
        dc_id = db.teams.insert_one(dc_team).inserted_id

        users = [
            {'name': 'Tony Stark', 'email': 'ironman@marvel.com', 'team': marvel_id},
            {'name': 'Steve Rogers', 'email': 'cap@marvel.com', 'team': marvel_id},
            {'name': 'Bruce Wayne', 'email': 'batman@dc.com', 'team': dc_id},
            {'name': 'Clark Kent', 'email': 'superman@dc.com', 'team': dc_id},
        ]
        db.users.insert_many(users)

        activities = [
            {'user': 'Tony Stark', 'activity': 'Bench Press', 'reps': 10},
            {'user': 'Steve Rogers', 'activity': 'Running', 'distance_km': 5},
            {'user': 'Bruce Wayne', 'activity': 'Push Ups', 'reps': 50},
            {'user': 'Clark Kent', 'activity': 'Flying', 'distance_km': 100},
        ]
        db.activities.insert_many(activities)

        leaderboard = [
            {'team': 'Team Marvel', 'points': 120},
            {'team': 'Team DC', 'points': 110},
        ]
        db.leaderboard.insert_many(leaderboard)

        workouts = [
            {'name': 'Super Strength', 'suggested_for': ['Hulk', 'Superman']},
            {'name': 'Speed Run', 'suggested_for': ['Flash', 'Quicksilver']},
        ]
        db.workouts.insert_many(workouts)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data!'))

# Models for users, teams, activities, leaderboard, workouts
from django.db import models

class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    team = models.CharField(max_length=100)

class Team(models.Model):
    name = models.CharField(max_length=100)
    members = models.JSONField(default=list)

class Activity(models.Model):
    user = models.CharField(max_length=100)
    activity = models.CharField(max_length=100)
    reps = models.IntegerField(null=True, blank=True)
    distance_km = models.FloatField(null=True, blank=True)

class Leaderboard(models.Model):
    team = models.CharField(max_length=100)
    points = models.IntegerField()

class Workout(models.Model):
    name = models.CharField(max_length=100)
    suggested_for = models.JSONField(default=list)

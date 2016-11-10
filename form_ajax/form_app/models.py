from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Post(models.Model):
	author = models.ForeignKey(User)
	text = models.TextField(max_length=200)
	# Time for creation and updation
	created = models.DateTimeField(auto_now_add=True)
	updated = models.DateTimeField(auto_now=True)

	class Meta:
		ordering = ['created']

	def __str__(self):
		return self.text + " - " + self.author.username
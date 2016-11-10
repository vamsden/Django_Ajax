from django.conf.urls import include, url

from . import views

urlpatterns = [
	url(r'^$', views.home, name='home'),
	url(r'^post/', views.create_post, name='create_post'),
]
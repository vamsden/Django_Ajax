from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect, JsonResponse
from .models import Post
from .forms import PostForm

# Create your views here.
def home(request):
	posts = Post.objects.reverse()
	form = PostForm()
	context = {
		'all_posts': posts,
		'form': form,
	}
	return render(request, 'app/index.html', context)

"""def create_post(request):
	if request.method == "POST":
		form = PostForm(request.POST)
		if form.is_valid:
			post = form.save(commit=False)
			post.author = request.user
			post.save()
			# return redirect("/")
			return HttpResponseRedirect("/app/")
	else:
		form = PostForm()
	return render(request, "app/post.html", {"form": form})"""

def create_post(request):
	if request.method == "POST":
		post_text = request.POST.get('the_post')
		response_data = {}

		post = Post(text=post_text, author=request.user)
		post.save()

		response_data['result'] = 'Create post successful!'
		response_data['postpk'] = post.pk
		response_data['text'] = post.text
		response_data['created'] = post.created.strftime('%B %d, %Y %I:%M %p')
		response_data['author'] = post.author.username

		return JsonResponse(response_data)
	else:
		return JsonResponse({'Error': "Error connecting"})
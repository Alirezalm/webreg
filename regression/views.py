import json

from django.contrib.auth.models import User
from django.contrib.gis.geometry import json_regex
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import  csrf_exempt


@csrf_exempt
def home_page(request, code = None):
    context = {}
    if request.method == 'GET':
        if request.user.is_authenticated:
            context = {'auth': True}
        else:
            context = {'auth': False}
        return render(request, 'regression/home.html', context=context)

    else:
        user = json.loads(request.body)
        new_user = User.objects.create_user(user['userName'], user['email'], user['password'])
        new_user.last_name = user['lastName']
        new_user.save()

        return JsonResponse({'status': 1})


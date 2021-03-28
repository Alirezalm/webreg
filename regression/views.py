import json

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.gis.geometry import json_regex
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def home_page(request, code=None):
    context = {}
    if request.method == 'GET':
        if code == 'logout':
            logout(request)
            return JsonResponse({'status': 1})
        if request.user.is_authenticated & request.user.is_active:
            context = {'auth': True}
        else:
            context = {'auth': False}

        print(User.objects.all())
        return render(request, 'regression/home.html', context=context)

    else:

        if code == 'login':

            login_info = json.loads(request.body)
            email = login_info['email']
            password = login_info['password']

            user = authenticate(request, username=email, password=password)
            if user is not None:
                login(request, user)
                return JsonResponse({'status': 1})
            return JsonResponse({'status': 0})

        else:
            user = json.loads(request.body)
            new_user = User.objects.create_user(user['email'], user['email'], user['password'])
            new_user.save()

            return JsonResponse({'status': 1})

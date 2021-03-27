from django.urls import path

from regression.views import home_page

urlpatterns = [
    path('', home_page, name = 'home'),
    path('<str:code>/', home_page)
]

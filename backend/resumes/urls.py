from rest_framework import routers
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from . import views
from .auth_views import RegisterView


router = routers.DefaultRouter()
from .views import ResumeViewSet, ExperienceViewSet, EducationViewSet, SkillViewSet, EnhanceBulletAPIView
router.register(r'resumes', ResumeViewSet, basename='resume')
router.register(r'experiences', ExperienceViewSet, basename='experience')
router.register(r'educations', EducationViewSet, basename='education')
router.register(r'skills', SkillViewSet, basename='skill')

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('ai/enhance-bullet/', EnhanceBulletAPIView.as_view(), name='enhance-bullet'),
    path('', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

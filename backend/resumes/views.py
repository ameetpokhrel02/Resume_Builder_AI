from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
import openai
from rest_framework import status

class EnhanceBulletAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        bullet_point = request.data.get('bullet_point')
        if not bullet_point:
            return Response({'error': 'No bullet_point provided.'}, status=status.HTTP_400_BAD_REQUEST)
        prompt = (
            "You are an expert career coach and resume writer. Your task is to rewrite the following resume bullet point "
            "to be more professional, results-oriented, and impactful. Use strong action verbs and quantify achievements where possible, "
            "but do not invent information. Keep it to a single, concise sentence.\n\n"
            f"Original bullet point: \"{bullet_point}\"\n\nEnhanced bullet point:"
        )
        openai.api_key = settings.OPENAI_API_KEY
        try:
            response = openai.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": prompt}],
                max_tokens=60,
                temperature=0.7,
            )
            enhanced = response.choices[0].message.content.strip()
            return Response({"enhanced_bullet": enhanced})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
from rest_framework import viewsets, permissions
from .models import Resume, Experience, Education, Skill
from .serializers import ResumeSerializer, ExperienceSerializer, EducationSerializer, SkillSerializer

class ResumeViewSet(viewsets.ModelViewSet):
    serializer_class = ResumeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Resume.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ExperienceViewSet(viewsets.ModelViewSet):
    serializer_class = ExperienceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Experience.objects.filter(resume__user=self.request.user)

class EducationViewSet(viewsets.ModelViewSet):
    serializer_class = EducationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Education.objects.filter(resume__user=self.request.user)

class SkillViewSet(viewsets.ModelViewSet):
    serializer_class = SkillSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Skill.objects.filter(resume__user=self.request.user)

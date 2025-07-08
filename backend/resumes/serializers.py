from rest_framework import serializers
from .models import Resume, Experience, Education, Skill

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name']

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = ['id', 'institution', 'degree', 'field_of_study', 'start_date', 'end_date']

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = ['id', 'job_title', 'company', 'location', 'start_date', 'end_date', 'description']

class ResumeSerializer(serializers.ModelSerializer):
    experiences = ExperienceSerializer(many=True, read_only=True)
    educations = EducationSerializer(many=True, read_only=True)
    skills = SkillSerializer(many=True, read_only=True)

    class Meta:
        model = Resume
        fields = [
            'id', 'user', 'title', 'full_name', 'email', 'phone_number',
            'linkedin_url', 'portfolio_url', 'summary', 'created_at', 'updated_at',
            'experiences', 'educations', 'skills'
        ]

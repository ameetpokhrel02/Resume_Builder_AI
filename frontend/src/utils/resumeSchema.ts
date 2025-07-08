export interface Experience {
  id?: number;
  job_title: string;
  company: string;
  location?: string;
  start_date: string;
  end_date?: string;
  description: string;
}

export interface Education {
  id?: number;
  institution: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date?: string;
}

export interface Skill {
  id?: number;
  name: string;
}

export interface Resume {
  id?: number;
  user?: number;
  title: string;
  full_name: string;
  email: string;
  phone_number?: string;
  linkedin_url?: string;
  portfolio_url?: string;
  summary?: string;
  experiences: Experience[];
  educations: Education[];
  skills: Skill[];
  created_at?: string;
  updated_at?: string;
}

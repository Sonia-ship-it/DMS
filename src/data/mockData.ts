export type JobStatus = 'Active' | 'Draft' | 'Closed';
export type JobType = 'Remote' | 'Hybrid' | 'Onsite';
export type EmploymentType = 'Full-time' | 'Part-time' | 'Contract';
export type ConfidenceLevel = 'High' | 'Medium' | 'Low';
export type ScreeningStatus = 'idle' | 'running' | 'complete' | 'error';

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: JobType;
  employmentType: EmploymentType;
  status: JobStatus;
  description: string;
  requiredSkills: string[];
  niceToHaveSkills: string[];
  minExperience: number;
  educationLevel: string;
  applicantCount: number;
  postedDate: string;
  screeningWeights: { skills: number; experience: number; education: number; portfolio: number };
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  currentRole: string;
  skills: string[];
  experience: { company: string; role: string; startDate: string; endDate: string; description: string }[];
  education: { institution: string; degree: string; field: string; year: number }[];
  linkedin?: string;
  portfolio?: string;
  avatarColor: string;
}

export interface ScreeningResult {
  candidateId: string;
  jobId: string;
  rank: number;
  matchScore: number;
  confidence: ConfidenceLevel;
  topStrength: string;
  keyGap: string;
  strengths: string[];
  gaps: string[];
  reasoning: string;
  recommendation: string;
}

export interface ChatMessage {
  id: string;
  role: 'ai' | 'user';
  content: string;
  timestamp: string;
}

export interface ScreeningRun {
  id: string;
  jobId: string;
  jobTitle: string;
  dateRun: string;
  candidatesScreened: number;
  topScore: number;
  avgScore: number;
  status: 'Completed' | 'Failed';
}

const avatarColors = ['bg-[#0F1547]', 'bg-teal', 'bg-amber', 'bg-rose-500', 'bg-indigo-500', 'bg-emerald-500'];

export const mockJobs: Job[] = [
  {
    id: '1', title: 'Senior Software Engineer', department: 'Engineering', location: 'Kigali, Rwanda',
    type: 'Remote', employmentType: 'Full-time', status: 'Active',
    description: 'We are looking for an experienced software engineer to join our engineering team and build modern web applications using React and TypeScript.',
    requiredSkills: ['React', 'TypeScript', 'CSS', 'REST APIs', 'Git'],
    niceToHaveSkills: ['Next.js', 'GraphQL', 'AWS'],
    minExperience: 5, educationLevel: "Bachelor's", applicantCount: 18, postedDate: '2024-03-15',
    screeningWeights: { skills: 40, experience: 30, education: 15, portfolio: 15 },
  },
  {
    id: '2', title: 'UI/UX Designer', department: 'Design', location: 'Kigali, Rwanda',
    type: 'Hybrid', employmentType: 'Full-time', status: 'Active',
    description: 'Join our design team to create beautiful, user-centered digital products.',
    requiredSkills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
    niceToHaveSkills: ['Framer', 'Motion Design', 'HTML/CSS'],
    minExperience: 3, educationLevel: "Bachelor's", applicantCount: 24, postedDate: '2024-03-10',
    screeningWeights: { skills: 35, experience: 25, education: 10, portfolio: 30 },
  },
  {
    id: '3', title: 'Data Analyst', department: 'Data', location: 'Musanze, Rwanda',
    type: 'Remote', employmentType: 'Full-time', status: 'Draft',
    description: 'We need a data analyst to build ML models and drive data-informed decisions.',
    requiredSkills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow'],
    niceToHaveSkills: ['PyTorch', 'Spark', 'Kubernetes'],
    minExperience: 4, educationLevel: "Master's", applicantCount: 0, postedDate: '2024-03-20',
    screeningWeights: { skills: 40, experience: 25, education: 20, portfolio: 15 },
  },
  {
    id: '4', title: 'Systems Engineer', department: 'Infrastructure', location: 'Kigali, Rwanda',
    type: 'Onsite', employmentType: 'Contract', status: 'Closed',
    description: 'We are seeking a systems engineer to manage our cloud infrastructure and CI/CD pipelines.',
    requiredSkills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD'],
    niceToHaveSkills: ['GCP', 'Ansible', 'Monitoring'],
    minExperience: 4, educationLevel: "Bachelor's", applicantCount: 12, postedDate: '2024-02-28',
    screeningWeights: { skills: 45, experience: 30, education: 10, portfolio: 15 },
  },
  {
    id: '5', title: 'Digital Marketing Lead', department: 'Marketing', location: 'Huye, Rwanda',
    type: 'Hybrid', employmentType: 'Full-time', status: 'Active',
    description: 'Lead our marketing team to drive growth through digital marketing strategies.',
    requiredSkills: ['Digital Marketing', 'SEO', 'Content Strategy', 'Analytics'],
    niceToHaveSkills: ['PPC', 'Social Media', 'CRM'],
    minExperience: 5, educationLevel: "Bachelor's", applicantCount: 15, postedDate: '2024-03-18',
    screeningWeights: { skills: 35, experience: 35, education: 15, portfolio: 15 },
  },
];

const candidateNames = [
  'Amara Uwimana', 'Jean Nshimiyimana', 'Marie Hakizimana', 'Chantal Mukamana', 'Eric Bizimana',
  'Fabiola Uwizeye', 'Gael Ntirenganya', 'Honorine Ingabire', 'Claude Nsanzimana', 'Josiane Mutoni',
  'Thierry Ndahimana', 'Aline Murekatete', 'Pacifique Ndayisaba', 'Clarisse Uwamahoro', 'Kevine Iradukunda',
  'Samuel Adeyemi', 'Elena Petrov', 'Raj Patel',
];

const roles = [
  'Frontend Developer', 'Full Stack Engineer', 'UI Developer', 'React Developer',
  'Software Engineer', 'Web Developer', 'Senior Developer', 'Tech Lead',
  'Junior Developer', 'Mid-Level Engineer', 'Application Developer', 'Platform Engineer',
  'Design Engineer', 'Solutions Architect', 'Staff Engineer', 'Principal Engineer',
  'DevOps Engineer', 'Cloud Engineer',
];

export const mockCandidates: Candidate[] = candidateNames.map((name, i) => ({
  id: `c${i + 1}`,
  name,
  email: `${name.toLowerCase().replace(/['\s]/g, '.')}@email.com`,
  phone: `+1 (555) ${String(100 + i).padStart(3, '0')}-${String(1000 + i * 7).slice(-4)}`,
  currentRole: roles[i % roles.length],
  skills: [
    ['React', 'TypeScript', 'Node.js', 'CSS', 'GraphQL'],
    ['React', 'JavaScript', 'Python', 'SQL', 'AWS'],
    ['TypeScript', 'Next.js', 'Tailwind', 'REST APIs', 'Docker'],
    ['React', 'Vue.js', 'CSS', 'Testing', 'CI/CD'],
    ['JavaScript', 'React', 'MongoDB', 'Express', 'Git'],
  ][i % 5],
  experience: [
    { company: 'TechCorp', role: roles[i % roles.length], startDate: '2021-01', endDate: i % 3 === 0 ? 'Present' : '2024-01', description: 'Led frontend development for the main product platform.' },
    { company: 'StartupXYZ', role: 'Junior Developer', startDate: '2019-06', endDate: '2021-01', description: 'Built responsive web applications and collaborated with design team.' },
  ],
  education: [
    { institution: ['MIT', 'Stanford', 'Bootcamp Academy', 'Self-taught', 'UC Berkeley', 'Online University'][i % 6], degree: ['B.S.', 'M.S.', 'Certificate', 'Self-taught', 'B.S.', 'B.A.'][i % 6], field: 'Computer Science', year: 2018 + (i % 4) },
  ],
  linkedin: `https://linkedin.com/in/${name.toLowerCase().replace(/['\s]/g, '-')}`,
  portfolio: i % 3 === 0 ? `https://github.com/${name.toLowerCase().replace(/['\s]/g, '')}` : undefined,
  avatarColor: avatarColors[i % avatarColors.length],
}));

const strengths = [
  'React Expert', 'Strong TypeScript', 'Excellent communicator', 'AWS Certified',
  'System Design', 'Testing advocate', 'Performance optimization', 'Clean code practices',
  'Leadership experience', 'Open source contributor', 'Agile methodology', 'Problem solver',
  'Cross-functional collaboration', 'Mentoring experience', 'Rapid learner', 'DevOps proficiency',
  'Data-driven approach', 'UX sensibility',
];

const gaps = [
  'No AWS experience', 'Limited leadership', 'No GraphQL', 'Short tenure history',
  'No CI/CD experience', 'Missing TypeScript', 'No testing experience', 'Limited system design',
  'No remote work experience', 'Gaps in employment', 'No formal degree', 'Limited portfolio',
  'No open source contributions', 'Missing Docker skills', 'No cloud experience', 'Junior-level projects',
  'No mentoring experience', 'Limited scalability work',
];

const scores = [92, 88, 85, 82, 78, 75, 72, 70, 67, 64, 62, 58, 55, 52, 48, 45, 43, 40];

export const mockScreeningResults: ScreeningResult[] = mockCandidates.map((c, i) => ({
  candidateId: c.id,
  jobId: '1',
  rank: i + 1,
  matchScore: scores[i],
  confidence: (scores[i] >= 70 ? 'High' : scores[i] >= 50 ? 'Medium' : 'Low') as ConfidenceLevel,
  topStrength: strengths[i % strengths.length],
  keyGap: gaps[i % gaps.length],
  strengths: [strengths[i % strengths.length], strengths[(i + 3) % strengths.length], strengths[(i + 7) % strengths.length]],
  gaps: [gaps[i % gaps.length], gaps[(i + 5) % gaps.length]],
  reasoning: `${c.name} demonstrates ${scores[i] >= 70 ? 'strong' : scores[i] >= 50 ? 'moderate' : 'limited'} alignment with the role requirements. Their experience in ${c.skills[0]} and ${c.skills[1]} is particularly relevant. ${scores[i] >= 70 ? 'Their portfolio shows consistent quality work and growth.' : 'However, there are some gaps in key areas that would need to be addressed.'}  Based on the screening criteria weights, ${c.name} scores ${scores[i]}% overall with ${scores[i] >= 70 ? 'high' : scores[i] >= 50 ? 'moderate' : 'low'} confidence.`,
  recommendation: scores[i] >= 70 ? 'Strongly recommended for interview' : scores[i] >= 50 ? 'Consider for interview with reservations' : 'Does not meet minimum requirements',
}));

export const mockChatMessages: ChatMessage[] = [
  { id: 'msg1', role: 'ai', content: "Screening complete! I've analyzed 18 candidates against your job requirements. Here's what I found:\n\n• **Top 3 candidates** all score above 85% match\n• **7 candidates** meet the minimum threshold of 70%\n• **Key trend**: Strongest candidates have both React and TypeScript expertise\n• **Notable gap**: Most candidates lack AWS experience", timestamp: '2024-03-20T10:30:00Z' },
  { id: 'msg2', role: 'user', content: 'Compare top 3', timestamp: '2024-03-20T10:31:00Z' },
  { id: 'msg3', role: 'ai', content: "Here's a comparison of your top 3 candidates:\n\n**#1 Amara Uwimana (92%)** — React expert with 5+ years, strong TypeScript. Gap: No AWS.\n\n**#2 Jean Nshimiyimana (88%)** — Full stack with excellent system design. Gap: Limited leadership.\n\n**#3 Marie Hakizimana (85%)** — Strong testing advocate with clean code. Gap: No GraphQL.\n\nAll three are interview-ready. Amara stands out for depth of React experience.", timestamp: '2024-03-20T10:31:30Z' },
  { id: 'msg4', role: 'user', content: 'Who almost qualified?', timestamp: '2024-03-20T10:32:00Z' },
  { id: 'msg5', role: 'ai', content: "Two candidates narrowly missed the 70% threshold:\n\n**Claude Nsanzimana (67%)** — Strong JavaScript fundamentals but lacks TypeScript experience. A quick upskill could make them viable.\n\n**Josiane Mutoni (64%)** — Excellent problem-solving skills shown in portfolio projects. Missing formal React experience but has Vue.js background.\n\nBoth could be worth a conversation if you're open to candidates with high growth potential.", timestamp: '2024-03-20T10:32:30Z' },
];

export const mockScreeningRuns: ScreeningRun[] = [
  { id: 'sr1', jobId: '1', jobTitle: 'Senior Frontend Developer', dateRun: '2024-03-20', candidatesScreened: 18, topScore: 92, avgScore: 65, status: 'Completed' },
  { id: 'sr2', jobId: '2', jobTitle: 'Product Designer', dateRun: '2024-03-18', candidatesScreened: 24, topScore: 88, avgScore: 61, status: 'Completed' },
  { id: 'sr3', jobId: '4', jobTitle: 'DevOps Engineer', dateRun: '2024-03-05', candidatesScreened: 12, topScore: 79, avgScore: 58, status: 'Completed' },
  { id: 'sr4', jobId: '5', jobTitle: 'Marketing Manager', dateRun: '2024-03-19', candidatesScreened: 15, topScore: 85, avgScore: 63, status: 'Completed' },
];

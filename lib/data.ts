export type Project = {
  id: string;
  featured: boolean;
  name: string;
  category: string;
  label: string;
  status: string;
  tone: string;
  line: string;
  description: string;
  stack: string[];
  live?: string;
  repo?: string;
  role: string;
  problem: string;
  approach: string;
  features: string[];
  note: string;
};

export const EMAIL = 'rakeshnamburi2k4@gmail.com';
export const PHONE = '+91 93925 74626';
export const PHONE_HREF = 'tel:+919392574626';

export const links = {
  github: 'https://github.com/Rakeshnamburi',
  linkedin: 'https://www.linkedin.com/in/rakesh-namburi-a82a4b262/',
  leetcode: 'https://leetcode.com/u/rakeshnamburi/',
  codechef: 'https://www.codechef.com/users/namburirakesh7',
  credly: 'https://www.credly.com/users/rakesh-namburi',
};

export const navItems = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'documents', label: 'Résumés' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'contact', label: 'Contact' },
];

export const sectionList = [
  { id: 'work', label: 'Selected work' },
  { id: 'stats', label: 'Numbers' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'documents', label: 'Résumés & education' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'community', label: 'Community' },
  { id: 'contact', label: 'Contact' },
];

export const projects: Project[] = [
  {
    id: 'spilton-ai',
    featured: true,
    name: 'Spilton AI',
    category: 'AI applications',
    label: 'Latest / full-stack AI platform',
    status: 'Live',
    tone: '#8da2ff',
    line: 'General intelligence, grounded in your documents.',
    description:
      'A full-stack AI workspace for general questions, coding assistance, technical tutoring, document-grounded RAG, and government-exam intelligence.',
    stack: ['Next.js', 'TypeScript', '.NET 10', 'PostgreSQL · pgvector', 'Groq'],
    live: 'https://spilton-ai.vercel.app',
    repo: 'https://github.com/Rakeshnamburi/Spilton-AI',
    role: 'Founder · Full-stack developer',
    problem:
      'People often need separate tools for general assistance, coding help, document research, and exam preparation.',
    approach:
      'Built one chat experience with multiple bounded modes, secure authentication, configurable model routing, document ingestion, local embeddings, and PostgreSQL vector retrieval.',
    features: [
      'General chat, coding assistance, and technical tutoring',
      'PDF, TXT, and DOCX document-grounded RAG',
      'Quick, Think, Research, and bounded Agent modes',
      'Authentication, model settings, diagnostics, and source excerpts',
    ],
    note: 'Latest project, created in September 2026. Real Groq chat and document-grounded answers have been tested. Vision, audio, arbitrary code execution, and unbounded autonomous actions are outside the current scope.',
  },
  {
    id: 'spilto',
    featured: true,
    name: 'SPILTO Connections',
    category: 'AI applications',
    label: 'Independent / AI meeting assistant',
    status: 'Live',
    tone: '#ff9a5a',
    line: 'Meet. Understand. Take action.',
    description:
      'A meeting-assistant project that turns conversations into structured summaries, decisions, and action items for review.',
    stack: ['React', 'TypeScript', 'Node.js', 'Gemini API'],
    live: 'https://spilto-connections-1.onrender.com',
    role: 'Independent developer',
    problem:
      'Important decisions and follow-up tasks can get lost in meeting conversations.',
    approach:
      'Built a meeting-assistant application around transcript processing, structured AI outputs, and a human review step. The TechBharat Cohort 2 Buildathon submission and the live SPILTO application share the idea, with different backend implementations.',
    features: [
      'Transcript and audio workflows',
      'Summaries, decisions, and action items',
      'Review and approval before external actions',
      'Multilingual interaction',
    ],
    note: 'The listed stack describes the hackathon version. The live version uses a different backend. The demo requires sign-in and may take a moment to wake up. Hackathon source is private.',
  },
  {
    id: 'electroflow',
    featured: true,
    name: 'ElectroFlow AI',
    category: 'Web development',
    label: 'Independent / live application',
    status: 'Live',
    tone: '#ffd166',
    line: 'An independent exploration in building.',
    description:
      'An independently developed web application with an operations sign-in interface and multilingual entry experience.',
    stack: ['Web application', 'English · Telugu · Hindi'],
    live: 'https://electroflow-ai.vercel.app/',
    role: 'Independent developer',
    problem:
      'Exploring how to make an application’s entry experience accessible across languages.',
    approach:
      'Developed and deployed ElectroFlow AI. The public entry page includes language selection, email/password sign-in, account creation, and password-recovery entry points.',
    features: [
      'English, Telugu, and Hindi language options',
      'Operations sign-in interface',
      'Account creation entry point',
      'Deployed application on Vercel',
    ],
    note: 'The application requires sign-in. This overview describes its public interface.',
  },
  {
    id: 'retailmate',
    featured: false,
    name: 'RetailMate',
    category: 'Cloud & systems',
    label: 'Team / final-year project',
    status: 'Team build',
    tone: '#7be0b5',
    line: 'Smart inventory. Seamless retail.',
    description:
      'A cloud-backed inventory application. I designed the interface and workflow, and developed the frontend as part of the team.',
    stack: ['React', 'AWS Lambda', 'DynamoDB', 'Terraform'],
    repo: 'https://github.com/klu-2200031955/Final_Year_Project',
    role: 'Frontend developer · Interface & workflow design',
    problem:
      'Retail inventory needs a clear way to track items, update quantities, and find the right records.',
    approach:
      'Planned how users move through the application, designed the interface, and built the React frontend. The team project connects inventory operations to an AWS serverless backend, with Cognito authentication and infrastructure defined in Terraform.',
    features: [
      'Sign-up and sign-in flows',
      'Add, edit, and delete inventory items',
      'Quantity updates and item search',
      'Frontend integration with inventory APIs',
    ],
    note: 'A team project. My contribution covers design, application workflow, and frontend development; the full AWS architecture is a team outcome.',
  },
  {
    id: 'findash',
    featured: false,
    name: 'FinDash',
    category: 'Web development',
    label: 'Independent / academic project',
    status: 'Live',
    tone: '#c9a7ff',
    line: 'A clearer view of the numbers.',
    description:
      'An interactive finance dashboard for exploring transactions, income, expenses, and spending patterns.',
    stack: ['React', 'Tailwind CSS', 'Recharts', 'Context API'],
    live: 'https://finance-dashboard-one-beta-90.vercel.app/',
    repo: 'https://github.com/Rakeshnamburi/finance-dashboard',
    role: 'Independent developer',
    problem:
      'Financial records are easier to understand when transactions and trends can be explored in one place.',
    approach:
      'Developed a frontend application using React Context and useReducer for state management, with charts, transaction filtering, and data exports.',
    features: [
      'Income, expense, and balance summaries',
      'Search, sorting, and transaction filters',
      'Interactive spending visualizations',
      'CSV and JSON exports',
    ],
    note: 'A frontend demonstration using local application state. Admin and viewer modes demonstrate UI behavior; they are not backend-enforced access controls.',
  },
];

export const coding = {
  leetcode: { solved: 744, easy: 201, medium: 418, hard: 125 },
  codechef: { solved: 917, contests: 37 },
  checked: 'September 2, 2026',
};

export const credentials = [
  { issuer: 'Microsoft', title: 'Fabric Analytics Engineer Associate', detail: 'Professional certification · Aug 2026', file: 'microsoft-fabric.pdf' },
  { issuer: 'AWS', title: 'Certified Cloud Practitioner', detail: 'Professional certification · May 2024', file: 'aws-cloud-practitioner.pdf' },
  { issuer: 'ServiceNow', title: 'Certified System Administrator', detail: 'Professional certification · Jun 2025', file: 'servicenow-csa.pdf' },
  { issuer: 'Salesforce', title: 'AI Associate', detail: 'Certification earned · Oct 2024', file: 'salesforce-ai-associate.pdf' },
  { issuer: 'Automation Anywhere', title: 'Essentials RPA Professional', detail: '2023 credential edition', file: 'automation-anywhere-rpa.pdf' },
  { issuer: 'Fintech Council of India', title: 'Fintech Professional Certificate', detail: 'Blockchain, DeFi & Fintech Capstone · Jul 2024', file: 'fintech-professional.pdf' },
  { issuer: 'Amaravati Quantum Valley · Qubitech · WISER', title: 'Quantum Algorithm Fundamentals', detail: 'Six-week hands-on training · Jun 2026', file: 'quantum-training.pdf' },
];

export const badgeLinks = [
  { title: 'ServiceNow Certified System Administrator (CSA)', type: 'Professional certification', id: 'deb599a1-39cc-44c7-8cbc-36ed46b51b5b' },
  { title: 'ServiceNow Certified Application Developer (CAD)', type: 'Professional certification', id: '4a1d34c9-3ab1-4589-a7f0-4219c3b3b2bf' },
  { title: 'AWS Certified Cloud Practitioner', type: 'Professional certification', id: '8a936ff1-d674-4f2e-88e6-4a83301a8aa2' },
  { title: 'Python Essentials 1', type: 'Course badge', id: 'd6d4b1bc-7bd0-4652-958d-a35a7e3367c4' },
];

export const featuredBadge = {
  href: 'https://www.credly.com/badges/0fd5086a-913e-4836-b460-33592039d504/public_url',
  title: 'Introduction to Generative AI',
  alt: 'AWS Educate Introduction to Generative AI training badge',
};

export const internships = [
  { title: 'Cloud', date: 'Jan–Mar 2024', provider: 'Supported by AWS Academy', file: 'cloud-internship.pdf' },
  { title: 'Data Engineering', date: 'Apr–Jun 2024', provider: 'AWS Academy curriculum', file: 'data-engineering-internship.pdf' },
  { title: 'Web Full Stack Developer', date: 'Jul–Sep 2024', provider: 'Supported by EduSkills Academy', file: 'web-development-internship.pdf' },
];

export const resumes = [
  {
    tone: '#c5f82a',
    tag: 'General profile',
    title: 'Support & Software Resume',
    text: 'Professional experience, full-stack projects, cloud skills, certifications, and education in one profile.',
    href: '/documents/namburi-rakesh-general-resume.pdf',
  },
  {
    tone: '#8da2ff',
    tag: 'AI & software',
    title: 'AI Software Engineer Resume',
    text: 'AI applications, RAG, full-stack development, secure authentication, and deployed products.',
    href: '/documents/namburi-rakesh-ai-software-engineer-resume.pdf',
  },
  {
    tone: '#7be0b5',
    tag: 'DevOps & cloud',
    title: 'DevOps & AWS Resume',
    text: 'AWS serverless architecture, Terraform, CI/CD, deployment, APIs, data, and security foundations.',
    href: '/documents/namburi-rakesh-devops-aws-engineer.pdf',
  },
];

export const academics = [
  { label: 'Secondary school', value: '92.33%', text: 'Class 10 · AP Board · 2020' },
  { label: 'Intermediate', value: '64.9%', text: 'Mathematics, Physics & Chemistry · 2022' },
  { label: 'Bachelor of Technology', value: '8.99 CGPA', text: 'Computer Science & Engineering · 2022–2026' },
];

export const skillGroups = [
  { key: 'interfaces', items: ['React', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS', 'Application workflow design'] },
  { key: 'ai', items: ['Python', 'Prompt engineering', 'LLM application development', 'RAG fundamentals'] },
  { key: 'cloud_and_tools', items: ['AWS', 'Git & GitHub', 'Vercel', 'Microsoft Fabric learning and certification'] },
  { key: 'currently_exploring', items: ['RAG', 'LLMs', 'Emerging technologies'] },
];

export const community = [
  {
    kind: 'ELC / Team lead',
    title: 'Helping a team make a difference.',
    text: 'Led a team of approximately 20–25 members in college club activities promoting voting awareness and voter registration.',
    tags: 'Leadership · Teamwork · Civic awareness',
  },
  {
    kind: 'Safe Life / Member',
    title: 'Small actions. Shared responsibility.',
    text: 'Joined Safe Life in my first year and participated in community-awareness activities around health, diseases, and cleanliness.',
    tags: 'Volunteering · Health awareness · Service',
  },
];

export const marquee = [
  'Support engineering',
  'AI applications',
  'RAG & LLMs',
  'React & TypeScript',
  'AWS foundations',
  'Issue resolution',
  'Full-stack builds',
  'Always learning',
];

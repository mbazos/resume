/**
 * Canonical resume content — the single source of truth.
 *
 * Rendered by src/pages/index.astro (public resume) and fed to Gemini by the
 * private /tailor feature. Edit content here, not in the page markup.
 */

export interface SkillGroup {
  category: string;
  items: string;
}

export interface ExperienceEntry {
  title: string;
  company: string;
  location: string;
  dates: string;
  bullets: string[];
  technologies: string;
}

export interface EducationEntry {
  degree: string;
  school: string;
  location: string;
  dates: string;
  bullets: string[];
}

export interface ProjectEntry {
  name: string;
  years: string;
  description: string;
}

export interface ResumeData {
  name: string;
  tagline: string;
  contact: {
    email: string;
    github: string;
    linkedin: string;
    phone: string;
    location: string;
  };
  introduction: string;
  qualifications: string[];
  skills: SkillGroup[];
  experience: ExperienceEntry[];
  education: EducationEntry[];
  projects: ProjectEntry[];
}

export const resume: ResumeData = {
  name: 'Michael Bazos',
  tagline: 'Software Engineer, Architect & Engineering Manager',
  contact: {
    email: 'mbazos@gmail.com',
    github: 'https://github.com/mbazos/',
    linkedin: 'https://www.linkedin.com/in/mbazos',
    phone: '(413) 695-6074',
    location: 'Easton, CT (United States)',
  },
  introduction:
    'Engineering leader with 20 years of experience spanning hands-on architecture and team management — 12+ years at Priceline growing from Senior Engineer to Distinguished Engineer and Senior Director. Deep Java/JVM and cloud expertise, with a track record of building high-volume travel APIs and leading the engineering teams behind them.',
  qualifications: [
    '20 years building and operating high-volume, revenue-critical APIs in Java and the JVM ecosystem',
    'Rare IC-to-executive range: Distinguished Engineer technical credibility combined with Senior Director and Development Manager leadership experience',
    "Led Priceline's enterprise cloud migration to GCP, training 15+ teams across four language stacks",
    'Lead the JVM developer group at Priceline while mentoring engineers and authoring architectural documentation org-wide',
    'Early adopter and champion of AI-assisted development practices across engineering teams',
  ],
  skills: [
    {
      category: 'Languages & Frameworks',
      items: 'Java, Spring Boot / Spring Framework, Node.js, Python, Android',
    },
    {
      category: 'Cloud & Infrastructure',
      items: 'GCP, Docker, Kubernetes, Helm',
    },
    {
      category: 'Data & Messaging',
      items: 'Kafka, Redis, Cassandra, Oracle DB, MySQL, Lucene',
    },
    {
      category: 'Practices',
      items:
        'REST API design, high-volume distributed systems, AI-assisted development (Cursor, Gemini CLI, Cody), technical mentorship',
    },
  ],
  experience: [
    {
      title: 'Mobility Search & Book Development Manager',
      company: 'Priceline.com',
      location: 'Norwalk, CT',
      dates: 'October 2025 - Present',
      bullets: [
        'Lead a 9-engineer team spanning Android, iOS, web, and Java backend — responsible for all rental car and ground transfer products at Priceline',
        "Drive the team's approach to scaling projects across all platforms, reducing tech debt, and taking full advantage of LLM/AI development tools",
        'Established cross-platform learning so engineers can cover for one another and step outside their specialty, removing single-person dependencies',
        'Contribute hands-on code off the critical path to build trust with new team members and stay close to the challenges in the codebase',
        "Actively participate in Priceline's co-op program, training and managing co-op students alongside other direct reports",
      ],
      technologies:
        'Java, Node.js, Android, iOS, GCP, Atlassian Suite, DX, New Relic, Splunk, ClickHouse',
    },
    {
      title: 'Senior Director Rental Car Services',
      company: 'Priceline.com',
      location: 'Norwalk, CT',
      dates: 'March 2024 - October 2025 (1 year 7 months)',
      bullets: [
        'Managed the engineering team responsible for core rental car APIs supporting Priceline.com and affiliate network; partnered with business leadership to define technical strategy',
        'Championed AI-powered development tools and led an internal AI hackathon that produced customer-facing projects for review summarization and policy analysis',
        'Introduced machine-learning-based ranking of rental car search results to surface higher-converting offers',
        'Implemented supplier-data caching that reduced redundant supplier calls and sped up search responses',
      ],
      technologies:
        'Docker, Kubernetes, Java, Node.js, Kafka, Redis, Cassandra, GCP, Gemini CLI, Cody, Cursor',
    },
    {
      title: 'Distinguished Engineer Rental Car Services',
      company: 'Priceline.com',
      location: 'Norwalk, CT',
      dates: 'March 2018 - March 2024 (6 years)',
      bullets: [
        "Selected for the core group that drove Priceline's company-wide cloud migration — worked directly with engineering teams across the company to break down cloud concepts and chart migration paths for new and legacy applications",
        "Evolved Priceline's shared internal Java components so application teams could move to the cloud with minimal friction",
        'Trained 15+ teams on cloud migration across Java, JS, PHP, and Go',
        'Redesigned the rental car supplier connection architecture — a design still carrying production traffic today',
      ],
      technologies:
        'Helm Charts, Docker, Kubernetes, Java, Node.js, Kafka, Redis, Cassandra, GCP',
    },
    {
      title: 'Principal Engineer Rental Car Services',
      company: 'Priceline.com',
      location: 'Norwalk, CT',
      dates: 'March 2016 - March 2018 (2 years)',
      bullets: [
        'Technical leadership role on the Rental Car team as individual contributor',
        'Led API consolidation, supplier/affiliate onboarding, and internationalization of the rental car path',
        'Collaborated with business, product, and tech teams to prioritize work and drive growth',
      ],
      technologies:
        'REST, Java, Spring Framework, Spring Boot, Oracle DB, MySQL, Cassandra, Lucene',
    },
    {
      title: 'Senior Software Engineer Rental Car Services',
      company: 'Priceline.com',
      location: 'Norwalk, CT',
      dates: 'April 2013 - March 2016 (3 years)',
      bullets: [
        'Built and modernized high-volume foundational APIs for rental car services',
        'Delivered 20%+ quarterly business growth through impactful projects',
        'Implemented in-memory caching resulting in 25%+ reduction in API response times',
        "Won Priceline's first hackathon with innovative dual-map rental car search UI",
      ],
      technologies:
        'REST, Java, Spring Framework, Spring Boot, Oracle DB, MySQL, Cassandra, Lucene',
    },
    {
      title: 'Senior Application Developer SE&I',
      company: 'Cigna',
      location: 'Bloomfield, CT',
      dates: 'February 2011 - April 2013 (2 years)',
      bullets: [
        "Built Cigna's first native Android app with Python/Django backend; designed enterprise Java components used organization-wide",
      ],
      technologies: 'Android, Python, Django, Java, J2EE, Spring Framework, IBM WebSphere',
    },
    {
      title: 'Senior Application Developer EAS',
      company: 'Cigna',
      location: 'Bloomfield, CT',
      dates: 'January 2008 - February 2011 (3 years)',
      bullets: [
        "Major contributor to Cigna's web services initiative powering call center and website",
        'Reduced MIPS utilization by 70% through performance optimizations; received company award',
      ],
      technologies: 'Java, J2EE, Spring Framework, IBM WebSphere, SOA, SOAP, DB2, Oracle DB',
    },
    {
      title: 'Application Developer Single Sign On (SSO)',
      company: 'Cigna',
      location: 'Bloomfield, CT',
      dates: 'January 2006 - January 2008 (2 years)',
      bullets: [
        "Developed and maintained Cigna's enterprise SSO services for authentication and authorization",
      ],
      technologies: 'Java, J2EE, LDAP, Spring Framework, Hibernate, IBM WebSphere',
    },
  ],
  education: [
    {
      degree: 'B.S. Computer Science',
      school: 'Sacred Heart University',
      location: 'Fairfield, CT',
      dates: '2002 - 2006',
      bullets: [
        'Minor in Mathematics',
        'Upsilon Pi Epsilon Computer Science Honor Society Spring 2006',
        'SHU Football NCAA Division I–AA/FCS 2002-2005',
        '2004 Northeast Conference Fall Academic Honor Roll (SHU Football)',
      ],
    },
  ],
  projects: [
    {
      name: 'Volunteer Firefighter',
      years: '2022-Present',
      description:
        'Active volunteer firefighter certified in Fire Fighter I, HazMat Operations, and HazMat Awareness. Lead the technology committee managing Microsoft 365 deployment, servers, and network infrastructure. Built and maintain the department website at evfc1.com.',
    },
    {
      name: 'Suadeo',
      years: '2020-Present',
      description: 'Social network app for TV & movies built with React Native, Node.js, and Neo4j.',
    },
    {
      name: 'Multi-Platform Mobile Kids Game',
      years: '2014-2017',
      description:
        'Built a cross-platform memory game using Java, OpenGL, and custom graphics/animation systems.',
    },
    {
      name: 'OWA Mail for Android',
      years: '2015-2017',
      description: 'Native Android email client for Outlook Web Access accounts. 100k+ downloads.',
    },
    {
      name: 'Binary Clock Wallpaper',
      years: '2012',
      description:
        'A simple, efficient live wallpaper for Android. My first app published to the Play Store.',
    },
    {
      name: 'Disposable Camera App',
      years: '2012',
      description:
        'Wedding photo app with instant uploads and geofencing to validate venue proximity.',
    },
  ],
};

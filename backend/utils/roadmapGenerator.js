

const ROLE_TEMPLATES = {
  'Frontend Developer': {
    topics: ['HTML & CSS', 'JavaScript', 'React', 'State Management', 'Build Tools', 'Testing'],
    projects: ['Portfolio site', 'Todo app', 'Weather app', 'E-commerce UI', 'Dashboard', 'Social app clone'],
  },
  'Backend Developer': {
    topics: ['Node.js / Python', 'REST APIs', 'Database design', 'Authentication', 'Cloud basics', 'APM'],
    projects: ['REST API', 'Auth service', 'Blog API', 'Real-time chat', 'E-commerce API', 'Microservice'],
  },
  'Full Stack Developer': {
    topics: ['Frontend basics', 'Backend basics', 'Database', 'API design', 'Deployment', 'DevOps basics'],
    projects: ['Full CRUD app', 'Auth + Dashboard', 'Blog platform', 'E-commerce', 'Real-time app', 'SaaS MVP'],
  },
  'Data Analyst': {
    topics: ['SQL', 'Excel/Sheets', 'Python basics', 'Pandas', 'Visualization', 'Statistics'],
    projects: ['Data cleaning', 'Dashboard', 'Report automation', 'A/B analysis', 'EDA project', 'BI report'],
  },
  'UI/UX Designer': {
    topics: ['Design principles', 'Figma', 'Wireframing', 'Prototyping', 'User research', 'Design systems'],
    projects: ['Landing page', 'Mobile app UI', 'Dashboard redesign', 'Design system', 'Portfolio', 'Case study'],
  },
  'Web Developer': {
    topics: ['HTML & CSS', 'JavaScript', 'Responsive design', 'APIs', 'Hosting', 'Performance'],
    projects: ['Personal site', 'Landing page', 'Blog', 'Small business site', 'Portfolio', 'Interactive app'],
  },
  default: {
    topics: ['Core skills', 'Tools', 'Practice', 'Projects', 'Portfolio', 'Applications'],
    projects: ['Starter project', 'Portfolio', 'Real project', 'Open source', 'Freelance', 'Apply'],
  },
};

function getTemplate(role) {
  const key = Object.keys(ROLE_TEMPLATES).find(
    (k) => k.toLowerCase().includes((role || '').toLowerCase())
  );
  return ROLE_TEMPLATES[key] || ROLE_TEMPLATES.default;
}

function generateRoadmapSteps(targetRole, duration, currentSkills = []) {
  const template = getTemplate(targetRole);
  const { topics, projects } = template;
  const steps = [];
  const weeksPerStep = duration === 3 ? 2 : 4;
  const totalSteps = duration === 3 ? 6 : 6;

  for (let i = 0; i < totalSteps; i++) {
    const week = (i + 1) * weeksPerStep;
    const topic = topics[i] || topics[topics.length - 1];
    const project = projects[i] || projects[projects.length - 1];
    steps.push({
      week,
      topic,
      tasks: [
        `Study ${topic} fundamentals`,
        `Build small exercises`,
        `Start ${project} project`,
        `Document progress`,
      ],
      projectIdeas: [project, `Mini project using ${topic}`],
      jobApplicationTip:
        i >= 3
          ? `Consider applying to ${duration === 3 ? 'internships' : 'junior roles'} while continuing to build.`
          : 'Focus on learning; apply after Week ' + (weeksPerStep * 4) + '.',
    });
  }

  return steps;
}

module.exports = {
  generateRoadmapSteps,
  getTemplate,
};

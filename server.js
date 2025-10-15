const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3002;

// Middleware
app.use(cors());
app.use(express.json());

// ========================================
// BASE DE DATOS EN MEMORIA PARA CV
// ========================================

// Experiencias laborales
let experiences = [
  {
    id: 1,
    company: "Hospital Veterinario",
    position: "Asistente Veterinario",
    period: "2022 - 2023",
    description: "Trabajé en diferentes áreas del hospital veterinario realizando diversas tareas de apoyo al equipo médico y administrativo.",
    technologies: ["Sistemas de gestión veterinaria", "Equipos médicos básicos"],
    achievements: ["Asistencia en consultas veterinarias", "Cuidado y alimentación de animales hospitalizados", "Limpieza y mantenimiento de instalaciones", "Apoyo en procedimientos médicos básicos", "Atención al cliente y gestión de citas", "Inventario de medicamentos y suministros"]
  },
  {
    id: 2,
    company: "Torneo de Tenis Nacional",
    position: "Recogebolas",
    period: "2023",
    description: "Participé como recogebolas en un torneo de tenis nacional, desarrollando habilidades de trabajo en equipo y bajo presión.",
    technologies: ["Equipos de comunicación", "Sistemas de puntuación"],
    achievements: ["Recolección rápida y eficiente de pelotas durante los partidos", "Coordinación con otros recogebolas para mantener el ritmo del juego", "Atención a las señales de los árbitros y jugadores", "Mantenimiento del orden y limpieza de la cancha", "Trabajo en equipo bajo condiciones de presión", "Respeto por las reglas y protocolos del torneo"]
  }
];

// Educación
let education = [
  {
    id: 1,
    institution: "Universidad Francisco Marroquín",
    degree: "Computer Science",
    period: "2024 - 2027",
    description: "Estudiante de Ciencias de la Computación",
    gpa: "3.8",
    courses: ["Algoritmos", "Estructuras de Datos", "Base de Datos", "Desarrollo Web"]
  }
];

// Habilidades con niveles
let skills = [
  {
    id: 1,
    name: "Angular",
    category: "Frontend",
    level: "Avanzado",
    percentage: 85,
    description: "Framework de desarrollo web"
  },
  {
    id: 2,
    name: "TypeScript",
    category: "Lenguaje",
    level: "Intermedio",
    percentage: 75,
    description: "Lenguaje de programación tipado"
  },
  {
    id: 3,
    name: "JavaScript",
    category: "Lenguaje",
    level: "Avanzado",
    percentage: 90,
    description: "Lenguaje de programación web"
  },
  {
    id: 4,
    name: "CSS/SCSS",
    category: "Frontend",
    level: "Intermedio",
    percentage: 70,
    description: "Estilos y diseño web"
  },
  {
    id: 5,
    name: "Node.js",
    category: "Backend",
    level: "Intermedio",
    percentage: 65,
    description: "Runtime de JavaScript para backend"
  }
];

// ========================================
// RUTAS PRINCIPALES
// ========================================

app.get('/', (req, res) => {
  res.json({
    message: 'API del CV de Matías Arroyo',
    version: '1.0.0',
    endpoints: {
      experiences: '/experiences',
      education: '/education', 
      skills: '/skills'
    }
  });
});

// ========================================
// EXPERIENCIAS LABORALES
// ========================================

// GET /experiences - Ver todas las experiencias
app.get('/experiences', (req, res) => {
  res.json(experiences);
});

// GET /experiences/:id - Ver una experiencia específica
app.get('/experiences/:id', (req, res) => {
  const id = Number(req.params.id);
  const experience = experiences.find(e => e.id === id);

  if (!experience) {
    return res.status(404).json({ error: 'Experiencia no encontrada' });
  }

  res.json(experience);
});

// POST /experiences - Crear una nueva experiencia
app.post('/experiences', (req, res) => {
  const { company, position, period, description, technologies, achievements } = req.body;

  if (!company || !position || !period) {
    return res.status(422).json({ 
      error: 'Los campos "company", "position" y "period" son obligatorios' 
    });
  }

  const newId = Math.max(0, ...experiences.map(e => e.id)) + 1;
  const newExperience = {
    id: newId,
    company,
    position,
    period,
    description: description || '',
    technologies: technologies || [],
    achievements: achievements || []
  };

  experiences.push(newExperience);
  res.status(201).json(newExperience);
});

// PATCH /experiences/:id - Actualizar una experiencia
app.patch('/experiences/:id', (req, res) => {
  const id = Number(req.params.id);
  const experience = experiences.find(e => e.id === id);

  if (!experience) {
    return res.status(404).json({ error: 'Experiencia no encontrada' });
  }

  const { company, position, period, description, technologies, achievements } = req.body;

  if (company !== undefined) experience.company = company;
  if (position !== undefined) experience.position = position;
  if (period !== undefined) experience.period = period;
  if (description !== undefined) experience.description = description;
  if (technologies !== undefined) experience.technologies = technologies;
  if (achievements !== undefined) experience.achievements = achievements;

  res.json(experience);
});

// DELETE /experiences/:id - Eliminar una experiencia
app.delete('/experiences/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = experiences.findIndex(e => e.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Experiencia no encontrada' });
  }

  const deletedExperience = experiences.splice(index, 1)[0];
  res.json(deletedExperience);
});

// ========================================
// EDUCACIÓN
// ========================================

// GET /education - Ver toda la educación
app.get('/education', (req, res) => {
  res.json(education);
});

// GET /education/:id - Ver una educación específica
app.get('/education/:id', (req, res) => {
  const id = Number(req.params.id);
  const edu = education.find(e => e.id === id);

  if (!edu) {
    return res.status(404).json({ error: 'Educación no encontrada' });
  }

  res.json(edu);
});

// POST /education - Crear una nueva educación
app.post('/education', (req, res) => {
  const { institution, degree, period, description, gpa, courses } = req.body;

  if (!institution || !degree || !period) {
    return res.status(422).json({ 
      error: 'Los campos "institution", "degree" y "period" son obligatorios' 
    });
  }

  const newId = Math.max(0, ...education.map(e => e.id)) + 1;
  const newEducation = {
    id: newId,
    institution,
    degree,
    period,
    description: description || '',
    gpa: gpa || '',
    courses: courses || []
  };

  education.push(newEducation);
  res.status(201).json(newEducation);
});

// PATCH /education/:id - Actualizar una educación
app.patch('/education/:id', (req, res) => {
  const id = Number(req.params.id);
  const edu = education.find(e => e.id === id);

  if (!edu) {
    return res.status(404).json({ error: 'Educación no encontrada' });
  }

  const { institution, degree, period, description, gpa, courses } = req.body;

  if (institution !== undefined) edu.institution = institution;
  if (degree !== undefined) edu.degree = degree;
  if (period !== undefined) edu.period = period;
  if (description !== undefined) edu.description = description;
  if (gpa !== undefined) edu.gpa = gpa;
  if (courses !== undefined) edu.courses = courses;

  res.json(edu);
});

// DELETE /education/:id - Eliminar una educación
app.delete('/education/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = education.findIndex(e => e.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Educación no encontrada' });
  }

  const deletedEducation = education.splice(index, 1)[0];
  res.json(deletedEducation);
});

// ========================================
// HABILIDADES
// ========================================

// GET /skills - Ver todas las habilidades
app.get('/skills', (req, res) => {
  res.json(skills);
});

// GET /skills/:id - Ver una habilidad específica
app.get('/skills/:id', (req, res) => {
  const id = Number(req.params.id);
  const skill = skills.find(s => s.id === id);

  if (!skill) {
    return res.status(404).json({ error: 'Habilidad no encontrada' });
  }

  res.json(skill);
});

// POST /skills - Crear una nueva habilidad
app.post('/skills', (req, res) => {
  const { name, category, level, percentage, description } = req.body;

  if (!name || !category || !level) {
    return res.status(422).json({ 
      error: 'Los campos "name", "category" y "level" son obligatorios' 
    });
  }

  if (percentage < 0 || percentage > 100) {
    return res.status(422).json({ 
      error: 'El porcentaje debe estar entre 0 y 100' 
    });
  }

  const newId = Math.max(0, ...skills.map(s => s.id)) + 1;
  const newSkill = {
    id: newId,
    name,
    category,
    level,
    percentage: Number(percentage) || 0,
    description: description || ''
  };

  skills.push(newSkill);
  res.status(201).json(newSkill);
});

// PATCH /skills/:id - Actualizar una habilidad
app.patch('/skills/:id', (req, res) => {
  const id = Number(req.params.id);
  const skill = skills.find(s => s.id === id);

  if (!skill) {
    return res.status(404).json({ error: 'Habilidad no encontrada' });
  }

  const { name, category, level, percentage, description } = req.body;

  if (name !== undefined) skill.name = name;
  if (category !== undefined) skill.category = category;
  if (level !== undefined) skill.level = level;
  if (percentage !== undefined) {
    if (percentage < 0 || percentage > 100) {
      return res.status(422).json({ 
        error: 'El porcentaje debe estar entre 0 y 100' 
      });
    }
    skill.percentage = Number(percentage);
  }
  if (description !== undefined) skill.description = description;

  res.json(skill);
});

// DELETE /skills/:id - Eliminar una habilidad
app.delete('/skills/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = skills.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Habilidad no encontrada' });
  }

  const deletedSkill = skills.splice(index, 1)[0];
  res.json(deletedSkill);
});

// ========================================
// MANEJO DE ERRORES
// ========================================

// Ruta no encontrada (404)
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// ========================================
// INICIAR SERVIDOR
// ========================================

app.listen(PORT, () => {
  console.log(`🚀 API del CV escuchando en http://localhost:${PORT}`);
  console.log(`📋 Endpoints disponibles:`);
  console.log(`   GET    /                    - Información de la API`);
  console.log(`   GET    /experiences         - Ver todas las experiencias`);
  console.log(`   GET    /experiences/:id     - Ver una experiencia específica`);
  console.log(`   POST   /experiences         - Crear una nueva experiencia`);
  console.log(`   PATCH  /experiences/:id    - Actualizar una experiencia`);
  console.log(`   DELETE /experiences/:id    - Eliminar una experiencia`);
  console.log(`   GET    /education          - Ver toda la educación`);
  console.log(`   GET    /education/:id     - Ver una educación específica`);
  console.log(`   POST   /education         - Crear una nueva educación`);
  console.log(`   PATCH  /education/:id    - Actualizar una educación`);
  console.log(`   DELETE /education/:id    - Eliminar una educación`);
  console.log(`   GET    /skills            - Ver todas las habilidades`);
  console.log(`   GET    /skills/:id        - Ver una habilidad específica`);
  console.log(`   POST   /skills            - Crear una nueva habilidad`);
  console.log(`   PATCH  /skills/:id        - Actualizar una habilidad`);
  console.log(`   DELETE /skills/:id        - Eliminar una habilidad`);
});

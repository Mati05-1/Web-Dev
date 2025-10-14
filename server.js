const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Base de datos en memoria
let projects = [
  { id: 1, name: 'CV en Angular', stars: 5 },
  { id: 2, name: 'Juego de Memoria', stars: 4 }
];

// Rutas
app.get('/', (req, res) => {
  res.send('¡Hola, mundo de mi API!');
});

// GET /projects - Ver todos los proyectos
app.get('/projects', (req, res) => {
  res.json(projects);
});

// GET /projects/:id - Ver un proyecto específico
app.get('/projects/:id', (req, res) => {
  const id = Number(req.params.id);
  const project = projects.find(p => p.id === id);
  
  if (!project) {
    return res.status(404).json({ error: 'Proyecto no encontrado' });
  }
  
  res.json(project);
});

// POST /projects - Crear un nuevo proyecto
app.post('/projects', (req, res) => {
  const { name, stars } = req.body;
  
  if (!name) {
    return res.status(422).json({ error: 'El campo "name" es obligatorio' });
  }
  
  const newId = Math.max(0, ...projects.map(p => p.id)) + 1;
  const newProject = { 
    id: newId, 
    name: name, 
    stars: Number(stars) || 0 
  };
  
  projects.push(newProject);
  res.status(201).json(newProject);
});

// PATCH /projects/:id - Actualizar un proyecto
app.patch('/projects/:id', (req, res) => {
  const id = Number(req.params.id);
  const project = projects.find(p => p.id === id);
  
  if (!project) {
    return res.status(404).json({ error: 'Proyecto no encontrado' });
  }

  const { name, stars } = req.body;
  
  if (name !== undefined) project.name = name;
  if (stars !== undefined) project.stars = Number(stars);

  res.json(project);
});

// DELETE /projects/:id - Eliminar un proyecto
app.delete('/projects/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = projects.findIndex(p => p.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Proyecto no encontrado' });
  }
  
  const deletedProject = projects.splice(index, 1)[0];
  res.json(deletedProject);
});

app.listen(PORT, () => {
  console.log(`🚀 API escuchando en http://localhost:${PORT}`);
  console.log(`📋 Endpoints disponibles:`);
  console.log(`   GET    /projects     - Ver todos los proyectos`);
  console.log(`   GET    /projects/:id - Ver un proyecto específico`);
  console.log(`   POST   /projects     - Crear un nuevo proyecto`);
  console.log(`   PATCH  /projects/:id - Actualizar un proyecto`);
  console.log(`   DELETE /projects/:id - Eliminar un proyecto`);
});

# API del CV - Matías Arroyo

Una API REST desarrollada con Node.js y Express para gestionar datos del CV personal, incluyendo experiencias laborales, educación, habilidades y testimonios.

## 🚀 Características

- **CRUD Completo**: Operaciones Create, Read, Update, Delete para todas las entidades
- **Validaciones**: Validación de campos obligatorios y rangos de datos
- **CORS Activado**: Permite peticiones desde cualquier origen
- **Respuestas JSON**: Todas las respuestas en formato JSON
- **Códigos de Estado**: Manejo correcto de códigos HTTP (200, 201, 404, 422)
- **Base de Datos en Memoria**: Almacenamiento temporal usando arrays JavaScript

## 🛠️ Tecnologías Utilizadas

- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web para Node.js
- **CORS** - Middleware para permitir peticiones cross-origin
- **Nodemon** - Herramienta de desarrollo para reinicio automático

## 📋 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 18 o superior)
- npm

### Pasos para ejecutar

1. **Instalar dependencias**
   ```bash
   npm install
   ```

2. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

3. **El servidor estará disponible en**
   ```
   http://localhost:3002
   ```

## 📚 Endpoints Disponibles

### Información General
- `GET /` - Información de la API y endpoints disponibles

### Experiencias Laborales
- `GET /experiences` - Obtener todas las experiencias
- `GET /experiences/:id` - Obtener una experiencia específica
- `POST /experiences` - Crear una nueva experiencia
- `PATCH /experiences/:id` - Actualizar una experiencia
- `DELETE /experiences/:id` - Eliminar una experiencia

### Educación
- `GET /education` - Obtener toda la educación
- `GET /education/:id` - Obtener una educación específica
- `POST /education` - Crear una nueva educación
- `PATCH /education/:id` - Actualizar una educación
- `DELETE /education/:id` - Eliminar una educación

### Habilidades
- `GET /skills` - Obtener todas las habilidades
- `GET /skills/:id` - Obtener una habilidad específica
- `POST /skills` - Crear una nueva habilidad
- `PATCH /skills/:id` - Actualizar una habilidad
- `DELETE /skills/:id` - Eliminar una habilidad

### Testimonios
- `GET /testimonials` - Obtener todos los testimonios
- `GET /testimonials/:id` - Obtener un testimonio específico
- `POST /testimonials` - Crear un nuevo testimonio
- `PATCH /testimonials/:id` - Actualizar un testimonio
- `DELETE /testimonials/:id` - Eliminar un testimonio

## 📖 Ejemplos de Uso

### 1. Obtener todas las experiencias
```bash
curl -X GET http://localhost:3002/experiences
```

**Respuesta exitosa (200):**
```json
[
  {
    "id": 1,
    "company": "Tech Solutions Inc",
    "position": "Frontend Developer",
    "period": "2023 - Presente",
    "description": "Desarrollo de aplicaciones web modernas usando Angular y TypeScript",
    "technologies": ["Angular", "TypeScript", "SCSS", "RxJS"],
    "achievements": ["Mejoré el rendimiento de la app en 40%", "Implementé testing automatizado"]
  }
]
```

### 2. Crear una nueva experiencia
```bash
curl -X POST http://localhost:3002/experiences \
  -H "Content-Type: application/json" \
  -d '{
    "company": "Nueva Empresa",
    "position": "Full Stack Developer",
    "period": "2024 - Presente",
    "description": "Desarrollo de aplicaciones web completas",
    "technologies": ["React", "Node.js", "MongoDB"],
    "achievements": ["Lancé 2 features principales"]
  }'
```

**Respuesta exitosa (201):**
```json
{
  "id": 3,
  "company": "Nueva Empresa",
  "position": "Full Stack Developer",
  "period": "2024 - Presente",
  "description": "Desarrollo de aplicaciones web completas",
  "technologies": ["React", "Node.js", "MongoDB"],
  "achievements": ["Lancé 2 features principales"]
}
```

### 3. Actualizar una experiencia
```bash
curl -X PATCH http://localhost:3002/experiences/1 \
  -H "Content-Type: application/json" \
  -d '{
    "position": "Senior Frontend Developer",
    "achievements": ["Mejoré el rendimiento en 50%", "Lideré el equipo de frontend"]
  }'
```

**Respuesta exitosa (200):**
```json
{
  "id": 1,
  "company": "Tech Solutions Inc",
  "position": "Senior Frontend Developer",
  "period": "2023 - Presente",
  "description": "Desarrollo de aplicaciones web modernas usando Angular y TypeScript",
  "technologies": ["Angular", "TypeScript", "SCSS", "RxJS"],
  "achievements": ["Mejoré el rendimiento en 50%", "Lideré el equipo de frontend"]
}
```

### 4. Obtener una habilidad específica
```bash
curl -X GET http://localhost:3002/skills/1
```

**Respuesta exitosa (200):**
```json
{
  "id": 1,
  "name": "Angular",
  "category": "Frontend",
  "level": "Avanzado",
  "percentage": 85,
  "description": "Framework de desarrollo web"
}
```

### 5. Crear una nueva habilidad
```bash
curl -X POST http://localhost:3002/skills \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Vue.js",
    "category": "Frontend",
    "level": "Intermedio",
    "percentage": 70,
    "description": "Framework progresivo de JavaScript"
  }'
```

## ❌ Manejo de Errores

### Error 404 - Recurso no encontrado
```bash
curl -X GET http://localhost:3002/experiences/999
```

**Respuesta de error (404):**
```json
{
  "error": "Experiencia no encontrada"
}
```

### Error 422 - Validación fallida
```bash
curl -X POST http://localhost:3002/experiences \
  -H "Content-Type: application/json" \
  -d '{
    "position": "Developer"
  }'
```

**Respuesta de error (422):**
```json
{
  "error": "Los campos \"company\", \"position\" y \"period\" son obligatorios"
}
```

### Error 422 - Rango inválido (para habilidades)
```bash
curl -X POST http://localhost:3002/skills \
  -H "Content-Type: application/json" \
  -d '{
    "name": "JavaScript",
    "category": "Lenguaje",
    "level": "Avanzado",
    "percentage": 150
  }'
```

**Respuesta de error (422):**
```json
{
  "error": "El porcentaje debe estar entre 0 y 100"
}
```

## 📊 Estructura de Datos

### Experiencia
```typescript
interface Experience {
  id: number;
  company: string;
  position: string;
  period: string;
  description: string;
  technologies: string[];
  achievements: string[];
}
```

### Educación
```typescript
interface Education {
  id: number;
  institution: string;
  degree: string;
  period: string;
  description: string;
  gpa: string;
  courses: string[];
}
```

### Habilidad
```typescript
interface Skill {
  id: number;
  name: string;
  category: string;
  level: string;
  percentage: number; // 0-100
  description: string;
}
```

### Testimonio
```typescript
interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  relationship: string;
  testimonial: string;
  rating: number; // 1-5
  contact: string;
}
```

## 🔧 Scripts Disponibles

- `npm run dev` - Ejecutar en modo desarrollo con Nodemon
- `npm start` - Ejecutar en modo producción

## 📝 Notas Importantes

- **Datos en Memoria**: Los datos se almacenan en arrays JavaScript y se pierden al reiniciar el servidor
- **CORS**: Configurado para permitir peticiones desde cualquier origen
- **Validaciones**: Todos los endpoints incluyen validaciones apropiadas
- **Códigos de Estado**: Se utilizan códigos HTTP estándar (200, 201, 404, 422)

## 🚀 Integración con Frontend

Esta API está diseñada para ser consumida por el frontend Angular del CV, proporcionando datos dinámicos para:

- Experiencias laborales
- Formación académica
- Habilidades técnicas
- Testimonios y referencias

## 👨‍💻 Autor

**Matías Arroyo**
- Estudiante de Computer Science
- Universidad Francisco Marroquín
- 2024-2027

---

*API desarrollada como parte del Entregable 10 - Desarrollo de APIs REST con Node.js y Express*
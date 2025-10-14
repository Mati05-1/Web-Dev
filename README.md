# Web-Dev - Matías Arroyo

Repositorio que contiene mis proyectos de desarrollo web.

## 📁 Proyectos Incluidos

### CV Angular
Un CV interactivo desarrollado con Angular que muestra mi experiencia, habilidades y formación académica.

#### 🚀 Características

- **Routing**: Navegación entre páginas (Biografía, Habilidades, Experiencia)
- **Rutas Anidadas**: Experiencia dividida en Trabajos y Estudios
- **Servicio Compartido**: DataService centralizado para manejo de datos
- **Pipes**: Uppercase y pipe personalizado "reverse"
- **Juego de Memoria**: Mini-juego interactivo en la sección de habilidades
- **Diseño Responsivo**: Optimizado para móviles y desktop
- **Tema Dinámico**: Cambio entre tema claro y oscuro
- **API REST**: Servidor Express con endpoints CRUD para proyectos

#### 🛠️ Tecnologías Utilizadas

- **Angular 19** - Framework principal
- **TypeScript** - Lenguaje de programación
- **Bootstrap 5** - Framework CSS
- **SCSS** - Preprocesador CSS
- **Bootstrap Icons** - Iconografía
- **Express.js** - Servidor API REST
- **Node.js** - Runtime de JavaScript

#### 📋 Estructura del Proyecto

```
src/
├── app/
│   ├── components/          # Componentes de la aplicación
│   │   ├── about/          # Página de biografía
│   │   ├── skills-page/    # Página de habilidades
│   │   ├── experience-page/ # Página principal de experiencia
│   │   ├── jobs/           # Lista de trabajos
│   │   ├── studies/        # Lista de estudios
│   │   ├── projects/       # Proyectos de GitHub
│   │   └── sports/         # Datos de NBA
│   ├── services/           # Servicios para APIs
│   │   ├── github.service.ts
│   │   └── sports.service.ts
│   ├── pipes/              # Pipes personalizados
│   │   └── reverse.pipe.ts # Pipe para invertir texto
│   ├── data.service.ts     # Servicio compartido
│   └── app.routes.ts       # Configuración de rutas
├── assets/                 # Recursos estáticos
└── server.js              # Servidor Express API
```

#### 🚀 Instalación y Ejecución

##### Prerrequisitos
- Node.js (versión 18 o superior)
- npm o yarn

##### Pasos para ejecutar

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/Mati05-1/Web-Dev.git
   cd Web-Dev/CV-angular
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar Angular en modo desarrollo**
   ```bash
   npm start
   ```

4. **Ejecutar API REST (en otra terminal)**
   ```bash
   npm run dev
   ```

5. **Abrir en el navegador**
   - Angular: http://localhost:4200
   - API REST: http://localhost:3002

#### 📱 Rutas Disponibles

- `/` o `/about` - Página de biografía
- `/skills` - Habilidades y competencias
- `/projects` - Proyectos de GitHub
- `/sports` - Datos de NBA
- `/experience/jobs` - Experiencia laboral
- `/experience/studies` - Formación académica

#### 🧪 API REST Endpoints

- `GET /projects` - Ver todos los proyectos
- `GET /projects/:id` - Ver un proyecto específico
- `POST /projects` - Crear un nuevo proyecto
- `PATCH /projects/:id` - Actualizar un proyecto
- `DELETE /projects/:id` - Eliminar un proyecto

#### 🎮 Funcionalidades Destacadas

##### Servicio Compartido (DataService)
- Centraliza todos los datos de la aplicación
- Arrays básicos: `skills` y `jobs`
- Datos detallados para componentes específicos

##### Pipes Implementados
- **Uppercase**: Para títulos en mayúsculas
- **Reverse**: Pipe personalizado que invierte el texto

##### Juego de Memoria
- Mini-juego interactivo en la sección de habilidades
- Sistema de puntuación y récords
- Almacenamiento local de mejores puntuaciones

##### Integración con APIs Externas
- **GitHub API**: Muestra proyectos reales desde GitHub
- **NBA API**: Datos de equipos, jugadores y partidos
- **API REST Personalizada**: CRUD completo para proyectos

#### 🎨 Personalización

Para personalizar el CV con tu información:

1. **Datos Personales**: Edita `src/app/components/about/about.component.ts`
2. **Habilidades**: Modifica `src/app/data.service.ts`
3. **Experiencia**: Actualiza los arrays en `DataService`
4. **Imagen**: Reemplaza `src/assets/images/foto-principal.jpg`
5. **GitHub**: Cambia el username en `src/app/services/github.service.ts`

## 📄 Licencia

Este proyecto es de uso personal y educativo.

## 👨‍💻 Autor

**Matías Arroyo**
- Estudiante de Computer Science
- Universidad Francisco Marroquín
- 2024-2027

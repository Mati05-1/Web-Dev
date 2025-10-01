# CV Angular - Matías Arroyo

Un CV interactivo desarrollado con Angular que muestra mi experiencia, habilidades y formación académica.

## 🚀 Características

- **Routing**: Navegación entre páginas (Biografía, Habilidades, Experiencia)
- **Rutas Anidadas**: Experiencia dividida en Trabajos y Estudios
- **Servicio Compartido**: DataService centralizado para manejo de datos
- **Pipes**: Uppercase y pipe personalizado "reverse"
- **Juego de Memoria**: Mini-juego interactivo en la sección de habilidades
- **Diseño Responsivo**: Optimizado para móviles y desktop
- **Tema Dinámico**: Cambio entre tema claro y oscuro

## 🛠️ Tecnologías Utilizadas

- **Angular 19** - Framework principal
- **TypeScript** - Lenguaje de programación
- **Bootstrap 5** - Framework CSS
- **SCSS** - Preprocesador CSS
- **Bootstrap Icons** - Iconografía

## 📋 Estructura del Proyecto

```
src/
├── app/
│   ├── components/          # Componentes de la aplicación
│   │   ├── about/          # Página de biografía
│   │   ├── skills-page/    # Página de habilidades
│   │   ├── experience-page/ # Página principal de experiencia
│   │   ├── jobs/           # Lista de trabajos
│   │   ├── studies/        # Lista de estudios
│   │   └── ...
│   ├── pipes/              # Pipes personalizados
│   │   └── reverse.pipe.ts # Pipe para invertir texto
│   ├── data.service.ts     # Servicio compartido
│   └── app.routes.ts       # Configuración de rutas
└── assets/                 # Recursos estáticos
```

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js (versión 18 o superior)
- npm o yarn

### Pasos para ejecutar

1. **Clonar el repositorio**
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd CV-angular
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm start
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:4200
   ```

## 📱 Rutas Disponibles

- `/` o `/about` - Página de biografía
- `/skills` - Habilidades y competencias
- `/experience/jobs` - Experiencia laboral
- `/experience/studies` - Formación académica

## 🎮 Funcionalidades Destacadas

### Servicio Compartido (DataService)
- Centraliza todos los datos de la aplicación
- Arrays básicos: `skills` y `jobs`
- Datos detallados para componentes específicos

### Pipes Implementados
- **Uppercase**: Para títulos en mayúsculas
- **Reverse**: Pipe personalizado que invierte el texto

### Juego de Memoria
- Mini-juego interactivo en la sección de habilidades
- Sistema de puntuación y récords
- Almacenamiento local de mejores puntuaciones

## 🎨 Personalización

Para personalizar el CV con tu información:

1. **Datos Personales**: Edita `src/app/components/about/about.component.ts`
2. **Habilidades**: Modifica `src/app/data.service.ts`
3. **Experiencia**: Actualiza los arrays en `DataService`
4. **Imagen**: Reemplaza `src/assets/images/foto-principal.jpg`

## 📄 Licencia

Este proyecto es de uso personal y educativo.

## 👨‍💻 Autor

**Matías Arroyo**
- Estudiante de Computer Science
- Universidad Francisco Marroquín
- 2024-2027

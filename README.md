# 🎨 Tasker Master — Frontend

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15+-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![React](https://img.shields.io/badge/React-19+-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

**Interfaz web para gestión de tareas personales. Diseño oscuro, minimalista y con animaciones fluidas.**

[Páginas](#-páginas) · [Componentes](#-componentes) · [Instalación](#-instalación-local) · [Variables de entorno](#-variables-de-entorno) · [Diseño](#-sistema-de-diseño) · [Deploy](#-deploy-en-vercel)

</div>

---

## 📋 Tabla de contenidos

- [Descripción general](#-descripción-general)
- [Arquitectura del sistema](#-arquitectura-del-sistema)
- [Stack tecnológico](#-stack-tecnológico)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Páginas](#-páginas)
- [Componentes](#-componentes)
- [Capa de servicios API](#-capa-de-servicios-api)
- [Autenticación](#-autenticación)
- [Sistema de diseño](#-sistema-de-diseño)
- [Instalación local](#-instalación-local)
- [Variables de entorno](#-variables-de-entorno)
- [Deploy en Vercel](#-deploy-en-vercel)

---

## 📖 Descripción general

El frontend de **Tasker Master** es una aplicación **Next.js 15** con App Router que ofrece:

- ✅ Registro y login de usuarios con persistencia de JWT
- ✅ Dashboard con listado de tareas, filtros, búsqueda y paginación
- ✅ Creación de tareas con prioridad, descripción y fecha límite
- ✅ Toggle de completado y eliminación directa desde la lista
- ✅ Date picker personalizado con selector de hora integrado
- ✅ Diseño oscuro premium con glassmorphism, animaciones y tipografía cuidada
- ✅ Protección de rutas mediante hook de autenticación

---

## 🏗️ Arquitectura del sistema

```
Usuario
  ↓
Frontend (Next.js — Vercel)   ← estás aquí
  ↓
Backend API (FastAPI — Render)
  ↓
Database (PostgreSQL — Supabase)
  ↓
n8n (Railway) → Telegram Bot
```

---

## 🛠️ Stack tecnológico

| Tecnología | Rol |
|---|---|
| **Next.js 15** | Framework React con App Router |
| **TypeScript** | Tipado estático |
| **Tailwind CSS** | Utilidades CSS base |
| **CSS Variables** | Sistema de diseño y theming |
| **Plus Jakarta Sans** | Tipografía principal (Google Fonts) |
| **JetBrains Mono** | Tipografía monoespaciada para datos |

---

## 📁 Estructura del proyecto

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Layout raíz: fuentes, metadata global
│   │   ├── globals.css           # Sistema de diseño completo (variables, clases)
│   │   ├── page.tsx              # Landing page — Hero, features, CTA
│   │   ├── login/
│   │   │   └── page.tsx          # Página de inicio de sesión
│   │   ├── register/
│   │   │   └── page.tsx          # Página de registro
│   │   └── dashboard/
│   │       └── page.tsx          # Dashboard principal de tareas
│   ├── components/
│   │   ├── CreateTask.tsx        # Formulario de creación de tareas
│   │   ├── DataPicker.tsx        # Date picker personalizado con hora
│   │   ├── SearchBar.tsx         # Barra de búsqueda con limpieza
│   │   └── Pagination.tsx        # Paginación con números de página
│   ├── hooks/
│   │   └── useAuth.ts            # Hook de autenticación y redirección
│   └── services/
│       └── api.ts                # Capa de comunicación con el backend
├── .env.local                    # Variables de entorno locales
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## 📄 Páginas

### 🏠 Landing page — `/`

Página de presentación del producto con:

- **Navbar** con logo, botones de "Ingresar" y "Empezar"
- **Hero** con headline, subheadline y preview interactivo de la UI
- **Sección de features** (6 tarjetas con íconos SVG)
- **CTA final** con llamado a registro
- **Footer** con links a Privacidad y Términos

---

### 🔐 Login — `/login`

Formulario de autenticación con:

- Campos de email y contraseña
- Manejo de errores con mensaje visual
- Redirección al dashboard tras login exitoso
- Persistencia del token en `localStorage` y cookie
- Soporte de teclado (`Enter` para enviar)
- Link a `/register`

---

### 📝 Registro — `/register`

Formulario de creación de cuenta con:

- Campos: nombre completo, email, contraseña y confirmación
- Validaciones de frontend: campos vacíos, contraseñas coincidentes, longitud mínima
- Redirección automática al dashboard tras registro
- Persistencia del token
- Link de vuelta a `/login`

---

### 📊 Dashboard — `/dashboard`

Panel principal protegido por autenticación. Incluye:

**Header fijo (`sticky`):**
- Logo con link al dashboard
- Contador de tareas pendientes y completadas
- Botón de cierre de sesión (limpia `localStorage` y cookie)

**Cuerpo:**
- Fecha actual formateada en español
- `SearchBar` con búsqueda en tiempo real por título/descripción
- `CreateTask` — formulario inline de creación
- Filtros de estado: Todas / Pendientes / Completadas
- Lista de `TaskCard` con animaciones escalonadas
- `Pagination` cuando hay más de 20 tareas
- Estado vacío con mensaje contextual según el filtro activo

**TaskCard:**
- Checkbox para toggle de completado (con animación de check)
- Título con tachado cuando está completado
- Badge de prioridad (Baja / Media / Alta) con colores
- Descripción con recorte en 2 líneas
- Fecha límite con color dinámico (rojo si vencida, amarillo si es en menos de 24h)
- Botón de eliminar que aparece solo al hacer hover

---

## 🧩 Componentes

### `CreateTask`

Formulario colapsable para crear tareas.

**Estado expandido** (botón "Más opciones"):
- Campo de descripción (textarea)
- `DatePicker` para fecha y hora límite

**Siempre visible:**
- Input principal de título
- Selector de prioridad (3 botones icon: ↓ ● ↑)
- Botón "Crear" con estado de carga

```tsx
<CreateTask refresh={fetchTasks} />
```

| Prop | Tipo | Descripción |
|------|------|-------------|
| `refresh` | `() => void` | Callback para recargar la lista tras crear |

---

### `DatePicker`

Selector de fecha y hora completamente personalizado. **No usa ninguna librería externa.**

Características:
- Calendario mensual navegable con flechas
- Resalta el día de hoy y el día seleccionado
- Días pasados en color atenuado
- Selector de hora con botones de incremento/decremento (minutos en pasos de 5)
- Posicionamiento inteligente: se abre hacia arriba si no hay espacio debajo
- Se cierra al hacer clic fuera
- Botón de limpieza integrado en el trigger
- Usa `position: fixed` para escapar de cualquier stacking context

```tsx
<DatePicker
  value={dueDate}
  onChange={setDueDate}
  placeholder="Fecha límite"
/>
```

| Prop | Tipo | Descripción |
|------|------|-------------|
| `value` | `string` | Fecha en formato `YYYY-MM-DDTHH:mm` |
| `onChange` | `(value: string) => void` | Callback al seleccionar |
| `placeholder` | `string` | Texto cuando no hay fecha seleccionada |

---

### `SearchBar`

Barra de búsqueda con limpieza instantánea.

- Input con ícono de lupa
- Botón ✕ visible solo cuando hay texto
- Dispara `onSearch` en cada keystroke (búsqueda en tiempo real)

```tsx
<SearchBar
  onSearch={(query) => { setSearchQuery(query); setCurrentPage(1); }}
  placeholder="Buscar por título o descripción..."
/>
```

| Prop | Tipo | Descripción |
|------|------|-------------|
| `onSearch` | `(query: string) => void` | Callback con el texto actual |
| `placeholder` | `string` | Texto placeholder del input |

---

### `Pagination`

Paginación numérica con puntos suspensivos para rangos largos.

- Se oculta automáticamente si `totalPages <= 1`
- Muestra "Mostrando X-Y de Z tareas"
- Flechas anterior/siguiente deshabilitadas en los extremos
- Lógica de puntos suspensivos para hasta N páginas

```tsx
<Pagination
  currentPage={currentPage}
  totalPages={Math.ceil(totalItems / itemsPerPage)}
  onPageChange={setCurrentPage}
  totalItems={totalItems}
  itemsPerPage={itemsPerPage}
/>
```

| Prop | Tipo | Descripción |
|------|------|-------------|
| `currentPage` | `number` | Página actual |
| `totalPages` | `number` | Total de páginas |
| `onPageChange` | `(page: number) => void` | Callback al cambiar página |
| `totalItems` | `number` | Total de ítems para mostrar el rango |
| `itemsPerPage` | `number` | Ítems por página |

---

## 🌐 Capa de servicios API

Todo el acceso al backend está centralizado en `src/services/api.ts`.

### Tipos principales

```ts
interface Task {
  id: string;
  title: string;
  description?: string;
  priority_id?: number;
  due_date?: string;
  is_completed: boolean;
  created_at?: string;
}

interface TasksResponse {
  tasks: Task[];
  total: number;
  pageSize: number;
}
```

### Funciones disponibles

| Función | Descripción |
|---------|-------------|
| `login(email, password)` | Autenticación, retorna `{ access_token }` |
| `register(email, password, name)` | Registro, retorna `{ access_token }` |
| `getTasks(token, search?, skip?, limit?)` | Lista de tareas con paginación |
| `createTask(token, task)` | Crear nueva tarea |
| `toggleTask(token, id)` | Cambiar estado completado |
| `updateTask(token, id, data)` | Actualizar campos de una tarea |
| `deleteTask(token, id)` | Eliminar tarea |

### Ejemplo de uso

```ts
import { getTasks } from "@/services/api";

const token = localStorage.getItem("token");
const data = await getTasks(token, "reporte", 0, 20);
// data.tasks → array de tareas
// data.total → total para paginación
```

---

## 🔒 Autenticación

La autenticación se maneja mediante el hook `useAuth`:

```ts
// src/hooks/useAuth.ts
export function useAuth(redirect: boolean = true) {
  // Si no hay token, redirige a /login automáticamente
}
```

El token JWT se persiste en dos lugares:

| Almacenamiento | Uso |
|---|---|
| `localStorage` | Lectura en las llamadas a la API |
| Cookie (`token`) | Disponible para middleware de Next.js (SSR/middleware) |

**Uso en páginas protegidas:**

```tsx
export default function Dashboard() {
  useAuth(); // redirige a /login si no hay sesión
  // ...
}
```

**Cierre de sesión:**

```ts
localStorage.removeItem("token");
document.cookie = "token=; path=/; max-age=0";
window.location.href = "/login";
```

---

## 🎨 Sistema de diseño

El sistema de diseño está definido completamente en `src/app/globals.css` mediante **CSS custom properties**.

### Paleta de colores

| Variable | Valor | Uso |
|----------|-------|-----|
| `--bg-primary` | `#1C1917` | Fondo principal |
| `--bg-secondary` | `#2C2825` | Fondo de tarjetas |
| `--bg-tertiary` | `#3C3835` | Hover states |
| `--bg-glass` | `rgba(28,25,23,0.7)` | Efecto glassmorphism |
| `--accent-gold` | `#CA8A04` | Color de acento principal |
| `--accent-gold-light` | `#EAB308` | Variante clara del acento |
| `--text-primary` | `#FAFAF9` | Texto principal |
| `--text-secondary` | `#A8A29E` | Texto secundario |
| `--text-tertiary` | `#78716C` | Texto atenuado |
| `--success` | `#22C55E` | Estado completado |
| `--danger` | `#EF4444` | Errores y eliminación |
| `--warning` | `#F59E0B` | Prioridad media / fechas próximas |

### Tipografía

| Variable | Fuente | Uso |
|----------|--------|-----|
| `--font-primary` | Plus Jakarta Sans | Todo el texto general |
| `--font-mono` | JetBrains Mono | Fechas, badges, datos técnicos |

### Clases de componentes reutilizables

| Clase | Descripción |
|-------|-------------|
| `.glass` | Fondo translúcido con `backdrop-filter: blur(12px)` |
| `.card` | Tarjeta con borde sutil y hover lift |
| `.card-elevated` | Tarjeta con sombra mayor (para modales y forms) |
| `.card-interactive` | Tarjeta con efecto radial en hover y cursor pointer |
| `.btn-primary` | Botón dorado con gradiente y glow |
| `.btn-secondary` | Botón glass con borde |
| `.btn-ghost` | Botón transparente |
| `.btn-icon` | Botón cuadrado para íconos |
| `.input` | Input glass con focus gold |
| `.badge` | Pastilla de etiqueta |
| `.badge-accent` | Badge dorado |
| `.badge-warning` | Badge amarillo |
| `.badge-danger` | Badge rojo |
| `.badge-success` | Badge verde |

### Animaciones disponibles

| Clase | Animación |
|-------|-----------|
| `.fade-in` | Aparición en opacidad |
| `.fade-up` | Aparición subiendo desde abajo |
| `.fade-scale` | Aparición con escala |
| `.shimmer` | Efecto skeleton loading |
| `.animate-spin` | Rotación continua (spinner) |
| `.float` | Flotación suave (loop) |
| `.glow` | Pulsación de sombra dorada |

### Efectos de fondo

```tsx
{/* Grid sutil de líneas */}
<div className="bg-grid" />

{/* Orbe de color en esquina superior */}
<div className="bg-gradient-orb top" />

{/* Orbe de color en esquina inferior */}
<div className="bg-gradient-orb bottom" />
```

---

## ⚙️ Instalación local

### Requisitos previos

- Node.js 18+
- Backend de Tasker Master corriendo (local o en Render)

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/tasker-master.git
cd tasker-master/frontend

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.local.example .env.local
# Editar .env.local con la URL de tu backend

# 4. Levantar en desarrollo
npm run dev
```

La app estará disponible en `http://localhost:3000`

### Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo con hot reload |
| `npm run build` | Build de producción |
| `npm run start` | Servidor de producción (requiere build previo) |
| `npm run lint` | Análisis de código con ESLint |

---

## 🔑 Variables de entorno

Crea un archivo `.env.local` en la raíz del frontend:

```env
# URL base del backend FastAPI
NEXT_PUBLIC_API_URL=http://localhost:8000

# En producción apuntar a Render:
# NEXT_PUBLIC_API_URL=https://tu-api.onrender.com
```

> La variable lleva el prefijo `NEXT_PUBLIC_` para que esté disponible en el cliente (browser).

---

## 🚀 Deploy en Vercel

### Pasos

1. Importa el repositorio en [Vercel](https://vercel.com)
2. Selecciona la carpeta `frontend` como **Root Directory** (si es monorepo)
3. Vercel detecta Next.js automáticamente
4. Agrega la variable de entorno en el panel de Vercel:

| Variable | Valor |
|----------|-------|
| `NEXT_PUBLIC_API_URL` | `https://tu-api.onrender.com` |

5. Deploy 🚀

> 💡 Cada push a `main` dispara un deploy automático en Vercel.

---

## 🗺️ Flujo de navegación

```
/                   ← Landing page pública
  ↓ "Empezar"
/register           ← Registro
  ↓ éxito
/dashboard          ← App principal (requiere JWT)

/                   ← Landing page pública
  ↓ "Ingresar"
/login              ← Login
  ↓ éxito
/dashboard

/dashboard          ← Sin token válido
  ↓ useAuth()
/login              ← Redirección automática
```

---

## 📱 Consideraciones de UX

- **Búsqueda en tiempo real** — cada keystroke filtra sin botón de envío
- **Paginación del servidor** — el filtro y búsqueda respetan la paginación; al buscar se resetea a página 1
- **Formato de fechas inteligente** — "Hoy, 14:00", "Mañana, 09:30" o fecha completa
- **Color de fecha dinámico** — rojo si ya venció, amarillo si vence en menos de 24h, gris si tiene margen
- **Animaciones escalonadas** — las tarjetas aparecen con delay progresivo por índice
- **Estados de carga** — skeleton shimmer mientras carga la lista; spinner en botones de acción
- **Soporte de teclado** — `Enter` en el input de nueva tarea la crea inmediatamente

---

<div align="center">

Hecho con ❤️ · **Tasker Master** © 2026

</div>

# Tasker Master – Frontend

Dark, minimalist web app for managing personal tasks, with smooth animations and JWT-based login.

**Live demo:** https://tasker-master-front.vercel.app
**Backend repo:** https://github.com/SantyHdz/tasker_master_back

## Features

- Register and log in, with the session kept between visits
- Dashboard with task list, status filters, real-time search and pagination
- Create tasks with title, description, priority and due date
- Mark tasks as complete and delete them
- Custom date and time picker built without external libraries
- Protected routes through a `useAuth` hook
- Telegram due-date reminders (sent by the backend and an n8n workflow)

## Tech stack

- Next.js 15 (App Router) and TypeScript
- Tailwind CSS with CSS custom properties for theming
- Plus Jakarta Sans and JetBrains Mono fonts
- Deployed on Vercel; talks to a FastAPI API on Render with PostgreSQL on Supabase

## Run locally

```bash
git clone https://github.com/SantyHdz/tasker_master_front.git
cd tasker_master_front
npm install
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
npm run dev
```

Open http://localhost:3000.

## Author

Santiago Hernandez – full-stack developer. [GitHub](https://github.com/SantyHdz)

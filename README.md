# UpTask Client - Project Management Frontend

UpTask Client is the React + TypeScript frontend for the UpTask platform.
It consumes the UpTask API and provides a complete user interface for managing projects, tasks, and collaborators.

The application is built around layout-based routing, lazy-loaded views for performance optimization, and TanStack React Query for server-state synchronization.

Accessibility and usability were considered throughout the UI design.

## Core Features

### Authentication UI

- Login, registration, and email confirmation flows
- Password reset screens
- Protected routes
- Token persistence with localStorage
- Logout handling

### Project Dashboard

- List of projects owned or shared
- Manager vs collaborator badges
- Create and edit projects
- Team management view

### Task Board

- Kanban-style workflow columns
- Drag & drop tasks between states
- Task detail modals
- Edit and delete task actions
- Real-time UI updates via cache invalidation

### Frontend Architecture

- Layout routes for authenticated vs unauthenticated sections
- Modular routing files
- Lazy loaded views
- Centralized Axios client
- Zod schema validation
- Toast notifications
- Accessible menus and dialogs

## Technologies Used

- React
- TypeScript
- React Router
- TanStack React Query
- Axios
- Zod
- TailwindCSS
- Headless UI
- dnd-kit
- Brevo (email delivery)

## Key Technologies Explained

[TanStack React Query](https://tanstack.com/query/latest/docs/framework/react/overview) manages server data, caching, and synchronization.

[Zod](https://zod.dev/) validates API payloads at runtime.

[dnd-kit](https://docs.dndkit.com/) provides drag-and-drop without sacrificing accessibility.

## Authentication & Email Verification

UpTask uses a production-ready transactional email system powered by [Brevo SMTP](https://app.brevo.com/).

Users can:

- Register with a real email address
- Receive an account-confirmation token
- Reset their password via email
- Complete the full authentication flow without cloning the repository

Brevo is configured with a free tier suitable for demos and portfolio projects.

All emails are delivered through [Brevo](https://app.brevo.com/), allowing external users to test the platform end-to-end directly from the deployed application.

## Demo Accounts (Optional)

| Name  | Email         | Password |
| ----- | ------------- | -------- |
| Flor  | flor@test.com | codecode |
| Tino  | tino@test.com | tinotino |
| Mauri | mau@test.com  | password |

These accounts are provided for convenience only.
New users can freely register with their own email addresses.

## Production - Ready Infrastructure

- Frontend deployed on Vercel
- Backend deployed on Render
- MongoDB Atlas for persistence
- Brevo SMTP for transitional emails
- JWT-based authentication

## Backend Integration

This frontend is directly connected to the backend repository at: [UpTask Server](https://github.com/wichofly/upTask-server)

## Deployment

Frontend:
Project deployed at Vercel: [UpTask Client](https://up-task-client-two.vercel.app)

# UpTask Client - Project Management Frontend

UpTask Client is the React + TypeScript frontend for the UpTask platform.
It consumes the UpTask API and provides a complete UI for managing projects, tasks, and collaborators.

The application uses layout-based routing, lazy-loaded views for performance optimization, and React Query for server-state synchronization.

The UI is designed with accessibility and usability in mind.

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

## Key Technologies Explained

[React Query](https://tanstack.com/query/latest/docs/framework/react/overview) manages server data, caching, and synchronization.

[Zod](https://zod.dev/) validates API payloads at runtime.

[dnd-kit](https://docs.dndkit.com/) provides drag-and-drop without sacrificing accessibility.

## Demo Accounts

| Name  | Email         | Password |
| ----- | ------------- | -------- |
| Flor  | flor@test.com | codecode |
| Tino  | tino@test.com | tinotino |
| Mauri | mau@test.com  | password |

These accounts already exist in the database and can be used to log in immediately. **They are intended for demonstration purposes only and contain no real data**.

#### Why Demo Accounts Are Provided?

The application uses Nodemailer with [Ethereal](https://ethereal.email/) for transactional emails during development (account confirmation and password recovery).
Since Ethereal inboxes are generated dynamically per environment, users who only visit the deployed site would not be able to receive confirmation codes unless they run the project locally.

Providing demo accounts allows reviewers to access the platform and test all core features without cloning the repository.

#### Local Testing

If you clone and run the project locally, you can register new users and view email previews directly in the backend logs via Ethereal.

## Backend Integration

This frontend is directly connected to the backend repository at: [UpTask Server](https://github.com/wichofly/upTask-server)

## Deployment

Frontend:
Project deployed at Vercel: [UpTask Client](https://up-task-client-two.vercel.app)

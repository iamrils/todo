# Product Requirement Document (PRD) for TodoProject

## Authentication & Todo List Web Application

---

## 1. Objective

The purpose of this skill test is to evaluate the candidate’s ability in:

- Fullstack Web Development (Frontend & Backend)
- Code structure, readability, and quality
- Application architecture and separation of concerns
- Technical decision-making and problem-solving approach

---

## 2. Overview

Develop a **web-based Authentication and Todo List application** using **Next.js** as both frontend and backend.

The application must support:

- User authentication
- Full CRUD functionality for Todo items
- Protected routes and APIs accessible only by authenticated users

---

## 3. Mandatory Tech Stack

| Category       | Technology         |
| -------------- | ------------------ |
| Framework      | Next.js (React)    |
| Database       | PostgreSQL         |
| ORM            | Prisma             |
| Authentication | withAuth (Next.js) |
| Data Fetching  | TanStack Query     |
| Table          | TanStack Table     |
| Styling        | Tailwind CSS       |
| UI Components  | shadcn/ui          |

---

## 4. Functional Requirements

### 4.1 UI Components & Styling

- Use **shadcn/ui** for all UI components
- Use **Tailwind CSS** for styling
- UI must be clean, consistent, and responsive

---

### 4.2 Authentication

- Users must be able to:
  - Login
  - Logout
- Todo-related pages and APIs must:
  - Be accessible **only to authenticated users**
- Use **Next.js middleware** to:
  - Protect pages
  - Protect API routes

---

### 4.3 Todo CRUD Features

All Todo operations must use **TanStack Query** for data fetching and mutation.

#### Create Todo

- Implemented on a **dedicated page**
- Uses a reusable form component

#### Read Todo (Detail)

- Implemented on a **dedicated detail page**
- Fetch todo detail using TanStack Query

#### Update Todo

- Implemented on a **dedicated page**
- Reuse the same component used for creating a todo

#### Delete Todo

- Must show a **confirmation dialog** before deletion

---

### 4.4 Todo List Page

- Fetch todo list using **TanStack Query**
- Display data using **TanStack Table**

#### Required Features:

- Pagination
- Page navigation
- Filtering

---

### 4.5 Reusable Component Requirement

- A **single reusable form component** must be used for:
  - Creating a todo
  - Updating a todo

---

### 4.6 State Management (Todo Detail)

- Use Zustand
- please explain **must be explained and justified in the README**

---

## 5. Backend Requirements

- Backend must be implemented using **Next.js**
- Use **PostgreSQL** as the database
- Use **Prisma ORM** for database access
- Project structure must be:
  - Clean
  - Well-organized
  - Easy to understand

### Database Seeding

- Provide **at least 20 seeded Todo records**
- Purpose:
  - Support pagination
  - Support filtering features

---

## 6. README Requirements (Mandatory)

The `README.md` must include:

- Project setup and run instructions
- Required environment variables
- Brief explanation of application architecture
- Explanation and justification of:
  - Chosen state management solution
  - Key technical decisions

---

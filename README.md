# Campus Repo

> Learn. Share. Grow.

Campus Repo is a student-focused academic resource platform designed to help students discover academic courses, access question papers, contribute learning resources, save useful materials, and participate in academic leaderboards.

The current version is a **frontend prototype** built with HTML, CSS, and JavaScript. It uses browser `localStorage` for demo authentication, user information, library items, notifications, contributions, votes, and leaderboard-related data.

The project is designed with a future **Django + Django REST Framework (DRF)** backend in mind.

---

# 📌 Table of Contents

- [Project Overview](#-project-overview)
- [Current Project Status](#-current-project-status)
- [Main Features](#-main-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [How the Application Works](#-how-the-application-works)
- [User Flow](#-user-flow)
- [Installation and Setup](#-installation-and-setup)
- [Running the Project](#-running-the-project)
- [Demo Mode](#-demo-mode)
- [Important JavaScript Files](#-important-javascript-files)
- [Page Description](#-page-description)
- [Academic Data System](#-academic-data-system)
- [Local Storage System](#-local-storage-system)
- [Navigation and Routing](#-navigation-and-routing)
- [Shared UI System](#-shared-ui-system)
- [Contribution System](#-contribution-system)
- [My Library](#-my-library)
- [Leaderboard](#-leaderboard)
- [Notifications](#-notifications)
- [Route Validation](#-route-validation)
- [How to Add a New Page](#-how-to-add-a-new-page)
- [How to Add a New University](#-how-to-add-a-new-university)
- [How to Add a New Academic Category](#-how-to-add-a-new-academic-category)
- [Backend Integration Plan](#-backend-integration-plan)
- [Production Considerations](#-production-considerations)
- [Git and GitHub Workflow](#-git-and-github-workflow)
- [Troubleshooting](#-troubleshooting)
- [Future Development](#-future-development)

---

# 📚 Project Overview

Campus Repo is intended to become a centralized learning platform where students can:

- Find academic learning resources
- Browse academic courses
- Access campus question papers
- Save resources to a personal library
- Contribute useful learning materials
- View their contributions
- Participate in a contribution/leaderboard system
- Receive notifications
- Manage their academic profile
- Search and use resources according to their educational institution and study level

The platform is designed to support multiple education categories such as:

- University
- Medical
- Polytechnic
- National University
- School
- College

The academic structure is controlled centrally through JavaScript data so that institution, department, study-level, and related academic information can be reused throughout the application.

---

# 🚧 Current Project Status

## Current Version

The current project is a:

**Frontend Prototype / UI Prototype**

It currently uses:

- HTML
- CSS
- Vanilla JavaScript
- Browser Local Storage

There is currently **no production backend connected**.

Authentication, user information, contributions, library items, notifications, votes, and similar data are currently simulated through browser storage.

---

# ✨ Main Features

## 1. Authentication

The project includes:

- Login
- Registration
- Google Login prototype
- Email verification prototype
- Forgot password
- Reset password
- Logout

Authentication is currently implemented in demo mode.

---

## 2. Student Profile Setup

After registration/login, users can complete their academic profile.

The profile system supports:

- Country
- Study Level
- Institution
- Department
- Board
- Class
- Course
- Medical University
- Medical College

The available fields depend on the selected education category.

---

## 3. Academic Courses

Students can browse academic courses based on their academic information.

The application contains centralized academic data that can be used by:

- Academic Courses
- Question Bank
- Contribution
- Leaderboard
- Profile
- Settings

---

## 4. Campus Question Bank

The Question Bank is designed to provide students with academic question papers and related resources.

Students can:

- Browse question papers
- Open question paper details
- Save useful question papers
- Access saved materials through My Library

---

## 5. Contribution System

Students can contribute learning resources to the platform.

The contribution system is intended to support academic resource sharing.

A contribution can contain information such as:

- Academic category
- Institution
- Department
- Course
- Resource title
- Resource type
- Resource link/file
- Description

---

## 6. My Contributions

Students can view resources they have contributed.

This provides a personal contribution history.

---

## 7. My Library

Students can save useful resources.

The library system supports saved items such as:

- Question papers
- Other learning resources

Saved resources are stored locally in demo mode.

---

## 8. Leaderboard

The project contains a leaderboard system designed around student contributions and points.

The leaderboard can be used to display:

- Student name
- Points
- Contribution count
- Ranking

The current data is demo/local-storage based.

---

## 9. Notifications

The platform includes a notification system.

Notifications can be displayed in the navigation bar and notification page.

Unread notification counts are also supported.

---

## 10. Profile and Settings

Students can:

- View profile
- Manage academic information
- Manage account settings
- Log out

---

# 🛠 Technology Stack

## Frontend

- HTML5
- CSS3
- JavaScript (Vanilla JS)

## UI

- Custom CSS
- Font Awesome icons
- Google Fonts

## Storage

Current prototype:

```text
Browser localStorage

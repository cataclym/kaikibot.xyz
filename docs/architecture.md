# Project Architecture

This document provides an overview of the project's architecture, including the frontend, backend, and the custom authentication system.

## Overview

The project is a modern web application built with [SvelteKit](https://kit.svelte.dev/), a full-stack framework for Svelte. The application is designed to be a dashboard for managing a Discord bot, providing features like server configuration, an embed builder, and command exploration.

The project uses the following technologies:
*   **Frontend**: [Svelte](https://svelte.dev/) with [Tailwind CSS](https://tailwindcss.com/) and [Flowbite](https://flowbite.com/) for styling.
*   **Backend**: A Bun server powered by [SvelteKit's](https://kit.svelte.dev/) server-side rendering (SSR) capabilities.
*   **Build Tool**: [Vite](https://vitejs.dev/) for fast development and bundling.
*   **Deployment**: The application is configured to run as a standalone Node.js server, and can be deployed using Docker with the provided `Dockerfile` and `compose.yaml`.

## Authentication System

The authentication system uses the **Auth.js** library (specifically `@auth/sveltekit`) to handle Discord OAuth2 authentication. It simplifies the login flow and session management.

### Authentication Flow

1.  **Login**: Users initiate sign-in via `signIn("discord")`.
2.  **Provider**: The application is configured with the Discord provider in `src/auth.ts`.
3.  **Callback**: Auth.js handles the OAuth2 callback, code exchange, and token retrieval automatically.
4.  **Session**: A JWT-based session is created and stored in a secure cookie. The session includes the user's Discord ID, access token, and refresh token.

### Session Management

Session management is handled by the `SvelteKitAuth` hooks.

*   **`src/auth.ts`**: This file contains the Auth.js configuration.
    *   It defines the `jwt` callback to handle token refresh logic using the `refresh_token` grant type.
    *   It defines the `session` callback to expose the `access_token` and `user.id` to the client.
*   **`src/hooks.server.ts`**: Helper hooks integrated with SvelteKit's request handling to protect routes and manage authentication state globally.

### Key Files in the Authentication System

*   **`src/auth.ts`**: The main configuration file for Auth.js, setting up the Discord provider and callbacks.
*   **`src/hooks.server.ts`**: Integrates the auth handle into SvelteKit's request lifecycle.


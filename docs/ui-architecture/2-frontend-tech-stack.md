# 2. Frontend Tech Stack

## Technology Stack Table

| Category              | Technology                   | Version            | Purpose                              | Rationale                                                                                     |
| --------------------- | ---------------------------- | ------------------ | ------------------------------------ | --------------------------------------------------------------------------------------------- |
| **Framework**         | Next.js                      | 15.4.7             | React meta-framework with App Router | Server-side rendering for SEO, excellent i18n support, optimal for content-heavy visa catalog |
| **UI Library**        | React                        | 19.1.1             | Component-based UI library           | Latest stable React with concurrent features, server components support                       |
| **State Management**  | React Built-in + URL State   | Native             | Component and URL-based state        | Minimal state needs for content-focused app, URL state for filtering/search                   |
| **Routing**           | Next.js App Router           | Native             | File-system based routing            | Perfect for `/d/{country}` structure, automatic SEO optimization                              |
| **Build Tool**        | Turbopack                    | Native             | Development bundler                  | Ultra-fast development builds, Next.js integrated                                             |
| **Styling**           | Tailwind CSS                 | 4.1.13             | Utility-first CSS framework          | Rapid development, excellent RTL support, consistent design system                            |
| **Testing**           | Jest + React Testing Library | 30.1.3 + 16.3.0    | Unit and integration testing         | Standard React testing stack, existing setup                                                  |
| **Component Library** | Custom + Headless UI         | Custom             | Reusable UI components               | Tailored to visa platform needs, accessibility-first                                          |
| **Form Handling**     | React Hook Form              | 7.x (recommended)  | Form state and validation            | Lightweight, excellent TypeScript support, minimal re-renders                                 |
| **Animation**         | Framer Motion                | 11.x (recommended) | UI animations and transitions        | React-first animations, great for destination card interactions                               |
| **Dev Tools**         | TypeScript + ESLint          | 5.9.2 + 9.35.0     | Type safety and code quality         | Strict mode enabled, existing configuration                                                   |

---

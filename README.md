# Smol Svelte + Cloudflare Worker

A super small Svelte app with a companion Cloudflare worker as a backend when you need it. It's kinda like Sveltekit, but more modular and less guided.

## 📱 Apps

#### 📂 `./api`

The API is a Cloudflare worker. This app contains all backend logic.

#### 📂 `./ui`

The UI is a Svelte app that interacts with the API.

## 🛠️ Develop

#### ⚙️ Setup UI `.env`

Create a `.env` file in `./ui` with the following.

```bash
VITE_API_URL="http://127.0.0.1:9000"
```

#### 🏃🏽‍♂️💨 Quickstart

-   `npm i`
-   `npm run dev`

#### Commands

There are a few top level commands to make development easier. Run the following commands from the root of this repo. You can run only the UI or only the API but in most cases you'll probably want to run both at once.

| Name                   | Description                   | Command               |
| ---------------------- | ----------------------------- | --------------------- |
| **Install Everything** | Install root config + UI app. | `npm i`               |
| **Install UI Only**    | Install UI Only.              | `npm i --prefix ./ui` |
| **Dev Everything**     | Run UI and API at once.       | `npm run dev`         |
| **Dev API Only**       | Run UI and API at once.       | `npm run dev:api`     |
| **Dev UI Only**        | Run UI and API at once.       | `npm run dev:ui`      |

## 🚀 CI/CD

#### Dev Branch

This is the default branch. When making a change, branch off of `dev` and make a PR of your new branch back into `dev` when ready to merge.

#### Automerge Dev

There is an included GitHub action in `./.github` that automerges `dev -> main` upon any changes to `dev`.

#### Production Branch

There is a `deployment/production` branch. Setup your hosting provider such as Cloudflare or Vercel to deploy this branch as your main production environment/domain.

#### Deploy Production

To deploy production, make a PR like `main -> deployment/production`. Since `main` stays in sync with `dev` changes, it should be up to date for when you're ready to bundle up the group of changes and deploy.

#### Staging Branch/Environment

For a staging environment you could just point a Cloudflare or Vercel deployment to `main` and this will reflect changes in `dev`. If you want more control over when staging is deployed, make a new `deployment/staging` branch, point your deployment to that, and then stage PRs of `main -> deployment/staging` as needed.

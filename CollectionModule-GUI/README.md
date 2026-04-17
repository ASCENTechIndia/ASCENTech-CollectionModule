# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Minimal Deployment Checklist

Use this checklist before deploying to any environment.

### 1) Required environment variables

| Variable | Required | Local (example) | Staging (example) | Production (example) |
|---|---|---|---|---|
| `VITE_API_BASE_URL` | Yes | `http://localhost:5000/api` | `https://staging-api.your-domain.com/api` | `https://api.your-domain.com/api` |
| `VITE_LOGIN_ENCRYPTION_KEY` | Yes | `local-dev-key-change-me` | `staging-key-from-secret-store` | `prod-key-from-secret-store` |
| `VITE_GOOGLE_MAP_PUBLIC_KEY` | If maps are used | `AIza...local` | `AIza...staging` | `AIza...production` |

Notes:
- All `VITE_` variables are bundled into frontend code by Vite. Do not treat them as backend secrets.
- Do not commit real keys to source control. Keep only sample values in documentation.

### 2) Build and validation

Run these commands in CI/CD or before manual deployment:

```bash
npm ci
npm run lint
npm run build
```

### 3) Deployment readiness checks

- Confirm the deployed app points to the correct `VITE_API_BASE_URL` for the target environment.
- Verify login works against the target backend.
- Verify dashboard pages load data without console/runtime errors.
- Verify 401 handling redirects users to login as expected.

### 4) Environment file guidance

- Local: use `.env` or `.env.local` for developer-specific values.
- Staging/Production: inject variables from your deployment platform secret manager.
- Recommended: keep a `.env.example` with placeholder values only.

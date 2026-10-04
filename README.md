# Zenith Crypto

Zenith Crypto is a Windows-friendly workspace containing a React cryptocurrency dashboard and three independent Express/Mongoose APIs. The primary application is the dashboard in `my-app/project-main`.

## Project Layout

| Directory | Purpose | Default port |
| --- | --- | --- |
| `my-app/project-main` | Main React crypto dashboard | `3000` |
| `backend` | Registration and login API | `5000` |
| `api/test-api` | Employee CRUD practice API | `8000` |
| `Project-api` | Crypto statistics API and seed script | `5000` |
| `my-app/new-app` | Independent Create React App starter | `3000` |
| `HTml` | Standalone Bootstrap example page | None |

`backend` and `Project-api` both default to port `5000`; run only one on that port at a time, or set a different `PORT` for the statistics API.

## Requirements

- Node.js 18 or newer and npm
- MongoDB running locally
- Internet access for CoinGecko and NewsAPI data
- A NewsAPI key for the news page

## Quick Start

Open separate PowerShell terminals from the repository root.

### 1. Start the authentication API

```powershell
Set-Location backend
npm install
$env:MONGODB_URI = "mongodb://localhost:27017/zenith"
$env:JWT_SECRET = "replace-with-a-long-random-secret"
npm start
```

The API is available at `http://localhost:5000`.

### 2. Start the main dashboard

```powershell
Set-Location my-app/project-main
npm install
"REACT_APP_NEWS_API_KEY=your-newsapi-key" | Set-Content .env.local
npm start
```

Open `http://localhost:3000`. The frontend uses CoinGecko directly and sends registration/login requests to `http://localhost:5000/api`.

### 3. Optional employee API

```powershell
Set-Location api/test-api
npm install
npm start
```

The employee API is available at `http://localhost:8000`.

### 4. Optional statistics API

Stop the authentication API first, or choose another port.

```powershell
Set-Location Project-api
npm install
node seed.js
$env:PORT = "5001"
node stats.js
```

The statistics endpoint is then available at `http://localhost:5001/api/stats`.

## Available Commands

Run each command inside the indicated project directory:

| Project | Install | Start | Build/test |
| --- | --- | --- | --- |
| `my-app/project-main` | `npm install` | `npm start` | `npm run build`, `npm test` |
| `my-app/new-app` | `npm install` | `npm start` | `npm run build`, `npm test` |
| `backend` | `npm install` | `npm start` | No automated test suite yet |
| `api/test-api` | `npm install` | `npm start` | No automated test suite yet |
| `Project-api` | `npm install` | `node stats.js` | Seed with `node seed.js` |

## API Reference

### Authentication API

- `POST /api/register` with `{ "username", "email", "password" }`
- `POST /api/login` with `{ "email", "password" }`

### Employee API

- `GET /empget`
- `POST /emppost` with `Empid`, `Empname`, and `Empsalary`
- `PUT /updatedata/:id`
- `DELETE /empdelete/:id`

### Statistics API

- `GET /api/stats`

## Configuration and Security

- Do not commit `.env`, `.env.local`, API keys, JWT secrets, or MongoDB credentials.
- The React news page reads `REACT_APP_NEWS_API_KEY` from `my-app/project-main/.env.local`.
- The authentication API reads `MONGODB_URI`, `JWT_SECRET`, and `PORT` from the environment.
- The current frontend calls NewsAPI from the browser. For production, move that request behind a server-side proxy so the NewsAPI key is not exposed to users.
- The local MongoDB defaults are intended for development only.

## Documentation

See [PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md) for the architecture, route inventory, data flow, known limitations, and a fuller runbook.

## Troubleshooting

- If login or registration cannot connect, verify that MongoDB and `backend` are running on port `5000`.
- If the statistics API cannot start, change its `PORT` because port `5000` is already used by the authentication API.
- If the news page is empty, verify `REACT_APP_NEWS_API_KEY` in `.env.local` and restart the React development server.
- If dependencies behave unexpectedly, remove the affected project's `node_modules` directory and run `npm install` again.

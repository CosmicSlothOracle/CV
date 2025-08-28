# CV Backend

Dieses Backend sammelt Besucherstatistiken (Anzahl, Verweildauer) für die statische CV-Webseite.

## Features

- Besucher-Tracking (Start/Ende, Verweildauer)
- REST-API für Statistiken
- Bereit für Render-Deployment

## Setup (lokal oder Render)

1. **MongoDB Atlas Account anlegen:**

   - https://www.mongodb.com/atlas/database
   - Cluster erstellen, Benutzer + Passwort anlegen
   - Connection String kopieren (z.B. `mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/cv?retryWrites=true&w=majority`)

2. **.env Datei anlegen:**

   - Im Ordner `backend/` eine `.env` mit folgendem Inhalt:
     ```
     MONGO_URL=<dein MongoDB Connection String>
     PORT=8080
     ```

3. **Lokal starten:**

   ```
   cd backend
   npm install
   npm start
   ```

4. **Deployment auf Render:**
   - Neues Web Service anlegen, GitHub-Repo verbinden
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment Variable: `MONGO_URL` setzen

## API Endpunkte

- `POST /api/track/start` → `{ sessionId }`
- `POST /api/track/end` → `{ sessionId, duration }`
- `GET /api/stats` → `{ total, avgDuration }`

## Frontend-Integration

Tracking-Snippet siehe Haupt-README oder direkt in `index.html` einfügen.

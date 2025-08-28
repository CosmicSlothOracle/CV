# CV

## Besucher-Tracking Backend

Das Backend (im Ordner `backend/`) sammelt Besucherstatistiken:

- Anzahl Besucher
- Durchschnittliche Verweildauer

### API-Endpunkte

- `POST /api/track/start` → Session starten, gibt `{ sessionId }` zurück
- `POST /api/track/end` → Session beenden, erwartet `{ sessionId, duration }`
- `GET /api/stats` → Gibt `{ total, avgDuration }` zurück

### Integration ins Frontend

Im `<head>` der `index.html` ist ein Tracking-Snippet eingebunden. Die Variable `BACKEND_URL` muss nach dem Render-Deployment auf die Backend-URL angepasst werden.

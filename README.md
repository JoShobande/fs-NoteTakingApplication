# 🗒 Notes+ API (MVP)

This is the backend for **Notes+**, a Next.js full-stack app for managing and summarizing notes.  
The Month 1 MVP focuses on foundational API patterns: validation, error envelopes, and logging.

---

## 🚀 Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Set up your environment
cp .env.example .env
# Add your MongoDB connection string and NextAuth secrets

# 3. Start dev server
npm run dev

# 4. Run tests
npx vitest run

```


🧩 API Endpoints

### GET /api/notes
Returns all notes for the authenticated user.

```json
curl -X GET http://localhost:3000/api/notes \
  -H "Authorization: Bearer <token>"
```
Example Response:
```json
{
  "data": [],
  "meta": { "count": 0, "page": 1 },
  "requestId": "abc123"
}
```
### POST /api/create
Creates a new note.
```json
curl -X POST http://localhost:3000/api/notes/create \
  -H "Content-Type: application/json" \
  -d '{"title":"Hello","noteContent":"Test note","themeColor":"bg[#6CB5DF]"}'
Example Response:
```json
{
  "data": {
    "id": "note123",
    "title": "Hello",
    "noteContent": "Test note",
    "themeColor": "bg[#6CB5DF]"
  },
  "requestId": "abc123"
}
```

🧪 Tests
This project uses Vitest and Supertest with mocked Prisma and NextAuth.

To run tests:
npx vitest run

To view detailed output:
npx vitest --reporter verbose

## 🧭 References

- [API Contract](docs/api-notes-v1.md)
- [Prisma Schema](prisma/schema.prisma)

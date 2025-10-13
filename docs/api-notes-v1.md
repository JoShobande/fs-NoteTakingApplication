# 📄 Notes API Contract (v1)

## Overview
This API powers the Notes application.  
It provides endpoints for creating and retrieving notes, with standardized error handling and logging.  
Future versions will extend this to include update, delete, and AI-powered features.

---

## Resources
- **Notes**: user-created notes (title, content, metadata)
- **Users**: authentication context (not yet implemented)
- **AI Summarize**: (planned for later)

---

## Endpoints

### GET /notes
Retrieve all notes for the authenticated user sorted by newest first.

**Request**
- Method: `GET`
- Headers: `Authorization: Bearer <token>`
- Query params: 
  | name     | type    | description                              |
| -------- | ------- | ---------------------------------------- |
| `limit`  | number? | optional max number to return            |
| `search` | string? | optional keyword filter in title/content |


**Response 200 (Success)**
```json
{
  "data": [
    { 
        "id": 1, 
        "title": "First Note", 
        "noteContent": "This is my note", 
        "themeColor": "bg-[#6CB5DF]", 
        "createdAt": "2025-07-02T13:13:33.949+00:00",
        "updatedAt": "2025-07-10T15:30:26.581+00:00",
        "trash":false,
        "archived":false,
        "folderId": null,
        "deletedAt": "2025-07-10T15:11:43.805+00:00"
    }
  ],
  "meta":{
        "count": 1,
        "page": 1
    },
  "requestId": "abc123"
}
```

**Response 200 (Empty)**
```json
{
  "data": [],
  "meta": { "count": 0, "page": 1 },
  "requestId": "abc123"
}
```

**Response 401 
```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "You must be logged in to access this resource"
  },
  "requestId": "abc123"
}


```
### POST /notes

Create a new note for an authenticated user

**Request**
- Method: `POST`
- Body
``` json
{
  "title": "Meeting Notes",
  "noteContent": "Discussion summary goes here",
  "themeColor": "bg-[#6CB5DF]",
  "userId": "1234455666fdgdsgs"
}
```
**Response 201 (Created)**
```json
{
  "data": { 
      "id": 2, 
      "title": "Meeting Notes", 
      "noteContent": "Discussion summary goes here", 
      "themeColor":"bg-[#6CB5DF]",
      "folderId": null,
      "trash": false,
      "archived": false,
      "createdAt": "2025-10-13T12:00:00Z",
      "updatedAt": "2025-10-13T12:00:00Z"
    },
  "requestId": "def456"
}

```

**Response 400 (Validation error)**
```json
{
  "error": {
    "code": "BAD_REQUEST",
    "message": "Validation failed",
    "details": [
      { "path": "themeColor", "message": "Theme color is required" }
    ]
  },
  "requestId": "abc123"
}
```
**Response 401 (UnAuthorized)**
```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "You must be logged in to create a note"
  },
  "requestId": "abc123"
}
```
**Response 500 (Server error)**
```json
{
  "success": false,
  "code": "INTERNAL_ERROR",
  "message": "Unexpected server error",
  "requestId": "def456"
}


```






Error Envelope (standard for all errors)
All errors returned by the API follow this format:
```json
{
  "success": false,
  "code": "ERROR_CODE",
  "message": "Human-readable message",
  "requestId": "unique-id"
}





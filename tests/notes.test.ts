vi.mock("../src/lib/prismadb", () => {
  return {
    default: {
      notes: {
        create: vi.fn(),
        findMany: vi.fn(),
      },
    },
  };
});


vi.mock("next-auth", () => ({
  getServerSession: vi.fn(),
}));


import { describe, it, expect, beforeEach, vi } from "vitest";
import { POST } from "../src/app/api/notes/create/route";
import { getServerSession } from "next-auth";
import prismadb from "../src/lib/prismadb";


describe("POST /api/notes/create", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("returns 201 when note is created successfully", async () => {
    (getServerSession as any).mockResolvedValue({
      user: { id: "65123456789abcdef012345", email: "test@example.com" },
  });

   (prismadb.notes.create as any).mockResolvedValue({
      id: "note1",
      title: "My Note",
      noteContent: "Some content",
      themeColor: "bg[#6CB5DF]",
      userId: "65123456789abcdef012345",
      createdAt: new Date(),
      updatedAt: new Date(),
      trash: false,
      archived: false,
      folderId: null,
      deletedAt: null,
    });
    // Simulate a valid body
    const body = {
      title: "Test Note",
      noteContent: "This is my test note content",
      themeColor: "bg[#6CB5DF]",
      userId: '651'
    };

    // Convert to a Request object like the one Next.js gives your handler
    const req = new Request("http://localhost:3000/api/notes/create", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(201);
    expect(json).toHaveProperty("data");
    expect(json.data.title).toBe("My Note");
    expect(json).toHaveProperty("requestId");
    expect(prismadb.notes.create).toHaveBeenCalledTimes(1);
  });

  it("returns 400 when validation fails", async () => {
    (getServerSession as any).mockResolvedValue({
      user: { id: "65123456789abcdef012345", email: "test@example.com" },
    });

    const req = new Request("http://localhost:3000/api/notes/create", {
      method: "POST",
      body: JSON.stringify({
        title: "", // invalid
        noteContent: "text",
        themeColor: "bg[#6CB5DF]",
      }),
      headers: { "Content-Type": "application/json" },
    });

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.error.code).toBe("BAD_REQUEST");
    expect(prismadb.notes.create).not.toHaveBeenCalled();
  });

  it("returns 401 when unauthorized", async () => {
    (getServerSession as any).mockResolvedValue(null);

    const req = new Request("http://localhost:3000/api/notes/create", {
      method: "POST",
      body: JSON.stringify({
        title: "Note",
        noteContent: "Text",
        themeColor: "bg[#6CB5DF]",
      }),
      headers: { "Content-Type": "application/json" },
    });

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(401);
    expect(json.error.code).toBe("UNAUTHORIZED");
    expect(prismadb.notes.create).not.toHaveBeenCalled();
  });
});

import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "db.json");

async function readDB() {
  const data = await fs.readFile(dbPath, "utf-8");
  return JSON.parse(data);
}

async function writeDB(data: any) {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const updatedTask = await request.json();
    const db = await readDB();
    
    const index = db.tasks.findIndex((t: any) => t.id === parseInt(id));
    
    if (index === -1) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }
    
    db.tasks[index] = { ...db.tasks[index], ...updatedTask };
    await writeDB(db);
    
    return NextResponse.json(db.tasks[index]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = await readDB();
    
    db.tasks = db.tasks.filter((t: any) => t.id !== parseInt(id));
    await writeDB(db);
    
    return NextResponse.json({ message: "Task deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
  }
}
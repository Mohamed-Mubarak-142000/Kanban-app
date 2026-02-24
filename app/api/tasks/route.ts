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

export async function GET() {
  try {
    const db = await readDB();
    return NextResponse.json(db.tasks);
  } catch (error) {
    return NextResponse.json({ error: "Failed to read tasks" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const task = await request.json();
    const db = await readDB();
    
    const newTask = {
      ...task,
      id: Date.now(),
    };
    
    db.tasks.push(newTask);
    await writeDB(db);
    
    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
  }
}
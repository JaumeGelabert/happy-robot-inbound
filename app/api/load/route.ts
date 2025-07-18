import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import { Load } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const load_id = searchParams.get("load_id");

    if (!load_id) {
      return NextResponse.json(
        { error: "Load ID is required" },
        { status: 400 }
      );
    }

    // In Prod, we would quey the db. For now, we check the db.json file.
    const db = await fs.readFile("db.json", "utf8");
    const loads = JSON.parse(db);

    const load = loads.find((load: Load) => load.load_id === load_id);

    if (!load) {
      return NextResponse.json({ error: "Load not found" }, { status: 404 });
    }

    return NextResponse.json({ load, error: null });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

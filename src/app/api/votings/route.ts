import { getMongoDb } from "@/utils/db";
import { Collection, Db } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const db: Db = await getMongoDb();
    const votingsCollection: Collection = db.collection("votings");

    const votings = await votingsCollection.aggregate().toArray();

    return NextResponse.json({
      votings,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

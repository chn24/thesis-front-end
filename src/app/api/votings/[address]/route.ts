import { getMongoDb } from "@/utils/db";
import { Collection, Db } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { address: string } }
) {
  try {
    const db: Db = await getMongoDb();
    const proposalCollection: Collection = db.collection("proposals");
    const address = params.address;

    const proposals = await proposalCollection
      .aggregate([{ $match: { contractAddress: address } }])
      .project({ _id: 0 })
      .toArray();

    const total = proposals.length;

    return NextResponse.json({
      proposals,
      total,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      {
        status: 500,
      }
    );
  }
}

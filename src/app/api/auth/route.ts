import { getMongoDb } from "@/utils/db";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET ?? "access token secret";
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET ?? "refresh token secret";
const TOKEN_EXPIRE = 60 * 60 * 7;

export async function GET(request: NextRequest) {
  try {
    const db = await getMongoDb();
    const userCollection = db.collection("users");
    let isExpired = false;
    let data;

    const accessToken = cookies().get("accessToken");
    const refreshToken = cookies().get("refreshToken");

    if (!accessToken) {
      return NextResponse.json(
        {
          error: "UnAuthorize",
        },
        {
          status: 401,
        }
      );
    }

    try {
      data = jwt.verify(String(accessToken?.value), ACCESS_TOKEN_SECRET);
    } catch (error) {
      if (String(error).includes("jwt expired")) {
        console.log("var expired");

        isExpired = true;
        data = jwt.verify(String(refreshToken?.value), REFRESH_TOKEN_SECRET);
        console.log("data: ", data);

        // @ts-ignore
        const email = data.email;

        // @ts-ignore
        const role = data.role;

        // @ts-ignore
        const username = data.username;

        const newAccessToken = jwt.sign(
          {
            email: email,
            role: role,
            username,
          },
          ACCESS_TOKEN_SECRET,
          {
            expiresIn: "7d",
          }
        );

        await userCollection.updateOne(
          {
            email: email,
          },
          {
            $set: {
              accessToken: newAccessToken,
            },
          },
          {
            upsert: true,
          }
        );

        cookies().set("accessToken", newAccessToken);
      } else {
        console.log("varrrr 2");

        return NextResponse.json(
          { error: "Internal Server Error" },
          { status: 500 }
        );
      }
    }
    console.log("varrr");

    // @ts-ignore
    const email = data.email;

    if (!email) {
      return NextResponse.json(
        {
          error: "UnAuthorize",
        },
        {
          status: 401,
        }
      );
    }

    let user;

    try {
      const projection = {
        _id: 0,
        refreshToken: 0,
        accessToken: 0,
        passwordHash: 0,
      };

      user = await userCollection.findOne(
        {
          email: email,
        },
        {
          projection,
        }
      );
    } catch (error) {
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }

    if (!user) {
      return NextResponse.json({ error: "User not found!" }, { status: 404 });
    }

    return NextResponse.json(
      {
        user: user,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

import { getMongoDb } from "@/utils/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Db } from "mongodb";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

type LoginPayload = {
  email: string;
  password: string;
};

const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET ?? "access token secret";
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET ?? "refresh token secret";

export async function POST(request: NextRequest) {
  try {
    const { email, password }: LoginPayload = await request.json();

    const db: Db = await getMongoDb();

    const userCollection = db.collection("users");
    let user;
    try {
      user = await userCollection.findOne(
        {
          email: email,
        },
        {
          projection: {
            _id: 0,
          },
        }
      );
    } catch (error) {
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
    console.log("user: ", user);

    if (!user) {
      return NextResponse.json({ error: "user not found!" }, { status: 404 });
    }

    const passwordHash = user.passwordHash;

    const isValidPass = await bcrypt
      .compare(password, passwordHash)
      .then((res: any) => {
        return res;
      })
      .catch((err: any) => {
        console.error("errr", err.message);
        return NextResponse.json(
          {
            error: "Internal Server Error",
          },
          {
            status: 500,
          }
        );
      });

    if (!isValidPass) {
      return NextResponse.json(
        {
          error: "Wrong password",
        },
        {
          status: 400,
        }
      );
    }

    if (!user.accessToken) {
      const accessToken = jwt.sign(
        {
          userId: user.userId,
          role: user.role,
          email,
        },
        ACCESS_TOKEN_SECRET,
        {
          expiresIn: "10s",
        }
      );

      const refreshToken = jwt.sign(
        {
          role: user.role,
          email,
        },
        REFRESH_TOKEN_SECRET
      );

      (user.accessToken = accessToken), (user.refreshToken = refreshToken);

      await userCollection.updateOne(
        {
          email: user.email,
        },
        {
          $set: {
            accessToken: accessToken,
            refreshToken: refreshToken,
          },
        },
        {
          upsert: true,
        }
      );
    }
    cookies().set("accessToken", user.accessToken);
    cookies().set("refreshToken", user.refreshToken);

    delete user["passwordHash"];

    return NextResponse.json(
      {
        user: user,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

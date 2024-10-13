import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Web3 from "web3";
import { getMongoDb } from "@/utils/db";
import { getAccountManagerAbi } from "@/abi/accountManagerAbi";
import { keccak256 } from "viem";
import { AbiCoder } from "ethers/abi";

type SignMessagePayload = {
  address: string;
};

const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET ?? "access token secret";
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET ?? "refresh token secret";

export async function POST(request: NextRequest) {
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
        isExpired = true;
        data = jwt.verify(String(refreshToken?.value), REFRESH_TOKEN_SECRET);

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
        return NextResponse.json(
          { error: "Internal Server Error" },
          { status: 500 }
        );
      }
    }

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
      console.log(error);

      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }

    if (!user) {
      return NextResponse.json({ error: "User not found!" }, { status: 404 });
    }

    const { address }: SignMessagePayload = await request.json();
    const amount = user.stakeAmount;

    const web3 = new Web3(process.env.NEXT_PUBLIC_RPC_URL);
    const abi = getAccountManagerAbi();
    const contract = new web3.eth.Contract(
      abi,
      process.env.NEXT_PUBLIC_ACCOUNT_MANAGER_ADDRESS
    );

    const abiCoder = new AbiCoder();

    // @ts-ignore
    const hashEmail = keccak256(abiCoder.encode(["string"], [email]));

    const hashedMessage = await contract.methods
      .getMessageHash(String(address).toLowerCase(), amount, hashEmail)
      .call();
    const signature = web3.eth.accounts.sign(
      String(hashedMessage),
      "0x" + process.env.ADMIN_PRIVATE_KEY
    );

    return NextResponse.json({
      signature,
      hashEmail,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

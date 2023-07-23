import { NextResponse } from "next/server"
import { ResolveVanityUrlRequest } from "@/types";

async function resolveVanityURL(vanityURL: string): Promise<ResolveVanityUrlRequest> {
    const apiKey = process.env.STEAM_API_KEY;
    const url = `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${apiKey}&vanityurl=${vanityURL}`;
    try {
        const res = await fetch(url);
        if(res.status !== 200) {
            throw new Error(`Failed to resolve vanity URL.`);
        }
        const data = (await res.json())?.response;
        if(!data.success || data.success !== 1) {
            throw new Error(`Failed to resolve vanity URL: Invalid response data`);
        }
        return {
            success: true,
            steamId: data.steamid
        }
    } catch(error) {
        return {
            success: false
        }
    }
}

export async function GET(req: Request) {

    const { searchParams } = new URL(req.url);
    const vanityURL = searchParams.get("vanityURL");

    if(!vanityURL) {
        return NextResponse.json({
            error: "Bad request."
        }, {
            status: 400
        })
    }

    const resolveData: ResolveVanityUrlRequest = await resolveVanityURL(vanityURL);
    if(!resolveData.success) {
        return NextResponse.json({
            error: "SteamId64 not found."
        }, {
            status: 404
        })
    }

    return NextResponse.json({
        message: "success",
        steamId: resolveData.steamId
    }, {
        status: 200
    })

}
import { NextResponse } from "next/server"
import { ProfileDataRequest } from "@/types";

async function fetchProfileData(steamId: string): Promise<ProfileDataRequest> {
    const apiKey = process.env.STEAM_API_KEY;
    const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${apiKey}&format=json&steamids=${steamId}`;
    try {
        const res = await fetch(url);
        if(res.status !== 200) {
            throw new Error("Failed to fetch profile data.");
        }
        const data = (await res.json())?.response;
        if(!data.players || !data.players[0]) {
            throw new Error("Failed to fetch profile data.")
        }
        const profileData = data.players[0];
        return {
            success: true,
            data: {
                isPrivate: profileData["communityvisibilitystate"] !== 3,
                steamId: steamId,
                avatar: profileData["avatarfull"],
                nickname: profileData["personaname"],
                realname: profileData["realname"],
                createdAt: profileData["timecreated"]
            }
        }
    } catch(error) {
        return {
            success: false
        }
    }
}

export async function GET(req: Request) {

    const { searchParams } = new URL(req.url);
    const steamId = searchParams.get("steamId");
    
    if(!steamId) {
        return NextResponse.json({
            error: "Bad request."
        }, {
            status: 400
        })
    }

    const profileData: ProfileDataRequest = await fetchProfileData(steamId);
    if(!profileData.success) {
        return NextResponse.json({
            error: "Failed to fetch profile data."
        }, {
            status: 404
        })
    }

    return NextResponse.json({
        message: "success",
        profileData: profileData.data
    }, {
        status: 200
    })

}
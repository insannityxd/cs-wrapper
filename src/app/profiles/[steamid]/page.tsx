import { ProfileProps } from "@/types";
import { UserCard } from "@/components/UserCard";
import { InventoryContainer } from "@/components/InventoryContainer";

const fetchProfileData = async (steamId: string) => {
    const res = await fetch(`${process.env.BASE_URL}/api/fetchProfileData?steamId=${steamId}`, {next: {revalidate: 60}});
    if(res.status !== 200) {
        throw new Error("Failed to fetch profile data.");
    }
    const data = await res.json();
    return data["profileData"];
}

export default async function Profile({ params }: ProfileProps): Promise<JSX.Element> {

    const steamId: string = params.steamid;

    const profileData = await fetchProfileData(steamId);

    return (
        <main className="absolute flex flex-col justify-center items-center w-screen h-screen bg-default">
            <UserCard data={profileData}/>
            <InventoryContainer steamId={steamId}/>
        </main>
    )
}
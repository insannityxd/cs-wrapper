import Image from "next/image"
import { UserCardProps } from "@/types"
import { getTimeElapsed } from "@/utils/getTimeElapsed";
import { DirectLink } from "@/components/DirectLink";

export const UserCard = ({ data }: UserCardProps) => {

    const createdAt = data.createdAt ? getTimeElapsed(data.createdAt) : null;

    return (
        <div className="relative flex flex-col justify-center items-center rounded-xl bg-slate-600 bg-opacity-50 min-w-[300px] max-w-[600px] px-10 h-28 border border-gray-500">
            <div className="flex flex-row justify-center items-center">
                <Image src={data.avatar || "/images/user/default-profile-picture.webp"} alt="User Photo" width={48} height={48} className="rounded-full select-none"/>   
                <span className="ml-2 text-white font-extrabold text-3xl">
                    {data.nickname}
                </span>
                <div className="ml-2 flex flex-col justify-center items-center">
                    <DirectLink type="clipboard" label="Copy Permalink" link={`https://steamcommunity.com/profiles/` + data.steamId}/>
                </div>
            </div>
            <span className="mt-1 text-slate-400">
                {createdAt || "Profile is private."}
            </span>
        </div>
    )
}
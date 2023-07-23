'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react"
import { toast } from "react-toastify";
import { UrlType } from "@/types";

export default function Home() {

    const router = useRouter();

    const [profileURL, setProfileURL] = useState("");
    const [loading, setLoading] = useState(false);

    const handleInputChange = (content: string) => {
        setProfileURL(content);
    }

    const getLinkVanityURL = (link: string): string => {
        const vanityURL: string = link.split("steamcommunity.com/id/")[1].split("/")[0];
        return vanityURL;
    }

    const getLinkId64 = (link: string): string => {
        const linkId64: string = link.split("steamcommunity.com/profiles/")[1].split("/")[0];
        return linkId64;
    }

    const getSteamId64 = async (vanityURL: string): Promise<string> => {
        const res = await fetch(`/api/fetchSteamID64?vanityURL=${vanityURL}`);
        if(res.status !== 200) {
            throw new Error(`Failed to resolve vanity URL.`);
        }
        const data = await res.json();
        return data.steamId;
    }

    const getURLData = async (url: string): Promise<UrlType> => {
        const clearURL: string = url.replace(/^(https?:\/\/)?(www\.)?/i, "");
        if(clearURL.startsWith("steamcommunity.com/id/") && clearURL.length > 26) {

            try {

                const vanityURL: string = getLinkVanityURL(clearURL);
                const steamId: string = await getSteamId64(vanityURL);

                return {
                    valid: true,
                    type: "customURL",
                    steamid: steamId
                }

            } catch(error) {

                return {
                    valid: false
                }

            }

        }
        if(clearURL.startsWith("steamcommunity.com/profiles/") && clearURL.length >= 45) {

            return {
                valid: true,
                type: "id64",
                steamid: getLinkId64(clearURL)
            }

        }
        return {
            valid: false
        };
    }

    const loadInventory = async () => {
        if(loading) return;
        setLoading(true);
        const inputUrlData: UrlType = await getURLData(profileURL);
        if(!inputUrlData.valid) {
            toast.warn("You must provide a valid Profile URL", {
                position: "top-right",
                autoClose: 3500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                theme: "dark",
            });
            return setLoading(false);
        }
        return router.push(`/profiles/${inputUrlData.steamid}`);
    }

    return (
        <main className="absolute flex flex-col justify-center items-center w-screen h-screen bg-default">
            <div className="relative flex flex-col justify-center items-center">
                <div className="relative flex flex-col justify-center items-center">
                    <h1 className="max-w-3xl align-middle text-center bg-gradient-to-r from-blue-400 to-blue-700 bg-clip-text font-extrabold uppercase tracking-tighter text-transparent text-3xl lg:text-6xl">
                        Counter Strike Inventory Viewer
                    </h1>
                    <h2 className="order-first bg-gradient-to-r from-blue-400 to-blue-700 bg-clip-text font-medium tracking-wide text-transparent text-base">
                        Inventory viewer for Counter Strike
                    </h2>
                </div>
                <p className="mt-2 text-white font-medium hidden sm:block">
                    Check full inventory price, item prices, item floats, rare patterns, etc...
                </p>
            </div>
            <div className="mt-5 relative flex flex-col justify-center items-center">
                <div className="relative flex flex-col lg:flex-row justify-center items-center">
                    <input disabled={loading} onChange={event => handleInputChange(event.target.value)} value={profileURL} type="text" id="profile_url" className="bg-transparent h-[45px] px-3 rounded-xl border text-white border-gray-500 focus:outline-none w-[95%] lg:w-[470px]" placeholder="Insert a steam profile URL"/>
                    <div onClick={async () => {await loadInventory()}} className="mt-2 lg:mt-0 ml-2 border border-gray-500 text-transparent bg-clip-text bg-gradient-to-r font-bold from-blue-400 to-blue-700 pl-[15px] pr-[15px] h-[45px] rounded-xl flex justify-center items-center select-none transition-all ease-in-out duration-50 hover:bg-clip-border hover:text-white hover:border-default">
                        {
                            loading ? (
                                <Image src="/images/ui/loading.svg" alt="Loading..." height={25} width={25}/>
                            ) : (
                                <span>Load Inventory</span>
                            )
                        }
                    </div>
                </div>
            </div>
        </main>
    )
}

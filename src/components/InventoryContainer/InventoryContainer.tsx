"use client"

import Image from "next/image"
import { InventoryContainerProps, InventoryItem, ProfileInventory, ProfileInventoryRequest } from "@/types";
import { useEffect, useState } from "react";
import { ItemCard } from "@/components/ItemCard";
import { buildIconLink } from "@/utils/buildWeaponIconUrl";
import { getWeaponStickers } from "@/utils/getWeaponStickers";
import { toast } from "react-toastify";
import { items } from "../../../inventoryExample";

async function fetchProfileInventory(steamId: string): Promise<ProfileInventoryRequest> {
    const url = `https://steamcommunity.com/inventory/${steamId}/730/2?count=2000&l=english`
    try {
        const res = await fetch(url);
        if(res.status !== 200) {
            throw new Error("Failed to fetch profile inventory.")
        }
        const data = await res.json();
        if(!data || !data.success || data.success !== 1) {
            throw new Error("Failed to fetch profile inventory.")
        }
        const itemList = data.descriptions.map((item: any) => ({
            name: item.market_hash_name,
            icon: item.icon_url_large ? buildIconLink(item.icon_url_large) : buildIconLink(item.icon_url),
            inspect_url: item.actions ? item.actions[0].link : null,
            trade_lock: !item.tradable || item.tradable === 0,
            stattrak: item.market_hash_name.toLowerCase().includes("stattrak"),
            stickers: getWeaponStickers(item.descriptions)
        }))
        return {
            success: true,
            data: {
                items: itemList
            }
        }
    } catch(error) {
        console.error(error);
        return {
            success: false
        }
    }
}

export const InventoryContainer = ({ steamId }: InventoryContainerProps) => {

    const [profileInventory, setProfileInventory] = useState<ProfileInventory>({items: []});
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // setLoading(true);
        // fetchProfileInventory(steamId)
        // .then(result => {
        //     if(!result || !result.success || !result.data) {
        //         return toast.error("Could not retrieve inventory items", {
        //             position: "top-right",
        //             autoClose: 3500,
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //             pauseOnHover: false,
        //             draggable: true,
        //             theme: "dark",
        //         });
        //     }
        //     setProfileInventory(result.data);
        //     setLoading(false);
        // })
        // .catch(error => console.error(error));
        setProfileInventory(items);
        setLoading(false);
    }, [steamId]);

    return (
        <div className="relative mt-3 flex flex-col justify-center items-center no-scrollbar">
            {
                loading ? (
                    <div className="mt-2 flex justify-center items-center w-[90%] h-[636px] 2xl:w-[1276px] xl:w-[1064px] lg:w-[852px] md:w-[640px] sm:w-[428px]">
                        <Image alt="Loading" src="/images/ui/loading.svg" width={50} height={50}/>
                    </div>
                ) : (<div className="mt-2 justify-center items-center w-[90%] h-[636px] overflow-y-scroll overflow-x-hidden 2xl:w-[1276px] xl:w-[1064px] lg:w-[852px] md:w-[640px] sm:w-[428px]">
                    <div className="relative flex flex-wrap w-full">
                        {
                            profileInventory.items ? profileInventory.items.map((item: InventoryItem, index: number) => (
                                <ItemCard key={index} item={item}/>
                            )) : null
                        }
                    </div>
                </div>)
            }
        </div>
    )
}
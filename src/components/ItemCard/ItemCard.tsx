import Image from "next/image"
import { ItemProps } from "@/types"
import { DirectLink } from "@/components/DirectLink";
import { InformationLabel } from "@/components/InformationLabel";
import { useEffect, useState } from "react";

export const ItemCard = ({ item }: ItemProps) => {
    return (
        <div className="mr-3 mt-3 relative flex flex-col justify-center items-center w-[45%] sm:w-[200px] h-[240px] bg-slate-600 bg-opacity-50 border border-gray-500 rounded-md">
            <div className="relative w-full h-16 flex justify-center items-center">
                <span className="relative text-xs w-4/5 text-slate-400 align-middle text-center">
                    {item.name}
                </span>
            </div>
            <div className="relative w-full h-32 flex flex-col justify-center items-center">
                <div className="h-24 flex justify-center items-center">
                    <Image alt={item.name} src={item.icon} width={150} height={150} className="drop-shadow-md select-none hover:scale-105 duration-150"/>
                </div>
                {
                    item.stickers && item.stickers.length > 0 ? (
                        <div className="h-8 flex flex-row justify-center items-center">
                            {
                                item.stickers && item.stickers.map((sticker, index) => (
                                    <Image key={"STICKER-" + index} alt="Sticker" src={sticker} width={32} height={32} className="drop-shadow-md select-none hover:scale-110 w-[60%] sm:w-[32px] sm:h-auto"/>
                                ))
                            }
                        </div>
                    ): null
                }
            </div>
            <div className="relative w-full h-12 flex flex-row items-center overflow-y-hidden overflow-x-scroll scrollbar-x">
                <div className="flex flex-row h-full items-center w-fit">
                    {item.inspect_url && (
                        <DirectLink type="newtab" label="Inspect" link={item.inspect_url} className="ml-2"/>
                    )}
                    {item.trade_lock && (
                        <InformationLabel label="Tradelock" className="ml-2 border border-gray-500"/>
                    )}
                    {item.stattrak && (
                        <InformationLabel label="StatTrak™" className="ml-2 border border-orange-500 text-orange-400"/>
                    )}
                </div>
            </div>
        </div>
    )
}
"use client"

import { DirectLinkProps } from '@/types';
import { ClipboardIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

export const DirectLink = ({ type, label, link, className }: DirectLinkProps) => {

    const copyLink = (url: string) => {
        navigator.clipboard.writeText(url);
    }

    const openLink = (url: string) => {
        const newWindow = window.open(url, '_blank', 'noopener, noreferrer')
        if (newWindow) newWindow.opener = null;
    }
    
    const handleClick = () => {
        switch(type) {
            case "clipboard":
                copyLink(link);
                break;
            case "newtab":
                openLink(link);
                break;
        }
    }

    return (
        <div onClick={handleClick} className={`py-1 px-2 rounded-full bg-gray-600 flex flex-row justify-center items-center hover:bg-gray-500 ${className}`}>
            {
                type == "clipboard" ? (
                    <ClipboardIcon className="w-3 h-3 text-white"/>
                ) : (
                    <ArrowTopRightOnSquareIcon className="w-3 h-3 text-white"/>
                )
            }
            <span className="ml-1 font-light text-xs text-white select-none">
                {label}
            </span>
        </div>
    )
}
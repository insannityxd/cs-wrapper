"use client"

import { InformationLabelProps } from '@/types';

export const InformationLabel = ({ label, className }: InformationLabelProps) => {
    return (
        <div className={`py-1 px-2 rounded-full bg-gray-600 flex flex-row justify-center items-center text-white ${className}`}>
            <span className="font-light text-xs select-text">
                {label}
            </span>
        </div>
    )
}
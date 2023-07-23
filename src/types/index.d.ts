export type UrlType = {
    valid: boolean,
    type?: "id64" | "customURL",
    steamid?: string | Promise<string>
}

export type ResolveVanityUrlRequest = {
    success: boolean,
    steamId?: string
}

export type ProfileDataRequest = {
    success: boolean,
    data?: ProfileData
}

export type ProfileData = {
    isPrivate: boolean,
    steamId: string,
    avatar: string,
    nickname: string,
    realname?: string,
    createdAt?: string
}

export type ProfileInventoryRequest = {
    success: boolean,
    data?: ProfileInventory
}

export type ProfileInventory = {
    items?: InventoryItem[]
}

export type InventoryItem = {
    name: string,
    icon: string,
    inspect_url: string | null,
    trade_lock: boolean,
    stattrak: boolean,
    stickers?: string[]
}

export type ProfileProps = {
    params: {
        steamid: string
    }
}

export type UserCardProps = {
    data: ProfileData
}

export type DirectLinkProps = {
    type: "clipboard" | "newtab",
    label: string,
    link: string,
    className?: string
}

export type InventoryContainerProps = {
    steamId: string
}

export type ItemProps = {
    item: InventoryItem
}

export type InformationLabelProps = {
    label: string,
    className?: string
}
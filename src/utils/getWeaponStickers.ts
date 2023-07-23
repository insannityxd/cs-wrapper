export const getWeaponStickers = (descriptions: any): string[] => {
    const stickers: string[] = [];
    if(!descriptions) return stickers;
    const stickerField = descriptions.map((field: any) => {
        if(!field || !field.type || !field.value || field.type !== "html") return null;
        if(!field.value.toLowerCase().includes("sticker")) return null;
        return field.value;
    });
    if(!stickerField) return stickers;
    const regex = /src="([^"]*)"/g;
    let match;
    while((match = regex.exec(stickerField)) !== null) {
        stickers.push(match[1]);
    }
    return stickers;
}
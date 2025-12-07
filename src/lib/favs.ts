const FAV_KEY = "rickdex:favs";

export function getFavs(): number[] {
    try {
        return JSON.parse(localStorage.getItem(FAV_KEY) || "[]") as number[];
    } catch {
        return [];
    }
}

export function setFavs(ids: number[]) {
    localStorage.setItem(FAV_KEY, JSON.stringify(ids));
}

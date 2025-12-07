const FAV_KEY = "favs";

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

export function toggleFav(characterId: number): boolean {
    const favs = getFavs();
    if (favs.includes(characterId)) {
        const updated = favs.filter((id) => id !== characterId);
        setFavs(updated);
        return false;
    } else {
        favs.push(characterId);
        setFavs(favs);
        return true;
    }
}

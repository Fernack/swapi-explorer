export async function searchSwapi(resource: string, query: string) {
    const url = `${process.env.BASE_URL}/${resource}/?search=${encodeURIComponent(query)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`SWAPI request failed: ${res.statusText}`);
    return res.json();
}
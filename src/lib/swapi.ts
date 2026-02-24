import { SwapiListResponse, Person, Planet, Starship, Vehicle, Film, Species } from '@/types/swapi';

async function fetchFromSwapi<T>(endpoint: string): Promise<T> {
    const res = await fetch(`${process.env.BASE_URL}${endpoint}`, {
        next: { revalidate: 3600 }, 
    });
    if (!res.ok) {
        throw new Error(`SWAPI fetch failed: ${res.status} ${res.statusText}`);
    }
    return res.json();
}

export async function getPeople(page = 1): Promise<SwapiListResponse<Person>> {
    return fetchFromSwapi<SwapiListResponse<Person>>(`/people/?page=${page}`);
}

export async function getPerson(id: number): Promise<Person> {
    return fetchFromSwapi<Person>(`/people/${id}/`);
}

export async function getPlanets(page = 1): Promise<SwapiListResponse<Planet>> {
    return fetchFromSwapi<SwapiListResponse<Planet>>(`/planets/?page=${page}`);
}

export async function getPlanet(id: number): Promise<Planet> {
    return fetchFromSwapi<Planet>(`/planets/${id}/`);
}

export async function getStarships(page = 1): Promise<SwapiListResponse<Starship>> {
    return fetchFromSwapi<SwapiListResponse<Starship>>(`/starships/?page=${page}`);
}

export async function getStarship(id: number): Promise<Starship> {
    return fetchFromSwapi<Starship>(`/starships/${id}/`);
}

export async function getVehicles(page = 1): Promise<SwapiListResponse<Vehicle>> {
    return fetchFromSwapi<SwapiListResponse<Vehicle>>(`/vehicles/?page=${page}`);
}

export async function getVehicle(id: number): Promise<Vehicle> {
    return fetchFromSwapi<Vehicle>(`/vehicles/${id}/`);
}

export async function getFilms(): Promise<SwapiListResponse<Film>> {
    return fetchFromSwapi<SwapiListResponse<Film>>('/films/');
}

export async function getFilm(id: number): Promise<Film> {
    return fetchFromSwapi<Film>(`/films/${id}/`);
}

export async function getSpecies(page = 1): Promise<SwapiListResponse<Species>> {
    return fetchFromSwapi<SwapiListResponse<Species>>(`/species/?page=${page}`);
}

export function getIdFromUrl(url: string): number {
    const parts = url.replace(/\/$/, '').split('/');
    return parseInt(parts[parts.length - 1], 10);
}

export async function searchEntities<T>(
    entity: string,
    query: string
): Promise<SwapiListResponse<T>> {
    return fetchFromSwapi<SwapiListResponse<T>>(`/${entity}/?search=${encodeURIComponent(query)}`);
}

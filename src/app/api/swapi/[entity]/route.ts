import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ entity: string }> }
) {
    const { entity } = await params;
    const validEntities = ['people', 'planets', 'starships', 'vehicles', 'films', 'species'];

    if (!validEntities.includes(entity)) {
        return NextResponse.json({ error: 'Invalid entity' }, { status: 400 });
    }

    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';
    const search = searchParams.get('search') || '';

    const queryParams = new URLSearchParams({ page });
    if (search) queryParams.append('search', search);

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SWAPI_BASE_URL}/${entity}/?${queryParams}`, {
            next: { revalidate: 3600 },
        });

        if (!res.ok) {
            return NextResponse.json(
                { error: `SWAPI error: ${res.status}` },
                { status: res.status }
            );
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error(`Error fetching ${entity}:`, error);
        return NextResponse.json(
            { error: 'Failed to fetch data from SWAPI' },
            { status: 500 }
        );
    }
}

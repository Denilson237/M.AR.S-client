import { NextResponse, NextRequest } from 'next/server';
import { NEXT_PUBLIC_SERVER_URI } from '@/secret';

export async function POST(request: NextRequest) {

    // Check if the server URI is defined
    if (!NEXT_PUBLIC_SERVER_URI) {
        return NextResponse.json(
            { error: 'Server URI is not defined', status: 500 },
        );
    }

    try {
        const data = await request.json();

        // Fetch the paginated data from the server
        const response = await fetch(`${NEXT_PUBLIC_SERVER_URI}/permissions`, {
            method: 'GET',
            headers: {
                // 'Content-Type': 'application/json',
                'Authorization': data.accessToken
            },
            credentials: 'include'
        });

        const result = await response.json();

        // Handle non-OK responses
        if (!response.ok) {
            return NextResponse.json({ ...result }, { status: response.status });
        }

        // Return the result from the API
        return NextResponse.json({ ...result });
    } catch (error) {
        // Handle connection errors
        return NextResponse.json({ error: 'Failed to connect to the API' }, { status: 500 });
    }


}
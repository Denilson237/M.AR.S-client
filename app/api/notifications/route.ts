import { NextResponse, NextRequest } from 'next/server';
import { NEXT_PUBLIC_SERVER_URI } from '@/secret';

export async function POST(request: NextRequest) {
    try {
        if (!NEXT_PUBLIC_SERVER_URI) {
            return NextResponse.json(
                { error: 'Server URI is not defined' },
                { status: 500 }
            );
        }

        const data = await request.json();

        const page = data.page || 1; // Default to page 1 if not provided
        const limit = data.limit || 10; // Default to limit of 10 if not provided
        const filters = data.filters ? JSON.stringify(data.filters) : ''; // Convert filters to JSON string

        const response = await fetch(`${NEXT_PUBLIC_SERVER_URI}/notifications?page=${page}&limit=${limit}&filters=${encodeURIComponent(filters)}`, {
            method: 'GET',
            headers: {
                // 'Content-Type': 'application/json',
                'Authorization': data.accessToken
            },
            credentials: 'include'
        });

        const result = await response.json();

        if (!response.ok) {
            return NextResponse.json({ ...result }, { status: response.status });
        }

        return NextResponse.json({ ...result });
    } catch (error) {
        console.log("[NOTIFICATIONS-LIST]", error);
        return NextResponse.json({ error: 'Failed to connect to the API' }, { status: 500 });
    }
}
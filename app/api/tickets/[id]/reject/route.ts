import { NextResponse } from 'next/server';
import { NEXT_PUBLIC_SERVER_URI } from '@/secret';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const data = await request.json();
    
        if (!id) {
            return NextResponse.json({ error: 'TICKET ID is required' }, { status: 400 });
        }
        
        const response = await fetch(`${NEXT_PUBLIC_SERVER_URI}/assignments/${id}/reject`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': data.accessToken
            },
            body: JSON.stringify(data.data),
            credentials: 'include'
        });

        const result = await response.json();

        if (!response.ok) {
            return NextResponse.json({ ...result }, { status: response.status });
        }

        return NextResponse.json({ ...result });
    } catch (error) {
        console.log("[TICKET-VALIDATE]", error);
        return NextResponse.json({ error: 'Failed to connect to the API' }, { status: 500 });
    }
}


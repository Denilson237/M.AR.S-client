import { NextResponse } from 'next/server';
import { NEXT_PUBLIC_SERVER_URI } from '@/secret';

export async function POST(request: Request, { params }: { params: Promise<{ contractId: string }> }) {
    try {
        const { contractId } = await params;
        const data = await request.json();
    
        if (!contractId) {
            return NextResponse.json({ error: 'Contract Number ID is required' }, { status: 400 });
        }

        const response = await fetch(`${NEXT_PUBLIC_SERVER_URI}/customers-reference/contracts/${contractId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': data.accessToken
            },
            credentials: 'include'
        });
        console.log("response", response,);
        const result = await response.json();

        if (!response.ok) {
            return NextResponse.json({ ...result }, { status: response.status });
        }
      
        return NextResponse.json({ ...result });
    } catch (error) {
        console.log("[USERS-READ]", error);
        return NextResponse.json({ error: 'Failed to connect to the API' }, { status: 500 });
    }
}



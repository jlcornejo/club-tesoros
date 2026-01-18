import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Feria from '@/models/Feria';
import { auth } from '@/auth';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const session = await auth();
    const searchParams = request.nextUrl.searchParams;
    const misFerias = searchParams.get('misFerias');
    
    let query = {};
    
    // Si se solicita "mis ferias", filtrar por userId
    if (misFerias === 'true' && session?.user?.id) {
      query = { userId: session.user.id };
    }
    
    const ferias = await Feria.find(query).sort({ fecha: -1 });
    return NextResponse.json({ success: true, data: ferias });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Error al obtener las ferias' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'No autenticado' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    
    // Asociar la feria con el usuario
    const feriaData = {
      ...body,
      userId: session.user.id,
      createdBy: session.user.name,
    };
    
    const feria = await Feria.create(feriaData);
    return NextResponse.json({ success: true, data: feria }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Error al crear la feria' },
      { status: 400 }
    );
  }
}

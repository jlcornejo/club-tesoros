import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Producto from '@/models/Producto';
import { auth } from '@/auth';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const searchParams = request.nextUrl.searchParams;
    const feriaId = searchParams.get('feriaId');
    const misProductos = searchParams.get('misProductos');
    const session = await auth();
    
    let query: any = {};
    
    if (feriaId) {
      query.feriaId = feriaId;
    }
    
    // Si se solicita "mis productos", filtrar por userId
    if (misProductos === 'true' && session?.user?.id) {
      query.userId = session.user.id;
    }
    
    const productos = await Producto.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, data: productos });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Error al obtener los productos' },
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
    
    // Asociar el producto con el usuario
    const productoData = {
      ...body,
      userId: session.user.id,
      vendedor: session.user.name,
    };
    
    const producto = await Producto.create(productoData);
    return NextResponse.json({ success: true, data: producto }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Error al crear el producto' },
      { status: 400 }
    );
  }
}

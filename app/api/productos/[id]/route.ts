import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Producto from '@/models/Producto';
import { auth } from '@/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const producto = await Producto.findById(id);
    
    if (!producto) {
      return NextResponse.json(
        { success: false, error: 'Producto no encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: producto });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Error al obtener el producto' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'No autenticado' },
        { status: 401 }
      );
    }
    
    const { id } = await params;
    const producto = await Producto.findById(id);
    
    if (!producto) {
      return NextResponse.json(
        { success: false, error: 'Producto no encontrado' },
        { status: 404 }
      );
    }
    
    // Verificar que el usuario sea el dueño o sea admin
    if (producto.userId !== session.user.id && session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'No tienes permiso para editar este producto' },
        { status: 403 }
      );
    }
    
    const body = await request.json();
    const productoActualizado = await Producto.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    
    return NextResponse.json({ success: true, data: productoActualizado });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Error al actualizar el producto' },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'No autenticado' },
        { status: 401 }
      );
    }
    
    const { id } = await params;
    const producto = await Producto.findById(id);
    
    if (!producto) {
      return NextResponse.json(
        { success: false, error: 'Producto no encontrado' },
        { status: 404 }
      );
    }
    
    // Verificar que el usuario sea el dueño o sea admin
    if (producto.userId !== session.user.id && session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'No tienes permiso para eliminar este producto' },
        { status: 403 }
      );
    }
    
    await Producto.findByIdAndDelete(id);
    
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Error al eliminar el producto' },
      { status: 500 }
    );
  }
}

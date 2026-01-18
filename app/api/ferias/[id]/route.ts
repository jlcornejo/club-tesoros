import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Feria from '@/models/Feria';
import { auth } from '@/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const feria = await Feria.findById(id);
    
    if (!feria) {
      return NextResponse.json(
        { success: false, error: 'Feria no encontrada' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: feria });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Error al obtener la feria' },
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
    const feria = await Feria.findById(id);
    
    if (!feria) {
      return NextResponse.json(
        { success: false, error: 'Feria no encontrada' },
        { status: 404 }
      );
    }
    
    // Verificar que el usuario sea el dueño o sea admin
    if (feria.userId !== session.user.id && session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'No tienes permiso para editar esta feria' },
        { status: 403 }
      );
    }
    
    const body = await request.json();
    const feriaActualizada = await Feria.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    
    return NextResponse.json({ success: true, data: feriaActualizada });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Error al actualizar la feria' },
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
    const feria = await Feria.findById(id);
    
    if (!feria) {
      return NextResponse.json(
        { success: false, error: 'Feria no encontrada' },
        { status: 404 }
      );
    }
    
    // Verificar que el usuario sea el dueño o sea admin
    if (feria.userId !== session.user.id && session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'No tienes permiso para eliminar esta feria' },
        { status: 403 }
      );
    }
    
    await Feria.findByIdAndDelete(id);
    
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Error al eliminar la feria' },
      { status: 500 }
    );
  }
}

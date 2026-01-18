import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { auth } from '@/auth';
import User from '@/models/User';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'No autorizado' },
        { status: 403 }
      );
    }
    
    await dbConnect();
    const { id } = await params;
    const body = await request.json();
    
    // No permitir que un admin cambie su propio rol
    if (id === session.user.id) {
      return NextResponse.json(
        { success: false, error: 'No puedes cambiar tu propio rol' },
        { status: 400 }
      );
    }
    
    const user = await User.findByIdAndUpdate(
      id,
      { role: body.role },
      { new: true, runValidators: true }
    );
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Error al actualizar usuario' },
      { status: 500 }
    );
  }
}

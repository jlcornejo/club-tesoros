import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { auth } from '@/auth';
import User from '@/models/User';
import Feria from '@/models/Feria';
import Producto from '@/models/Producto';

export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'No autorizado' },
        { status: 403 }
      );
    }
    
    await dbConnect();
    
    const [
      totalUsuarios,
      totalFerias,
      totalProductos,
      productosVendidos,
      feriasActivas,
    ] = await Promise.all([
      User.countDocuments(),
      Feria.countDocuments(),
      Producto.countDocuments(),
      Producto.countDocuments({ vendido: true }),
      Feria.countDocuments({ estado: 'activa' }),
    ]);
    
    const productos = await Producto.find({ vendido: true });
    const totalGanancias = productos.reduce((sum, p) => sum + p.precio, 0);
    
    return NextResponse.json({
      success: true,
      data: {
        totalUsuarios,
        totalFerias,
        totalProductos,
        productosVendidos,
        productosDisponibles: totalProductos - productosVendidos,
        feriasActivas,
        totalGanancias,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Error al obtener estadísticas' },
      { status: 500 }
    );
  }
}

import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Producto';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: { id: string } }) {
  try {
    // Obtener datos del producto
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://club-tesoros.vercel.app';
    const res = await fetch(`${baseUrl}/api/productos/${params.id}`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      throw new Error('Producto no encontrado');
    }

    const { data: producto } = await res.json();

    return new ImageResponse(
      (
        <div
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
          }}
        >
          {producto.imagenes?.[0] && (
            <img
              src={producto.imagenes[0]}
              alt={producto.nombre}
              style={{
                width: '600px',
                height: '400px',
                objectFit: 'cover',
                borderRadius: '20px',
                marginBottom: '20px',
              }}
            />
          )}
          <div
            style={{
              fontSize: 60,
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              marginBottom: '10px',
            }}
          >
            {producto.nombre}
          </div>
          <div
            style={{
              fontSize: 80,
              fontWeight: 'bold',
              color: '#FFD700',
            }}
          >
            ${producto.precio}
          </div>
        </div>
      ),
      {
        ...size,
      }
    );
  } catch (error) {
    // Imagen por defecto si hay error
    return new ImageResponse(
      (
        <div
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontSize: 60,
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            Club Tesoros
          </div>
        </div>
      ),
      {
        ...size,
      }
    );
  }
}

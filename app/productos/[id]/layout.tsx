import { Metadata } from 'next';

export async function generateMetadata({ 
  params 
}: { 
  params: { id: string } 
}): Promise<Metadata> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://club-tesoros.vercel.app';
    const res = await fetch(`${baseUrl}/api/productos/${params.id}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      return {
        title: 'Producto no encontrado | Club Tesoros',
      };
    }

    const { data: producto } = await res.json();
    const url = `${baseUrl}/productos/${params.id}`;

    return {
      title: `${producto.nombre} - $${producto.precio} | Club Tesoros`,
      description: producto.descripcion.substring(0, 200),
      openGraph: {
        title: `${producto.nombre} - $${producto.precio}`,
        description: producto.descripcion.substring(0, 200),
        url: url,
        siteName: 'Club Tesoros',
        images: [
          {
            url: producto.imagenes[0] || `${baseUrl}/icon.png`,
            width: 1200,
            height: 630,
            alt: producto.nombre,
          },
        ],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${producto.nombre} - $${producto.precio}`,
        description: producto.descripcion.substring(0, 200),
        images: [producto.imagenes[0] || `${baseUrl}/icon.png`],
      },
    };
  } catch (error) {
    return {
      title: 'Club Tesoros',
      description: 'Feria de pulgas en condominio',
    };
  }
}

export default function ProductoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

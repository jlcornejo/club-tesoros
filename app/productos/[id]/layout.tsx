import { Metadata } from 'next';

async function getProducto(id: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || 'https://club-tesoros-dev.vercel.app';
    const apiUrl = baseUrl.startsWith('http') ? baseUrl : `https://${baseUrl}`;
    
    const res = await fetch(`${apiUrl}/api/productos/${id}`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching producto:', error);
    return null;
  }
}

export async function generateMetadata({ 
  params 
}: { 
  params: { id: string } 
}): Promise<Metadata> {
  const producto = await getProducto(params.id);

  if (!producto) {
    return {
      title: 'Producto | Club Tesoros',
      description: 'Feria de pulgas en condominio',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || 'https://club-tesoros-dev.vercel.app';
  const url = `${baseUrl}/productos/${params.id}`;
  const descripcion = producto.descripcion?.substring(0, 200) || 'Producto en Club Tesoros';
  const imagen = producto.imagenes?.[0] || `${baseUrl}/icon.png`;

  return {
    title: `${producto.nombre} - $${producto.precio} | Club Tesoros`,
    description: descripcion,
    openGraph: {
      title: `${producto.nombre} - $${producto.precio}`,
      description: descripcion,
      url: url,
      siteName: 'Club Tesoros',
      images: [
        {
          url: imagen,
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
      description: descripcion,
      images: [imagen],
    },
  };
}

export default function ProductoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

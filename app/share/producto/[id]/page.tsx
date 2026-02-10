import { Metadata } from 'next';
import { redirect } from 'next/navigation';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    // Construir la URL base
    let baseUrl = 'https://club-tesoros-dev.vercel.app';
    
    if (process.env.VERCEL_URL) {
      baseUrl = `https://${process.env.VERCEL_URL}`;
    } else if (process.env.NEXT_PUBLIC_APP_URL) {
      baseUrl = process.env.NEXT_PUBLIC_APP_URL;
    }
    
    const res = await fetch(`${baseUrl}/api/productos/${params.id}`, {
      next: { revalidate: 60 }, // Cache por 1 minuto
    });

    if (!res.ok) throw new Error('Producto no encontrado');

    const { data: producto } = await res.json();
    const shareUrl = `${baseUrl}/share/producto/${params.id}`;
    const descripcion = producto.descripcion?.substring(0, 200) || '';

    return {
      title: `${producto.nombre} - $${producto.precio}`,
      description: descripcion,
      openGraph: {
        title: `${producto.nombre} - $${producto.precio}`,
        description: descripcion,
        url: shareUrl,
        siteName: 'Club Tesoros',
        images: producto.imagenes?.[0] ? [
          {
            url: producto.imagenes[0],
            width: 1200,
            height: 630,
            alt: producto.nombre,
          },
        ] : [],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${producto.nombre} - $${producto.precio}`,
        description: descripcion,
        images: producto.imagenes?.[0] ? [producto.imagenes[0]] : [],
      },
    };
  } catch (error) {
    return {
      title: 'Club Tesoros',
    };
  }
}

export default function ShareProductoPage({ params }: Props) {
  // Redirigir inmediatamente a la página real del producto
  redirect(`/productos/${params.id}`);
}

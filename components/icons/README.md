# 🎨 Iconos Épicos de Club Tesoros

Colección de iconos SVG personalizados con gradientes vibrantes y efectos, diseñados específicamente para el estilo de Stumble Guys.

## 📦 Iconos Disponibles

### StumbleIcons.tsx
Iconos principales con gradientes vibrantes y animaciones:

- **GiftIcon** - Regalo con lazo y gradiente rosa/naranja
- **BookIcon** - Libro con páginas y marcador colorido
- **ToyIcon** - Oso de peluche adorable con corazón
- **FeriaIcon** - Carrusel de feria con colores vibrantes
- **GameIcon** - Control de videojuegos con botones coloridos
- **StarIcon** - Estrella brillante con efecto de resplandor

### NavIcons.tsx
Iconos para navegación y menús:

- **CircusTentIcon** - Carpa de circo para el logo principal
- **UserIcon** - Usuario con corona (perfil)
- **AdminIcon** - Engranaje dorado (administración)
- **LogoutIcon** - Puerta con flecha (cerrar sesión)
- **ListIcon** - Clipboard con checkmarks (mis items)

## 🎯 Uso

```tsx
import { GiftIcon, BookIcon, ToyIcon } from '@/components/icons/StumbleIcons';
import { CircusTentIcon, AdminIcon } from '@/components/icons/NavIcons';

// Uso básico
<GiftIcon size={64} />

// Con animación
<motion.div animate={{ rotate: [0, -10, 10, -10, 0] }}>
  <ToyIcon size={80} />
</motion.div>

// Con className personalizado
<BookIcon size={48} className="hover:scale-110 transition" />
```

## 🎨 Características

- **Gradientes vibrantes** - Colores del estilo Stumble Guys
- **Sombras y efectos** - Drop shadows y glows para profundidad
- **Escalables** - SVG vectoriales que se ven bien en cualquier tamaño
- **Optimizados** - Código limpio y eficiente
- **Personalizables** - Fácil de modificar colores y efectos

## 🌈 Paleta de Colores

Los iconos usan la paleta oficial de Club Tesoros:

- **Amarillo**: #FFB800, #FFC107
- **Cyan**: #00D4FF, #0099FF
- **Rosa**: #FF1493, #E91E63
- **Verde Lima**: #76FF03, #64DD17
- **Naranja**: #FF6D00, #FF9100
- **Púrpura**: #9C27B0, #7B1FA2

## 💡 Tips

1. Usa `size` entre 24-80px para mejor visualización
2. Combina con Framer Motion para animaciones épicas
3. Los gradientes se definen en `<defs>` para reutilización
4. Cada icono tiene su propio filtro de sombra único

## 🚀 Crear Nuevos Iconos

Para crear un nuevo icono:

1. Define gradientes en `<defs>`
2. Usa la paleta de colores oficial
3. Agrega filtros para sombras/glows
4. Mantén el viewBox en "0 0 64 64"
5. Exporta como componente React con props `size` y `className`

## 📚 Recursos Adicionales

- [Lucide React](https://lucide.dev/) - Para iconos adicionales básicos
- [SVG Gradient Generator](https://cssgradient.io/) - Crear gradientes
- [SVG Path Editor](https://yqnn.github.io/svg-path-editor/) - Editar paths

---

Creado con ❤️ para Club Tesoros

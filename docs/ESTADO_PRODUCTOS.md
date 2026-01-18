# Sistema de Estado de Productos con Estrellas ⭐

## Descripción

El sistema de estado de productos ahora utiliza un sistema de calificación de **0 a 5 estrellas** para indicar la condición del producto, permitiendo a los clientes evaluar rápidamente el estado de cada artículo.

## Escala de Estrellas

| Estrellas | Estado | Descripción |
|-----------|--------|-------------|
| ⭐⭐⭐⭐⭐ (5) | Nuevo | Producto completamente nuevo, sin usar |
| ⭐⭐⭐⭐ (4) | Excelente estado | Producto casi nuevo, mínimo uso |
| ⭐⭐⭐ (3) | Buen estado | Producto usado pero en buenas condiciones |
| ⭐⭐ (2) | Estado regular | Producto con signos de uso visible |
| ⭐ (1) | Desgastado | Producto muy usado pero funcional |
| (0) | Para reparar | Producto que necesita reparación |

## Implementación Técnica

### Modelo de Datos

```typescript
interface IProducto {
  estado: number; // 0-5 estrellas
  // ... otros campos
}
```

El campo `estado` en MongoDB ahora es de tipo `Number` con validación:
- Mínimo: 0
- Máximo: 5
- Por defecto: 3 (Buen estado)

### Visualización

#### En Formularios
Los usuarios seleccionan el estado mediante un dropdown con opciones visuales:
```
⭐⭐⭐⭐⭐ Nuevo
⭐⭐⭐⭐ Excelente
⭐⭐⭐ Bueno
⭐⭐ Regular
⭐ Desgastado
Para reparar
```

#### En Listados y Detalles
Las estrellas se muestran visualmente:
- Estrellas llenas (⭐) para la calificación
- Estrellas vacías (☆) para completar hasta 5

## Migración de Datos Existentes

Si tienes productos con el sistema antiguo (texto), ejecuta el script de migración:

```bash
npm run migrate:estado
```

### Mapeo de Migración

El script convierte automáticamente:
- `"nuevo"` → 5 estrellas
- `"como_nuevo"` → 4 estrellas
- `"usado"` → 3 estrellas
- `"para_reparar"` → 0 estrellas

## Archivos Modificados

### Modelo
- `models/Producto.ts` - Campo `estado` cambiado de string a number

### Componentes
- `components/AgregarProductoModal.tsx` - Selector de estrellas en formulario

### Páginas
- `app/productos/[id]/page.tsx` - Visualización de estrellas en detalle
- `app/productos/page.tsx` - Estrellas en listado general
- `app/mis-productos/page.tsx` - Estrellas en mis productos
- `app/ferias/[id]/page.tsx` - Estrellas en productos de feria

### Scripts
- `scripts/migrate-estado-productos.ts` - Script de migración

## Beneficios

1. **Visual e Intuitivo**: Las estrellas son universalmente reconocidas
2. **Más Granular**: 6 niveles vs 4 anteriores
3. **Mejor UX**: Los compradores entienden rápidamente la condición
4. **Estándar**: Sistema similar a plataformas de e-commerce populares

## Uso

### Crear Producto
1. Al agregar un producto, selecciona el estado del dropdown
2. Por defecto se selecciona "⭐⭐⭐ Bueno" (3 estrellas)

### Ver Productos
- Las estrellas aparecen en todas las vistas de productos
- En la página de detalle se muestra también el texto descriptivo

## Notas

- El campo es **requerido** al crear productos
- Los productos existentes se migran automáticamente
- El valor por defecto es 3 estrellas (Buen estado)

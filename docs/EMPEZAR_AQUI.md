# 🎪 ¡Bienvenido a Club Tesoros!

## 👋 ¡Hola! Empieza aquí

Este es tu proyecto **Club Tesoros** - una plataforma para gestionar ferias de pulgas en el Condominio Nueva Toledo.

## 🚀 3 Pasos para Comenzar

### Paso 1: Instalar Dependencias ⚙️

Abre tu terminal en esta carpeta y ejecuta:

```bash
npm install
```

Esto instalará todas las librerías necesarias (puede tomar 1-2 minutos).

### Paso 2: Configurar Base de Datos 🗄️

#### Opción A: MongoDB Atlas (Recomendado - Gratis)

1. Ve a [mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2. Crea una cuenta gratuita
3. Crea un cluster (selecciona el plan FREE)
4. Crea un usuario de base de datos
5. Permite acceso desde cualquier IP (0.0.0.0/0)
6. Obtén tu connection string

#### Configurar Variables de Entorno

```bash
cp .env.example .env.local
```

Abre `.env.local` y pega tu connection string:

```env
MONGODB_URI=mongodb+srv://tu-usuario:tu-password@cluster.mongodb.net/club-tesoros
```

### Paso 3: Ejecutar el Proyecto 🎉

```bash
npm run dev
```

Abre tu navegador en: **http://localhost:3000**

## 🎨 ¿Qué Verás?

### Página Principal
- Título colorido estilo Stumble Guys
- Botones para acceder a Ferias y Productos
- Diseño divertido con animaciones

### Sección de Ferias
- Crear nuevas ferias
- Ver lista de ferias
- Ver detalle de cada feria

### Sección de Productos
- Ver catálogo de productos
- Filtrar por categorías
- Ver precios y vendedores

## 📖 Documentación Disponible

Tenemos guías completas para ayudarte:

1. **INICIO_RAPIDO.md** 🏃
   - Configuración paso a paso
   - Solución de problemas comunes

2. **ESTRUCTURA.md** 📁
   - Cómo está organizado el código
   - Dónde encontrar cada cosa

3. **DATOS_EJEMPLO.md** 📊
   - Ejemplos de ferias y productos
   - Para probar la aplicación

4. **DEPLOYMENT.md** 🚀
   - Cómo publicar en internet
   - Configuración de Vercel

5. **RESUMEN.md** 📋
   - Visión general del proyecto
   - Características y tecnologías

## 🧪 Probar la Conexión a MongoDB

Antes de empezar, verifica que MongoDB esté configurado:

```bash
npm run test:db
```

Si ves ✅, ¡todo está bien!

## 🎯 Tu Primera Feria

1. Ejecuta `npm run dev`
2. Ve a http://localhost:3000
3. Click en "Ferias"
4. Click en "+ Nueva Feria"
5. Llena el formulario:
   - Nombre: "Feria de Primavera 2024"
   - Fecha: Selecciona una fecha
   - Descripción: "Primera feria del año"
   - Estado: "Planificada"
6. Click en "✨ Crear Feria"

¡Felicidades! 🎉 Has creado tu primera feria.

## 🎁 Agregar Productos

Por ahora, los productos se agregan mediante la API. En el futuro agregaremos una interfaz visual.

Usa Postman o Thunder Client para hacer POST a:
```
http://localhost:3000/api/productos
```

Con este JSON:
```json
{
  "nombre": "Lego Star Wars",
  "descripcion": "Set completo en excelente estado",
  "categoria": "juguete",
  "precio": 25,
  "vendedor": "María González",
  "feriaId": "ID_DE_TU_FERIA",
  "vendido": false
}
```

## 🎨 Personalizar Colores

Los colores están en `app/globals.css`:

```css
--stumble-pink: #FF6B9D;      /* Rosa principal */
--stumble-yellow: #FFC93C;    /* Amarillo */
--stumble-cyan: #4ECDC4;      /* Cyan */
--stumble-green: #95E1D3;     /* Verde */
--stumble-red: #FF6B6B;       /* Rojo */
```

Cámbialos a tu gusto y guarda. Los cambios se verán automáticamente.

## 🐛 ¿Problemas?

### Error: Cannot connect to MongoDB
- Verifica que MONGODB_URI esté en .env.local
- Confirma que tu IP esté permitida en MongoDB Atlas
- Ejecuta `npm run test:db` para diagnosticar

### Puerto 3000 ocupado
```bash
npm run dev -- -p 3001
```

### Cambios no se ven
- Guarda el archivo
- Refresca el navegador (Cmd+R o Ctrl+R)
- Si persiste, detén el servidor (Ctrl+C) y ejecuta `npm run dev` de nuevo

## 📱 Comandos Útiles

```bash
npm run dev        # Iniciar servidor de desarrollo
npm run build      # Crear versión de producción
npm run test:db    # Probar conexión a MongoDB
npm run lint       # Revisar código
```

## 🎓 Aprender Más

### Tecnologías Usadas
- **Next.js**: [nextjs.org/docs](https://nextjs.org/docs)
- **React**: [react.dev](https://react.dev)
- **Tailwind CSS**: [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **MongoDB**: [mongodb.com/docs](https://www.mongodb.com/docs)
- **Framer Motion**: [framer.com/motion](https://www.framer.com/motion)

## 🚀 Siguiente Paso: Deployment

Cuando estés listo para publicar tu app en internet:

1. Lee **DEPLOYMENT.md**
2. Sube tu código a GitHub
3. Conecta con Vercel
4. ¡Tu app estará en línea en minutos!

## 🤝 Comunidad

Este proyecto es para el Condominio Nueva Toledo. ¡Todos pueden contribuir!

- Reporta bugs
- Sugiere mejoras
- Comparte ideas
- Ayuda a otros vecinos

## 🎊 ¡Listo para Empezar!

Ya tienes todo lo necesario. Sigue los 3 pasos arriba y en minutos tendrás tu plataforma funcionando.

**¿Dudas?** Revisa la documentación o pregunta a la comunidad.

**¡Que disfrutes gestionando las ferias de pulgas!** 🎪🎁

---

### 📞 Ayuda Rápida

| Problema | Solución |
|----------|----------|
| No instala dependencias | Verifica que tengas Node.js instalado |
| Error de MongoDB | Revisa INICIO_RAPIDO.md |
| Puerto ocupado | Usa `npm run dev -- -p 3001` |
| Cambios no se ven | Refresca el navegador |
| Quiero personalizar | Edita `app/globals.css` |

---

*¡Bienvenido a Club Tesoros! 🎉*

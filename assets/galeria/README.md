# Sistema de Galería - ANINSART

Esta carpeta contiene las imágenes que se muestran en la página de galería del sitio web.

## Estructura de Carpetas

```
assets/galeria/
├── pulover/      → Fotos de pulóveres personalizados
├── pantalon/     → Fotos de pantalones personalizados
├── chaqueta/     → Fotos de chaquetas de mezclilla
├── lienzo/       → Fotos de cuadros en lienzo
├── vinilo/       → Fotos de discos de vinilo/DVD pintados
└── bolsa/        → Fotos de bolsas de tela personalizadas
```

## Cómo Agregar Tus Fotos

1. **Entra a la carpeta del producto** que quieres actualizar (ejemplo: `pulover/`)

2. **Reemplaza las imágenes placeholder** con tus propias fotos:
   - Elimina los archivos existentes (1.jpg, 2.jpg, etc.)
   - Agrega tus fotos con los mismos nombres: `1.jpg`, `2.jpg`, `3.jpg`, `4.jpg`

3. **Formatos aceptados**:
   - JPG/JPEG (recomendado)
   - PNG
   - WebP

4. **Especificaciones recomendadas**:
   - Tamaño: 1200x900px o mayor
   - Proporción: 4:3 (horizontal)
   - Peso: menos de 500KB por imagen
   - Calidad: Buena iluminación, fondo limpio

## Agregar Más Imágenes

Para mostrar más de 4 imágenes por categoría:

1. **Agrega más archivos** con nombres secuenciales: `5.jpg`, `6.jpg`, etc.

2. **Actualiza el archivo** `js/data.js`:
   ```javascript
   window.GALERIA = {
     "pulover-personalizado": [
       "assets/galeria/pulover/1.jpg",
       "assets/galeria/pulover/2.jpg",
       "assets/galeria/pulover/3.jpg",
       "assets/galeria/pulover/4.jpg",
       "assets/galeria/pulover/5.jpg",  // ← Agregar aquí
       "assets/galeria/pulover/6.jpg"   // ← Y aquí
     ],
     // ... resto de productos
   }
   ```

## Notas Importantes

- Las imágenes se cargan en el orden que aparecen en `js/data.js`
- Si una imagen no existe, se oculta automáticamente (no muestra error)
- Las imágenes placeholder actuales dicen "Reemplaza esta imagen con tu foto"
- Cada carpeta tiene su propio README con instrucciones específicas

## Optimización

Para mejorar el rendimiento del sitio:
- Comprime las imágenes antes de subirlas (usa TinyPNG, ImageOptim, etc.)
- Mantén el tamaño de cada imagen por debajo de 500KB
- Usa JPG para fotos (mejor compresión que PNG)

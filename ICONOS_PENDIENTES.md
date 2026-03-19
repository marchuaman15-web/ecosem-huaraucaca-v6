# 📱 Íconos PWA - PENDIENTE

Los archivos `icon-192.png` y `icon-512.png` referenciados en `manifest.json` deben ser creados.

## Opciones:

### Opción 1: Generar íconos con IA
Usa una herramienta como:
- https://www.pwabuilder.com/ (generador de íconos PWA)
- Canva (diseño personalizado)
- DALL-E o Midjourney

### Opción 2: Usar un ícono temporal
El archivo `icon-placeholder.svg` puede convertirse a PNG:

```bash
# Si tienes ImageMagick instalado:
convert -background none -size 192x192 icon-placeholder.svg icon-192.png
convert -background none -size 512x512 icon-placeholder.svg icon-512.png
```

### Opción 3: Subir tus propios íconos
Simplemente coloca:
- `icon-192.png` (192x192px)
- `icon-512.png` (512x512px)

En la raíz del proyecto.

---

**Características del ícono ideal:**
- Fondo: Color naranja ECOSEM (#F5A623)
- Logo: Llave inglesa o símbolo de mantenimiento
- Texto: "ECOSEM" o "OT"
- Formato: PNG con transparencia

**MIENTRAS TANTO:** El sistema funcionará sin problemas, solo no aparecerá el ícono al instalar como PWA en móvil.

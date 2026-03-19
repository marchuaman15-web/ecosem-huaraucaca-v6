# 🚀 Guía de Despliegue en Cloudflare Pages

## Paso 1: Subir a GitHub

1. Ve a: https://github.com/new
2. Nombre del repositorio: `ecosem-huaraucaca-v6`
3. Descripción: "Sistema de Gestión de OT - ECOSEM HUARAUCACA v6.0"
4. Marca como **Privado** (recomendado para uso interno)
5. NO inicializar con README (ya tenemos uno)
6. Clic en **Create repository**

## Paso 2: Subir los archivos

**Opción A - Desde GitHub Web (más fácil):**

1. En la página del nuevo repo, clic en "uploading an existing file"
2. Arrastra TODOS los archivos de esta carpeta
3. Commit message: "Initial commit - ECOSEM v6.0"
4. Clic en "Commit changes"

**Opción B - Desde terminal Git:**

```bash
git init
git add .
git commit -m "Initial commit - ECOSEM v6.0"
git branch -M main
git remote add origin https://github.com/marchuaman15-web/ecosem-huaraucaca-v6.git
git push -u origin main
```

## Paso 3: Conectar con Cloudflare Pages

1. Ve a: https://dash.cloudflare.com/
2. Clic en "Workers & Pages" en el menú lateral
3. Clic en "Create application"
4. Pestaña "Pages" → "Connect to Git"
5. Autoriza acceso a GitHub si es necesario
6. Selecciona el repo: `ecosem-huaraucaca-v6`
7. **Build settings:**
   - Framework preset: **None**
   - Build command: (dejar vacío)
   - Build output directory: `/`
8. Clic en "Save and Deploy"

## Paso 4: Configurar dominio personalizado (Opcional)

Si tienes un dominio:
1. En Cloudflare Pages → Settings → Custom domains
2. Añade tu dominio (ej: `ot.ecosem.com`)
3. Sigue las instrucciones de DNS

## Paso 5: Verificar

Una vez desplegado, Cloudflare te dará una URL como:
```
https://ecosem-huaraucaca-v6.pages.dev
```

Prueba el sistema:
- Usuario: `admin`
- Password: `ecosem2025`

## 🔄 Actualizaciones futuras

Cada vez que hagas un `git push` a GitHub, Cloudflare automáticamente:
1. Detecta el cambio
2. Reconstruye el sitio
3. Lo despliega en 1-2 minutos

---

**IMPORTANTE:** 

- ✅ El proyecto usa Firebase (ya configurado)
- ✅ Todos los datos se guardan en Firestore
- ✅ El sistema funciona 24/7 en la nube
- ⚠️ NO compartas la URL públicamente (uso interno ECOSEM)

---

¿Problemas? Contacta a: Ing. Marco Antonio Huaman Poma

# 🍷 Experiencias Mendoza v2.0

> Un portal exclusivo para la curaduría de experiencias en Mendoza.

![Gothic Luxury](https://img.shields.io/badge/Design-Gothic%20Luxury-D4AF37?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## 🎯 Visión del Proyecto

**Experiencias Mendoza** transforma la oferta turística regional en vivencias inmersivas y exclusivas. Este sitio web actúa como un menú digital de experiencias curadas, donde cada interacción refleja la elegancia y sofisticación del wine country argentino.

### Filosofía de Diseño
- **Gothic Chic & Dark Luxury**: Paleta oscura (#050505) con acentos dorados (#D4AF37)
- **Atmósfera Inmersiva**: Texturas grain, glassmorphism y animaciones cinematográficas
- **Tipografía Editorial**: Playfair Display + Montserrat

---

## 🗂️ Estructura del Proyecto

```
MenuDeExperiencia/
├── index.html          # Página principal
├── css/
│   └── style.css       # Sistema de diseño completo
├── js/
│   └── main.js         # Lógica de interacción
├── assets/             # Imágenes (agregar manualmente)
│   ├── tumba-vid.jpg
│   ├── museos.jpg
│   └── ateliers.jpg
├── .github/
│   └── workflows/
│       └── deploy-pages.yml
└── README.md
```

---

## 📋 Catálogo de Experiencias

| Categoría | Experiencia | Descripción | Precio |
|-----------|-------------|-------------|--------|
| **Enológica** | Relatos de Tumba y Vid | Cementerio de Luján + Bodega Martino Wines | $82.500 |
| **Enológica** | Sunset Wine Tasting | Degustación al atardecer en Bodega Centenario | $60.000 |
| **Enológica** | Vendimia Privada | Cosecha manual con enólogo privado | $105.000 |
| **Cultural** | Inmersión en Museos | Tour guiado por museos selectos | $37.500 |
| **Cultural** | Noche de Ópera & Cena | Velada lírica + cena maridaje | $67.500 |
| **Cultural** | Mendoza Colonial Walking Tour | Caminata por casco histórico | $27.000 |
| **Bohemia** | Ruta de Ateliers | Visita a talleres de artistas locales | $22.500 |
| **Bohemia** | Taller de Cerámica en los Andes | Workshop de cerámica con maestro alfarero | $30.000 |
| **Bohemia** | Live Jazz & Coctelería de Autor | Noche de jazz en bar speakeasy | $45.000 |
| **Vida Nocturna** | San Patricio en New Rock | Entradas fiesta San Patricio + Sorteo liberadas | $16.000 |
| **Vida Nocturna** | Fiesta Frankie en Casa Roja | Pases Casa Roja | $15.000 |
| **Vida Nocturna** | Upstairs Sheraton (Pase Individual) | Acceso rooftop | $36.000 |
| **Vida Nocturna** | Upstairs Sheraton (Pase 2x) | VIP rooftop para 2 | $55.000 |

---

## 🛍️ Shop Exclusivo

Adicionalmente, el portal cuenta con una sección de e-commerce con carrito de compras y cierre vía WhatsApp:

| Producto | Detalle | Precio |
|----------|---------|--------|
| Caja Malbec Reserva | 6 botellas seleccionadas | $127.500 |
| Kit de Cata Premium | Copas, decantador y guía | $52.500 |
| Poncho Artesanal Mendocino | Tejido a mano de lana | $67.500 |
| Aceite de Oliva Finca Privada | Extra virgen | $18.000 |
| Experiencia Gift Box | Vino + cata + experiencia para 2 | $180.000 |
| Vela Aromática "Viñedos" | Cera de soja, roble y uva | $12.000 |

---

## 🛠️ Stack Tecnológico

- **HTML5**: Estructura semántica con accesibilidad (ARIA)
- **CSS3**: Variables CSS, Keyframe animations, Glassmorphism
- **JavaScript ES6+**: IntersectionObserver, Parallax Effects
- **Hosting**: GitHub Pages con deploy automático

---

## 📱 Integración WhatsApp

Los botones de reserva redirigen a WhatsApp con mensajes pre-configurados:

```javascript
const CONFIG = {
    whatsappNumber: '5492617094195'
};
```

**Mensaje generado:**
```
Hola, deseo sumergirme en la experiencia "[Nombre]". ¿Podrían brindarme disponibilidad?
```

---

## 🔧 Guía de Mantenimiento

### Actualizar Precios

Editar `index.html`, buscar la clase `.card-price`:

```html
<span class="card-price">$82.500</span>
```

### Cambiar Número de WhatsApp

Editar `js/main.js`:

```javascript
const CONFIG = {
    whatsappNumber: 'NUEVO_NUMERO_AQUI'
};
```

### Agregar Imágenes

Colocar imágenes en la carpeta `assets/` y actualizar los estilos inline en las cards:

```html
<div class="card-image" style="background-image: url('assets/tu-imagen.jpg');"></div>
```

---

## 🚀 Deployment

```bash
# 1. Verificar rama
git checkout main

# 2. Agregar cambios
git add .

# 3. Commit profesional
git commit -m "chore: release v2.0 - increased prices by 50% and expanded menu"

# 4. Push (dispara GitHub Actions)
git push origin main
```

---

## 📄 Licencia

© 2026 Experiencias Mendoza. Todos los derechos reservados.

---

<p align="center">
  <em>Donde cada momento se transforma en un recuerdo eterno</em>
</p>

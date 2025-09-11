# Arura Theme Documentation

## Overview

Arura is a modern, elegant, and feature-rich Salla theme designed for e-commerce stores. It combines beautiful design with advanced functionality to provide an exceptional shopping experience.

## Features

### Core Features
- ✅ Responsive design optimized for all devices
- ✅ Modern and clean interface
- ✅ RTL (Right-to-Left) language support
- ✅ Multi-currency support
- ✅ SEO optimized structure
- ✅ Fast loading performance
- ✅ Accessibility compliant
- ✅ Cross-browser compatibility

### Advanced Features
- ✅ Product wishlist functionality
- ✅ Product comparison feature
- ✅ Quick view product modal
- ✅ Advanced search with auto-suggestions
- ✅ Cart sidebar with live updates
- ✅ Newsletter subscription
- ✅ Social media integration
- ✅ Lazy loading for images
- ✅ Smooth animations and transitions
- ✅ Mobile-first design approach

### E-commerce Features
- ✅ Product cards with hover effects
- ✅ Product variants (colors, sizes)
- ✅ Product reviews and ratings
- ✅ Shopping cart with quantity controls
- ✅ Checkout process optimization
- ✅ Order tracking
- ✅ Account management
- ✅ Address book management

## File Structure

```
arura-theme/
├── assets/
│   ├── css/
│   │   ├── main.css          # Main stylesheet
│   │   ├── header.css        # Header-specific styles
│   │   ├── products.css      # Product-related styles
│   │   └── rtl.css          # RTL language support
│   ├── js/
│   │   └── main.js          # Main JavaScript functionality
│   ├── images/              # Theme images and icons
│   └── fonts/               # Custom fonts
├── views/
│   ├── layouts/
│   │   └── master.twig      # Main layout template
│   ├── pages/
│   │   └── home.twig        # Homepage template
│   └── partials/
│       ├── header.twig      # Header component
│       ├── footer.twig      # Footer component
│       ├── product-card.twig # Product card component
│       ├── search-form.twig  # Search form component
│       └── cart-sidebar.twig # Cart sidebar component
├── locales/
│   └── en.json              # English translations
├── src/
│   ├── scss/                # Source SCSS files
│   └── js/                  # Source JavaScript files
├── theme.json               # Theme configuration
├── package.json             # Build tools and dependencies
└── README.md               # Theme documentation
```

## Installation

1. **Download the theme files**
   ```bash
   git clone https://github.com/masindustrys/aura.git
   cd aura
   ```

2. **Install dependencies (for development)**
   ```bash
   npm install
   ```

3. **Build the theme**
   ```bash
   npm run build
   ```

4. **Upload to Salla**
   - Compress the theme folder into a ZIP file
   - Upload through the Salla admin panel
   - Activate the theme

## Customization

### Theme Settings

The theme includes extensive customization options available through the Salla customizer:

#### Colors
- **Primary Color**: Main brand color used throughout the theme
- **Secondary Color**: Supporting color for accents and highlights
- **Accent Color**: Used for buttons, links, and interactive elements

#### Layout
- **Header Style**: Choose between Classic, Modern, or Minimal header layouts
- **Layout Width**: Select Boxed or Full Width layout

#### Branding
- **Logo**: Upload your store logo
- **Favicon**: Set your store favicon

### CSS Customization

#### Custom Properties (CSS Variables)
The theme uses CSS custom properties for easy customization:

```css
:root {
  --primary-color: #1a202c;
  --secondary-color: #2d3748;
  --accent-color: #3182ce;
  /* Add your custom values */
}
```

#### Override Styles
Create a custom CSS file to override default styles:

```css
/* Custom styles */
.header {
  background-color: your-custom-color;
}

.product-card {
  border-radius: your-custom-radius;
}
```

### JavaScript Customization

#### Adding Custom Functionality
Extend the theme's JavaScript by adding to the ARURA object:

```javascript
// Add custom functionality
ARURA.customFeature = {
  init: function() {
    // Your custom code here
  }
};

// Initialize your custom feature
document.addEventListener('DOMContentLoaded', function() {
  ARURA.customFeature.init();
});
```

## Development

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git

### Setup Development Environment

1. **Clone the repository**
   ```bash
   git clone https://github.com/masindustrys/aura.git
   cd aura
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

### Build Scripts

- `npm run build` - Build production assets
- `npm run dev` - Start development with file watching
- `npm run lint` - Run code linting
- `npm run format` - Format code with Prettier
- `npm run clean` - Clean build directory

### CSS Development
The theme uses PostCSS for CSS processing:
- Autoprefixer for vendor prefixes
- CSSnano for minification
- PostCSS Import for file imports

### JavaScript Development
JavaScript is processed with:
- Terser for minification
- Source maps for debugging
- ESLint for code quality

## Components

### Header Component
Located in `views/partials/header.twig`

Features:
- Multi-level navigation
- Search functionality
- User account links
- Shopping cart
- Mobile responsive menu

### Product Card Component
Located in `views/partials/product-card.twig`

Features:
- Product image with hover effect
- Product badges (New, Sale, etc.)
- Quick action buttons (Wishlist, Compare, Quick View)
- Variant display (colors, sizes)
- Rating and reviews

### Cart Sidebar Component
Located in `views/partials/cart-sidebar.twig`

Features:
- Live cart updates
- Quantity controls
- Remove items
- Cart totals
- Checkout button
- Recommended products

## Localization

### Adding New Languages

1. **Create language file**
   ```bash
   cp locales/en.json locales/ar.json
   ```

2. **Translate strings**
   ```json
   {
     "common": {
       "home": "الرئيسية",
       "about": "من نحن"
     }
   }
   ```

3. **Update theme.json**
   ```json
   {
     "supports": ["rtl", "ar", "en"]
   }
   ```

### Translation Keys
All text strings use translation keys:
```twig
{{ 'Add to Cart'|t }}
{{ 'Search for products...'|t }}
```

## Performance Optimization

### Image Optimization
- Use lazy loading for images
- Optimize image sizes for different devices
- Use WebP format when supported

### CSS Optimization
- Minimize CSS file sizes
- Use CSS custom properties for theming
- Optimize for critical path rendering

### JavaScript Optimization
- Minimize JavaScript bundles
- Use event delegation
- Implement debouncing for scroll events

## Browser Support

The theme supports:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

The theme follows WCAG 2.1 guidelines:
- Semantic HTML structure
- Keyboard navigation support
- Screen reader compatibility
- Sufficient color contrast
- Focus indicators

## SEO Features

- Structured data markup
- Open Graph meta tags
- Twitter Card support
- Canonical URLs
- Optimized page titles and descriptions

## Troubleshooting

### Common Issues

#### Theme Not Loading
1. Check file permissions
2. Verify theme.json syntax
3. Ensure all required files are present

#### Styles Not Applying
1. Clear browser cache
2. Check CSS file paths
3. Verify CSS syntax

#### JavaScript Errors
1. Check browser console
2. Verify JavaScript syntax
3. Ensure jQuery is loaded (if required)

### Debug Mode
Enable debug mode in theme.json:
```json
{
  "debug": true
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For support and questions:
- Email: contact@arura.theme
- GitHub Issues: https://github.com/masindustrys/aura/issues
- Documentation: https://github.com/masindustrys/aura/wiki

## License

This theme is licensed under the MIT License. See LICENSE file for details.

## Changelog

### Version 1.0.0
- Initial release
- Complete theme structure
- Advanced features implementation
- RTL support
- Mobile optimization
- SEO optimization

---

© 2024 Arura Theme. All rights reserved.
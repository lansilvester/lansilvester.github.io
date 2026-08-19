import { readFileSync } from 'node:fs'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Baca src/data/site.json dan suntikkan meta SEO ke index.html saat build,
// sehingga teks SEO bisa diedit lewat dashboard Decap CMS tanpa sentuh kode.
function htmlSiteMeta() {
  let site = {}
  let content = {}
  return {
    name: 'html-site-meta',
    buildStart() {
      try {
        site = JSON.parse(readFileSync(new URL('./src/data/site.json', import.meta.url), 'utf8'))
        content = JSON.parse(readFileSync(new URL('./src/data/content.json', import.meta.url), 'utf8'))
      } catch {
        site = {}
        content = {}
      }
    },
    transformIndexHtml(html) {
      const abs = (src) => (src && src.startsWith('/') ? `${site.url.replace(/\/$/, '')}${src}` : src)
      const ogImage = abs(site.ogImage)
      
      const socials = content.SOCIALS || []
      const hero = content.HERO || {}
      
      const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": hero.name || site.title || "Portfolio",
        "url": site.url || "",
        "jobTitle": site.description ? site.description.split('-')[1]?.trim() || "Web Developer" : "Web Developer",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": hero.location || "",
          "addressCountry": "ID"
        },
        "sameAs": socials.map(s => s.url).filter(Boolean)
      }

      return html
        .replace(/<title>[^<]*<\/title>/, `<title>${site.title || 'Portfolio'}</title>`)
        .replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${site.description || ''}"`)
        .replace(/<meta name="author" content="[^"]*"/, `<meta name="author" content="${site.author || ''}"`)
        .replace(/<meta name="theme-color" content="[^"]*"/, `<meta name="theme-color" content="${site.themeColor || '#3b82f6'}"`)
        .replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${site.url || ''}"`)
        .replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${site.url || ''}"`)
        .replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${site.ogTitle || site.title || ''}"`)
        .replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${site.ogDescription || site.description || ''}"`)
        .replace(/<meta property="og:image" content="[^"]*"/, `<meta property="og:image" content="${ogImage || ''}"`)
        .replace(/<meta property="og:site_name" content="[^"]*"/, `<meta property="og:site_name" content="${site.title || ''}"`)
        .replace(/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${site.ogTitle || site.title || ''}"`)
        .replace(/<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${site.ogDescription || site.description || ''}"`)
        .replace(/<meta name="twitter:image" content="[^"]*"/, `<meta name="twitter:image" content="${ogImage || ''}"`)
        .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n</script>`)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [htmlSiteMeta(), react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('lucide-react')) return 'icons'
          if (id.includes('react-type-animation')) return 'type-animation'
          if (id.includes('/react/') || id.includes('react-dom') || id.includes('react-router')) {
            return 'react-vendor'
          }
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
  },
})

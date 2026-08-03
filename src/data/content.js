// ============================================================
// CONTENT & DATA — ADAPTER
// Sumber data ada di file JSON yang bisa diedit lewat Decap CMS
// (admin di /admin/):
//   • src/data/content.json — isi situs (hero, skill, portfolio, ...)
//   • src/data/layout.json  — urutan & visibilitas section
//   • src/data/ui.json      — teks label antarmuka (ID/EN)
// Komponen tetap import dari file ini; bentuk datanya sama
// seperti sebelumnya, hanya teks kini berbentuk { id, en } yang
// di-resolve oleh t() dari src/i18n.jsx.
// ============================================================

import content from './content.json'
import layout from './layout.json'

export const NAV_LINKS = content.NAV_LINKS
export const SOCIALS = content.SOCIALS
export const FOOTER_SOCIALS = content.FOOTER_SOCIALS
export const HERO = content.HERO
export const ABOUT = content.ABOUT
export const QUALIFICATIONS = content.QUALIFICATIONS
export const TESTIMONIALS = content.TESTIMONIALS
export const CONTACT_INFO = content.CONTACT_INFO
export const CONTACT_FORM = content.CONTACT_FORM
export const MODES = content.MODES
export const PRICING = content.PRICING

export const LAYOUT = layout

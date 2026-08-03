// ============================================================
// CONTENT & DATA
// Semua teks yang ditampilkan memakai "kunci i18n" yang
// diterjemahkan di src/i18n.jsx (bahasa ID & EN). Komponen
// memanggil t(key) — lihat contoh di tiap section.
//
// ISI PLACEHOLDER DI BAWAH INI:
//   • demo / github  -> ganti '#' dengan URL proyek asli Anda
//   • TESTIMONIALS   -> ganti teks kutipan dengan review asli
//   • gambar /images/*.svg -> ganti dengan foto atau screenshot
//     karya asli Anda (taruh file di folder public/)
// ============================================================

export const NAV_LINKS = [
  { label: 'nav.home', href: '#home', icon: 'home' },
  { label: 'nav.about', href: '#about', icon: 'user' },
  { label: 'nav.skill', href: '#skills', icon: 'file' },
  { label: 'nav.services', href: '#services', icon: 'briefcase' },
  { label: 'nav.portfolio', href: '#portfolio', icon: 'image' },
  { label: 'nav.contact', href: '#contact', icon: 'mail' },
]

export const SOCIALS = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/varland-lengkong-323120152/',
    icon: 'linkedin',
  },
  { name: 'Instagram', url: 'https://instagram.com/lansilvester', icon: 'instagram' },
  { name: 'GitHub', url: 'https://github.com/lansilvester', icon: 'github' },
]

export const FOOTER_SOCIALS = [
  { name: 'Facebook', url: 'https://facebook.com/', icon: 'facebook' },
  { name: 'Instagram', url: 'https://instagram.com/lansilvester', icon: 'instagram' },
  { name: 'YouTube', url: 'https://www.youtube.com/channel/UCpGHBPDaXZtKm-gUhQzj5MQ', icon: 'youtube' },
  { name: 'GitHub', url: 'https://github.com/lansilvester', icon: 'github' },
  { name: 'LinkedIn', url: 'https://id.linkedin.com/in/varland-lengkong-323120152', icon: 'linkedin' },
]

export const HERO = {
  name: 'Alan',
  photo: '/images/profile.svg',
  phone: '(+62)821-8730-1372',
  email: 'alan.lengkong@gmail.com',
  location: 'Manado City - North Sulawesi',
  whatsapp: 'https://wa.me/6282187301372',
}

export const ABOUT = {
  photo: '/images/about.svg',
  cv: '/CV/CV-Varland-Lengkong.pdf',
  stats: [
    { value: '5+', label: 'about.statYears' },
    { value: '20+', label: 'about.statProjects' },
  ],
}

export const QUALIFICATIONS = {
  education: [
    {
      title: 'Teknik Informatika',
      place: 'Politeknik Negeri Manado',
      period: '2019 - 2023',
      side: 'right',
    },
    {
      title: 'Teknik Komputer Jaringan',
      place: 'SMK Negeri 1 Manado',
      period: '2015 - 2018',
      side: 'left',
    },
  ],
  work: [
    {
      title: 'Penelitian dan pengabdian masyarakat',
      place: 'Politeknik Negeri Manado',
      period: '2021-Sekarang',
      side: 'right',
    },
    {
      title: 'EO International Labour Organization',
      place: 'Politeknik Negeri Manado | Desa Tiwoho',
      period: '2019-2021',
      side: 'left',
    },
    {
      title: 'Studio Assistant',
      place: 'Flammen Studio',
      period: '2018-2019',
      side: 'right',
    },
    {
      title: 'Web Design & Development',
      place: 'Lomba Kompetensi Siswa (LKS) hingga tingkat Nasional',
      period: '2018 | Lombok',
      side: 'left',
    },
  ],
}

export const TESTIMONIALS = [
  {
    name: 'Johanes Roring',
    role: 'testimonial.role',
    image: '/images/testimonial2.svg',
    stars: 5,
    text: 'testimonial.quote1',
  },
  {
    name: 'Yogi Tangkilisan',
    role: 'testimonial.role',
    image: '/images/testimonial3.svg',
    stars: 5,
    text: 'testimonial.quote2',
  },
]

export const CONTACT_INFO = [
  { label: 'contact.phone', value: '(+62)821-8730-1372', icon: 'phone', href: 'tel:+6282187301372' },
  { label: 'contact.email', value: 'alan.lengkong@gmail.com', icon: 'mail', href: 'mailto:alan.lengkong@gmail.com' },
  { label: 'contact.location', value: 'Manado City - North Sulawesi', icon: 'map', href: null },
  { label: 'contact.whatsapp', value: 'WhatsApp', icon: 'whatsapp', href: 'https://wa.me/6282187301372' },
]

export const MODES = {
  developer: {
    id: 'developer',
    label: 'modes.developer.shortLabel',
    shortLabel: 'modes.developer.shortLabel',
    subLabel: 'Coding & Web',
    icon: 'code',
    homeSubtitle: 'modes.developer.homeSubtitle',
    skillsSubtitle: 'modes.developer.skillsSubtitle',
    skills: [
      {
        id: 'frontend',
        title: 'modes.developer.skills.frontend.title',
        subtitle: 'modes.developer.skills.frontend.subtitle',
        icon: 'code',
        skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS'],
      },
      {
        id: 'backend',
        title: 'modes.developer.skills.backend.title',
        subtitle: 'modes.developer.skills.backend.subtitle',
        icon: 'server',
        skills: ['PHP', 'MySQL', 'Python', 'Node JS', 'Express JS'],
      },
      {
        id: 'tools',
        title: 'modes.developer.skills.tools.title',
        subtitle: 'modes.developer.skills.tools.subtitle',
        icon: 'database',
        skills: ['MongoDB', 'Firebase', 'Git & GitHub', 'Postman'],
      },
    ],
    servicesSubtitle: 'modes.developer.servicesSubtitle',
    services: [
      {
        id: 'uiux',
        title: 'modes.developer.services.uiux.title',
        icon: 'layout',
        points: [
          'modes.developer.services.uiux.p1',
          'modes.developer.services.uiux.p2',
          'modes.developer.services.uiux.p3',
          'modes.developer.services.uiux.p4',
        ],
      },
      {
        id: 'webdev',
        title: 'modes.developer.services.webdev.title',
        icon: 'globe',
        points: [
          'modes.developer.services.webdev.p1',
          'modes.developer.services.webdev.p2',
          'modes.developer.services.webdev.p3',
          'modes.developer.services.webdev.p4',
        ],
      },
      {
        id: 'maintenance',
        title: 'modes.developer.services.maintenance.title',
        icon: 'settings',
        points: [
          'modes.developer.services.maintenance.p1',
          'modes.developer.services.maintenance.p2',
          'modes.developer.services.maintenance.p3',
          'modes.developer.services.maintenance.p4',
        ],
      },
    ],
    portfolioSubtitle: 'modes.developer.portfolioSubtitle',
    portfolio: [
      {
        id: 'd1',
        title: 'modes.developer.portfolio.p1.title',
        description: 'modes.developer.portfolio.p1.desc',
        image: '/images/portfolio1.svg',
        category: 'web',
        tech: ['React', 'Vite', 'Tailwind CSS'],
        demo: '#',
        github: '#',
      },
      {
        id: 'd2',
        title: 'modes.developer.portfolio.p2.title',
        description: 'modes.developer.portfolio.p2.desc',
        image: '/images/portfolio2.svg',
        category: 'web',
        tech: ['HTML', 'CSS', 'JavaScript'],
        demo: '#',
        github: '#',
      },
      {
        id: 'd3',
        title: 'modes.developer.portfolio.p3.title',
        description: 'modes.developer.portfolio.p3.desc',
        image: '/images/portfolio3.svg',
        category: 'system',
        tech: ['PHP', 'MySQL', 'Bootstrap'],
        demo: '#',
        github: '#',
      },
      {
        id: 'd4',
        title: 'modes.developer.portfolio.p4.title',
        description: 'modes.developer.portfolio.p4.desc',
        image: '/images/project.svg',
        category: 'ecommerce',
        tech: ['React', 'Node JS', 'MongoDB'],
        demo: '#',
        github: '#',
      },
    ],
  },
  creative: {
    id: 'creative',
    label: 'modes.creative.shortLabel',
    shortLabel: 'modes.creative.shortLabel',
    subLabel: 'Fotografi, Video & Desain',
    icon: 'camera',
    homeSubtitle: 'modes.creative.homeSubtitle',
    skillsSubtitle: 'modes.creative.skillsSubtitle',
    skills: [
      {
        id: 'photo',
        title: 'modes.creative.skills.photo.title',
        subtitle: 'modes.creative.skills.photo.subtitle',
        icon: 'camera',
        skills: ['Kamera Canon DSLR/Mirrorless', 'Komposisi & Pencahayaan', 'Adobe Lightroom', 'Retouching Foto'],
      },
      {
        id: 'video',
        title: 'modes.creative.skills.video.title',
        subtitle: 'modes.creative.skills.video.subtitle',
        icon: 'film',
        skills: ['Adobe Premiere Pro', 'Adobe After Effects', 'Color Grading', 'Storyboarding'],
      },
      {
        id: 'design',
        title: 'modes.creative.skills.design.title',
        subtitle: 'modes.creative.skills.design.subtitle',
        icon: 'palette',
        skills: ['Figma', 'Adobe Illustrator', 'Adobe Photoshop', 'Adobe XD'],
      },
      {
        id: 'motion',
        title: 'modes.creative.skills.motion.title',
        subtitle: 'modes.creative.skills.motion.subtitle',
        icon: 'sparkles',
        skills: ['Motion Graphic', 'Visual Effects', 'Adobe Animate', 'Blender'],
      },
    ],
    servicesSubtitle: 'modes.creative.servicesSubtitle',
    services: [
      {
        id: 'videography',
        title: 'modes.creative.services.videography.title',
        icon: 'film',
        points: [
          'modes.creative.services.videography.p1',
          'modes.creative.services.videography.p2',
          'modes.creative.services.videography.p3',
          'modes.creative.services.videography.p4',
        ],
      },
      {
        id: 'photography',
        title: 'modes.creative.services.photography.title',
        icon: 'camera',
        points: [
          'modes.creative.services.photography.p1',
          'modes.creative.services.photography.p2',
          'modes.creative.services.photography.p3',
          'modes.creative.services.photography.p4',
        ],
      },
      {
        id: 'editing',
        title: 'modes.creative.services.editing.title',
        icon: 'scissors',
        points: [
          'modes.creative.services.editing.p1',
          'modes.creative.services.editing.p2',
          'modes.creative.services.editing.p3',
          'modes.creative.services.editing.p4',
        ],
      },
      {
        id: 'design',
        title: 'modes.creative.services.design.title',
        icon: 'palette',
        points: [
          'modes.creative.services.design.p1',
          'modes.creative.services.design.p2',
          'modes.creative.services.design.p3',
          'modes.creative.services.design.p4',
        ],
      },
    ],
    portfolioSubtitle: 'modes.creative.portfolioSubtitle',
    portfolio: [
      {
        id: 'c1',
        title: 'modes.creative.portfolio.p1.title',
        description: 'modes.creative.portfolio.p1.desc',
        image: '/images/portfolio1.svg',
        category: 'video',
        tech: ['Adobe Premiere Pro', 'Color Grading'],
        demo: '#',
        github: '#',
      },
      {
        id: 'c2',
        title: 'modes.creative.portfolio.p2.title',
        description: 'modes.creative.portfolio.p2.desc',
        image: '/images/portfolio2.svg',
        category: 'photo',
        tech: ['Canon DSLR', 'Adobe Lightroom'],
        demo: '#',
        github: '#',
      },
      {
        id: 'c3',
        title: 'modes.creative.portfolio.p3.title',
        description: 'modes.creative.portfolio.p3.desc',
        image: '/images/portfolio3.svg',
        category: 'video',
        tech: ['Adobe Premiere Pro', 'After Effects'],
        demo: '#',
        github: '#',
      },
      {
        id: 'c4',
        title: 'modes.creative.portfolio.p4.title',
        description: 'modes.creative.portfolio.p4.desc',
        image: '/images/about.svg',
        category: 'social',
        tech: ['Canon Mirrorless', 'Adobe Premiere Pro'],
        demo: '#',
        github: '#',
      },
    ],
  },
}

export const PRICING = {
  plans: [
    {
      id: 'basic',
      name: 'pricing.basic.name',
      desc: 'pricing.basic.desc',
      price: '500rb',
      features: [
        'pricing.basic.feature1',
        'pricing.basic.feature2',
        'pricing.basic.feature3',
        'pricing.basic.feature4',
        'pricing.basic.feature5',
      ],
    },
    {
      id: 'pro',
      name: 'pricing.pro.name',
      desc: 'pricing.pro.desc',
      price: '1,5jt',
      popular: true,
      features: [
        'pricing.pro.feature1',
        'pricing.pro.feature2',
        'pricing.pro.feature3',
        'pricing.pro.feature4',
        'pricing.pro.feature5',
      ],
    },
    {
      id: 'premium',
      name: 'pricing.premium.name',
      desc: 'pricing.premium.desc',
      price: '3,5jt',
      features: [
        'pricing.premium.feature1',
        'pricing.premium.feature2',
        'pricing.premium.feature3',
        'pricing.premium.feature4',
        'pricing.premium.feature5',
      ],
    },
  ],
}

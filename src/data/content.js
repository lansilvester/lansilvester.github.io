export const NAV_LINKS = [
  { label: 'Home', href: '#home', icon: 'home' },
  { label: 'About', href: '#about', icon: 'user' },
  { label: 'Skill', href: '#skills', icon: 'file' },
  { label: 'Services', href: '#services', icon: 'briefcase' },
  { label: 'Portfolio', href: '#portfolio', icon: 'image' },
  { label: 'Contact', href: '#contact', icon: 'mail' },
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
  { name: 'Facebook', url: 'https://facebook.com/janganmasukanemail', icon: 'facebook' },
  { name: 'Instagram', url: 'https://instagram.com/lansilvester', icon: 'instagram' },
  { name: 'YouTube', url: 'https://www.youtube.com/channel/UCpGHBPDaXZtKm-gUhQzj5MQ', icon: 'youtube' },
  { name: 'GitHub', url: 'https://github.com/lansilvester', icon: 'github' },
  { name: 'LinkedIn', url: 'https://id.linkedin.com/in/varland-lengkong-323120152', icon: 'linkedin' },
]

export const HERO = {
  name: 'Alan',
  title: 'Halo, Alan di sini',
  description:
    'Saya membantu bisnis dan brand tampil profesional lewat website modern, konten video, dan desain visual yang dibuat untuk konversi.',
  photo: '/images/profile.svg',
  phone: '(+62)821-8730-1372',
  email: 'alan.lengkong@gmail.com',
  location: 'Manado City - North Sulawesi',
}

export const MODES = {
  developer: {
    id: 'developer',
    label: 'Developer / Programmer',
    shortLabel: 'Developer',
    subLabel: 'Coding & Web',
    icon: 'code',
    homeSubtitle: 'Web Developer | Freelancer',
    skillsSubtitle: 'Skill developer yang dikuasai',
    skills: [
      {
        id: 'frontend',
        title: 'Frontend Developer',
        subtitle: 'Lebih dari 5 tahun',
        icon: 'code',
        skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS'],
      },
      {
        id: 'backend',
        title: 'Backend Developer',
        subtitle: 'Lebih dari 5 tahun',
        icon: 'server',
        skills: ['PHP', 'MySQL', 'Python', 'Node JS', 'Express JS'],
      },
      {
        id: 'tools',
        title: 'Database & Tools',
        subtitle: 'Alat pendukung pengembangan',
        icon: 'database',
        skills: ['MongoDB', 'Firebase', 'Git & GitHub', 'Postman'],
      },
    ],
    servicesSubtitle: 'Layanan yang bisa kita kerjakan',
    services: [
      {
        id: 'uiux',
        title: 'UI/UX Designer',
        icon: 'layout',
        points: [
          'Perancangan antarmuka (UI) yang modern.',
          'Pengembangan halaman web responsif.',
          'Pembuatan interaksi elemen UX.',
          'Membangun brand digital perusahaan.',
        ],
      },
      {
        id: 'webdev',
        title: 'Web Development',
        icon: 'globe',
        points: [
          'Pengembangan web full-stack.',
          'Pembuatan REST API.',
          'Integrasi database (MySQL, MongoDB).',
          'Optimasi performa & SEO.',
        ],
      },
      {
        id: 'maintenance',
        title: 'Maintenance & Optimasi',
        icon: 'settings',
        points: [
          'Perbaikan bug dan error.',
          'Optimasi kecepatan loading.',
          'Penambahan fitur baru.',
          'Dukungan teknis berkelanjutan.',
        ],
      },
    ],
    portfolioSubtitle: 'Proyek pengembangan web terbaru',
    portfolio: [
      {
        title: 'Modern Website',
        image: '/images/portfolio1.svg',
        description: 'Website perusahaan modern, responsif, dan ringan dengan animasi halus.',
        demo: '#',
      },
      {
        title: 'Landing Page',
        image: '/images/portfolio2.svg',
        description: 'Halaman landing untuk produk dan event dengan fokus konversi.',
        demo: '#',
      },
      {
        title: 'Sistem Informasi',
        image: '/images/portfolio3.svg',
        description: 'Aplikasi web untuk manajemen data dan laporan (frontend + backend).',
        demo: '#',
      },
      {
        title: 'Online Store',
        image: '/images/project.svg',
        description: 'Toko online lengkap dengan keranjang, checkout, dan pembayaran.',
        demo: '#',
      },
    ],
  },
  creative: {
    id: 'creative',
    label: 'Creative / Videographer',
    shortLabel: 'Creative',
    subLabel: 'Fotografi, Video & Desain',
    icon: 'camera',
    homeSubtitle: 'Creative | Videographer | Photographer',
    skillsSubtitle: 'Skill creative yang dikuasai',
    skills: [
      {
        id: 'photo',
        title: 'Fotografi',
        subtitle: 'Lebih dari 7 tahun',
        icon: 'camera',
        skills: ['Kamera Canon DSLR/Mirrorless', 'Komposisi & Pencahayaan', 'Adobe Lightroom', 'Retouching Foto'],
      },
      {
        id: 'video',
        title: 'Videografi & Editing',
        subtitle: 'Lebih dari 7 tahun',
        icon: 'film',
        skills: ['Adobe Premiere Pro', 'Adobe After Effects', 'Color Grading', 'Storyboarding'],
      },
      {
        id: 'design',
        title: 'Desain Grafis',
        subtitle: 'Lebih dari 7 tahun',
        icon: 'palette',
        skills: ['Figma', 'Adobe Illustrator', 'Adobe Photoshop', 'Adobe XD'],
      },
      {
        id: 'motion',
        title: 'Motion Graphic & VFX',
        subtitle: 'Efek visual & animasi',
        icon: 'sparkles',
        skills: ['Motion Graphic', 'Visual Effects', 'Adobe Animate', 'Blender'],
      },
    ],
    servicesSubtitle: 'Jasa fotografi & videografi',
    services: [
      {
        id: 'videography',
        title: 'Videography',
        icon: 'film',
        points: [
          'Video dokumentasi acara dan event.',
          'Videografi wedding & engagement.',
          'Konten video untuk media sosial.',
          'Color grading dan post-produksi.',
        ],
      },
      {
        id: 'photography',
        title: 'Photography',
        icon: 'camera',
        points: [
          'Sesi foto portrait & prewedding.',
          'Foto produk untuk bisnis.',
          'Dokumentasi event.',
          'Editing dan retouching foto.',
        ],
      },
      {
        id: 'editing',
        title: 'Photo & Video Editing',
        icon: 'scissors',
        points: [
          'Editing video sinematik.',
          'Motion graphic dan animasi.',
          'Desain thumbnail YouTube.',
          'Color grading konsisten.',
        ],
      },
      {
        id: 'design',
        title: 'Desain Grafis',
        icon: 'palette',
        points: [
          'Desain poster, banner, dan feed.',
          'Brand identity & logo.',
          'Desain kemasan produk.',
          'Ilustrasi digital.',
        ],
      },
    ],
    portfolioSubtitle: 'Karya visual terbaru',
    portfolio: [
      {
        title: 'Video Dokumentasi',
        image: '/images/portfolio1.svg',
        description: 'Video dokumentasi acara dengan cerita visual yang kuat.',
        demo: '#',
      },
      {
        title: 'Photoshoot',
        image: '/images/portfolio2.svg',
        description: 'Sesi foto portrait dan prewedding dengan gaya sinematik.',
        demo: '#',
      },
      {
        title: 'Wedding Video',
        image: '/images/portfolio3.svg',
        description: 'Videografi wedding dengan sinematografi kelas atas.',
        demo: '#',
      },
      {
        title: 'Konten Media Sosial',
        image: '/images/about.svg',
        description: 'Konten kreatif untuk feed dan reels media sosial.',
        demo: '#',
      },
    ],
  },
}

export const ABOUT = {
  photo: '/images/about.svg',
  description:
    'Saya seorang mahasiswa Teknik Informatika D4 di Politeknik Negeri Manado. Selain sebagai mahasiswa, saya juga seorang freelancer yang bergerak di bidang IT dan desain grafis.',
  stats: [
    { value: '5+', label: 'Tahun Mendalami programming' },
    { value: '20+', label: 'Project pengembangan' },
  ],
  cv: '/CV/CV-Varland-Lengkong.pdf',
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

export const PROJECT = {
  title: 'Jika tertarik kolaborasi',
  description: 'Hubungi sekarang',
  image: '/images/project.svg',
}

export const TESTIMONIALS = [
  {
    name: 'Johanes Roring',
    role: 'Client',
    image: '/images/testimonial2.svg',
    stars: 5,
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem tempora eum expedita ipsum illo vitae officiis sequi mollitia facere. Fugit reiciendis veniam beatae fugiat non adipisci recusandae. Ipsa, nam praesentium consequuntur iure aspernatur cumque omnis enim rem fugiat optio odit non accusantium vero eaque?',
  },
  {
    name: 'Yogi Tangkilisan',
    role: 'Client',
    image: '/images/testimonial3.svg',
    stars: 5,
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde quisquam ducimus fugiat maiores aperiam natus deleniti temporibus quod, esse sequi eius ipsa et quis facilis voluptatibus, quaerat laudantium labore?',
  },
]

export const CONTACT_INFO = [
  { label: 'Nomor telepon', value: '(+62)821-8730-1372', icon: 'phone', href: 'tel:+6282187301372' },
  { label: 'Email', value: 'alan.lengkong@gmail.com', icon: 'mail', href: 'mailto:alan.lengkong@gmail.com' },
  { label: 'Lokasi', value: 'Manado City - North Sulawesi', icon: 'map', href: null },
  { label: 'WhatsApp', value: 'Chat WhatsApp', icon: 'whatsapp', href: 'https://wa.me/6282187301372' },
]

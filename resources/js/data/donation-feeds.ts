const donationFeeds = [
    {
        id: 1,
        user: {
            name: 'Rumah Makan Sejahtera',
            avatar: '/img/avatars/default.jpg',
            verified: true,
        },
        content: {
            title: 'Makanan Siap Saji untuk 10 Orang',
            description:
                'Kami memiliki makanan catering yang tersisa dari acara kantor. Masih layak konsumsi dan bisa diambil hari ini sebelum jam 8 malam. Lokasinya di daerah Jakarta Selatan. Makanan terdiri dari nasi, ayam, sayur, dan buah.',
            images: ['/img/posts/makanan-siap-saji.jpg'],
            location: 'Jakarta Selatan',
            urgency: 'mendesak',
            category: 'Makanan',
        },
        stats: {
            likes: 24,
            comments: 5,
            shares: 12,
        },
        createdAt: '2 jam yang lalu',
    },
    {
        id: 2,
        user: {
            name: 'Toko Sembako Barokah',
            avatar: '/img/avatars/default.jpg',
            verified: true,
        },
        content: {
            title: 'Sembako untuk Keluarga Terdampak',
            description:
                'Kami menyediakan paket sembako berisi beras 5kg, minyak goreng 2L, gula 1kg, dan kebutuhan pokok lainnya untuk keluarga yang membutuhkan. Silakan hubungi kami untuk informasi lebih lanjut.',
            images: ['/img/posts/toko-sembako.jpg'],
            location: 'Bandung',
            urgency: 'sedang',
            category: 'Sembako',
        },
        stats: {
            likes: 42,
            comments: 7,
            shares: 15,
        },
        createdAt: '5 jam yang lalu',
    },
    {
        id: 3,
        user: {
            name: 'Bakery Sehat',
            avatar: '/img/avatars/default.jpg',
            verified: false,
        },
        content: {
            title: 'Roti dan Kue dari Bakery',
            description:
                'Kami memiliki roti dan kue yang tidak terjual hari ini. Masih segar dan bisa diambil malam ini. Ada roti tawar, roti manis, dan beberapa kue basah yang masih layak konsumsi.',
            images: ['/img/posts/toko-bakery.jpg'],
            location: 'Surabaya',
            urgency: 'mendesak',
            category: 'Makanan',
        },
        stats: {
            likes: 18,
            comments: 3,
            shares: 5,
        },
        createdAt: '1 jam yang lalu',
    },
    {
        id: 4,
        user: {
            name: 'Komunitas Peduli Sesama',
            avatar: '/img/avatars/default.jpg',
            verified: true,
        },
        content: {
            title: 'Donasi Pakaian Layak Pakai',
            description:
                'Kami membuka donasi pakaian layak pakai untuk korban bencana alam. Jika Anda memiliki pakaian yang masih layak namun tidak terpakai, silakan donasikan kepada kami.',
            images: ['/img/posts/komunitas.jpeg'],
            location: 'Yogyakarta',
            urgency: 'sedang',
            category: 'Pakaian',
        },
        stats: {
            likes: 35,
            comments: 8,
            shares: 20,
        },
        createdAt: '12 jam yang lalu',
    },
    {
        id: 5,
        user: {
            name: 'Restoran Berkah',
            avatar: '/img/avatars/default.jpg',
            verified: true,
        },
        content: {
            title: 'Makanan Sisa Catering Event',
            description:
                'Kami memiliki makanan sisa dari acara catering yang masih layak konsumsi. Menu berupa nasi box dengan lauk ayam, sayur, dan buah. Bisa diambil hari ini.',
            images: ['/img/posts/restoran.jpg'],
            location: 'Jakarta Utara',
            urgency: 'mendesak',
            category: 'Makanan',
        },
        stats: {
            likes: 28,
            comments: 6,
            shares: 14,
        },
        createdAt: '3 jam yang lalu',
    },
];

export default donationFeeds;

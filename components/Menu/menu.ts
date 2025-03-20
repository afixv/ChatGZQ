export type Menu = {
  nama: string;
  image?: string;
  deskripsi?: string;
  slug: string;
  porsi: string;
  usia: string;
  bahan: string[];
  langkah: string[];
};

export const dummy_menu: Menu[] = Array.from({ length: 103 }, (_, i) => ({
  nama: `Bubur Sup Daging Kacang Merah ${i + 1}`,
  slug: `bubur-sup-daging-kacang-merah-${i + 1}`,
  image: "/menu1.png",
  deskripsi: "Ayam cincang, telur ayam, bawang merah, bawang putih",
  porsi: "3 Porsi",
  usia: "6 - 8 Bulan",
  bahan: [
    `400-500 gr udang ukuran besar`,
    `1 buah jagung potong2 lalu rebus`,
    `2 siung bawang putih`,
    `3 siung bawang merah`,
    `50 gr cabe merah`,
    `1 buah bawang bombay`,
    `2 sdm saos tiram`,
    `5 sdm saos tomat`,
  ],
  langkah: [
    "Siapkan bahan, dan haluskan bumbu",
    "Goreng udang setengah matang sisihkan. Haluskan cabe, bawang merah dan bawang putih. Tumis cabe yg sudah dihaluskan, masukkan jahe, masukkan daun salam dan daun jeruk. Lalu masukkan irisan bawang Bombay dan daun bawang. Lalu masukkan minyak ikan, saos tiram, saos cabe dan saos sambal",
    "Goreng udang setengah matang sisihkan. Haluskan cabe, bawang merah dan bawang putih. Tumis cabe yg sudah dihaluskan, masukkan jahe, masukkan daun salam dan daun jeruk. Lalu masukkan irisan bawang Bombay dan daun bawang. Lalu masukkan minyak ikan, saos tiram, saos cabe dan saos sambal",
    "Goreng udang setengah matang sisihkan. Haluskan cabe, bawang merah dan bawang putih. Tumis cabe yg sudah dihaluskan, masukkan jahe, masukkan daun salam dan daun jeruk. Lalu masukkan irisan bawang Bombay dan daun bawang. Lalu masukkan minyak ikan, saos tiram, saos cabe dan saos sambal",
  ],
}));

interface RecommendationResults {
  bbu: { status: string };
  pbu_tbu: { status: string; indexType: string };
  bbtb_bbpb: { status: string; indexType: string };
}

interface Recommendation {
  bbu: string;
  pbu: string;
  bbpb: string;
}

const getRecommendation = (results: RecommendationResults): Recommendation => {
  const { bbu, pbu_tbu, bbtb_bbpb } = results;

  let bbuMessage = "";
  let pbuTbuMessage = "";
  let bbtbBbpbMessage = "";

  switch (bbu.status) {
    case "Berat Badan Sangat Kurang":
      bbuMessage =
        "Segera rujuk ke fasilitas kesehatan untuk penanganan lebih lanjut. Berikan PMT (Pemberian Makanan Tambahan) dengan porsi lebih sering, serta konsumsi sumber lemak (seperti santan, minyak, mentega, keju, dan lain lain) ke anak";
      break;
    case "Berat Badan Kurang":
      bbuMessage =
        "Tingkatkan porsi makan, berikan PMT serta konsumsi sumber lemak (seperti santan, minyak, mentega, keju, dan lain lain) ke anak dan pantau pertumbuhan secara rutin.";
      break;
    case "Berat Badan Normal":
      bbuMessage =
        "Pertahankan pola makan saat ini, Ibu sudah melakukan pekerjaan yang sangat baik!";
      break;
    case "Risiko Berat Badan Lebih":
      bbuMessage =
        "Evaluasi pola makan, kurangi makanan tinggi gula dan lemak. Tingkatkan aktivitas fisik.";
      break;
  }

  // PB/U atau TB/U
  switch (pbu_tbu.status) {
    case "Sangat Pendek":
    case "Pendek":
      pbuTbuMessage = `Segera rujuk ke fasilitas kesehatan. Berikan makanan tinggi protein hewani dan mikronutrien.`;
      break;
    case "Normal":
      pbuTbuMessage = `Pertahankan pola makan saat ini dan pantau pertumbuhan secara rutin.`;
      break;
    case "Tinggi":
      pbuTbuMessage = `Pertumbuhan sangat baik, pertahankan pola makan sehat.`;
      break;
  }

  // BB/TB atau BB/PB
  switch (bbtb_bbpb.status) {
    case "Gizi Buruk":
      bbtbBbpbMessage = `Segera rujuk ke fasilitas kesehatan untuk penanganan gizi buruk.`;
      break;
    case "Gizi Kurang":
      bbtbBbpbMessage = `Berikan PMT dan konsultasikan ke ahli gizi.`;
      break;
    case "Gizi Baik":
      bbtbBbpbMessage = `Pertahankan pola makan sehat saat ini.`;
      break;
    case "Berisiko Gizi Lebih":
      bbtbBbpbMessage = `Evaluasi pola makan dan tingkatkan aktivitas fisik.`;
      break;
    case "Gizi Lebih":
      bbtbBbpbMessage = `Konsultasikan ke ahli gizi untuk pengaturan pola makan.`;
      break;
    case "Obesitas":
      bbtbBbpbMessage = `Segera konsultasikan ke dokter dan ahli gizi untuk penanganan obesitas.`;
      break;
  }

  return {
    bbu: bbuMessage,
    pbu: pbuTbuMessage,
    bbpb: bbtbBbpbMessage,
  };
};

export { getRecommendation };

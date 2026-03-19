export default async function handler(req, res) {
  try {
    const API_KEY = "42410|42412|IENtTzn7SVDea24KMF2Ju1H790vXQeTRWDZpnhKhbe4b5d6a";

    const ip =
      req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";
    const userAgent = req.headers["user-agent"] || "";

    const url = `https://confirmapp.site/api/v2?ip=${ip}&user_agent=${encodeURIComponent(userAgent)}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    const data = await response.json();

    // تحقق من الأخطاء
    if (!response.ok || data.error) {
      return res.status(500).json({
        error: "OGAds API error",
        details: data,
      });
    }

    if (!data.offers || data.offers.length === 0) {
      return res.status(404).json({
        error: "No offers found",
      });
    }

    // ترتيب حسب EPC
    const sortedOffers = data.offers.sort((a, b) => b.epc - a.epc);

    // اختيار أفضل offer
    const bestOffer = sortedOffers[0];

    // إرسال النتيجة
    res.json({
      success: true,
      offer: bestOffer,
    });

  } catch (error) {
    res.status(500).json({
      error: "Server error",
      details: error.message,
    });
  }
}

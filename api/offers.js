export default async function handler(req, res) {
  try {
    const API_KEY = "42413|zw3R6EHsaln0oBy3ogNiN9iz1g5DpM1tDycc3ycxc93332d7";

    const ip =
      req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";
    const userAgent = req.headers["user-agent"] || "";

    const url = `https://confirmapp.site/api/v2?ip=${ip}&user_agent=${encodeURIComponent(
      userAgent
    )}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      return res.status(500).json({
        error: "Invalid API response",
        details: text,
      });
    }

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

    return res.json({
      success: true,
      offer: bestOffer,
    });

  } catch (error) {
    return res.status(500).json({
      error: "Server error",
      details: error.message,
    });
  }
}

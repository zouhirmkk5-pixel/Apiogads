export default async function handler(req, res) {
  try {
    const API_KEY = "42410|8VV62pxErpzjnrxhmsapbZWdX0Fb7R3zEeVIuLE51643fc42"; // غير بدّل هادشي

    const ip =
      req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";
    const userAgent = req.headers["user-agent"] || "";

    const url = `https://confirmapp.site/api/v2?ip=${ip}&user_agent=${encodeURIComponent(
      userAgent
    )}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    const text = await response.text();

    if (!response.ok) {
      return res.status(response.status).json({
        error: "OGAds API error",
        details: text,
      });
    }

    const data = JSON.parse(text);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

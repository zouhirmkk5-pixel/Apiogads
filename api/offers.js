export default async function handler(req, res) {
  try {
    const API_KEY = "42406|Vt4TiKi7OC182ERvD5C8K0IGlScc1upjPRC7NnFO045313d4";

    const response = await fetch(
      `https://confirmapp.site/api/v2?api_key=${API_KEY}`
    );

    const data = await response.json();

    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ error: "OGAds API error" });
  }
}

export default async function handler(req, res) {
  try {
    const API_KEY = "42408|9dV5kyAA32peDmzlk365OlRNSHJTTb72ye9sL6tN42507280";

    const url = `https://confirmapp.site/api/v2?api_key=${API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
      return res.status(500).json({
        error: "OGAds API request failed",
        status: response.status
      });
    }

    const data = await response.json();

    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

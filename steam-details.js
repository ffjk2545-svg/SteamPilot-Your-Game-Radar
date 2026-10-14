// Vercel serverless function: fetch a single game's details from the official Steam Store API.
module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=3600');
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  const appid = String(req.query?.appid || '').trim();
  if (!/^\d{1,12}$/.test(appid)) return res.status(400).json({ error: 'A numeric Steam App ID is required' });
  try {
    const url = `https://store.steampowered.com/api/appdetails?appids=${encodeURIComponent(appid)}&cc=th&l=english`;
    const upstream = await fetch(url, {
      headers: { 'Accept': 'application/json', 'User-Agent': 'SteamPilot/2.1 (independent discovery tool)' },
      signal: AbortSignal.timeout(12000)
    });
    if (!upstream.ok) return res.status(502).json({ error: `Steam Store responded with ${upstream.status}` });
    const data = await upstream.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Steam app details upstream error:', error);
    return res.status(502).json({ error: 'Steam game details are temporarily unavailable' });
  }
};

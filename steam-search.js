// Vercel serverless function: search the official Steam Store.
// Steam's storefront endpoints commonly block browser-origin CORS requests,
// so this same-origin function forwards the request server-side.
module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=180, stale-while-revalidate=600');
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const query = String(req.query?.query || '').trim().slice(0, 120);
  const start = Math.max(0, Math.min(5000, Number.parseInt(req.query?.start || '0', 10) || 0));
  const mode = String(req.query?.mode || 'search');
  const allowedTags = new Set([19, 122, 1685, 1662, 492, 9, 21, 6650, 1664, 11014, 29482, 1667, 1716]);
  const requestedTag = Number.parseInt(req.query?.tag || '0', 10) || 0;
  const tag = allowedTags.has(requestedTag) ? requestedTag : 0;
  if (query.length < 2) return res.status(400).json({ error: 'Enter at least 2 characters' });

  try {
    const url = mode === 'storesearch'
      ? `https://store.steampowered.com/api/storesearch/?term=${encodeURIComponent(query)}&l=english&cc=th`
      : `https://store.steampowered.com/search/results/?query=${encodeURIComponent(query)}&start=${start}&count=50&dynamic_data=&sort_by=_ASC&snr=1_7_7_2300_7&infinite=1&l=english&cc=th${tag ? `&tags=${tag}` : ''}`;
    const upstream = await fetch(url, {
      headers: { 'Accept': 'application/json, text/html;q=0.9,*/*;q=0.8', 'User-Agent': 'SteamPilot/2.1 (independent discovery tool)' },
      signal: AbortSignal.timeout(12000)
    });
    if (!upstream.ok) return res.status(502).json({ error: `Steam Store responded with ${upstream.status}` });
    const text = await upstream.text();
    let payload;
    try { payload = JSON.parse(text); }
    catch { payload = { results_html: text, total_count: 0, start }; }
    if (mode !== 'storesearch' && typeof payload.results_html !== 'string' && !Array.isArray(payload.items)) {
      if (text.includes('search_result_row')) payload = { results_html: text, total_count: 0, start };
      else return res.status(502).json({ error: 'Unexpected Steam Store response' });
    }
    return res.status(200).json(payload);
  } catch (error) {
    console.error('Steam search upstream error:', error);
    return res.status(502).json({ error: 'Steam Store search is temporarily unavailable' });
  }
};

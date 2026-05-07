export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'POST') return res.status(405).end();

  const token = process.env.HUBSPOT_TOKEN;
  if (!token) return res.status(500).json({ error: 'HUBSPOT_TOKEN not set' });

  const { dataUri, filename } = req.body || {};
  if (!dataUri || !filename) return res.status(400).json({ error: 'Missing dataUri or filename' });

  const base64 = dataUri.replace(/^data:[^;]+;base64,/, '');
  const buffer = Buffer.from(base64, 'base64');
  const blob = new Blob([buffer], { type: 'image/png' });

  const form = new FormData();
  form.append('file', blob, filename);
  form.append('options', JSON.stringify({ access: 'PUBLIC_INDEXABLE', overwrite: false }));
  form.append('folderPath', '/assinaturas-email');

  const hsRes = await fetch('https://api.hubapi.com/files/v3/files', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: form,
  });

  if (!hsRes.ok) {
    const err = await hsRes.text();
    return res.status(hsRes.status).json({ error: err });
  }

  const data = await hsRes.json();
  res.status(200).json({ url: data.url });
}

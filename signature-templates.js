// Signature templates — table-based for email-client compatibility.
// All colors come from `palette` so the user can tweak from the editor.
// Email/WhatsApp/site shown as plain text (no <a>) to prevent Gmail's
// auto-underline. Only the Revi logo is clickable (links to the site).

const REVI_LOGO_IMG_LIGHT = `<img src="assets/logo-revi-fundo-claro.png" width="110" height="34" alt="Revi" style="display:block;border:0;outline:none;text-decoration:none;height:34px;width:110px;" />`;
const REVI_LOGO_IMG_DARK  = `<img src="assets/logo-revi-fundo-escuro.png" width="120" height="37" alt="Revi" style="display:block;border:0;outline:none;text-decoration:none;height:37px;width:120px;" />`;

// Helpers ─────────────────────────────────────────────
function siteText(d) {
  if (!d.site) return '';
  return d.site.replace(/^https?:\/\//,'').replace(/\/$/,'').toUpperCase();
}
function siteUrl(d) {
  if (!d.site) return '#';
  return d.site.startsWith('http') ? d.site : `https://${d.site.replace(/\/$/,'')}`;
}
function instagramUrl(d) {
  if (!d.instagram) return '#';
  return `https://instagram.com/${d.instagram.replace(/^@/,'')}`;
}

// Logo wrapped as a link to the site (only clickable element besides socials).
function logoLink(d, logoImg) {
  if (!d.site) return logoImg;
  return `<a href="${siteUrl(d)}" style="text-decoration:none;border:0;display:inline-block;line-height:0;">${logoImg}</a>`;
}

// Site shown as plain text (no link) — link is on the logo above.
function siteLine(d, color) {
  if (!d.site) return '';
  return `<span style="color:${color};letter-spacing:0.06em;">${siteText(d)}</span>`;
}

// Social icon row (only icons stay as <a> — they need to be clickable, and
// icons have no text so Gmail can't underline them).
function socialRow(d, p, color, gap = '10px') {
  const isWhite = /^#fff/i.test(color) || color.toLowerCase() === 'white';
  const variant = isWhite ? 'white' : 'blue';
  const size = 18;
  const img = (name, alt) => `<img src="assets/${name}-${variant}.png" width="${size}" height="${size}" alt="${alt}" style="display:block;border:0;outline:none;text-decoration:none;height:${size}px;width:${size}px;" />`;
  const items = [];
  if (d.linkedin) items.push(`<a href="${d.linkedin}" style="text-decoration:none;display:inline-block;line-height:0;margin-right:${gap};vertical-align:middle;" title="LinkedIn">${img('linkedin', 'LinkedIn')}</a>`);
  if (d.whatsapp) items.push(`<a href="https://wa.me/${d.whatsapp.replace(/\D/g,'')}" style="text-decoration:none;display:inline-block;line-height:0;margin-right:${gap};vertical-align:middle;" title="WhatsApp">${img('whatsapp', 'WhatsApp')}</a>`);
  if (d.showInstagram && d.instagram) items.push(`<a href="${instagramUrl(d)}" style="text-decoration:none;display:inline-block;line-height:0;margin-right:${gap};vertical-align:middle;" title="Instagram">${img('instagram', 'Instagram')}</a>`);
  return items.join('');
}

// LAYOUT 1 — CORPORATIVO ────────────────────────────────
function layoutCorporate(d) {
  const p = d.palette;
  const photoCell = d.showPhoto && d.photo ? `
    <td style="vertical-align:middle;padding-right:28px;">
      <img src="${d.photo}" width="92" height="92" alt="${d.name}" style="display:block;border-radius:50%;object-fit:cover;border:3px solid ${p.brandBlue};" />
    </td>` : '';
  const ctaRow = d.showCta && d.ctaText ? `
    <tr><td style="padding-top:14px;">
      <a href="${d.ctaUrl||'#'}" style="display:inline-block;background:${p.lime};color:#FFFFFF;font-weight:700;font-family:'DM Sans',Arial,sans-serif;font-size:13px;text-decoration:none;padding:9px 18px;border-radius:999px;letter-spacing:-0.01em;">${d.ctaText} →</a>
    </td></tr>` : '';
  const socials = socialRow(d, p, p.brandBlue, '12px');
  return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family:'DM Sans',Arial,sans-serif;color:${p.navy};">
  <tr>
    ${photoCell}
    <td style="vertical-align:middle;padding-left:0;padding-right:32px;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr><td style="font-size:19px;font-weight:700;color:${p.navy};letter-spacing:-0.02em;line-height:1.1;padding-bottom:3px;">${d.name||''}</td></tr>
        <tr><td style="font-size:13.5px;font-weight:500;color:${p.brandBlue};line-height:1.3;padding-bottom:14px;">${d.title||''}</td></tr>
        ${d.email ? `<tr><td style="font-size:13px;color:${p.ink2};line-height:1.7;padding-bottom:2px;">${d.email}</td></tr>` : ''}
        ${d.whatsapp ? `<tr><td style="font-size:13px;color:${p.ink2};line-height:1.7;padding-bottom:2px;">${d.whatsapp}</td></tr>` : ''}
        ${socials ? `<tr><td style="padding-top:10px;line-height:0;">${socials}</td></tr>` : ''}
        ${ctaRow}
      </table>
    </td>
    ${d.showLogo ? `<td style="vertical-align:middle;padding-left:32px;border-left:2px solid ${p.border};text-align:center;">
      <div style="line-height:0;margin-bottom:10px;">${logoLink(d, REVI_LOGO_IMG_LIGHT)}</div>
      ${d.site ? `<div style="font-size:11px;color:${p.ink3};letter-spacing:0.14em;font-weight:600;text-transform:uppercase;">${siteLine(d, p.ink3)}</div>` : ''}
    </td>` : ''}
  </tr>
</table>`;
}

// LAYOUT 2 — BARRA ACENTO ───────────────────────────────
function layoutAccentBar(d) {
  const p = d.palette;
  const photoCell = d.showPhoto && d.photo ? `
    <td style="vertical-align:middle;padding-right:18px;">
      <img src="${d.photo}" width="76" height="76" alt="${d.name}" style="display:block;border-radius:50%;object-fit:cover;" />
    </td>` : '';
  const ctaRow = d.showCta && d.ctaText ? `
    <div style="margin-top:10px;"><a href="${d.ctaUrl||'#'}" style="display:inline-block;background:${p.lime};color:#FFFFFF;font-weight:700;font-family:'DM Sans',Arial,sans-serif;font-size:13px;text-decoration:none;padding:8px 14px;border-radius:999px;letter-spacing:-0.01em;">${d.ctaText} →</a></div>` : '';
  const socials = socialRow(d, p, p.brandBlue, '10px');
  return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family:'DM Sans',Arial,sans-serif;color:${p.navy};">
  <tr>
    <td style="background:linear-gradient(180deg, ${p.gradFrom} 0%, ${p.gradTo} 100%);width:5px;border-radius:4px;padding:0;">&nbsp;</td>
    <td style="padding-left:18px;vertical-align:middle;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          ${photoCell}
          <td style="vertical-align:middle;">
            <div style="font-size:18px;font-weight:700;color:${p.navy};letter-spacing:-0.02em;line-height:1.1;">${d.name||''}</div>
            <div style="font-size:13px;font-weight:500;color:${p.brandBlue};line-height:1.4;margin-top:2px;">${d.title||''}</div>
            <div style="font-size:13px;color:${p.ink2};line-height:1.7;margin-top:8px;">
              ${d.email ? `<div>${d.email}</div>` : ''}
              ${d.whatsapp ? `<div>${d.whatsapp}</div>` : ''}
            </div>
            ${socials ? `<div style="margin-top:10px;line-height:0;">${socials}</div>` : ''}
            ${ctaRow}
          </td>
        </tr>
      </table>
    </td>
    ${d.showLogo ? `<td style="vertical-align:middle;padding-left:32px;text-align:center;">
      <div style="line-height:0;margin-bottom:10px;">${logoLink(d, REVI_LOGO_IMG_LIGHT)}</div>
      ${d.site ? `<div style="font-size:11px;color:${p.ink3};letter-spacing:0.08em;font-weight:600;">${siteLine(d, p.ink3)}</div>` : ''}
    </td>` : ''}
  </tr>
</table>`;
}

// LAYOUT 3 — CARD REVI ──────────────────────────────────
function layoutCard(d) {
  const p = d.palette;
  const photoCell = d.showPhoto && d.photo ? `
    <td style="vertical-align:middle;padding-right:20px;">
      <img src="${d.photo}" width="80" height="80" alt="${d.name}" style="display:block;border-radius:50%;object-fit:cover;border:2px solid rgba(255,255,255,0.2);" />
    </td>` : '';
  const ctaRow = d.showCta && d.ctaText ? `
    <tr><td colspan="3" style="padding-top:14px;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
        <td style="font-size:12px;color:#9AA3BE;line-height:1.4;">Quer ver a Revi em ação?</td>
        <td style="text-align:right;"><a href="${d.ctaUrl||'#'}" style="display:inline-block;background:${p.lime};color:#FFFFFF;font-weight:700;font-family:'DM Sans',Arial,sans-serif;font-size:13px;text-decoration:none;padding:8px 16px;border-radius:999px;letter-spacing:-0.01em;">${d.ctaText} →</a></td>
      </tr></table>
    </td></tr>` : '';
  const socials = socialRow(d, p, '#FFFFFF', '12px');
  return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family:'DM Sans',Arial,sans-serif;background:linear-gradient(135deg, ${p.gradCardFrom} 0%, ${p.gradCardTo} 100%);border-radius:24px;padding:0;">
  <tr><td style="padding:24px 30px;">
    <table cellpadding="0" cellspacing="0" border="0">
      <tr>
        ${photoCell}
        <td style="vertical-align:middle;">
          <div style="font-size:19px;font-weight:700;color:#FFFFFF;letter-spacing:-0.02em;line-height:1.1;">${d.name||''}</div>
          <div style="font-size:13px;font-weight:500;color:${p.sky};line-height:1.4;margin-top:3px;">${d.title||''}</div>
          <div style="font-size:12.5px;color:#C5CCE0;line-height:1.7;margin-top:10px;">
            ${d.email ? `<div>${d.email}</div>` : ''}
            ${d.whatsapp ? `<div>${d.whatsapp}</div>` : ''}
          </div>
          ${socials ? `<div style="margin-top:12px;line-height:0;">${socials}</div>` : ''}
        </td>
        ${d.showLogo ? `<td style="vertical-align:middle;padding-left:32px;text-align:center;">
          <div style="line-height:0;margin-bottom:10px;">${logoLink(d, REVI_LOGO_IMG_DARK)}</div>
          ${d.site ? `<div style="font-size:11px;color:#9AA3BE;letter-spacing:0.08em;font-weight:600;">${siteLine(d, '#9AA3BE')}</div>` : ''}
        </td>` : ''}
      </tr>
      ${ctaRow}
    </table>
  </td></tr>
</table>`;
}

// LAYOUT 4 — AVATAR FOCO ────────────────────────────────
function layoutAvatarFocus(d) {
  const p = d.palette;
  const ctaRow = d.showCta && d.ctaText ? `
    <div style="margin-top:14px;"><a href="${d.ctaUrl||'#'}" style="display:inline-block;background:${p.navy};color:#FFFFFF;font-weight:600;font-family:'DM Sans',Arial,sans-serif;font-size:13px;text-decoration:none;padding:9px 16px;border-radius:999px;letter-spacing:-0.01em;">${d.ctaText} →</a></div>` : '';
  const socials = socialRow(d, p, p.brandBlue, '12px');
  return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family:'DM Sans',Arial,sans-serif;color:${p.navy};">
  <tr>
    ${d.showPhoto && d.photo ? `<td style="vertical-align:middle;padding-right:22px;">
      <div style="position:relative;display:inline-block;line-height:0;">
        <div style="background:linear-gradient(135deg, ${p.gradFrom} 0%, ${p.gradTo} 100%);padding:3px;border-radius:50%;display:inline-block;">
          <img src="${d.photo}" width="92" height="92" alt="${d.name}" style="display:block;border-radius:50%;object-fit:cover;border:3px solid #fff;" />
        </div>
      </div>
    </td>` : ''}
    <td style="vertical-align:middle;padding-right:28px;">
      <div style="font-size:22px;font-weight:700;color:${p.navy};letter-spacing:-0.025em;line-height:1.05;">${d.name||''}</div>
      <div style="font-size:14px;font-weight:500;color:${p.brandBlue};line-height:1.3;margin-top:2px;margin-bottom:10px;">${d.title||''}</div>
      <div style="font-size:13px;color:${p.ink2};line-height:1.6;">
        ${d.email ? `<div>${d.email}</div>` : ''}
        ${d.whatsapp ? `<div>${d.whatsapp}</div>` : ''}
      </div>
      ${socials ? `<div style="margin-top:10px;line-height:0;">${socials}</div>` : ''}
      ${ctaRow}
    </td>
    ${d.showLogo ? `<td style="vertical-align:middle;padding-left:28px;border-left:2px solid ${p.border};text-align:center;">
      <div style="line-height:0;margin-bottom:10px;">${logoLink(d, REVI_LOGO_IMG_LIGHT)}</div>
      ${d.site ? `<div style="font-size:11px;color:${p.ink3};letter-spacing:0.08em;font-weight:600;">${siteLine(d, p.ink3)}</div>` : ''}
    </td>` : ''}
  </tr>
</table>`;
}

window.SignatureTemplates = {
  corporate: { id: 'corporate', name: 'Corporativo', desc: 'Horizontal, divisor sutil', render: layoutCorporate },
  accentBar: { id: 'accentBar', name: 'Barra Acento', desc: 'Gradiente lime → sky', render: layoutAccentBar },
  card:      { id: 'card',      name: 'Card Revi',   desc: 'Background navy gradient', render: layoutCard },
  avatar:    { id: 'avatar',    name: 'Avatar Foco', desc: 'Inline com logo à direita', render: layoutAvatarFocus },
};

window.DEFAULT_PALETTE = {
  navy: '#0A1030', navyDeep: '#05091F', brandBlue: '#0A40C6', sky: '#56BBEE',
  lime: '#32C700', ink2: '#4A537A', ink3: '#6E779A', border: '#E6EAF3',
  gradFrom: '#56BBEE', gradTo: '#32C700',
  gradCardFrom: '#1A2A7A', gradCardTo: '#0A1030',
};

window.PALETTE_PRESETS = [
  { id: 'revi', name: 'Revi (padrão)', palette: { ...window.DEFAULT_PALETTE } },
  { id: 'lime-first', name: 'Lime forward', palette: { ...window.DEFAULT_PALETTE,
      brandBlue: '#0A40C6', gradFrom: '#32C700', gradTo: '#CFFF6B', gradCardFrom: '#0A40C6', gradCardTo: '#05091F' } },
  { id: 'sky-only', name: 'Sky monochrome', palette: { ...window.DEFAULT_PALETTE,
      brandBlue: '#1E86E6', gradFrom: '#7CC6FF', gradTo: '#1E86E6', gradCardFrom: '#1B2566', gradCardTo: '#0A1030', lime: '#56BBEE' } },
  { id: 'deep-navy', name: 'Deep navy', palette: { ...window.DEFAULT_PALETTE,
      brandBlue: '#0A1030', gradFrom: '#0A40C6', gradTo: '#56BBEE', gradCardFrom: '#05091F', gradCardTo: '#000000' } },
];

const fs = require('fs');
let code = fs.readFileSync('frontend/nav-scroll.js', 'utf8');

const oldBlock = `          <div class="mobile-drawer-links">
            <div style="font:700 11px var(--head);letter-spacing:.1em;color:var(--ink-muted);text-transform:uppercase;margin:8px 0 4px">Advertising Media</div>
            <a href="newspaper-ads.html">Newspaper Advertising</a>
            <a href="digital-marketing.html">Digital Marketing &amp; PR</a>
            <a href="influencer-marketing.html">Influencer Marketing</a>
            <a href="radio-ads.html">Radio Advertising</a>
            <a href="cinema-ads.html">Cinema Advertising</a>
            <a href="tv-ads.html">TV Commercials (275+)</a>
            <a href="programmatic-ads.html">Programmatic DSP (100+)</a>
            <a href="ott-advertising.html">OTT &amp; Connected TV</a>
            <a href="transit-media.html">Transit &amp; Bus Media</a>
            <a href="lift-branding.html">Lift &amp; Elevator Branding</a>
            <a href="outdoor-ads.html">Outdoor &amp; DOOH (250+)</a>
            <a href="rate-cards.html">Rate Cards &amp; Editions</a>
            <div style="font:700 11px var(--head);letter-spacing:.1em;color:var(--ink-muted);text-transform:uppercase;margin:16px 0 4px">Client Services</div>
            <a href="track-ad.html">Track Existing Ad</a>
            <a href="about.html">About RKM Ads</a>
            <a href="contact.html">Contact &amp; Helplines</a>`;

const newBlock = `          <div class="mobile-drawer-links">
            <a href="index.html">Home</a>

            <!-- Distinct Prominent Services Section in Drawer -->
            <div style="margin:10px 0 14px;border:1px solid var(--line);border-radius:18px;background:var(--paper-tint);padding:14px;box-shadow:0 2px 10px rgba(0,0,0,0.04);">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;padding-bottom:8px;border-bottom:1px solid var(--line-light);">
                <div style="display:flex;align-items:center;gap:6px;font:700 12px var(--head);letter-spacing:.08em;text-transform:uppercase;color:var(--accent);">
                  <span style="width:7px;height:7px;border-radius:50%;background:var(--accent);display:inline-block;"></span>
                  <span>Media Services</span>
                </div>
                <span style="font:700 9.5px var(--sans);color:var(--accent);background:var(--accent-light);padding:2px 8px;border-radius:12px;border:1px solid rgba(217,90,43,0.2);">12 CHANNELS</span>
              </div>

              <!-- Core Media Channels -->
              <div style="font:700 10px var(--head);letter-spacing:.12em;text-transform:uppercase;color:var(--ink-muted);margin:8px 0 6px;">Core Channels (7)</div>
              <div style="display:grid;grid-template-columns:1fr;gap:6px;">
                <a href="newspaper-ads.html" style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:#FFF;border:1px solid var(--line-light);border-radius:10px;font:600 12px var(--head);text-transform:uppercase;color:var(--ink);text-decoration:none;">
                  <span>📰 Newspaper Advertising</span>
                  <span style="font-size:10px;color:var(--ink-muted);">150+ Dailies</span>
                </a>
                <a href="radio-ads.html" style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:#FFF;border:1px solid var(--line-light);border-radius:10px;font:600 12px var(--head);text-transform:uppercase;color:var(--ink);text-decoration:none;">
                  <span>📻 Radio FM Ads</span>
                  <span style="font-size:10px;color:var(--ink-muted);">100+ Cities</span>
                </a>
                <a href="cinema-ads.html" style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:#FFF;border:1px solid var(--line-light);border-radius:10px;font:600 12px var(--head);text-transform:uppercase;color:var(--ink);text-decoration:none;">
                  <span>🎬 Cinema Advertising</span>
                  <span style="font-size:10px;color:var(--ink-muted);">PVR &amp; INOX</span>
                </a>
                <a href="tv-ads.html" style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:#FFF;border:1px solid var(--line-light);border-radius:10px;font:600 12px var(--head);text-transform:uppercase;color:var(--ink);text-decoration:none;">
                  <span>📺 Television Ads</span>
                  <span style="font-size:10px;color:var(--ink-muted);">275+ Ch.</span>
                </a>
                <a href="outdoor-ads.html" style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:#FFF;border:1px solid var(--line-light);border-radius:10px;font:600 12px var(--head);text-transform:uppercase;color:var(--ink);text-decoration:none;">
                  <span>📍 Outdoor &amp; DOOH</span>
                  <span style="font-size:10px;color:var(--ink-muted);">Prime Hoardings</span>
                </a>
                <a href="digital-marketing.html" style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:#FFF;border:1px solid var(--line-light);border-radius:10px;font:600 12px var(--head);text-transform:uppercase;color:var(--ink);text-decoration:none;">
                  <span>🌐 Digital PR &amp; News Wire</span>
                  <span style="font-size:10px;color:var(--ink-muted);">50+ Portals</span>
                </a>
                <a href="rate-cards.html" style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:#FFF;border:1px solid var(--line-light);border-radius:10px;font:600 12px var(--head);text-transform:uppercase;color:var(--accent);text-decoration:none;">
                  <span>📑 Official Rate Cards</span>
                  <span style="font-size:10px;color:var(--accent);font-weight:700;">2026 Tariffs ➔</span>
                </a>
              </div>

              <!-- Specialized Networks -->
              <div style="font:700 10px var(--head);letter-spacing:.12em;text-transform:uppercase;color:var(--ink-muted);margin:14px 0 6px;">Specialized Networks (5)</div>
              <div style="display:grid;grid-template-columns:1fr;gap:6px;">
                <a href="influencer-marketing.html" style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:#FFF;border:1px solid var(--line-light);border-radius:10px;font:600 12px var(--head);text-transform:uppercase;color:var(--ink);text-decoration:none;">
                  <span>✨ Influencer Marketing</span>
                  <span style="font-size:10px;color:var(--ink-muted);">10K Creators</span>
                </a>
                <a href="transit-media.html" style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:#FFF;border:1px solid var(--line-light);border-radius:10px;font:600 12px var(--head);text-transform:uppercase;color:var(--ink);text-decoration:none;">
                  <span>🚌 Transit Media</span>
                  <span style="font-size:10px;color:var(--ink-muted);">Metro &amp; Bus</span>
                </a>
                <a href="lift-branding.html" style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:#FFF;border:1px solid var(--line-light);border-radius:10px;font:600 12px var(--head);text-transform:uppercase;color:var(--ink);text-decoration:none;">
                  <span>🏢 Lift &amp; Elevator Branding</span>
                  <span style="font-size:10px;color:var(--ink-muted);">High-Rise</span>
                </a>
                <a href="ott-advertising.html" style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:#FFF;border:1px solid var(--line-light);border-radius:10px;font:600 12px var(--head);text-transform:uppercase;color:var(--ink);text-decoration:none;">
                  <span>📺 OTT &amp; Connected TV</span>
                  <span style="font-size:10px;color:var(--ink-muted);">Hotstar &amp; Jio</span>
                </a>
                <a href="programmatic-ads.html" style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:#FFF;border:1px solid var(--line-light);border-radius:10px;font:600 12px var(--head);text-transform:uppercase;color:var(--ink);text-decoration:none;">
                  <span>⚙️ Programmatic DSP</span>
                  <span style="font-size:10px;color:var(--ink-muted);">DV360 AI</span>
                </a>
              </div>
            </div>

            <a href="rate-cards.html">Tariff Rate Cards</a>
            <a href="track-ad.html">Track Existing Ad</a>
            <a href="about.html">About RKM Ads</a>
            <a href="contact.html">Contact &amp; Helplines</a>`;

const codeNormalized = code.replace(/\r\n/g, '\n');
const oldNormalized = oldBlock.replace(/\r\n/g, '\n');

if (codeNormalized.includes(oldNormalized)) {
  const updated = codeNormalized.replace(oldNormalized, newBlock.replace(/\r\n/g, '\n'));
  fs.writeFileSync('frontend/nav-scroll.js', updated, 'utf8');
  console.log('SUCCESS: nav-scroll.js updated!');
} else {
  console.log('PATTERN NOT MATCHED in nav-scroll.js');
}

// Universal Translucent Header Scroll & Responsive Mobile Navigation Drawer
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  if (header) {
    // 1. Frosted Translucent Glassmorphism on Scroll
    const handleScroll = () => {
      const isScrolled = window.scrollY > 15;
      header.classList.toggle('scrolled', isScrolled);
      header.classList.toggle('s', isScrolled);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // 2. Responsive Mobile Drawer & Hamburger Button
    if (!document.querySelector('.mobile-toggle')) {
      const toggleBtn = document.createElement('button');
      toggleBtn.className = 'mobile-toggle';
      toggleBtn.setAttribute('aria-label', 'Open Navigation Menu');
      toggleBtn.innerHTML = '<span></span><span></span><span></span>';

      const actions = header.querySelector('.header-actions') || header.querySelector('.right') || header;
      actions.appendChild(toggleBtn);

      const nav = header.querySelector('nav');
      const drawer = document.createElement('div');
      drawer.className = 'mobile-drawer';
      drawer.innerHTML = `
        <div class="mobile-drawer-content">
          <div class="mobile-drawer-header">
            <div>
              <a href="index.html" class="logo" style="font-size:25px;line-height:1">RKM Ads<span>.</span></a>
              <div style="display:flex;align-items:center;gap:6px;margin-top:6px">
                <span style="font:700 9px var(--head);letter-spacing:.14em;text-transform:uppercase;color:#166534;background:#F0FDF4;padding:2px 8px;border-radius:4px;border:1px solid rgba(22,101,52,0.2);display:inline-flex;align-items:center;gap:4px">
                  <span style="width:6px;height:6px;border-radius:50%;background:#16a34a;display:inline-block"></span>
                  INS Accredited Agency
                </span>
                <span style="font-size:10px;color:var(--ink-muted);font-family:var(--sans)">Est. 2004</span>
              </div>
            </div>
            <button class="mobile-close" aria-label="Close Navigation Menu">✕</button>
          </div>

          <!-- Quick Action Bar -->
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px">
            <a href="book-ad.html" style="display:flex;align-items:center;justify-content:space-between;padding:10px 12px;background:var(--accent);color:#fff;border-radius:12px;font:700 12px var(--head);text-transform:uppercase;letter-spacing:.05em;text-decoration:none">
              <span>Book Ad Online</span>
              <span>➔</span>
            </a>
            <a href="rate-cards.html" style="display:flex;align-items:center;justify-content:space-between;padding:10px 12px;background:#fff;border:1px solid #E0D8CB;color:var(--ink);border-radius:12px;font:700 12px var(--head);text-transform:uppercase;letter-spacing:.05em;text-decoration:none">
              <span>Rate Cards</span>
              <span style="font-size:9px;background:#FEF3C7;color:#92400E;padding:2px 6px;border-radius:4px;font-weight:700">2026</span>
            </a>
          </div>

          <!-- Media Disciplines Directory -->
          <div style="margin-bottom:12px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
              <span style="font:700 10px var(--head);letter-spacing:.15em;text-transform:uppercase;color:var(--ink-muted);display:flex;align-items:center;gap:6px">
                <span style="width:6px;height:6px;border-radius:50%;background:var(--accent);display:inline-block"></span>
                Media Disciplines (12)
              </span>
              <span style="font:700 9px var(--head);letter-spacing:.08em;text-transform:uppercase;color:var(--accent);background:var(--accent-light);padding:2px 8px;border-radius:12px;border:1px solid rgba(217,90,43,0.2)">INS Tariff</span>
            </div>

            <!-- Print Media -->
            <div style="font:700 9.5px var(--head);letter-spacing:.14em;text-transform:uppercase;color:var(--ink-muted);margin:10px 0 4px;padding-left:2px">Print &amp; Tariffs</div>
            <div style="display:grid;grid-template-columns:1fr;gap:6px">
              <a href="newspaper-ads.html" style="display:flex;align-items:center;justify-content:space-between;padding:9px 12px;background:#fff;border:1px solid #E8E2D8;border-radius:12px;text-decoration:none;color:var(--ink)">
                <div>
                  <div style="font:700 12px var(--head);text-transform:uppercase;letter-spacing:.03em">Newspaper Advertising</div>
                  <div style="font-size:10px;color:var(--ink-muted)">150+ Dailies, Classified &amp; Display Ads</div>
                </div>
                <span style="font-size:8.5px;color:#57534E;background:#F5F5F4;padding:2px 6px;border-radius:4px;border:1px solid #E7E5E4;font-weight:600">150+ Dailies</span>
              </a>
              <a href="rate-cards.html" style="display:flex;align-items:center;justify-content:space-between;padding:9px 12px;background:#fff;border:1px solid #E8E2D8;border-radius:12px;text-decoration:none;color:var(--ink)">
                <div>
                  <div style="font:700 12px var(--head);text-transform:uppercase;letter-spacing:.03em">Official Rate Cards</div>
                  <div style="font-size:10px;color:var(--ink-muted)">2026 INS accredited tariff directory</div>
                </div>
                <span style="font-size:8.5px;color:#57534E;background:#F5F5F4;padding:2px 6px;border-radius:4px;border:1px solid #E7E5E4;font-weight:600">2026 Tariffs</span>
              </a>
            </div>

            <!-- Broadcast & Screens -->
            <div style="font:700 9.5px var(--head);letter-spacing:.14em;text-transform:uppercase;color:var(--ink-muted);margin:12px 0 4px;padding-left:2px">Broadcast &amp; Cinema</div>
            <div style="display:grid;grid-template-columns:1fr;gap:6px">
              <a href="tv-ads.html" style="display:flex;align-items:center;justify-content:space-between;padding:9px 12px;background:#fff;border:1px solid #E8E2D8;border-radius:12px;text-decoration:none;color:var(--ink)">
                <div>
                  <div style="font:700 12px var(--head);text-transform:uppercase;letter-spacing:.03em">Television Ads</div>
                  <div style="font-size:10px;color:var(--ink-muted)">275+ national news &amp; entertainment channels</div>
                </div>
                <span style="font-size:8.5px;color:#57534E;background:#F5F5F4;padding:2px 6px;border-radius:4px;border:1px solid #E7E5E4;font-weight:600">275+ Ch.</span>
              </a>
              <a href="radio-ads.html" style="display:flex;align-items:center;justify-content:space-between;padding:9px 12px;background:#fff;border:1px solid #E8E2D8;border-radius:12px;text-decoration:none;color:var(--ink)">
                <div>
                  <div style="font:700 12px var(--head);text-transform:uppercase;letter-spacing:.03em">Radio FM Ads</div>
                  <div style="font-size:10px;color:var(--ink-muted)">Top FM spots in 100+ cities &amp; RJ mentions</div>
                </div>
                <span style="font-size:8.5px;color:#57534E;background:#F5F5F4;padding:2px 6px;border-radius:4px;border:1px solid #E7E5E4;font-weight:600">100+ Cities</span>
              </a>
              <a href="cinema-ads.html" style="display:flex;align-items:center;justify-content:space-between;padding:9px 12px;background:#fff;border:1px solid #E8E2D8;border-radius:12px;text-decoration:none;color:var(--ink)">
                <div>
                  <div style="font:700 12px var(--head);text-transform:uppercase;letter-spacing:.03em">Cinema Advertising</div>
                  <div style="font-size:10px;color:var(--ink-muted)">PVR INOX &amp; Cinepolis 70mm video ads</div>
                </div>
                <span style="font-size:8.5px;color:#57534E;background:#F5F5F4;padding:2px 6px;border-radius:4px;border:1px solid #E7E5E4;font-weight:600">70mm</span>
              </a>
            </div>

            <!-- Outdoor & Transit -->
            <div style="font:700 9.5px var(--head);letter-spacing:.14em;text-transform:uppercase;color:var(--ink-muted);margin:12px 0 4px;padding-left:2px">Outdoor &amp; Transit</div>
            <div style="display:grid;grid-template-columns:1fr;gap:6px">
              <a href="outdoor-ads.html" style="display:flex;align-items:center;justify-content:space-between;padding:9px 12px;background:#fff;border:1px solid #E8E2D8;border-radius:12px;text-decoration:none;color:var(--ink)">
                <div>
                  <div style="font:700 12px var(--head);text-transform:uppercase;letter-spacing:.03em">Outdoor &amp; DOOH</div>
                  <div style="font-size:10px;color:var(--ink-muted)">Highway unipoles, hoardings &amp; LED screens</div>
                </div>
                <span style="font-size:8.5px;color:#57534E;background:#F5F5F4;padding:2px 6px;border-radius:4px;border:1px solid #E7E5E4;font-weight:600">Prime Hoardings</span>
              </a>
              <a href="transit-media.html" style="display:flex;align-items:center;justify-content:space-between;padding:9px 12px;background:#fff;border:1px solid #E8E2D8;border-radius:12px;text-decoration:none;color:var(--ink)">
                <div>
                  <div style="font:700 12px var(--head);text-transform:uppercase;letter-spacing:.03em">Transit Media</div>
                  <div style="font-size:10px;color:var(--ink-muted)">City bus wraps, metro rail &amp; auto hoods</div>
                </div>
                <span style="font-size:8.5px;color:#57534E;background:#F5F5F4;padding:2px 6px;border-radius:4px;border:1px solid #E7E5E4;font-weight:600">Metro &amp; Bus</span>
              </a>
              <a href="lift-branding.html" style="display:flex;align-items:center;justify-content:space-between;padding:9px 12px;background:#fff;border:1px solid #E8E2D8;border-radius:12px;text-decoration:none;color:var(--ink)">
                <div>
                  <div style="font:700 12px var(--head);text-transform:uppercase;letter-spacing:.03em">Lift &amp; Elevator Branding</div>
                  <div style="font-size:10px;color:var(--ink-muted)">Captive screens in premium high-rises</div>
                </div>
                <span style="font-size:8.5px;color:#57534E;background:#F5F5F4;padding:2px 6px;border-radius:4px;border:1px solid #E7E5E4;font-weight:600">Captive HD</span>
              </a>
            </div>

            <!-- Digital & Modern -->
            <div style="font:700 9.5px var(--head);letter-spacing:.14em;text-transform:uppercase;color:var(--ink-muted);margin:12px 0 4px;padding-left:2px">Digital &amp; Connected</div>
            <div style="display:grid;grid-template-columns:1fr;gap:6px">
              <a href="digital-marketing.html" style="display:flex;align-items:center;justify-content:space-between;padding:9px 12px;background:#fff;border:1px solid #E8E2D8;border-radius:12px;text-decoration:none;color:var(--ink)">
                <div>
                  <div style="font:700 12px var(--head);text-transform:uppercase;letter-spacing:.03em">Digital PR &amp; Wire</div>
                  <div style="font-size:10px;color:var(--ink-muted)">Guaranteed features on 50+ news portals</div>
                </div>
                <span style="font-size:8.5px;color:#57534E;background:#F5F5F4;padding:2px 6px;border-radius:4px;border:1px solid #E7E5E4;font-weight:600">50+ Portals</span>
              </a>
              <a href="influencer-marketing.html" style="display:flex;align-items:center;justify-content:space-between;padding:9px 12px;background:#fff;border:1px solid #E8E2D8;border-radius:12px;text-decoration:none;color:var(--ink)">
                <div>
                  <div style="font:700 12px var(--head);text-transform:uppercase;letter-spacing:.03em">Influencer Marketing</div>
                  <div style="font-size:10px;color:var(--ink-muted)">10,000+ creators on Reels &amp; YouTube</div>
                </div>
                <span style="font-size:8.5px;color:#57534E;background:#F5F5F4;padding:2px 6px;border-radius:4px;border:1px solid #E7E5E4;font-weight:600">10K Creators</span>
              </a>
              <a href="ott-advertising.html" style="display:flex;align-items:center;justify-content:space-between;padding:9px 12px;background:#fff;border:1px solid #E8E2D8;border-radius:12px;text-decoration:none;color:var(--ink)">
                <div>
                  <div style="font:700 12px var(--head);text-transform:uppercase;letter-spacing:.03em">OTT &amp; Connected TV</div>
                  <div style="font-size:10px;color:var(--ink-muted)">Hotstar, JioCinema &amp; Smart TV 4K</div>
                </div>
                <span style="font-size:8.5px;color:#57534E;background:#F5F5F4;padding:2px 6px;border-radius:4px;border:1px solid #E7E5E4;font-weight:600">Hotstar &amp; Jio</span>
              </a>
              <a href="programmatic-ads.html" style="display:flex;align-items:center;justify-content:space-between;padding:9px 12px;background:#fff;border:1px solid #E8E2D8;border-radius:12px;text-decoration:none;color:var(--ink)">
                <div>
                  <div style="font:700 12px var(--head);text-transform:uppercase;letter-spacing:.03em">Programmatic DSP</div>
                  <div style="font-size:10px;color:var(--ink-muted)">Google DV360 geofenced buying</div>
                </div>
                <span style="font-size:8.5px;color:#57534E;background:#F5F5F4;padding:2px 6px;border-radius:4px;border:1px solid #E7E5E4;font-weight:600">DV360 AI</span>
              </a>
            </div>
          </div>

          <!-- Client Links -->
          <div style="padding-top:12px;border-top:1px solid var(--line);margin-bottom:14px;display:grid;grid-template-columns:1fr;gap:4px">
            <div style="font:700 9.5px var(--head);letter-spacing:.14em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:4px;padding-left:2px">Client Desk &amp; Verification</div>
            <a href="track-ad.html" style="display:flex;align-items:center;justify-content:space-between;padding:8px 6px;font:700 12px var(--head);text-transform:uppercase;letter-spacing:.04em;text-decoration:none;color:var(--ink)">
              <span style="display:flex;align-items:center;gap:6px">
                <span style="width:6px;height:6px;border-radius:50%;background:#16a34a;display:inline-block"></span>
                Track Live Ad Status
              </span>
              <span>➔</span>
            </a>
            <a href="about.html" style="display:flex;align-items:center;justify-content:space-between;padding:8px 6px;font:700 12px var(--head);text-transform:uppercase;letter-spacing:.04em;text-decoration:none;color:var(--ink)">
              <span>About RKM Advertising</span>
              <span>➔</span>
            </a>
            <a href="contact.html" style="display:flex;align-items:center;justify-content:space-between;padding:8px 6px;font:700 12px var(--head);text-transform:uppercase;letter-spacing:.04em;text-decoration:none;color:var(--ink)">
              <span>Contact Media Desk</span>
              <span>➔</span>
            </a>
            <a href="terms.html" style="display:flex;align-items:center;justify-content:space-between;padding:8px 6px;font:700 12px var(--head);text-transform:uppercase;letter-spacing:.04em;text-decoration:none;color:var(--ink)">
              <span>Tariff Policies &amp; Terms</span>
              <span>➔</span>
            </a>
          </div>

          <!-- Helpline Card -->
          <div style="margin-top:auto;padding:12px;background:#fff;border:1px solid #E4DDCF;border-radius:14px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
              <span style="font:700 9px var(--head);letter-spacing:.14em;text-transform:uppercase;color:#78716C">Direct Media Helpline</span>
              <span style="font-size:8.5px;color:#166534;background:#F0FDF4;padding:2px 6px;border-radius:4px;border:1px solid rgba(22,101,52,0.2);font-weight:600">Active 24/7 Desk</span>
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between;gap:8px">
              <a href="tel:+919878339302" style="font:700 13px var(--head);color:var(--ink);text-decoration:none">
                📞 +91-9878339302
              </a>
              <a href="https://wa.me/919878339302" target="_blank" rel="noopener noreferrer" style="font:700 10px var(--head);text-transform:uppercase;letter-spacing:.06em;color:#166534;background:#DCFCE7;padding:4px 8px;border-radius:99px;text-decoration:none">
                WhatsApp Desk
              </a>
            </div>
            <div style="margin-top:8px;padding-top:6px;border-top:1px solid #EFECE3;font-size:9.5px;color:var(--ink-muted);display:flex;justify-content:space-between">
              <span>Zero Broker Markup</span>
              <span style="color:var(--accent);font-weight:600">Direct Publisher Tariffs</span>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(drawer);

      const openDrawer = () => {
        drawer.classList.add('open');
        document.body.style.overflow = 'hidden';
      };
      const closeDrawer = () => {
        drawer.classList.remove('open');
        document.body.style.overflow = '';
      };

      toggleBtn.addEventListener('click', openDrawer);
      drawer.querySelector('.mobile-close').addEventListener('click', closeDrawer);
      drawer.addEventListener('click', (e) => {
        if (e.target === drawer || e.target.tagName === 'A' || e.target.closest('a')) {
          closeDrawer();
        }
      });
    }

    // 2b. Services Dropdown Menu Interactive Toggles
    const dropdowns = header.querySelectorAll('.nav-dropdown');
    dropdowns.forEach(dd => {
      const trigger = dd.querySelector('.nav-dropdown-trigger');
      if (trigger) {
        trigger.addEventListener('click', (e) => {
          e.stopPropagation();
          const isOpen = dd.classList.contains('open');
          // Close others
          dropdowns.forEach(d => d.classList.remove('open'));
          if (!isOpen) {
            dd.classList.add('open');
            trigger.setAttribute('aria-expanded', 'true');
          } else {
            dd.classList.remove('open');
            trigger.setAttribute('aria-expanded', 'false');
          }
        });
      }
    });

    document.addEventListener('click', (e) => {
      dropdowns.forEach(dd => {
        if (!dd.contains(e.target)) {
          dd.classList.remove('open');
          const trigger = dd.querySelector('.nav-dropdown-trigger');
          if (trigger) trigger.setAttribute('aria-expanded', 'false');
        }
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        dropdowns.forEach(dd => {
          dd.classList.remove('open');
          const trigger = dd.querySelector('.nav-dropdown-trigger');
          if (trigger) trigger.setAttribute('aria-expanded', 'false');
        });
      }
    });
  }

  // 3. Make any standard table horizontally scrollable on mobile
  document.querySelectorAll('table').forEach(table => {
    if (!table.parentElement.classList.contains('table-responsive') && !table.classList.contains('bill')) {
      const wrapper = document.createElement('div');
      wrapper.className = 'table-responsive';
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    }
  });

  // 4. Floating Quick Contact Action Bar (Call & WhatsApp)
  if (!document.querySelector('.floating-actions')) {
    // Clean up any old standalone WhatsApp buttons
    const legacyWa = document.querySelectorAll('.wa-float, .wa');
    legacyWa.forEach(el => el.remove());

    const floatingDock = document.createElement('div');
    floatingDock.className = 'floating-actions';
    floatingDock.setAttribute('role', 'region');
    floatingDock.setAttribute('aria-label', 'Quick Support Actions');
    floatingDock.innerHTML = `
      <a class="floating-btn call-btn" href="tel:+919878339302" title="Call RKM Ads Support: +91-9878339302" aria-label="Call +91-9878339302">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
        <span class="btn-desktop-text">Call: +91-9878339302</span>
        <span class="btn-mobile-text">Call Us</span>
      </a>
      <a class="floating-btn wa-btn" href="https://wa.me/919878339302" target="_blank" rel="noopener" title="Chat on WhatsApp" aria-label="Chat on WhatsApp">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.11 7.44C8.95 7.44 8.7 7.5 8.48 7.74C8.26 7.97 7.65 8.55 7.65 9.71C7.65 10.87 8.5 11.99 8.62 12.15C8.74 12.31 10.27 14.66 12.63 15.68C14.6 16.53 15 16.36 15.43 16.32C15.86 16.28 16.82 15.75 17.02 15.19C17.22 14.63 17.22 14.15 17.16 14.05C17.1 13.95 16.94 13.89 16.7 13.77C16.46 13.65 15.28 13.07 15.06 12.99C14.84 12.91 14.68 12.87 14.52 13.11C14.36 13.35 13.9 13.89 13.76 14.05C13.62 14.21 13.48 14.23 13.24 14.11C13 13.99 12.03 13.67 10.89 12.65C10 11.86 9.4 10.88 9.24 10.64C9.08 10.4 9.22 10.27 9.34 10.15C9.45 10.04 9.59 9.86 9.71 9.72C9.83 9.58 9.87 9.48 9.95 9.32C10.03 9.16 9.99 9.02 9.93 8.9C9.87 8.78 9.41 7.64 9.21 7.18C9.02 6.72 8.82 6.78 8.68 6.78C8.54 6.78 8.38 6.78 8.22 6.78L9.11 7.44Z"/>
        </svg>
        <span class="btn-desktop-text">Chat on WhatsApp</span>
        <span class="btn-mobile-text">WhatsApp</span>
      </a>
    `;
    document.body.appendChild(floatingDock);
  }

  // 5. Smooth Page Transition Effect on Link Navigation
  if (!document.getElementById('route-progress-bar')) {
    const pBar = document.createElement('div');
    pBar.id = 'route-progress-bar';
    pBar.style.width = '0%';
    pBar.style.opacity = '0';
    document.body.appendChild(pBar);
  }

  // Animate page in
  document.body.classList.add('page-transition-wrapper');

  // Intercept internal HTML link clicks for smooth exit transition
  document.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      // Only process local links, ignoring anchors, tel, mailto, javascript, external urls
      if (
        !href ||
        href.startsWith('#') ||
        href.startsWith('tel:') ||
        href.startsWith('mailto:') ||
        href.startsWith('javascript:') ||
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        link.target === '_blank' ||
        e.metaKey ||
        e.ctrlKey
      ) {
        return;
      }

      e.preventDefault();
      const pBar = document.getElementById('route-progress-bar');
      if (pBar) {
        pBar.style.opacity = '1';
        pBar.style.width = '70%';
      }

      document.body.style.transition = 'opacity 0.28s ease, transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)';
      document.body.style.opacity = '0.35';
      document.body.style.transform = 'translateY(-10px)';

      setTimeout(() => {
        window.location.href = href;
      }, 260);
    });
  });

  // 6. Intersection Observer for Scroll-Reveal Content Animations
  const scrollTargets = document.querySelectorAll(
    '.reveal-on-scroll, section:not(.hero):not(.sec-pad), .card, .step, .faq-item, .service-metric-card, .pub-badge, .media-vertical-section, .proof-stage, .config-panel'
  );

  const scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          scrollObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  scrollTargets.forEach((el) => {
    if (!el.classList.contains('reveal-on-scroll')) {
      el.classList.add('reveal-on-scroll');
    }
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      el.classList.add('is-revealed');
    } else {
      scrollObserver.observe(el);
    }
  });
});



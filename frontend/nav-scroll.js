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
            <a href="index.html" class="logo" style="font-size:26px">RKM Ads<span>.</span></a>
            <button class="mobile-close" aria-label="Close Navigation Menu">✕</button>
          </div>
          <div class="mobile-drawer-links">
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
            <a href="contact.html">Contact &amp; Helplines</a>
            <div style="margin-top:20px;padding-top:16px;border-top:1px solid var(--line)">
              <a href="tel:+919878339302" style="color:var(--accent);font-weight:700;display:flex;align-items:center;gap:6px">
                📞 +91-9878339302
              </a>
              <a href="book-ad.html" class="btn accent sm" style="width:100%;text-align:center;margin-top:12px">
                Book Ad Online ➔
              </a>
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
});

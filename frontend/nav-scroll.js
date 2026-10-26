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



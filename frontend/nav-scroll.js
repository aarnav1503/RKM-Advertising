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
            ${nav ? nav.innerHTML : `
              <a href="newspaper-ads.html">Newspaper</a>
              <a href="radio-ads.html">Radio</a>
              <a href="cinema-ads.html">Cinema</a>
              <a href="tv-ads.html">Television</a>
              <a href="outdoor-ads.html">Outdoor</a>
              <a href="digital-marketing.html">Digital PR</a>
              <a href="rate-cards.html">Rate Cards</a>
            `}
            <a href="track-ad.html">Track Existing Ad</a>
            <a href="about.html">About Us</a>
            <a href="contact.html">Contact Us</a>
            <div style="margin-top:20px;padding-top:16px;border-top:1px solid var(--line)">
              <a href="tel:+918800334456" style="color:var(--accent);font-weight:700;display:flex;align-items:center;gap:6px">
                📞 +91-8800334456
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
});

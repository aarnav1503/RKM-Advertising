// Universal translucent header scroll effect
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  if (header) {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 15;
      header.classList.toggle('scrolled', isScrolled);
      header.classList.toggle('s', isScrolled);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const navigator = document.querySelector('[data-section-navigator]');
  if (!navigator) return;

  const links = Array.from(navigator.querySelectorAll('a[href^="#"]'));
  const sections = links
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter((section) => section instanceof HTMLElement);

  if (!links.length || sections.length !== links.length) {
    console.error('The section navigator contains a link without a matching page section.');
    return;
  }

  let hideTimer;
  const showNavigator = () => {
    navigator.classList.add('is-visible');
    window.clearTimeout(hideTimer);
    hideTimer = window.setTimeout(() => {
      navigator.classList.remove('is-visible');
    }, 3000);
  };

  window.addEventListener('scroll', showNavigator, { passive: true });

  const setActiveSection = () => {
    const activationPoint = window.innerHeight * 0.4;
    const activeIndex = sections.reduce((closestIndex, section, index) => {
      const bounds = section.getBoundingClientRect();
      const distance = activationPoint < bounds.top
        ? bounds.top - activationPoint
        : activationPoint > bounds.bottom
          ? activationPoint - bounds.bottom
          : 0;
      const closestBounds = sections[closestIndex].getBoundingClientRect();
      const closestDistance = activationPoint < closestBounds.top
        ? closestBounds.top - activationPoint
        : activationPoint > closestBounds.bottom
          ? activationPoint - closestBounds.bottom
          : 0;

      return distance < closestDistance ? index : closestIndex;
    }, 0);

    navigator.style.setProperty('--section-nav-offset', `${30 - activeIndex * 30}px`);
    links.forEach((link, index) => {
      if (index === activeIndex) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  if ('IntersectionObserver' in window) {
    let sectionObserver;
    const observeSections = () => {
      sectionObserver?.disconnect();
      const topInset = Math.round(window.innerHeight * 0.35);
      const bottomInset = Math.round(window.innerHeight * 0.55);
      sectionObserver = new IntersectionObserver(setActiveSection, {
        rootMargin: `-${topInset}px 0px -${bottomInset}px 0px`,
        threshold: 0
      });
      sections.forEach((section) => sectionObserver.observe(section));
      setActiveSection();
    };

    window.addEventListener('resize', observeSections);
    observeSections();
  } else {
    let updatePending = false;
    const scheduleActiveSectionUpdate = () => {
      if (updatePending) return;
      updatePending = true;
      window.requestAnimationFrame(() => {
        updatePending = false;
        setActiveSection();
      });
    };

    window.addEventListener('scroll', scheduleActiveSectionUpdate, { passive: true });
    window.addEventListener('resize', scheduleActiveSectionUpdate);
  }

  setActiveSection();
});

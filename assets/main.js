document.addEventListener('DOMContentLoaded', () => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealTargets = [
    ...document.querySelectorAll('.about-section > .row > div'),
    ...document.querySelectorAll('.experience-section > h2, .experience-grid .company'),
    ...document.querySelectorAll('.education-section > h2, .education-grid .school'),
    ...document.querySelectorAll('.skills-section .rect'),
    ...document.querySelectorAll('.contact-section > .container > h2, .contact-section > .container > p, .contact-container'),
    ...document.querySelectorAll('.projects-page > h2, .projects-page > p, .projects-page .row > .col-md-4'),
    ...document.querySelectorAll('.site-footer .container')
  ];

  revealTargets.forEach((element, index) => {
    element.classList.add('reveal-on-scroll');
    element.style.setProperty('--reveal-delay', `${Math.min(index % 6, 5) * 80}ms`);
  });

  // Keep the roadmap reveal in chronological order, independent of the page-wide stagger.
  document.querySelectorAll('.education-grid .school').forEach((school, index) => {
    school.style.setProperty('--reveal-delay', `${(index + 1) * 180}ms`);
  });

  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealTargets.forEach((element) => element.classList.add('reveal-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px' });

    revealTargets.forEach((element) => revealObserver.observe(element));
  }

  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((element) => {
    bootstrap.Tooltip.getOrCreateInstance(element);
  });

  const jobDrawer = document.getElementById('job-details-drawer');
  const jobOpeners = document.querySelectorAll('[data-job-details-open]');
  const jobClosers = document.querySelectorAll('[data-job-details-close]');
  const jobCloseButton = jobDrawer?.querySelector('.job-details-close');
  let lastFocusedElement;

  if (jobDrawer && jobOpeners.length) {
    const closeJobDetails = () => {
      jobDrawer.classList.remove('is-open');
      jobDrawer.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('job-details-open');
      jobOpeners.forEach((opener) => opener.setAttribute('aria-expanded', 'false'));
      lastFocusedElement?.focus();
    };

    jobOpeners.forEach((opener) => {
      opener.addEventListener('click', () => {
        lastFocusedElement = opener;
        jobDrawer.classList.add('is-open');
        jobDrawer.setAttribute('aria-hidden', 'false');
        document.body.classList.add('job-details-open');
        opener.setAttribute('aria-expanded', 'true');
        jobCloseButton?.focus();
      });
    });

    jobClosers.forEach((closer) => closer.addEventListener('click', closeJobDetails));

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && jobDrawer.classList.contains('is-open')) {
        closeJobDetails();
      }
    });
  }

  document.querySelectorAll('[data-about-carousel]').forEach((carousel) => {
    const slides = Array.from(carousel.querySelectorAll('.about-photo-slide'));
    const previousButton = carousel.querySelector('[data-about-carousel-prev]');
    const nextButton = carousel.querySelector('[data-about-carousel-next]');
    const status = carousel.querySelector('.about-photo-status');
    let activeIndex = 0;
    let autoplayTimer;
    let resumeTimer;
    let swipeStartX;

    const showSlide = (index, announce = true, direction = 1) => {
      activeIndex = (index + slides.length) % slides.length;
      const previousIndex = (activeIndex - 1 + slides.length) % slides.length;
      const nextIndex = (activeIndex + 1) % slides.length;

      slides.forEach((slide, slideIndex) => {
        slide.classList.toggle('is-active', slideIndex === activeIndex);
        slide.classList.toggle('is-previous', slideIndex === previousIndex);
        slide.classList.toggle('is-next', slideIndex === nextIndex);
        slide.classList.toggle('is-hidden-left', slideIndex !== activeIndex && slideIndex !== previousIndex && slideIndex !== nextIndex && direction > 0);
        slide.classList.toggle('is-hidden-right', slideIndex !== activeIndex && slideIndex !== previousIndex && slideIndex !== nextIndex && direction < 0);
        slide.setAttribute('aria-hidden', slideIndex === activeIndex ? 'false' : 'true');
      });

      if (announce) {
        status.textContent = `Photo ${activeIndex + 1} of ${slides.length}`;
      }
    };

    const stopAutoplay = () => window.clearInterval(autoplayTimer);

    const startAutoplay = () => {
      stopAutoplay();
      autoplayTimer = window.setInterval(() => showSlide(activeIndex + 1, false, 1), 2000);
    };

    const pauseAutoplayAfterInteraction = () => {
      stopAutoplay();
      window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(startAutoplay, 10000);
    };

    const showManualSlide = (index, direction) => {
      showSlide(index, true, direction);
      pauseAutoplayAfterInteraction();
    };

    previousButton?.addEventListener('click', () => showManualSlide(activeIndex - 1, -1));
    nextButton?.addEventListener('click', () => showManualSlide(activeIndex + 1, 1));
    carousel.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        showManualSlide(activeIndex - 1, -1);
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        showManualSlide(activeIndex + 1, 1);
      }
    });

    carousel.addEventListener('pointerdown', (event) => {
      swipeStartX = event.clientX;
      stopAutoplay();
    });

    carousel.addEventListener('pointerup', (event) => {
      if (swipeStartX === undefined) return;
      const swipeDistance = event.clientX - swipeStartX;
      swipeStartX = undefined;

      if (Math.abs(swipeDistance) >= 40) {
        showManualSlide(activeIndex + (swipeDistance < 0 ? 1 : -1), swipeDistance < 0 ? 1 : -1);
      } else {
        startAutoplay();
      }
    });

    carousel.addEventListener('pointercancel', () => {
      swipeStartX = undefined;
      startAutoplay();
    });

    carousel.setAttribute('tabindex', '0');
    showSlide(activeIndex, true, -1);
    startAutoplay();
  });

  document.querySelectorAll('[data-quote-typing]').forEach((quoteText) => {
    const quote = quoteText.closest('.quote-typing');
    const fullText = quoteText.textContent;
    const showFullQuote = () => {
      quoteText.textContent = fullText;
      quote?.classList.add('is-complete');
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      showFullQuote();
      return;
    }

    quoteText.textContent = '';
    let characterIndex = 0;
    const typeNextCharacter = () => {
      quoteText.textContent += fullText[characterIndex];
      characterIndex += 1;

      if (characterIndex < fullText.length) {
        window.setTimeout(typeNextCharacter, 130);
      } else {
        quote?.classList.add('is-complete');
        window.setTimeout(() => {
          characterIndex = 0;
          quoteText.textContent = '';
          quote?.classList.remove('is-complete');
          window.setTimeout(typeNextCharacter, 300);
        }, 5000);
      }
    };

    const quoteObserver = new IntersectionObserver((entries, observer) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        typeNextCharacter();
        observer.disconnect();
      }
    }, { threshold: 0.4 });

    quoteObserver.observe(quoteText);
  });
});

function copyPhone() {
  const phoneCard = document.getElementById('phone-card');
  const phoneNumber = document.getElementById('phone-number');

  if (!phoneCard || !phoneNumber || !navigator.clipboard) return;

  navigator.clipboard.writeText(phoneNumber.innerText).then(() => {
    const tooltip = bootstrap.Tooltip.getOrCreateInstance(phoneCard);
    tooltip.setContent({ '.tooltip-inner': 'Copied!' });
    tooltip.show();

    window.setTimeout(() => {
      tooltip.hide();
      tooltip.setContent({ '.tooltip-inner': 'Click to copy' });
    }, 1500);
  });
}

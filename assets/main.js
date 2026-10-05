document.addEventListener('DOMContentLoaded', () => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealTargets = [
    ...document.querySelectorAll('.about-section > .row > div'),
    ...document.querySelectorAll('.experience-section > h2, .experience-grid .company'),
    ...document.querySelectorAll('.education-section > h2, .education-grid .school'),
    ...document.querySelectorAll('.skills-section .rect'),
    ...document.querySelectorAll('.contact-section > .container > h2, .contact-section > .container > p, .contact-container'),
    ...document.querySelectorAll('.projects-section > h2, .projects-section > p, .projects-section .projects-carousel'),
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

  const certificateModal = document.getElementById('certificate-modal');
  const certificateImage = document.getElementById('certificate-image');
  const certificateOpeners = document.querySelectorAll('[data-certificate-open]');
  const certificateClosers = document.querySelectorAll('[data-certificate-close]');
  const certificateCloseButton = certificateModal?.querySelector('.certificate-modal-close');

  if (certificateModal && certificateOpeners.length) {
    const closeCertificateModal = () => {
      certificateModal.classList.remove('is-open');
      certificateModal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('certificate-modal-open');
      lastFocusedElement?.focus();
    };

    document.addEventListener('click', (event) => {
      const opener = event.target.closest('[data-certificate-open]');
      if (!opener) return;
        lastFocusedElement = opener;
        const imageSource = opener.dataset.certificateImage || '';
        if (certificateImage) {
          certificateImage.src = imageSource;
          certificateImage.alt = opener.getAttribute('aria-label') || 'Certificate';
        }
        certificateModal.classList.add('is-open');
        certificateModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('certificate-modal-open');
        certificateCloseButton?.focus();
    });

    certificateClosers.forEach((closer) => closer.addEventListener('click', closeCertificateModal));

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && certificateModal.classList.contains('is-open')) {
        closeCertificateModal();
      }
    });
  }

  document.querySelectorAll('[data-project-carousel]').forEach((carousel) => {
    const viewport = carousel.querySelector('[data-project-carousel-viewport]');
    const track = carousel.querySelector('.projects-carousel-track');
    const originalSlides = Array.from(carousel.querySelectorAll('.project-carousel-slide'));
    const previousButton = carousel.querySelector('[data-project-carousel-prev]');
    const nextButton = carousel.querySelector('[data-project-carousel-next]');
    const status = carousel.querySelector('[data-project-carousel-status]') || carousel.parentElement?.querySelector('[data-project-carousel-status]') || null;
    const leadingCloneCount = originalSlides.length;
    const cloneSlides = (sourceSlides) => {
      const fragment = document.createDocumentFragment();
      sourceSlides.forEach((slide) => {
        const clone = slide.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        clone.inert = true;
        fragment.append(clone);
      });
      return fragment;
    };

    if (!viewport || !track || !originalSlides.length) return;

    track.prepend(cloneSlides(originalSlides));
    track.append(cloneSlides(originalSlides));
    const slides = Array.from(track.querySelectorAll('.project-carousel-slide'));
    let activeIndex = 0;
    let scrollFrame;
    let settleTimer;
    let autoplayTimer;
    let resumeTimer;
    let isHovered = false;
    let isFocused = false;

    activeIndex = leadingCloneCount;

    const logicalIndex = (index) => (index - leadingCloneCount + originalSlides.length) % originalSlides.length;

    const visibleSlideCount = () => {
      const slideWidth = slides[0].getBoundingClientRect().width;
      const gap = parseFloat(window.getComputedStyle(track).columnGap) || 0;
      return slideWidth ? Math.max(1, Math.round((viewport.clientWidth + gap) / (slideWidth + gap))) : 1;
    };

    const updateStatus = (announce = true) => {
      if (!status) return;
      const visibleCount = visibleSlideCount();
      const start = logicalIndex(activeIndex);
      const end = start + visibleCount;
      const carouselLabel = carousel.getAttribute('aria-label')?.toLowerCase().includes('course') ? 'Courses' : 'Projects';
      status.setAttribute('aria-live', announce ? 'polite' : 'off');
      status.textContent = end <= originalSlides.length
        ? `${carouselLabel} ${start + 1}-${end} of ${originalSlides.length}`
        : `${carouselLabel} ${start + 1}-${originalSlides.length}, 1-${end - originalSlides.length} of ${originalSlides.length}`;
    };

    const findActiveSlideIndex = () => {
      const viewportLeft = viewport.getBoundingClientRect().left;
      return slides.reduce((closestIndex, slide, index) => {
        const closestDistance = Math.abs(slides[closestIndex].getBoundingClientRect().left - viewportLeft);
        const slideDistance = Math.abs(slide.getBoundingClientRect().left - viewportLeft);
        return slideDistance < closestDistance ? index : closestIndex;
      }, 0);
    };

    const goToSlide = (index, announce = true) => {
      activeIndex = Math.min(Math.max(index, 0), slides.length - 1);
      const left = slides[activeIndex].offsetLeft - slides[0].offsetLeft;
      viewport.scrollTo({ left, behavior: reducedMotion ? 'auto' : 'smooth' });
      updateStatus(announce);
    };

    const normalizeClonePosition = () => {
      if (scrollFrame !== undefined) {
        window.cancelAnimationFrame(scrollFrame);
        scrollFrame = undefined;
      }
      activeIndex = findActiveSlideIndex();

      if (activeIndex < leadingCloneCount || activeIndex >= leadingCloneCount + originalSlides.length) {
        const equivalentIndex = leadingCloneCount + logicalIndex(activeIndex);
        const left = slides[equivalentIndex].offsetLeft - slides[0].offsetLeft;
        const previousSnap = viewport.style.scrollSnapType;
        viewport.style.scrollSnapType = 'none';
        viewport.scrollTo({ left, behavior: 'instant' });
        activeIndex = equivalentIndex;
        window.requestAnimationFrame(() => {
          viewport.style.scrollSnapType = previousSnap;
        });
      }
      updateStatus(false);
    };

    const stopAutoplay = () => window.clearInterval(autoplayTimer);

    const startAutoplay = () => {
      stopAutoplay();
      if (reducedMotion || isHovered || isFocused || resumeTimer !== undefined) return;
      autoplayTimer = window.setInterval(() => goToSlide(findActiveSlideIndex() + 1, false), 2000);
    };

    const pauseAutoplayAfterInteraction = () => {
      stopAutoplay();
      window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(() => {
        resumeTimer = undefined;
        startAutoplay();
      }, 10000);
    };

    const updateActiveSlide = () => {
      scrollFrame = undefined;
      activeIndex = findActiveSlideIndex();
      updateStatus(false);
    };

    previousButton?.addEventListener('click', () => {
      goToSlide(findActiveSlideIndex() - 1);
      pauseAutoplayAfterInteraction();
    });
    nextButton?.addEventListener('click', () => {
      goToSlide(findActiveSlideIndex() + 1);
      pauseAutoplayAfterInteraction();
    });
    carousel.addEventListener('pointerenter', () => {
      isHovered = true;
      stopAutoplay();
    });
    carousel.addEventListener('pointerleave', () => {
      isHovered = false;
      startAutoplay();
    });
    carousel.addEventListener('focusin', () => {
      isFocused = true;
      stopAutoplay();
    });
    carousel.addEventListener('focusout', (event) => {
      if (carousel.contains(event.relatedTarget)) return;
      isFocused = false;
      startAutoplay();
    });
    carousel.addEventListener('pointerdown', stopAutoplay);
    carousel.addEventListener('pointerup', pauseAutoplayAfterInteraction);
    carousel.addEventListener('pointercancel', pauseAutoplayAfterInteraction);
    viewport.addEventListener('scroll', () => {
      if (scrollFrame === undefined) scrollFrame = window.requestAnimationFrame(updateActiveSlide);
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(normalizeClonePosition, 140);
    });
    viewport.addEventListener('scrollend', normalizeClonePosition);
    viewport.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goToSlide(findActiveSlideIndex() - 1);
        pauseAutoplayAfterInteraction();
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        goToSlide(findActiveSlideIndex() + 1);
        pauseAutoplayAfterInteraction();
      }
    });
    window.addEventListener('resize', () => {
      goToSlide(findActiveSlideIndex(), false);
    });

    goToSlide(activeIndex, false);
    updateStatus();
    startAutoplay();
  });

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

const translateUi = source => window.StavDMI18n?.t(source) || source;

if (document.querySelector('.reference-hero, .company-story')) {
  const landingStyles = document.createElement('link');
  landingStyles.rel = 'stylesheet';
  landingStyles.href = 'css/landing.css?v=20261019-2';
  document.head.appendChild(landingStyles);
}
if (document.querySelector('.green-projects')) {
  const aboutHomeStyles = document.createElement('link');
  aboutHomeStyles.rel = 'stylesheet';
  aboutHomeStyles.href = 'css/about-home.css';
  document.head.appendChild(aboutHomeStyles);
}
if (document.querySelector('.photo-map')) {
  const mapStyles = document.createElement('link');
  mapStyles.rel = 'stylesheet';
  mapStyles.href = 'css/map.css';
  document.head.appendChild(mapStyles);
  const mapPins = [...document.querySelectorAll('.photo-pin')];
  const closeMapPins = () => mapPins.forEach(item => {
    item.classList.remove('active');
    item.setAttribute('aria-expanded', 'false');
  });

  mapPins.forEach(pin => {
    pin.setAttribute('aria-expanded', 'false');
    pin.addEventListener('click', event => {
      event.stopPropagation();
      const wasActive = pin.classList.contains('active');
      closeMapPins();
      if (!wasActive) {
        pin.classList.add('active');
        pin.setAttribute('aria-expanded', 'true');
      }
    });
  });

  document.addEventListener('click', closeMapPins);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMapPins();
  });

  const photoMap = document.querySelector('.photo-map');
  if ('ResizeObserver' in window && photoMap) {
    const mapResizeObserver = new ResizeObserver(closeMapPins);
    mapResizeObserver.observe(photoMap);
  }
}
if (document.querySelector('.brand')) {
  const logoStyles = document.createElement('link');
  logoStyles.rel = 'stylesheet';
  logoStyles.href = 'css/logo.css';
  document.head.appendChild(logoStyles);
  const navigationStyles = document.createElement('link');
  navigationStyles.rel = 'stylesheet';
  navigationStyles.href = 'css/navigation.css';
  document.head.appendChild(navigationStyles);
}
if (document.body.classList.contains('home')) {
  const brand = document.querySelector('.brand');
  if (brand) brand.insertAdjacentHTML('beforeend', '<span class="brand-tagline">Partner<br>pre<br>stavebné projekty<span class="brand-dot">.</span></span>');
  const homeLayoutStyles = document.createElement('link');
  homeLayoutStyles.rel = 'stylesheet';
  homeLayoutStyles.href = 'css/home-layout.css?v=20261019-2';
  document.head.appendChild(homeLayoutStyles);
  const homeCtaStyles = document.createElement('link');
  homeCtaStyles.rel = 'stylesheet';
  homeCtaStyles.href = 'css/home-cta.css';
  document.head.appendChild(homeCtaStyles);
  const homeStatsStyles = document.createElement('link');
  homeStatsStyles.rel = 'stylesheet';
  homeStatsStyles.href = 'css/home-stats.css';
  document.head.appendChild(homeStatsStyles);
  const homeContactStyles = document.createElement('link');
  homeContactStyles.rel = 'stylesheet';
  homeContactStyles.href = 'css/home-contact.css';
  document.head.appendChild(homeContactStyles);
  const homeProjectOverviewStyles = document.createElement('link');
  homeProjectOverviewStyles.rel = 'stylesheet';
  homeProjectOverviewStyles.href = 'css/home-project-overview.css';
  document.head.appendChild(homeProjectOverviewStyles);
  const homeServicesStyles = document.createElement('link');
  homeServicesStyles.rel = 'stylesheet';
  homeServicesStyles.href = 'css/home-services.css?v=20261019-1';
  document.head.appendChild(homeServicesStyles);

  const homeHeader = document.querySelector('.home .site-header');
  const heroImage = document.querySelector('.home .reference-hero > img');
  const homeLogo = homeHeader?.querySelector('.brand img');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let parallaxFrame;

  const updateHomeAppearance = () => {
    const isScrolled = window.scrollY > 32;
    homeHeader?.classList.toggle('is-scrolled', isScrolled);

    if (homeLogo) {
      const nextLogo = isScrolled ? homeLogo.dataset.darkLogo : homeLogo.dataset.lightLogo;
      if (nextLogo && homeLogo.getAttribute('src') !== nextLogo) homeLogo.src = nextLogo;
    }

    if (heroImage && !reduceMotion) {
      const heroHeight = heroImage.parentElement?.offsetHeight || 0;
      const offset = Math.min(Math.max(window.scrollY, 0), heroHeight) * 0.18;
      heroImage.style.transform = `translate3d(0, ${offset}px, 0) scale(1.06)`;
    }
  };

  const requestHomeAppearance = () => {
    if (parallaxFrame) return;
    parallaxFrame = requestAnimationFrame(() => {
      parallaxFrame = undefined;
      updateHomeAppearance();
    });
  };

  window.addEventListener('scroll', requestHomeAppearance, { passive: true });
  updateHomeAppearance();

}
if (document.body.matches('.about-page, .projects-page, .services-page')) {
  const overlayHeader = document.querySelector('.site-header');
  const overlayLogo = overlayHeader?.querySelector('.brand img');
  let overlayHeaderFrame;

  const updateOverlayHeader = () => {
    const isScrolled = window.scrollY > 32;
    overlayHeader?.classList.toggle('is-scrolled', isScrolled);

    if (overlayLogo) {
      const nextLogo = isScrolled ? overlayLogo.dataset.darkLogo : overlayLogo.dataset.lightLogo;
      if (nextLogo && overlayLogo.getAttribute('src') !== nextLogo) overlayLogo.src = nextLogo;
    }
  };

  const requestOverlayHeaderUpdate = () => {
    if (overlayHeaderFrame) return;
    overlayHeaderFrame = requestAnimationFrame(() => {
      overlayHeaderFrame = undefined;
      updateOverlayHeader();
    });
  };

  window.addEventListener('scroll', requestOverlayHeaderUpdate, { passive: true });
  updateOverlayHeader();
}
const companyStats = document.querySelector('.company-stats');
if (companyStats) {
  const formatNumber = value => window.StavDMI18n?.formatNumber(value)
    || new Intl.NumberFormat(document.documentElement.lang === 'de' ? 'de-DE' : 'sk-SK').format(value);
  const formatStatNumber = value => value === 2008 ? String(value) : formatNumber(value);
  const showFinalNumber = value => {
    const target = Number(value.dataset.count);
    value.textContent = `${formatStatNumber(target)}${value.dataset.suffix || ''}`;
  };
  const animateNumber = value => {
    const target = Number(value.dataset.count);
    const duration = target >= 1000 ? 1500 : 1100;
    const start = performance.now();
    const step = now => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const displayedValue = Math.round(target * eased);
      value.textContent = `${target === 2008 ? displayedValue : formatNumber(displayedValue)}${value.dataset.suffix || ''}`;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      companyStats.querySelectorAll('.company-stat-value').forEach(animateNumber);
      statsObserver.unobserve(companyStats);
    });
  }, { threshold: .35 });
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    companyStats.querySelectorAll('.company-stat-value').forEach(showFinalNumber);
  } else {
    statsObserver.observe(companyStats);
  }
  window.addEventListener('stavdm:languagechange', () => {
    companyStats.querySelectorAll('.company-stat-value').forEach(showFinalNumber);
  });
}
if (document.querySelector('.realization-card, .home-project-card')) {
  const projectCardStyles = document.createElement('link');
  projectCardStyles.rel = 'stylesheet';
  projectCardStyles.href = 'css/project-cards.css';
  document.head.appendChild(projectCardStyles);
}
const homeProjectSlider = document.querySelector('#home-project-slider');
if (homeProjectSlider) {
  const previousButton = document.querySelector('.project-slider-prev');
  const nextButton = document.querySelector('.project-slider-next');
  const getScrollStep = () => {
    const card = homeProjectSlider.querySelector('.home-project-card');
    const gap = parseFloat(getComputedStyle(homeProjectSlider).gap) || 0;
    return card ? card.getBoundingClientRect().width + gap : homeProjectSlider.clientWidth;
  };
  const updateSliderButtons = () => {
    const maximumScroll = homeProjectSlider.scrollWidth - homeProjectSlider.clientWidth;
    previousButton.disabled = homeProjectSlider.scrollLeft <= 2;
    nextButton.disabled = homeProjectSlider.scrollLeft >= maximumScroll - 2;
  };
  const moveSlider = direction => {
    homeProjectSlider.scrollBy({ left: direction * getScrollStep(), behavior: 'smooth' });
  };
  previousButton.addEventListener('click', () => moveSlider(-1));
  nextButton.addEventListener('click', () => moveSlider(1));
  homeProjectSlider.addEventListener('scroll', updateSliderButtons, { passive: true });
  homeProjectSlider.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    moveSlider(event.key === 'ArrowRight' ? 1 : -1);
  });
  window.addEventListener('resize', updateSliderButtons);
  updateSliderButtons();
}

const yearOverviewMedia = window.matchMedia('(max-width: 650px)');
document.querySelectorAll('.year-grid').forEach((yearGrid, gridIndex) => {
  const timelineItems = [...yearGrid.querySelectorAll(':scope > article')];
  if (!timelineItems.length) return;
  let activeDesktopIndex = timelineItems.findIndex(item => item.classList.contains('year-current'));
  if (activeDesktopIndex < 0) activeDesktopIndex = timelineItems.length - 1;

  yearGrid.classList.add('timeline-enhanced');

  const updateDesktopPanelHeight = projectList => {
    if (yearOverviewMedia.matches || projectList.hidden) return;
    requestAnimationFrame(() => {
      yearGrid.style.setProperty('--year-panel-height', `${Math.max(projectList.scrollHeight, 110)}px`);
    });
  };

  const setDesktopItem = index => {
    activeDesktopIndex = index;
    timelineItems.forEach((item, itemIndex) => {
      const button = item.querySelector(':scope > .year-toggle');
      const projectList = item.querySelector(':scope > ul');
      if (!button || !projectList) return;
      const isActive = itemIndex === activeDesktopIndex;
      item.classList.toggle('is-active', isActive);
      button.setAttribute('aria-expanded', String(isActive));
      projectList.hidden = !isActive;
      if (isActive) updateDesktopPanelHeight(projectList);
    });
  };

  timelineItems.forEach((item, itemIndex) => {
    const staticLabel = item.querySelector(':scope > strong, :scope > div');
    const yearLabel = staticLabel?.querySelector('strong') || staticLabel;
    const statusLabel = staticLabel?.querySelector('span');
    const projectList = item.querySelector(':scope > ul');
    if (!yearLabel || !projectList) return;

    staticLabel.classList.add('year-static-label');

    const buttonId = `year-toggle-${gridIndex}-${itemIndex}`;
    const listId = `year-projects-${gridIndex}-${itemIndex}`;
    const toggleButton = document.createElement('button');
    toggleButton.className = 'year-toggle';
    toggleButton.type = 'button';
    toggleButton.id = buttonId;
    toggleButton.setAttribute('aria-controls', listId);
    toggleButton.setAttribute('aria-expanded', 'false');

    const buttonYear = document.createElement('strong');
    buttonYear.textContent = yearLabel.textContent.trim();
    toggleButton.appendChild(buttonYear);

    if (statusLabel) {
      const buttonStatus = document.createElement('span');
      buttonStatus.className = 'year-toggle-status';
      buttonStatus.textContent = statusLabel.textContent.trim();
      toggleButton.appendChild(buttonStatus);
    } else {
      toggleButton.appendChild(document.createElement('span'));
    }

    const buttonIcon = document.createElement('span');
    buttonIcon.className = 'year-toggle-icon';
    buttonIcon.setAttribute('aria-hidden', 'true');

    const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    iconSvg.setAttribute('viewBox', '0 0 16 16');
    iconSvg.setAttribute('focusable', 'false');
    iconSvg.setAttribute('aria-hidden', 'true');

    const iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    iconPath.setAttribute('d', 'M3 5.5 8 10.5 13 5.5');
    iconSvg.appendChild(iconPath);
    buttonIcon.appendChild(iconSvg);
    toggleButton.appendChild(buttonIcon);

    projectList.id = listId;
    projectList.setAttribute('aria-labelledby', buttonId);
    item.insertBefore(toggleButton, staticLabel);

    toggleButton.addEventListener('click', () => {
      if (yearOverviewMedia.matches) {
        const willOpen = toggleButton.getAttribute('aria-expanded') !== 'true';
        toggleButton.setAttribute('aria-expanded', String(willOpen));
        projectList.hidden = !willOpen;
        return;
      }
      setDesktopItem(itemIndex);
    });

    toggleButton.addEventListener('keydown', event => {
      if (yearOverviewMedia.matches) return;
      const keyTargets = {
        ArrowLeft: Math.max(0, itemIndex - 1),
        ArrowRight: Math.min(timelineItems.length - 1, itemIndex + 1),
        Home: 0,
        End: timelineItems.length - 1
      };
      if (!(event.key in keyTargets)) return;
      event.preventDefault();
      const nextIndex = keyTargets[event.key];
      const nextButton = timelineItems[nextIndex].querySelector(':scope > .year-toggle');
      setDesktopItem(nextIndex);
      nextButton?.focus();
    });
  });

  const syncYearOverview = () => {
    const isMobile = yearOverviewMedia.matches;
    if (!isMobile) {
      setDesktopItem(activeDesktopIndex);
      return;
    }

    yearGrid.style.removeProperty('--year-panel-height');
    timelineItems.forEach(item => {
      const button = item.querySelector(':scope > .year-toggle');
      const projectList = item.querySelector(':scope > ul');
      if (!button || !projectList) return;
      item.classList.remove('is-active');
      button.tabIndex = 0;
      button.setAttribute('aria-expanded', 'false');
      projectList.hidden = true;
    });
  };

  syncYearOverview();
  yearOverviewMedia.addEventListener('change', syncYearOverview);
  window.addEventListener('resize', () => {
    if (!yearOverviewMedia.matches) setDesktopItem(activeDesktopIndex);
  });
});

if (document.querySelector('.brand')) {
  const identityStyles = document.createElement('link');
  identityStyles.rel = 'stylesheet';
  identityStyles.href = 'css/identity.css';
  document.head.appendChild(identityStyles);
}
const siteSystemStyles = document.createElement('link');
siteSystemStyles.rel = 'stylesheet';
siteSystemStyles.href = 'css/site-system.css?v=20261020-13';

const initializeSiteMotion = () => {
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (motionPreference.matches) return;

  const heroSelectors = [
    '.home .reference-hero > div > .eyebrow',
    '.home .reference-hero > div > h1',
    '.home .reference-hero > div > p:not(.eyebrow)',
    '.home .reference-hero > div > a',
    '.about-page .about-hero-copy > .eyebrow',
    '.about-page .about-hero-copy > h1',
    '.about-page .about-hero-copy > p:not(.eyebrow)',
    '.about-page .about-hero-copy > a',
    '.projects-page .projects-hero-copy > .eyebrow',
    '.projects-page .projects-hero-copy > h1',
    '.projects-page .projects-hero-copy > .projects-lead',
    '.projects-page .projects-hero-copy > a',
    '.services-page .services-hero-copy > .eyebrow',
    '.services-page .services-hero-copy > h1',
    '.services-page .services-hero-copy > p:not(.eyebrow)',
    '.services-page .services-hero-copy > a',
    '.realization-page .detail-hero-content > *'
  ];
  const heroItems = document.querySelectorAll(heroSelectors.join(','));
  heroItems.forEach((item, index) => {
    item.classList.add('motion-hero-item');
    item.style.setProperty('--motion-delay', `${80 + index * 65}ms`);
  });

  const revealTargets = new Set();
  const sectionSelectors = [
    '.home .green-intro',
    '.home .about-services-block',
    '.home .home-projects-panel',
    '.home .project-overview > .project-section-heading',
    '.home .map-heading',
    '.home .map-scroll',
    '.about-page .about-story-heading',
    '.about-page .about-story-copy',
    '.about-page .leadership-heading',
    '.projects-page .projects-current > header',
    '.projects-page .all-realizations > .project-section-heading',
    '.projects-page .project-overview > .project-section-heading',
    '.services-page .services-catalog-heading',
    '.contact-page-body .contact-form-panel > header',
    '.contact-page-body .contact-form-panel > form',
    '.contact-page-body .contact-directory',
    '.realization-page .detail-summary',
    '.realization-page .detail-gallery-section > header',
    '.site-contact-cta'
  ];
  document.querySelectorAll(sectionSelectors.join(',')).forEach(target => revealTargets.add(target));

  const staggerGroups = [
    ['.home .about-services', ':scope > article'],
    ['.home .three-projects', ':scope > .home-project-card'],
    ['.year-grid', ':scope > article'],
    ['.company-stats', ':scope > article'],
    ['.about-project-strip', ':scope > figure'],
    ['.leader-grid', ':scope > article'],
    ['.current-project-list', ':scope > article'],
    ['.realization-list', ':scope > .realization-card'],
    ['.services-grid', ':scope > .service-card'],
    ['.contact-directory', ':scope > article'],
    ['.detail-gallery', ':scope > .gallery-photo']
  ];
  staggerGroups.forEach(([groupSelector, itemSelector]) => {
    document.querySelectorAll(groupSelector).forEach(group => {
      group.querySelectorAll(itemSelector).forEach((item, index) => {
        item.style.setProperty('--motion-delay', `${Math.min(index, 5) * 55}ms`);
        revealTargets.add(item);
      });
    });
  });

  revealTargets.forEach(target => {
    target.classList.add('motion-reveal');
    target.style.setProperty('--motion-shift', window.innerWidth <= 760 ? '20px' : '28px');
  });

  document.documentElement.classList.add('motion-ready');
  requestAnimationFrame(() => requestAnimationFrame(() => {
    document.documentElement.classList.add('motion-entered');
  }));

  if (!('IntersectionObserver' in window)) {
    revealTargets.forEach(target => target.classList.add('is-visible'));
    return;
  }

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });
  revealTargets.forEach(target => revealObserver.observe(target));
};

siteSystemStyles.addEventListener('load', initializeSiteMotion, { once: true });
document.head.appendChild(siteSystemStyles);
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
if (toggle && nav) {
  let menuCloseTimer;
  const menuLinks = [...nav.querySelectorAll('a')];
  const setMenuOpen = (opened, immediate = false) => {
    window.clearTimeout(menuCloseTimer);
    toggle.setAttribute('aria-expanded', String(opened));
    toggle.setAttribute('aria-label', translateUi(opened ? 'Zavrieť menu' : 'Otvoriť menu'));
    document.body.classList.toggle('menu-open', opened);

    if (opened) {
      nav.classList.remove('is-closing');
      nav.classList.add('open');
      menuLinks[0]?.focus({ preventScroll: true });
      return;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (immediate || reduceMotion || !nav.classList.contains('open')) {
      nav.classList.remove('open', 'is-closing');
      return;
    }

    nav.classList.remove('open');
    nav.classList.add('is-closing');
    menuCloseTimer = window.setTimeout(() => nav.classList.remove('is-closing'), 230);
  };

  toggle.addEventListener('click', () => setMenuOpen(!nav.classList.contains('open')));
  menuLinks.forEach(link => link.addEventListener('click', () => setMenuOpen(false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('open')) {
      setMenuOpen(false);
      toggle.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!nav.classList.contains('open')) return;
    if (nav.contains(event.target) || toggle.contains(event.target)) return;
    setMenuOpen(false);
  });

  const desktopMenuMedia = window.matchMedia('(min-width: 1025px)');
  desktopMenuMedia.addEventListener('change', event => {
    if (event.matches) setMenuOpen(false, true);
  });
  window.addEventListener('stavdm:languagechange', () => {
    toggle.setAttribute(
      'aria-label',
      translateUi(nav.classList.contains('open') ? 'Zavrieť menu' : 'Otvoriť menu')
    );
  });
}
document.querySelectorAll('#year').forEach(el => el.textContent = new Date().getFullYear());
const form = document.querySelector('#contact-form');
if (form) {
  const validationMessage = field => {
    if (field.validity.valueMissing) return translateUi('Vyplňte, prosím, toto pole.');
    if (field.validity.typeMismatch && field.type === 'email') {
      return translateUi('Zadajte platnú e-mailovú adresu.');
    }
    return '';
  };

  form.addEventListener('invalid', event => {
    const field = event.target;
    if (!(field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement)) return;
    field.setCustomValidity('');
    field.setCustomValidity(validationMessage(field));
    field.setAttribute('aria-invalid', 'true');
  }, true);

  form.addEventListener('input', event => {
    const field = event.target;
    if (!(field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement)) return;
    field.setCustomValidity('');
    field.removeAttribute('aria-invalid');
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const body = [
      `${translateUi('Meno')}: ${data.get('name')}`,
      `E-mail: ${data.get('email')}`,
      `${translateUi('Telefón')}: ${data.get('phone') || translateUi('neuvedený')}`,
      '',
      translateUi('Správa:'),
      data.get('message')
    ].join('\n');
    const formNote = document.querySelector('#form-note');
    if (formNote) {
      formNote.textContent = translateUi('Otváram váš e-mailový program. Správu odošlete až po vlastnom potvrdení.');
    }
    const subject = encodeURIComponent(translateUi('Dopyt z webu StavDM'));
    window.location.assign(
      `mailto:majercik.l@stavdm.sk?subject=${subject}&body=${encodeURIComponent(body)}`
    );
  });
}

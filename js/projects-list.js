const realizationList = document.querySelector('#realization-list');

if (realizationList && Array.isArray(window.stavdmProjects)) {
  const projects = [...window.stavdmProjects].sort(
    (a, b) => b.sortYear - a.sortYear || a.name.localeCompare(b.name, 'sk')
  );

  projects.forEach((project, index) => {
    const article = document.createElement('article');
    article.className = 'realization-card';

    const cardLink = document.createElement('a');
    cardLink.className = 'realization-card-link';
    cardLink.href = `realizacia.html?projekt=${encodeURIComponent(project.slug)}`;
    cardLink.setAttribute('aria-label', `Pozrieť realizáciu ${project.name}`);

    const image = document.createElement('img');
    image.src = project.cover;
    image.alt = `${project.name} – ${project.location}`;
    image.loading = index < 2 ? 'eager' : 'lazy';
    image.decoding = 'async';
    cardLink.appendChild(image);

    const year = document.createElement('span');
    year.className = 'realization-year';
    year.textContent = project.year;
    cardLink.appendChild(year);

    const content = document.createElement('div');
    content.className = 'realization-card-content';
    content.innerHTML = `
      <p>${project.type}</p>
      <h2>${project.name}</h2>
      <span>${project.location}</span>`;

    const arrow = document.createElement('span');
    arrow.className = 'card-arrow';
    arrow.textContent = '→';

    cardLink.append(content, arrow);
    article.appendChild(cardLink);
    realizationList.appendChild(article);
  });
}

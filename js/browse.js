const Browse = {
  render(videos, creators, params) {
    const category = params.get('category') || 'all';
    const creatorFilter = params.get('creator') || 'all';
    const categories = ['all', 'crypto', 'nft', 'phone', 'romance', 'online'];

    let filtered = [...videos];
    if (category !== 'all') {
      filtered = filtered.filter(v => v.category === category);
    }
    if (creatorFilter !== 'all') {
      filtered = filtered.filter(v => v.creator === creatorFilter);
    }

    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

    return `
      <h1 class="page-title"><span class="accent">Browse</span> Videos</h1>
      <p class="page-subtitle">${filtered.length} videos${category !== 'all' ? ` in ${category}` : ''}${creatorFilter !== 'all' ? ` by ${creatorFilter}` : ''}</p>

      <div class="filter-bar">
        ${categories.map(cat => `
          <button class="filter-btn ${category === cat ? 'active' : ''}"
            onclick="location.hash='/browse?category=${cat}${creatorFilter !== 'all' ? '&creator=' + creatorFilter : ''}'">
            ${cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        `).join('')}
      </div>

      ${filtered.length ? `
        <div class="video-grid">
          ${filtered.map(v => Home.renderCard(v, creators)).join('')}
        </div>
      ` : `
        <div class="empty-state">
          <div class="icon">&#128269;</div>
          <p>No videos found for this filter.</p>
        </div>
      `}
    `;
  }
};
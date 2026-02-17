const Home = {
  render(videos, creators) {
    const featured = videos.find(v => v.featured) || videos[0];
    const creator = creators.find(c => c.id === featured.creator);
    const creatorName = creator ? creator.name : featured.creator;

    const trending = videos
      .filter(v => v.id !== featured.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 8);

    const topCreators = creators
      .map(c => ({
        ...c,
        count: videos.filter(v => v.creator === c.id).length
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 4);

    return `
      <div class="hero">
        <div class="hero-logo">
          <span class="red">scam</span><span class="dot">.</span>video
        </div>
        <p class="hero-tagline">The Best Scam Exposure Videos, Curated.</p>
        <p class="hero-description">
          Browse ${videos.length} videos from ${creators.length} creators. Organized by category, creator, and scam type.
          Better discovery than YouTube's algorithm.
        </p>
        <div class="hero-stats">
          <div class="hero-stat">
            <span class="number">${videos.length}</span>
            <span class="label">Videos</span>
          </div>
          <div class="hero-stat">
            <span class="number">${creators.length}</span>
            <span class="label">Creators</span>
          </div>
          <div class="hero-stat">
            <span class="number">5</span>
            <span class="label">Categories</span>
          </div>
        </div>
        <div class="hero-cta">
          <a href="#/browse" class="btn btn-primary">&#127916; Browse All Videos</a>
          <a href="#/creators" class="btn btn-outline">&#127908; View Creators</a>
        </div>
      </div>

      <!-- Featured Video -->
      <div class="featured-video">
        <div class="section-header">
          <h2 class="section-title"><span class="accent">Featured</span> Video</h2>
          <span class="featured-badge">Today's Pick</span>
        </div>
        <div class="featured-embed">
          <iframe src="https://www.youtube.com/embed/${featured.videoId}"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen loading="lazy"></iframe>
        </div>
        <div class="featured-info">
          <div>
            <h3>${featured.title}</h3>
            <p class="creator"><a href="#/creator/${featured.creator}">${creatorName}</a> &middot; ${featured.date}</p>
          </div>
        </div>
      </div>

      <!-- Trending Videos -->
      <div class="section-header">
        <h2 class="section-title"><span class="accent">Trending</span> Videos</h2>
        <a href="#/browse" class="section-link">View all &rarr;</a>
      </div>
      <div class="video-grid" style="margin-bottom:48px">
        ${trending.map(v => this.renderCard(v, creators)).join('')}
      </div>

      <!-- Creator Spotlights -->
      <div class="section-header">
        <h2 class="section-title"><span class="accent">Top</span> Creators</h2>
        <a href="#/creators" class="section-link">View all &rarr;</a>
      </div>
      <div class="creator-grid">
        ${topCreators.map(c => `
          <div class="creator-card" onclick="location.hash='/creator/${c.id}'">
            <div class="creator-card-header">
              <div class="creator-avatar">${c.name.charAt(0)}</div>
              <div>
                <h3>${c.name}</h3>
                <span class="subs">${c.subscribers} subscribers</span>
              </div>
            </div>
            <p>${c.description}</p>
            <div class="video-count">${c.count} videos</div>
          </div>
        `).join('')}
      </div>
    `;
  },

  renderCard(video, creators) {
    const creator = creators.find(c => c.id === video.creator);
    const creatorName = creator ? creator.name : video.creator;

    return `
      <div class="video-card" onclick="location.hash='/watch/${video.id}'">
        <div class="video-thumb">
          <img src="https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg" alt="${video.title}" loading="lazy">
          <div class="play-overlay"><div class="play-icon">&#9654;</div></div>
          ${video.duration ? `<span class="video-duration">${video.duration}</span>` : ''}
        </div>
        <div class="video-card-info">
          <h4>${video.title}</h4>
          <div class="meta">
            <span class="creator-name">${creatorName}</span>
            <span class="category-tag tag-${video.category}">${video.category}</span>
            ${video.views ? `<span>${video.views} views</span>` : ''}
          </div>
        </div>
      </div>
    `;
  }
};
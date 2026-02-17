const Creators = {
  renderList(creators, videos) {
    const creatorsWithCounts = creators.map(c => ({
      ...c,
      count: videos.filter(v => v.creator === c.id).length
    })).sort((a, b) => b.count - a.count);

    return `
      <h1 class="page-title"><span class="accent">Scam Exposure</span> Creators</h1>
      <p class="page-subtitle">${creators.length} creators fighting fraud on YouTube.</p>

      <div class="creator-grid">
        ${creatorsWithCounts.map(c => `
          <div class="creator-card" onclick="location.hash='/creator/${c.id}'">
            <div class="creator-card-header">
              <div class="creator-avatar">${c.name.charAt(0)}</div>
              <div>
                <h3>${c.name}</h3>
                <span class="subs">${c.subscribers} subscribers</span>
              </div>
            </div>
            <p>${c.description}</p>
            <div class="video-count">${c.count} video${c.count !== 1 ? 's' : ''} on scam.video</div>
          </div>
        `).join('')}
      </div>
    `;
  },

  renderProfile(creator, videos, creators) {
    if (!creator) {
      return `<div class="empty-state"><div class="icon">&#128683;</div><p>Creator not found.</p></div>`;
    }

    const creatorVideos = videos.filter(v => v.creator === creator.id)
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    return `
      <div class="creator-profile-header">
        <div class="creator-profile-avatar">${creator.name.charAt(0)}</div>
        <div class="creator-profile-info">
          <h1>${creator.name}</h1>
          <p class="subs">${creator.subscribers} subscribers</p>
          <p>${creator.description}</p>
          <a href="${creator.channelUrl}" target="_blank" rel="noopener" class="channel-link">
            Visit YouTube Channel &rarr;
          </a>
        </div>
      </div>

      <div class="section-header">
        <h2 class="section-title">${creatorVideos.length} <span class="accent">Videos</span></h2>
      </div>

      <div class="video-grid">
        ${creatorVideos.map(v => Home.renderCard(v, creators)).join('')}
      </div>
    `;
  }
};
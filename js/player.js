const Player = {
  render(video, videos, creators) {
    if (!video) {
      return `<div class="empty-state"><div class="icon">&#128683;</div><p>Video not found.</p></div>`;
    }

    const creator = creators.find(c => c.id === video.creator);
    const creatorName = creator ? creator.name : video.creator;

    const related = videos
      .filter(v => v.id !== video.id && (v.category === video.category || v.creator === video.creator))
      .slice(0, 8);

    const moreFromCreator = videos
      .filter(v => v.id !== video.id && v.creator === video.creator)
      .slice(0, 4);

    return `
      <div class="player-page">
        <div class="player-main">
          <div class="embed-wrap">
            <iframe src="https://www.youtube.com/embed/${video.videoId}?autoplay=1"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen></iframe>
          </div>
          <h1 class="player-title">${video.title}</h1>
          <div class="player-meta">
            <a href="#/creator/${video.creator}" class="creator-link">${creatorName}</a>
            <span class="date">${video.date}</span>
            ${video.views ? `<span class="views">${video.views} views</span>` : ''}
            <span class="category-tag tag-${video.category}">${video.category}</span>
          </div>
          <div class="player-description">${video.description}</div>

          ${video.wikiSlug ? `
            <div class="wiki-link-box">
              <h4>&#128214; Read more on scam.wiki</h4>
              <p>Get the full breakdown of this scam with timeline, key players, and analysis.</p>
              <a href="https://scam.wiki/#/scam/${video.wikiSlug}" target="_blank">Read the full article &rarr;</a>
            </div>
          ` : ''}

          ${Votes.render('video', video.id)}

          ${moreFromCreator.length ? `
            <div style="margin-top:32px">
              <h3 class="section-title" style="font-size:18px;margin-bottom:16px">
                More from <span class="accent">${creatorName}</span>
              </h3>
              <div class="video-grid">
                ${moreFromCreator.map(v => Home.renderCard(v, creators)).join('')}
              </div>
            </div>
          ` : ''}
        </div>

        <div class="player-sidebar">
          <h3>Related Videos</h3>
          ${related.map(v => {
            const c = creators.find(cr => cr.id === v.creator);
            const cn = c ? c.name : v.creator;
            return `
              <div class="sidebar-video" onclick="location.hash='/watch/${v.id}'">
                <img class="thumb" src="https://img.youtube.com/vi/${v.videoId}/mqdefault.jpg" alt="${v.title}" loading="lazy">
                <div class="info">
                  <h4>${v.title}</h4>
                  <p>${cn} &middot; ${v.duration || ''}</p>
                </div>
              </div>
            `;
          }).join('')}

          <div class="affiliate-box">
            <h4>Protect Yourself</h4>
            <a href="https://www.ledger.com" target="_blank" rel="noopener" class="affiliate-link">&#128274; Ledger Wallet</a>
            <a href="https://www.trezor.io" target="_blank" rel="noopener" class="affiliate-link">&#128274; Trezor Wallet</a>
            <a href="https://nordvpn.com" target="_blank" rel="noopener" class="affiliate-link">&#128272; NordVPN</a>
            <a href="https://1password.com" target="_blank" rel="noopener" class="affiliate-link">&#128273; 1Password</a>
          </div>
        </div>
      </div>
    `;
  }
};
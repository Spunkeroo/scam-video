const Search = {
  videos: [],
  creators: [],

  build(videos, creators) {
    this.videos = videos;
    this.creators = creators;
  },

  search(query) {
    const q = query.toLowerCase().trim();
    if (!q) return [];

    const results = [];

    this.videos.forEach(v => {
      const creator = this.creators.find(c => c.id === v.creator);
      const creatorName = creator ? creator.name : v.creator;
      const text = `${v.title} ${creatorName} ${v.description} ${v.category}`.toLowerCase();
      if (text.includes(q)) {
        results.push({ type: 'video', item: v, creatorName });
      }
    });

    this.creators.forEach(c => {
      const text = `${c.name} ${c.description}`.toLowerCase();
      if (text.includes(q)) {
        results.push({ type: 'creator', item: c });
      }
    });

    return results.slice(0, 8);
  },

  bindInput(input, dropdown) {
    input.addEventListener('input', () => {
      const results = this.search(input.value);
      if (results.length && input.value.trim()) {
        dropdown.innerHTML = results.map(r => {
          if (r.type === 'video') {
            return `
              <div class="search-result-item" onclick="location.hash='/watch/${r.item.id}'">
                <img class="thumb" src="https://img.youtube.com/vi/${r.item.videoId}/mqdefault.jpg" alt="">
                <div class="info">
                  <h4>${r.item.title}</h4>
                  <p>${r.creatorName} &middot; ${r.item.category}</p>
                </div>
              </div>`;
          }
          return `
            <div class="search-result-item" onclick="location.hash='/creator/${r.item.id}'">
              <div class="thumb" style="display:flex;align-items:center;justify-content:center;background:var(--red);color:white;font-weight:800;font-size:18px;border-radius:4px">
                ${r.item.name.charAt(0)}
              </div>
              <div class="info">
                <h4>${r.item.name}</h4>
                <p>${r.item.subscribers} subscribers</p>
              </div>
            </div>`;
        }).join('');
        dropdown.classList.add('open');
      } else {
        dropdown.classList.remove('open');
      }
    });

    input.addEventListener('blur', () => {
      setTimeout(() => dropdown.classList.remove('open'), 200);
    });

    input.addEventListener('focus', () => {
      if (input.value.trim()) input.dispatchEvent(new Event('input'));
    });
  }
};
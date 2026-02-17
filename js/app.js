const App = {
  data: { videos: [], creators: [] },

  async init() {
    const res = await fetch('data/videos.json').then(r => r.json());
    this.data.videos = res.videos;
    this.data.creators = res.creators;

    Search.build(res.videos, res.creators);
    this.bindHeaderSearch();
    this.bindMobileMenu();

    window.addEventListener('hashchange', () => this.route());
    this.route();
  },

  bindHeaderSearch() {
    const input = document.getElementById('header-search-input');
    const dropdown = document.getElementById('header-search-results');
    if (input && dropdown) {
      Search.bindInput(input, dropdown);
    }
  },

  bindMobileMenu() {
    const btn = document.getElementById('mobile-menu');
    if (btn) {
      btn.addEventListener('click', () => {
        document.querySelector('.header-nav')?.classList.toggle('show');
      });
    }
  },

  route() {
    const hash = location.hash.slice(1) || '/';
    const content = document.getElementById('app');
    const [path, queryString] = hash.split('?');
    const params = new URLSearchParams(queryString || '');
    const parts = path.split('/').filter(Boolean);

    const { videos, creators } = this.data;
    let html = '';

    if (parts[0] === 'watch' && parts[1]) {
      const video = videos.find(v => v.id === parseInt(parts[1]));
      html = Player.render(video, videos, creators);
      document.title = video ? `${video.title} — scam.video` : 'Not Found — scam.video';
    } else if (parts[0] === 'browse') {
      html = Browse.render(videos, creators, params);
      document.title = 'Browse Videos — scam.video';
    } else if (parts[0] === 'creators') {
      html = Creators.renderList(creators, videos);
      document.title = 'Creators — scam.video';
    } else if (parts[0] === 'creator' && parts[1]) {
      const creator = creators.find(c => c.id === parts[1]);
      html = Creators.renderProfile(creator, videos, creators);
      document.title = creator ? `${creator.name} — scam.video` : 'Not Found — scam.video';
    } else {
      html = Home.render(videos, creators);
      document.title = 'scam.video — The Best Scam Exposure Videos';
    }

    content.innerHTML = `<div class="main-content">${html}</div>`;
    window.scrollTo(0, 0);

    // Close mobile menu
    document.querySelector('.header-nav')?.classList.remove('show');
  },

  toast(message) {
    let toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
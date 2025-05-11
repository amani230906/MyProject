const movies = [
  { 
    id: 1, 
    title: 'Inception', 
    img: 'https://www.themoviedb.org/t/p/w1280/7SivRwOLuA6DR09zNJ9JIo14GyX.jpg', 
    tmdbId: 27205, 
    synopsis: ' A skilled thief enters dreams to steal secrets but faces challenges when tasked with planting an idea.' 
  },
  { 
    id: 2, 
    title: 'Interstellar', 
    img: 'https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg', 
    tmdbId: 157336, 
    synopsis: 'Explorers travel through a wormhole to find a new home for humanity.' 
  },
  { 
    id: 3, 
    title: 'The Dark Knight', 
    img: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg', 
    tmdbId: 155, 
    synopsis: 'Batman battles the Joker, a criminal mastermind wreaking havoc in Gotham.' 
  },
  { 
    id: 4, 
    title: 'Parasite', 
    img: 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg', 
    tmdbId: 496243, 
    synopsis: 'A poor family cunningly infiltrates a wealthy household, but their scheme leads to chaos.' 
  },
  { 
    id: 5, 
    title: 'The Matrix', 
    img: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg', 
    tmdbId: 603, 
    synopsis: 'A hacker discovers reality is a simulation controlled by machines.' 
  },
  { 
    id: 6, 
    title: 'Fight Club', 
    img: 'https://image.tmdb.org/t/p/w500/bptfVGEQuv6vDTIMVCHjJ9Dz8PX.jpg', 
    tmdbId: 550, 
    synopsis: 'An office worker forms an underground fight club that spirals into chaos.' 
  },
  { 
    id: 7, 
    title: 'The Shawshank Redemption', 
    img: 'https://www.themoviedb.org/t/p/w1280/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg', 
    tmdbId: 278, 
    synopsis: 'Two imprisoned men find solace and redemption through acts of decency.' 
  },
  { 
    id: 8, 
    title: 'Pulp Fiction', 
    img: 'https://www.themoviedb.org/t/p/w1280/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg', 
    tmdbId: 680, 
    synopsis: 'Interwoven stories of crime and redemption unfold in Los Angeles.' 
  }
];

const sel = {
  newReleases: document.getElementById('newReleases'),
  trending: document.getElementById('trending'),
  favorites: document.getElementById('favorites'),
  exploreGrid: document.getElementById('exploreGrid'),
  favCount: document.getElementById('favCount'),
  clearFavs: document.getElementById('clearFavs'),
  searchInput: document.getElementById('searchInput'),
  searchBtn: document.getElementById('searchBtn')
};

const tpl = document.getElementById('movieCardTemplate');

function getFavs() {
  return JSON.parse(localStorage.getItem('myflix_favs')) || [];
}
function setFavs(arr) {
  localStorage.setItem('myflix_favs', JSON.stringify(arr));
}

function render(list, container) {
  if (!container) return;
  container.innerHTML = '';
  const favs = getFavs();
  list.forEach(m => {
    const node = tpl.content.cloneNode(true);
    const card = node.querySelector('.movie-card');
    card.dataset.url = `https://www.themoviedb.org/movie/${m.tmdbId}`;
    node.querySelector('.movie-img').src = m.img;
    node.querySelector('.movie-img').alt = m.title;
    node.querySelector('.movie-title').textContent = m.title;
    node.querySelector('.movie-synopsis').textContent = m.synopsis;

    const watch = node.querySelector('.watch-btn');
    const save = node.querySelector('.save-btn');

    if (favs.includes(m.id)) {
      save.textContent = 'Saved';
      save.disabled = true;
    }

    watch.addEventListener('click', e => {
      e.stopPropagation();
      window.open(card.dataset.url, '_blank');
    });

    save.addEventListener('click', e => {
      e.stopPropagation();
      if (!favs.includes(m.id)) {
        favs.push(m.id);
        setFavs(favs);
        save.textContent = 'Saved';
        save.disabled = true;
        updateFavs();
      }
    });

    card.addEventListener('click', () => {
      window.open(card.dataset.url, '_blank');
    });

    container.appendChild(node);
  });
}

function updateFavs() {
  const favs = getFavs();
  if (sel.favCount) sel.favCount.textContent = favs.length;
  render(movies.filter(m => favs.includes(m.id)), sel.favorites);
}

function initHome() {
  render(movies.slice(0,4), sel.newReleases);
  render(movies.slice(2,6), sel.trending);
  updateFavs();
}

function initExplore() {
  render(movies, sel.exploreGrid);
}

function initSearch() {
  if (!sel.searchBtn) return;
  sel.searchBtn.addEventListener('click', () => {
    const q = sel.searchInput.value.trim().toLowerCase();
    if (!q) { initHome(); return; }
    const res = movies.filter(m => m.title.toLowerCase().includes(q));
    render(res, sel.newReleases);
    if (sel.trending) sel.trending.innerHTML = '';
    if (sel.favorites) sel.favorites.innerHTML = '';
  });
}

function initClear() {
  if (!sel.clearFavs) return;
  sel.clearFavs.addEventListener('click', () => {
    setFavs([]);
    updateFavs();
    alert("Cleared!");
  });
}

window.addEventListener('DOMContentLoaded', () => {
  initSearch();
  initClear();
  if (sel.exploreGrid) initExplore();
  else initHome();
});
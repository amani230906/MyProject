const movies = [
  { 
    id: 1, 
    title: 'Inception', 
    img: 'https://image.tmdb.org/t/p/w500/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg', 
    tmdbId: 27205, 
    synopsis: 'A skilled thief enters dreams to steal secrets but faces challenges when tasked with planting an idea.' 
  },
  { 
    id: 2, 
    title: 'Interstellar', 
    img: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', 
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
    img: 'https://www.themoviedb.org/t/p/w1280/yvmKPlTIi0xdcFQIFcQKQJcI63W.jpg', 
    tmdbId: 278, 
    synopsis: 'Two imprisoned men find solace and redemption through acts of decency.' 
  },
  { 
    id: 8, 
    title: 'Pulp Fiction', 
    img: 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg', 
    tmdbId: 680, 
    synopsis: 'Interwoven stories of crime and redemption unfold in Los Angeles.' 
  },
  { 
    id: 9, 
    title: 'Gladiator', 
    img: 'https://www.themoviedb.org/t/p/w1280/1wjNqlfsuHNTXTpCt2ZOV2iPxaf.jpg', 
    tmdbId: 98, 
    synopsis: 'A betrayed Roman general seeks revenge against the emperor who murdered his family.' 
  },
  { 
    id: 10, 
    title: 'The Godfather', 
    img: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg', 
    tmdbId: 238, 
    synopsis: 'The aging patriarch of a crime dynasty transfers control to his reluctant son.' 
  },
  { 
    id: 11, 
    title: 'Schindler’s List', 
    img: 'https://www.themoviedb.org/t/p/w1280/c8hKj5SxJ7oSayS11RJur9BOurV.jpg', 
    tmdbId: 424, 
    synopsis: 'A businessman saves Jews during the Holocaust by employing them in his factories.' 
  },
  { 
    id: 12, 
    title: 'Forrest Gump', 
    img: 'https://www.themoviedb.org/t/p/w1280/nsZyCXOubU9Eihvu0o9WwkF6x87.jpg', 
    tmdbId: 13, 
    synopsis: 'A man with a low IQ experiences historical events while pursuing his lifelong love.' 
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
  searchBtn: document.getElementById('searchBtn'),
  username: document.getElementById('username'),
  usernameInput: document.getElementById('usernameInput'),
  saveUsername: document.getElementById('saveUsername'),
  lastAdded: document.getElementById('lastAdded'),
  avatar: document.getElementById('avatar'),
  avatarInput: document.getElementById('avatarInput'),
  uploadAvatar: document.getElementById('uploadAvatar'),
  progress: document.getElementById('progress'),
  notification: document.getElementById('notification'),
  noFavorites: document.getElementById('no-favorites')
};

const tpl = document.getElementById('movieCardTemplate');

function getFavs() {
  return JSON.parse(localStorage.getItem('myflix_favs')) || [];
}
function setFavs(arr) {
  localStorage.setItem('myflix_favs', JSON.stringify(arr));
}

function getUsername() {
  return localStorage.getItem('myflix_username') || 'Guest';
}
function setUsername(name) {
  localStorage.setItem('myflix_username', name);
}

function getLastAdded() {
  return localStorage.getItem('myflix_last_added') || 'None';
}
function setLastAdded(date) {
  localStorage.setItem('myflix_last_added', date);
}

function getAvatar() {
  return localStorage.getItem('myflix_avatar') || 'https://via.placeholder.com/100';
}
function setAvatar(dataUrl) {
  localStorage.setItem('myflix_avatar', dataUrl);
}

function getRatings() {
  return JSON.parse(localStorage.getItem('myflix_ratings')) || {};
}
function setRating(movieId, rating) {
  const ratings = getRatings();
  ratings[movieId] = rating;
  localStorage.setItem('myflix_ratings', JSON.stringify(ratings));
}

function showNotification(message) {
  if (sel.notification) {
    sel.notification.textContent = message;
    sel.notification.classList.add('show');
    setTimeout(() => sel.notification.classList.remove('show'), 3000);
  } else {
    console.warn('Notification element not found');
  }
}

function render(list, container) {
  if (!container) {
    console.error('Render: Container not found');
    return;
  }
  container.innerHTML = '';
  const favs = getFavs();
  const ratings = getRatings();

  console.log('Render: List length:', list.length, 'Container:', container.id);

  if (list.length === 0 && container.id === 'favorites') {
    if (sel.noFavorites) {
      sel.noFavorites.style.display = 'block';
    } else {
      console.warn('No-favorites element not found');
    }
    showNotification('No favorite movies to display.');
    return;
  }

  list.forEach(m => {
    const node = tpl.content.cloneNode(true);
    const card = node.querySelector('.movie-card');
    if (!card) {
      console.error('Render: .movie-card not found in template');
      return;
    }
    card.dataset.url = `https://www.themoviedb.org/movie/${m.tmdbId}`;
    const img = node.querySelector('.movie-img');
    if (!img) {
      console.error('Render: .movie-img not found in template');
      return;
    }
    img.src = m.img;
    img.alt = m.title;
    img.onerror = () => {
      console.warn(`Image failed to load: ${m.img}`);
      img.src = 'https://via.placeholder.com/200x240?text=Image+Error';
    };
    const title = node.querySelector('.movie-title');
    if (!title) {
      console.error('Render: .movie-title not found in template');
      return;
    }
    title.textContent = m.title;
    const synopsis = node.querySelector('.movie-synopsis');
    if (!synopsis) {
      console.error('Render: .movie-synopsis not found in template');
      return;
    }
    synopsis.textContent = m.synopsis;

    const starsContainer = node.querySelector('.rating-stars');
    if (starsContainer) {
      starsContainer.dataset.id = m.id;
      const currentRating = ratings[m.id] || 0;
      starsContainer.innerHTML = '';
      for (let i = 1; i <= 5; i++) {
        const star = document.createElement('span');
        star.classList.add('star');
        star.innerHTML = '★';
        if (i <= currentRating) star.classList.add('filled');
        star.addEventListener('click', () => {
          setRating(m.id, i);
          updateFavs();
          showNotification(`Rated ${m.title} ${i} stars!`);
        });
        starsContainer.appendChild(star);
      }
    }

    const watch = node.querySelector('.watch-btn');
    const actionBtn = node.querySelector('.movie-actions')?.querySelector('.save-btn, .remove-btn');

    if (actionBtn && actionBtn.classList.contains('save-btn')) {
      if (favs.includes(m.id)) {
        actionBtn.textContent = 'Saved';
        actionBtn.disabled = true;
      }
      actionBtn.addEventListener('click', e => {
        e.stopPropagation();
        if (!favs.includes(m.id)) {
          favs.push(m.id);
          setFavs(favs);
          setLastAdded(new Date().toLocaleDateString());
          actionBtn.textContent = 'Saved';
          actionBtn.disabled = true;
          updateFavs();
          showNotification(`${m.title} added to favorites!`);
        }
      });
    } else if (actionBtn && actionBtn.classList.contains('remove-btn')) {
      actionBtn.addEventListener('click', e => {
        e.stopPropagation();
        card.style.transition = 'opacity 0.3s, transform 0.3s';
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        setTimeout(() => {
          const updatedFavs = favs.filter(id => id !== m.id);
          setFavs(updatedFavs);
          updateFavs();
          showNotification(`${m.title} removed from favorites!`);
        }, 300);
      });
    }

    if (watch) {
      watch.addEventListener('click', e => {
        e.stopPropagation();
        window.open(card.dataset.url, '_blank');
      });
    }

    card.addEventListener('click', () => {
      window.open(card.dataset.url, '_blank');
    });

    container.appendChild(node);
    console.log(`Rendered card: ${m.title}`);
  });

  if (container.id === 'favorites') {
    showNotification(`Rendered ${list.length} favorite movies.`);
  }
}

function updateFavs(isProfilePage = false) {
  const favs = getFavs();
  console.log('UpdateFavs: Favorites:', favs);
  if (sel.favCount) {
    sel.favCount.textContent = favs.length;
  } else {
    console.warn('favCount element not found');
  }
  if (sel.lastAdded) {
    sel.lastAdded.textContent = getLastAdded();
  } else {
    console.warn('lastAdded element not found');
  }
  if (sel.progress) {
    sel.progress.style.width = `${(favs.length / movies.length) * 100}%`;
  } else {
    console.warn('progress element not found');
  }
  if (sel.favorites && isProfilePage) {
    if (sel.noFavorites) {
      sel.noFavorites.style.display = favs.length === 0 ? 'block' : 'none';
    } else {
      console.warn('noFavorites element not found');
    }
    const favMovies = movies.filter(m => favs.includes(m.id));
    console.log('UpdateFavs: Rendering', favMovies.length, 'movies');
    render(favMovies, sel.favorites);
  }
}

function initProfile() {
  console.log('InitProfile: Starting...');
  if (!sel.username) {
    console.warn('username element not found');
  } else {
    sel.username.textContent = getUsername();
  }
  if (!sel.avatar) {
    console.warn('avatar element not found');
  } else {
    sel.avatar.src = getAvatar();
  }
  if (sel.uploadAvatar && sel.avatarInput) {
    sel.uploadAvatar.addEventListener('click', () => sel.avatarInput.click());
    sel.avatarInput.addEventListener('change', e => {
      const file = e.target.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          setAvatar(reader.result);
          sel.avatar.src = reader.result;
          showNotification('Avatar updated!');
        };
        reader.readAsDataURL(file);
      } else {
        showNotification('Please select a valid image.');
      }
    });
  } else {
    console.warn('uploadAvatar or avatarInput element not found');
  }
  if (sel.saveUsername) {
    sel.saveUsername.addEventListener('click', () => {
      const newName = sel.usernameInput.value.trim();
      if (newName && newName.length <= 20) {
        setUsername(newName);
        sel.username.textContent = newName;
        sel.usernameInput.value = '';
        showNotification('Username updated!');
      } else {
        showNotification('Please enter a valid username (max 20 characters).');
      }
    });
  } else {
    console.warn('saveUsername element not found');
  }
  if (sel.clearFavs) {
    sel.clearFavs.addEventListener('click', () => {
      setFavs([]);
      setLastAdded('None');
      updateFavs(true);
      showNotification('Favorites cleared!');
    });
  } else {
    console.warn('clearFavs element not found');
  }
  updateFavs(true);
  showNotification(`Profile loaded. Favorites: ${getFavs().length}`);
  console.log('InitProfile: Favorites:', getFavs());
}

function initHome() {
  if (sel.newReleases) render(movies.slice(0, 4), sel.newReleases);
  if (sel.trending) render(movies.slice(2, 6), sel.trending);
  // updateFavs(false); // Отключено для избежания уведомления
}

function initExplore() {
  if (sel.exploreGrid) render(movies, sel.exploreGrid);
  // updateFavs(false); // Отключено для избежания уведомления
}

function initSearch() {
  if (!sel.searchBtn) {
    console.warn('searchBtn element not found');
    return;
  }
  sel.searchBtn.addEventListener('click', () => {
    const q = sel.searchInput.value.trim().toLowerCase();
    if (!q) { initHome(); return; }
    const res = movies.filter(m => m.title.toLowerCase().includes(q));
    if (sel.newReleases) render(res, sel.newReleases);
    if (sel.trending) sel.trending.innerHTML = '';
    if (sel.favorites) sel.favorites.innerHTML = '';
    showNotification(`Found ${res.length} movies.`);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded: Initializing...');
  initSearch();
  if (sel.exploreGrid) {
    console.log('Initializing Explore page');
    initExplore();
  } else if (sel.username) {
    console.log('Initializing Profile page');
    initProfile();
  } else {
    console.log('Initializing Home page');
    initHome();
  }
});
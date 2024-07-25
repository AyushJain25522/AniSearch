function generateListHTML(data = []) {
  let html = "";

  if (data.length > 0) {
    html = data.map(anime => {
      const { url, images, title, aired, type, episodes, synopsis, rating, score, status, genres, studios } = anime;

      return `<div class="card">
                <img alt="Anime" class="card-image" src="${images.jpg.image_url}" />
                <div class="card-content">
                  <a target="_blank" href="${url}" class="card-title">${title}</a>
                  <div class="card-info">Episodes: ${episodes}</div>
                  <div class="card-date">Aired: ${aired.string}</div>
                  <div class="card-date">Status: ${status}</div>
                  <div class="card-info">Rating: ${rating}</div>
                  <div class="card-info">Score: ${score}</div>
                  <div class="card-info">Genres: ${genres.map(genre => genre.name).join(', ')}</div>
                  <div class="card-info">Studios: ${studios.map(studio => studio.name).join(', ')}</div>
                  <div class="card-synopsis">${synopsis}</div>
                </div>
              </div>`;
    }).join('');
  } else {
    html = `<div class="center">No results were found...</div>`;
  }

  return html;
}

function onDocumentReady(fn) {
  if (document.readyState !== "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

onDocumentReady(() => {
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const searchContent = document.getElementById("searchContent");

  function fetchAnime() {
    const API_URL = `https://api.jikan.moe/v4/anime?limit=20&q=${encodeURIComponent(searchInput.value)}`;

    searchInput.disabled = true;
    searchButton.disabled = true;
    searchContent.innerHTML = `<div class="center"><img alt="Loader" class="loader-image" src="./assets/images/loader.gif" /></div>`;

    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        searchContent.innerHTML = generateListHTML(data.data);
      })
      .catch(() => {
        searchContent.innerHTML = `<div class="center">Request failed...</div>`;
      })
      .finally(() => {
        searchInput.disabled = false;
        searchButton.disabled = false;
      });
  }

  searchInput.addEventListener("keypress", event => {
    if (event.key === "Enter") {
      fetchAnime();
    }
  });

  searchButton.addEventListener("click", fetchAnime);
});

function multiSearchUrl(string) {
  if (string) {
    return `https://genius-song-lyrics1.p.rapidapi.com/search/multi/?q=${string}&per_page=5&page=1`
  }
  return 'https://genius-song-lyrics1.p.rapidapi.com/search/multi/?q=%3CREQUIRED%3E&per_page=3&page=1';
}

function lyricsUrl(string) {
  if (string) {
    return `https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id=${string}`
  }
  return `https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id=2396871`
}

function trackDetailsUrl(string) {
  if (string) {
    return `https://genius-song-lyrics1.p.rapidapi.com/song/details/?id=${string}`
  }
  return `https://genius-song-lyrics1.p.rapidapi.com/song/details/?id=4726540`
}

function albumAppearancesUrl(string) {
  if (string) {
    return `https://genius-song-lyrics1.p.rapidapi.com/album/appearances/?id=${string}&per_page=50&page=1`;
  }
  return `https://genius-song-lyrics1.p.rapidapi.com/album/appearances/?id=1&per_page=50&page=1`;
}

function albumDetailsUrl(string) {
  if (string) {
    return `https://genius-song-lyrics1.p.rapidapi.com/album/details/?id=${string}`;
  }
  return `https://genius-song-lyrics1.p.rapidapi.com/album/details/?id=670828`;
}

function artistDetailsUrl(string) {
  if (string) {
    return `https://genius-song-lyrics1.p.rapidapi.com/artist/details/?id=${string}`;
  }
  return `https://genius-song-lyrics1.p.rapidapi.com/artist/details/?id=344497`;
}

function artistAlbumsUrl(string) {

  if (string) {
    return `https://genius-song-lyrics1.p.rapidapi.com/artist/albums/?id=${string}&per_page=50&page=1`;
  }
  return `https://genius-song-lyrics1.p.rapidapi.com/artist/albums/?id=72&per_page=50&page=1`;
}

function artistTracksUrl(string, page) {
  if (string) {
    return `https://genius-song-lyrics1.p.rapidapi.com/artist/songs/?id=${string}&sort=popularity&per_page=5&page=${page}`
  }
  return 'https://genius-song-lyrics1.p.rapidapi.com/artist/songs/?id=344497&per_page=20&page=1'
}

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '86838455b6msh7a4ac724b0a50b0p130b99jsn9a5d40f84ccc',
    'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
  }
};

export async function get(string, type, page = 1) {
  let url;
  switch (type) {
    case 'search':
      url = multiSearchUrl(string.toString());
      break;
    case 'lyrics':
      url = lyricsUrl(string.toString());
      break;
    case 'track-details':
      url = trackDetailsUrl(string.toString());
      break;
    case 'album-appearances':
      url = albumAppearancesUrl(string.toString())
      break;
    case 'album-details':
      url = albumDetailsUrl(string.toString())
      break;
    case 'artist-details':
      url = artistDetailsUrl(string.toString())
      break;
    case 'artist-albums':
      url = artistAlbumsUrl(string.toString())
      break;
    case 'artist-tracks':
      url = artistTracksUrl(string.toString(), page)
      break;
  }

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    return JSON.parse(result);
  } catch (error) {
    console.error(error);
  }
}

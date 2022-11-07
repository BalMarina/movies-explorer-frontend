
export function filterShorts(movies) {
    return movies.filter((item) => item.duration < 40);
};

export function filterMovies(movies, query, isShorts) {
    const searchParams = ['nameEN', 'nameRU'];
    const q = query.toLowerCase().trim()

    let result = movies

    if (q) {
        result = result
            .filter(
                movie => searchParams.some(
                    param => movie[param]
                        .toLowerCase()
                        .trim()
                        .includes(q)
                )
            )
    }

    if (isShorts === true) {
        result = result.filter(movie => movie.duration <= 40)
    }

    return result
}

// // ф-ия фильтрации фильмов по запросу и длительности
// export function filterMovies(movies, searchQuery, shortFilms) {
//     const moviesByQuery = movies.filter((item) => {
//         const strRu = String(item.nameRU).toLowerCase();
//         const strEn = String(item.nameEN).toLowerCase();
//         const searchStr = searchQuery.toLowerCase().trim();
//         return (strRu.indexOf(searchStr) !== -1 || strEn.indexOf(searchStr) !== -1);
//     });

//     if (shortFilms === 'on') {
//         return filterShorts(moviesByQuery);
//     }
//     return moviesByQuery;
// };

// // ф-ия проверки ссылок изображений на осутствие и их преобразование
// export function changeMovies(movies) {
//   movies.forEach(movie => {
//     if(!movie.image){
//       movie.image = 'https://g2.dcdn.lt/images/pix/kinas-76443525.jpg';
//       movie.thumbnail = 'https://g2.dcdn.lt/images/pix/kinas-76443525.jpg'
//     } else {
//       movie.thumbnail = `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`
//       movie.image = `https://api.nomoreparties.co${movie.image.url}`
//     }
//   });
// };

export function getSavedMovieCard(arr, id) {
    return arr.find((item) => {
        return item.movieId === id;
    });
};

export function moviesApiToDisplayData(apiMovies) {
    return apiMovies.map(v => ({
        ...v,
        movieId: v.id,
        image: v.image.url,
    }))
}

export function getLocalStorageIfExists(key) {
    const storedJSON = localStorage.getItem(key)
    try {
        return JSON.parse(storedJSON)
    } catch (e) {
        console.log(e)
    }
    return null
}

export function getTransformTime(mins) {
    const hours = Math.trunc(mins / 60);
    const minutes = mins % 60;
    if (hours < 1) {
        return `${minutes}м`
    }
    return `${hours}ч ${minutes}м`;
};
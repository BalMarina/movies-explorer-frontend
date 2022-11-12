
export function filterShorts(movies) {
    return movies.filter((item) => item.duration < 40);
};

export function filterMovies(movies = [], query = '', isShorts = false) {
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
// Coloque aqui suas actions
export const actionLogin = (email = 'sem email') => ({
  type: 'LOGIN',
  email,
});

// action creator

const requestMoviesStarted = () => ({

  type: 'REQUEST_MOVIES_STARTED',

});

const error = () => ({

  type: 'ERROR',

});

// action creator

export const receiveMovies = (movies) => ({

  type: 'RECEIVE_MOVIES',

  movies,

});

// thunk action creator: deve retornar uma função

export function fetchMovies(dispatch, props) {
  console.log('dispatch', props);
  // return (dispatch, _getState) => {
  dispatch(requestMoviesStarted()); // dispatch da action 'REQUEST_MOVIES_STARTED'
  fetch('https://pokeapi.co/api/v2/pokemon/ditto')
    .then((response) => response.json())
    .then((movies) => dispatch(receiveMovies(movies)))
    .catch(() => dispatch(error()));
  // dispatch da action 'RECEIVE_MOVIES'

  // };
}

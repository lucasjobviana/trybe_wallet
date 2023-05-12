// Esse reducer será responsável por tratar as informações da pessoa usuária

const INITIAL_STATE = {
  user: { email: 'sem email algum' },
};

const userReducer = (state = INITIAL_STATE, action) => {
  // console.log(state, action);
  switch (action.type) {
  case 'LOGIN': return { ...state, user: { ...state.user, email: action.email } };
    //   case 'RECEIVE_MOVIES': return { ...state, props: { ...state.props, loading: false, pokemons: action.movies } };
    //   case 'REQUEST_MOVIES_STARTED': return { ...state, props: { ...state.props, loading: true } };
    //   case 'ERROR': return { ...state, loading: 'ERRO NA REQUISIÇÃO' };
  default: return state;
  }
};

export default userReducer;

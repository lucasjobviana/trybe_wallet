// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  // console.log(state, action);
  switch (action.type) {
  case 'RECEIVE_COINS': return { ...state, currencies: action.coins,
  };
    //   case 'RECEIVE_MOVIES': return { ...state, props: { ...state.props, loading: false, pokemons: action.movies } };
    //   case 'REQUEST_MOVIES_STARTED': return { ...state, props: { ...state.props, loading: true } };
    //   case 'ERROR': return { ...state, loading: 'ERRO NA REQUISIÇÃO' };
  default: return state;
  }
};

export default wallet;

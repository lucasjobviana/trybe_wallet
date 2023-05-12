// import user from './user';
// import wallet from './wallet';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global

const INITIAL_STATE = {
  wallet: {},
  user: { name: 'Usuário não logado' },
};

const rootReducer = (state = INITIAL_STATE, action) => {
  console.log(state, action);
  switch (action.type) {
  //   case 'INCREMENT_COUNTER': return { ...state, props: { ...state.props, count: state.props.count + action.payload } };
  //   case 'RECEIVE_MOVIES': return { ...state, props: { ...state.props, loading: false, pokemons: action.movies } };
  //   case 'REQUEST_MOVIES_STARTED': return { ...state, props: { ...state.props, loading: true } };
  //   case 'ERROR': return { ...state, loading: 'ERRO NA REQUISIÇÃO' };
  default: return state;
  }
};

export default rootReducer;

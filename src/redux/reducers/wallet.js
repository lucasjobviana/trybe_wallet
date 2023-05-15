// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expensesId: 0,
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  console.log(state, action.expense);
  console.log({ ...state,
    expensesId: state.expensesId + 1,
    expenses: { ...state.expenses, ...action.expense } });
  switch (action.type) { // SALVE_EXPENSE
  case 'RECEIVE_COINS': return { ...state, currencies: action.coins,
  };
  case 'SALVE_EXPENSE': return { ...state,
    expensesId: state.expensesId + 1,
    expenses: [...state.expenses, action.expense] };
    // state.wallet.currencies,

    // case 'SALVE_EXPENSE': return { ...state,
    //   expensesId: state.expensesId + 1,
    //   expenses: [...expenses, action.expenses] };
  default: return state;
  }
};

export default wallet;

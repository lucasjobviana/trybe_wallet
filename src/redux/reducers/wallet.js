// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expensesId: 1,
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
  case 'DELETE_EXPENSE': {
    const newExpenseList = state.expenses.filter((e) => {
      console.log(e.id); console.log(action.idExpense);
      return Number.parseInt(action.idExpense, 10) !== e.id;
    });
    console.log('============================');
    console.log(newExpenseList);
    return { ...state, expenses: [...newExpenseList] };
  }

  default: return state;
  }
};
// delete coins.USDT;
export default wallet;

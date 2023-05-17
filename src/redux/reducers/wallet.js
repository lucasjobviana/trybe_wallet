// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expensesId: 0,
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) { // SALVE_EXPENSE
  case 'RECEIVE_COINS': return {
    ...state, currencies: action.coins,
  };
  case 'SALVE_EXPENSE': return {
    ...state,
    expensesId: state.expensesId + 1,
    expenses: [...state.expenses, action.expense],
  };
  case 'DELETE_EXPENSE': {
    const newExpenseList = state.expenses.filter(
      (e) => Number.parseInt(action.idExpense, 10) !== e.id,
    );
    return { ...state, expenses: [...newExpenseList] };
  }
  case 'EDIT_EXPENSE': return {
    ...state,
    expenses: action.expense,
  };

  default: return state;
  }
};
// delete coins.USDT;
export default wallet;

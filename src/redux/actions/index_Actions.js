// Coloque aqui suas actions
export const actionLogin = (email = 'sem email') => ({
  type: 'LOGIN',
  email,
});

const receiveCoins = (coins) => ({
  type: 'RECEIVE_COINS',
  coins,
});

const salveExpense = (expense) => ({
  type: 'SALVE_EXPENSE',
  expense,
});

export const deleteExpense = (idExpense) => ({
  type: 'DELETE_EXPENSE',
  idExpense,
});

export const editExpense = (expense) => ({
  type: 'EDIT_EXPENSE',
  expense,
});

export function getQuotation(expense) {
  return (dispatch) => {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((coins) => {
        delete coins.USDT;
        console.log(coins);
        dispatch(salveExpense({ ...expense,
          exchangeRates: {
            ...coins,
            BRL: { name: 'Real Brasilerio', ask: '1', code: 'BRL' },
          } }));
      });
  };
}

export function fetchCoins() {
  return (dispatch) => {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((coins) => {
        const arrayKeys = Object.entries(coins)
          .filter((c) => c[0] !== 'USDT')
          .map((cur) => cur[1].code);
        dispatch(receiveCoins([...arrayKeys, 'BRL']));
      });
  };
}

// Coloque aqui suas actions
export const actionLogin = (email = 'sem email') => ({
  type: 'LOGIN',
  email,
});

// const requestMoviesStarted = () => ({

//   type: 'REQUEST_MOVIES_STARTED',

// });

// const error = () => ({

//   type: 'ERROR',

// });

// action creator

const receiveCoins = (coins) => ({

  type: 'RECEIVE_COINS',

  coins,

});

const salveExpense = (expense) => ({

  type: 'SALVE_EXPENSE',

  expense,

});

// thunk action creator: deve retornar uma função

export function getQuotation(expense) {
  return (dispatch) => {
    console.log(expense);
    console.log(expense.currencySelect);
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((coins) => {
        console.log(coins);
        const arrayKeys = Object.entries(coins)
          .filter((c) => c[0] !== 'USDT');
        dispatch(salveExpense({ ...expense, exchangeRates: { ...arrayKeys } }));
      });
  };
}

export function fetchCoins() {
  return (dispatch) => {
    // console.log(dispatch);
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((coins) => {
        console.log(Object.entries(coins));
        const arrayKeys = Object.entries(coins)
          .filter((c) => c[0] !== 'USDT')
          .map((cur) => cur[1].code);
        console.log('Esses é o array');
        console.log(arrayKeys);

        dispatch(receiveCoins(arrayKeys));
      });
  };
}

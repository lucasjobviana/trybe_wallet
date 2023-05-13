import React, { Component } from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';
import { fetchCoins } from '../redux/actions/index_Actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCoins());
  }

  render() {
    const { currencies } = this.props;
    console.log(currencies);

    const arrayCode = currencies.map(
      (cur, index) => (<option key={ index } value={ cur }>{cur}</option>),
    );
    // const options = Object.entries(currencies);
    // console.log(options);
    // const optionsFiltered = options.filter((c) => c[0] !== 'USDT');
    // console.log(optionsFiltered);
    // const arrayCode = optionsFiltered.map((cur) => cur[0]);
    // .filter((c) => c.code !== 'USDT').map((cur) => cur.code);
    console.log(arrayCode);
    return (
      <div>
        <form>
          <label>
            Custo:
            <input type="number" data-testid="value-input" name="valor" />
          </label>
          <label>
            Custo:
            <input type="text" data-testid="description-input" name="description" />
          </label>
          <label>
            Moeda:
            <select name="currencySelect" data-testid="currency-input">

              {arrayCode}
            </select>
          </label>
          <select name="pagSelect" data-testid="method-input">
            <option value="money" selected>Dinheiro</option>
            <option value="debit">Cartão de débito</option>
            <option value="credit">Cartão de crédito</option>
          </select>
          <select name="typeSelect" data-testid="tag-input">
            <option value="0" selected>Alimentação</option>
            <option value="1">Lazer</option>
            <option value="2">Trabalho</option>
            <option value="3">Transporte</option>
            <option value="4">Saúde</option>
          </select>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropType.func.isRequired,
  currencies: PropType.shape().isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);

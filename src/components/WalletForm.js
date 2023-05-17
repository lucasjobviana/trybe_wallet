import React, { Component } from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';
import { fetchCoins, getQuotation, editExpense } from '../redux/actions/index_Actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      method: 'Dinheiro',
      currency: 'USD',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCoins());
  }

  editExpenseThis = (evt) => {
    evt.preventDefault();
    const { id, dispatch, expenses, close } = this.props;
    const { value, description, tag, method, currency } = this.state;

    const newLine = {
      id,
      value,
      description,
      tag,
      method,
      exchangeRates: expenses.find((e) => e.id === id).exchangeRates,
      currency,
    };
    const newGVG = expenses.map((e) => {
      if (e.id === id) { return newLine; } return e;
    });

    console.log(newLine);
    console.log(newGVG);

    dispatch(editExpense(newGVG));
    close();
    /// ////////////////////////
  };

  addExpense = (evt) => {
    evt.preventDefault();
    const { expensesId, dispatch } = this.props;

    const newExpense = {
      ...this.state,
      id: expensesId,
    };
    // console.log(newExpense);

    dispatch(getQuotation(newExpense));

    this.setState({
      value: '',
      description: '',
      method: 'Dinheiro',
      currency: 'USD',
      tag: 'Alimentação',
    });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { currencies, add } = this.props;
    const { value, description, method, currency, tag } = this.state;

    const arrayCode = currencies.map(
      (cur, index) => (<option key={ index } value={ cur }>{cur}</option>),
    );

    const textBtn = add ? 'Adicionar despesa' : 'Editar despesa';
    const fncBtn = add ? this.addExpense : this.editExpenseThis;
    return (
      <div>
        <form id="expenses">
          <label>
            Custo:
            <input
              type="number"
              data-testid="value-input"
              onChange={ this.handleChange }
              value={ value }
              name="value"
            />
          </label>
          <label>
            Custo:
            <input
              type="text"
              data-testid="description-input"
              onChange={ this.handleChange }
              value={ description }
              name="description"
            />
          </label>
          <label>
            Moeda:
            <select
              name="currency"
              data-testid="currency-input"
              onChange={ this.handleChange }
              value={ currency }
            >
              {arrayCode}
            </select>
          </label>
          <select
            name="method"
            data-testid="method-input"
            onChange={ this.handleChange }
            value={ method }
          >
            <option value="Dinheiro" selected>Dinheiro</option>
            <option value="Cartão de débito">Cartão de débito</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
          </select>
          <select
            name="tag"
            data-testid="tag-input"
            onChange={ this.handleChange }
            value={ tag }
          >
            <option value="Alimentação" selected>Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
          <button type="submit" onClick={ fncBtn }>
            {textBtn}
          </button>

        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropType.func.isRequired,
  currencies: PropType.shape().isRequired,
  expensesId: PropType.number.isRequired,
  expenses: PropType.shape().isRequired,
  add: PropType.bool.isRequired,
  id: PropType.number.isRequired,
  close: PropType.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expensesId: state.wallet.expensesId,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);

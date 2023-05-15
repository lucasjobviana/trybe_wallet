import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

class Table extends Component {
  headers = ['Descrição', 'Tag', 'Método de pagamento',
    'Valor', 'Moeda', 'Câmbio utilizado', 'Valor convertido',
    'Moeda de conversão', 'Editar/Excluir'];

  // ['Cinco euros', 'Lazer', 'Cartão de crédito', '5.00', 'Euro/Real Brasileiro', '5.13', '25.63', 'Real'],
  render() {
    const { expenses } = this.props;
    console.log(expenses);

    const linesTable = expenses.length > 0
      ? expenses.map((expense, index) => (
        <tr key={ index }>
          <td>{expense.description}</td>
          <td>{expense.tag}</td>
          <td>{expense.method}</td>
          <td>{Number.parseFloat(expense.value).toFixed(2) }</td>
          <td>{expense.exchangeRates[expense.currency].name}</td>
          <td>
            {Number.parseFloat(expense.exchangeRates[
              expense.currency].ask).toFixed(2) }

          </td>
          <td>
            {(
              Number.parseFloat(expense.exchangeRates[
                expense.currency].ask)
              * Number.parseFloat(expense.value)
            ).toFixed(2)}

          </td>
          <td>Real</td>

        </tr>)) : '';

    const headersElement = this.headers.map((header, index) => (
      <th key={ index }>{header}</th>));

    return (
      <div>
        Table
        <table>
          <thead><tr>{headersElement}</tr></thead>
          <tbody>{linesTable}</tbody>

        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.shape().isRequired,
};
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});
export default connect(mapStateToProps)(Table);

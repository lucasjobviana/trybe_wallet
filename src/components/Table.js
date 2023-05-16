import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense } from '../redux/actions/index_Actions';

class Table extends Component {
  headers = ['Descrição', 'Tag', 'Método de pagamento',
    'Valor', 'Moeda', 'Câmbio utilizado', 'Valor convertido',
    'Moeda de conversão', 'Editar/Excluir'];

  handleDelete = (id) => {
    const { dispatch } = this.props;
    // alert(target.id);
    // dispatch(deleteExpense(target.id));
    dispatch(deleteExpense(id));
  };

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
          <td>
            <button
              onClick={ () => { this.handleDelete(expense.id); } }
              data-testid="delete-btn"
            >
              Deletar
            </button>

          </td>

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
  dispatch: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});
export default connect(mapStateToProps)(Table);

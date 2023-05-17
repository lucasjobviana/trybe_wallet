import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense } from '../redux/actions/index_Actions';
import WalletForm from './WalletForm';

class Table extends Component {
  headers = ['Descrição', 'Tag', 'Método de pagamento',
    'Valor', 'Moeda', 'Câmbio utilizado', 'Valor convertido',
    'Moeda de conversão', 'Editar/Excluir'];

  constructor() {
    super();
    this.state = {
      editId: null,
    };
  }

  handleDelete = (id) => {
    const { dispatch } = this.props;
    // alert(target.id);
    // dispatch(deleteExpense(target.id));
    dispatch(deleteExpense(id));
  };

  close = () => {
    this.setState({ editId: null });
  };

  render() {
    const { expenses } = this.props;
    const { editId } = this.state;
    const linesTable = expenses.length > 0
      ? expenses.map((expense) => (
        <tr key={ expense.id } id={ expense.id }>
          <td>{expense.description}</td>
          <td>{expense.tag}</td>
          <td>{expense.method}</td>
          <td>{Number.parseFloat(expense.value).toFixed(2)}</td>
          <td>{expense.exchangeRates[expense.currency].name}</td>
          <td>
            {Number.parseFloat(expense.exchangeRates[
              expense.currency].ask).toFixed(2)}

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

            <button
              onClick={ () => { this.setState({ editId: expense.id }); } }
              data-testid="edit-btn"
            >
              Editar
            </button>
          </td>

        </tr>)) : '';

    const headersElement = this.headers.map((header, index) => (
      <th key={ index }>{header}</th>));

    if (editId === null) {
      return (
        <div>
          <WalletForm add />
          <table>
            <thead><tr>{headersElement}</tr></thead>
            <tbody>{linesTable}</tbody>
          </table>
        </div>
      );
    }
    return (
      <div>
        <WalletForm add={ false } id={ editId } close={ this.close } />
        <button onClick={ this.close }>x</button>
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

// return (
//   editId === null
//   ?
//   <div>
//     <WalletForm add />
//     <table>
//       <thead><tr>{headersElement}</tr></thead>
//       <tbody>{linesTable}</tbody>
//     </table>
//   </div>

//     : <div>
//       <WalletForm add={ false } id={ editId } close={ this.close } />
//       <button onClick={ this.close }>x</button>
//     </div>
// );

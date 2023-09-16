import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import WalletForm from './WalletForm';
import { deleteExpense } from '../redux/actions/index_Actions';

class Table extends Component {
  headersNovo = [
    { label: 'Descrição', name: 'description' },
    { label: 'Tag', name: 'tag' },
    { label: 'Método de pagamento', name: 'method' },
    { label: 'Valor', name: 'value' },
    { label: 'Moeda', name: 'currency' },
    { label: 'Câmbio utilizado', name: 'exchangeRates' },
    { label: 'Valor convertido', name: 'convertedValue' },
    { label: 'Moeda de conversão', name: 'c' },
  ];

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
    const newHeaders = this.headersNovo.map((header) => ({
      field: header.name, headerName: header.label, editable: true,
    }));

    const newHeadersWithButtons = [...newHeaders,

      { field: 'btnEdit',
        headerName: 'Editar',
        type: 'button',
        renderCell: (expense) => (
          <Button
            variant="contained"
            color="primary"
            onClick={ () => { this.setState({ editId: expense.id }); } }
          >
            editar

          </Button>
        ) },
      { field: 'btnDeletar',
        headerName: 'Deletar',
        type: 'button',
        renderCell: (expense) => (
          <Button
            variant="contained"
            color="primary"
            onClick={ () => { this.handleDelete(expense.id); } }
          >
            Deletar

          </Button>
        ) },
    ];

    const { expenses } = this.props;

    const newExpenses = expenses.map((expense) => ({
      id: expense.id,
      description: expense.description,
      tag: expense.tag,
      method: expense.method,
      value: Number.parseFloat(expense.value).toFixed(2),
      currency: expense.exchangeRates[expense.currency].name,
      exchangeRates: Number.parseFloat(expense.exchangeRates[
        expense.currency].ask).toFixed(2),
      convertedValue: (Number.parseFloat(expense.exchangeRates[
        expense.currency].ask) * Number.parseFloat(expense.value)).toFixed(2),
      c: 'Real',
    }));

    const { editId } = this.state;

    if (editId === null) {
      return (
        <>
          <WalletForm add />

          <Box sx={ { height: 400, width: '100%' } }>
            <DataGrid
              rows={ newExpenses }
              columns={ newHeadersWithButtons }
              initialState={ {
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              } }
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Box>
        </>
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

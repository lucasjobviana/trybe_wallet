import React, { Component } from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import { fetchCoins, getQuotation, editExpense } from '../redux/actions/index_Actions';

const defaultTag = 'Alimentação';
class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      method: 'Dinheiro',
      currency: 'USD',
      tag: defaultTag,
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

    dispatch(getQuotation(newExpense));

    this.setState({
      value: '',
      description: '',
      method: 'Dinheiro',
      currency: 'USD',
      tag: defaultTag,
    });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { currencies, add } = this.props;
    const { value, description, method, currency, tag } = this.state;
    const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

    const textBtn = add ? 'Adicionar despesa' : 'Editar despesa';
    const fncBtn = add ? this.addExpense : this.editExpenseThis;
    return (
      <Box
        component="form"
        sx={ {

          width: '100vw',
          backgroundColor: '#4f4f4f',
        } }
        noValidate
        autoComplete="on"
        id="expenses"
      >
        <Box
          sx={ { display: 'flex',
            justifyContent: 'end',
            backgroundColor: '#f22f00' } }
        >
          <Button
            variant="contained"
            type="submit"
            onClick={ fncBtn }
            endIcon={ <SendIcon /> }
          >
            {textBtn}
          </Button>

        </Box>

        <Box sx={ { display: 'flex', justifyContent: 'center' } }>
          <TextField
            id="standard-number"
            error={ value < 0 }
            helperText={ value < 0 ? 'Não pode ser menor que zero' : '' }
            label="Custo"
            type="number"
            data-testid="value-input"
            onChange={ this.handleChange }
            value={ value }
            name="value"
            InputLabelProps={ {
              shrink: true,
            } }
            variant="filled"
          />

          <TextField
            label="Descrição"
            type="text"
            data-testid="description-input"
            onChange={ this.handleChange }
            value={ description }
            name="description"
            InputLabelProps={ {
              shrink: true,
            } }
            variant="filled"
          />

          <TextField
            id="filled-select-currency"
            select
            label="Moeda"
            defaultValue="BRL"
            helperText="Selecione a moeda"
            variant="filled"
            name="currency"
            data-testid="currency-input"
            onChange={ this.handleChange }
            value={ currency }
          >
            {currencies.map((option) => (
              <MenuItem key={ option } value={ option }>
                {option}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="filled-select-method"
            select
            label="Pagamento"
            defaultValue="BRL"
            helperText="Selecione o método de pagamento"
            variant="filled"
            name="method"
            data-testid="method-input"
            onChange={ this.handleChange }
            value={ method }
          >
            {methods.map((option) => (
              <MenuItem key={ option } value={ option }>
                {option}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="filled-select-tag"
            select
            label="Tipo de despesa"
            defaultValue="BRL"
            helperText="Selecione o tipo de despesa"
            variant="filled"
            name="tag"
            data-testid="tag-input"
            onChange={ this.handleChange }
            value={ tag }
          >
            {tags.map((option) => (
              <MenuItem key={ option } value={ option }>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Box>

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

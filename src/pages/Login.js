import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Avatar, Box, Button, Divider, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { blue } from '@mui/material/colors';
import { actionLogin } from '../redux/actions/index_Actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  submitLogin = (event) => {
    event.preventDefault();
    const { email } = this.state;
    const { dispatch, history } = this.props;
    dispatch(actionLogin(email));
    history.push('/carteira');
  };

  checkConditions = (email, password) => {
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const lengtMin = 6;
    return password.length >= lengtMin ? !emailRegex.test(email) : true;
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { password, email } = this.state;
    const buttonIsDisabled = this.checkConditions(email, password);
    const passwordMinLength = 6;
    const emailMinLength = 8;

    return (
      <Box
        sx={ { height: '100vh',
          width: '100vw',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#e5e5e5',
        } }
      >
        <Avatar sx={ { bgcolor: blue[500] } }>LJ</Avatar>

        <Divider light />

        <TextField
          id="standard-email"
          error={ email.length < emailMinLength }
          helperText={ email.length < emailMinLength
            ? 'Não pode ser menor que zero' : '' }
          label="Email"
          type="email"
          data-testid="email-input"
          onChange={ this.handleChange }
          value={ email }
          name="email"
          placeholder="Email cadastrado."
          InputLabelProps={ {
            shrink: true,
          } }
          variant="filled"
        />
        <TextField
          id="standard-password"
          error={ password < passwordMinLength }
          helperText={ password < passwordMinLength
            ? 'Não pode ser menor que 6 caracteres' : '' }
          label="Senha"
          type="password"
          data-testid="password-input"
          onChange={ this.handleChange }
          value={ password }
          name="password"
          placeholder="Sua senha"
          InputLabelProps={ {
            shrink: true,
          } }
          variant="filled"
        />
        <Button
          disabled={ buttonIsDisabled }
          variant="contained"
          type="submit"
          onClick={ this.submitLogin }
          endIcon={ <SendIcon /> }
        >
          Entrar
        </Button>
      </Box>
    );
  }
}

const mapStateToProps = (state) => ({
  wallet: state.wallet,
  user: state.user,
});

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Login);

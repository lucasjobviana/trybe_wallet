import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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

    // alert('enviando')
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
    return (
      <div>
        <form>
          <label>
            E-mail:
            <input
              type="email"
              name="email"
              onChange={ this.handleChange }
              value={ email }
              data-testid="email-input"
              placeholder="Email cadastrado."
            />
          </label>
          <label>
            Senha:
            <input
              type="password"
              name="password"
              onChange={ this.handleChange }
              value={ password }
              data-testid="password-input"
              placeholder="Sua senha."
            />
          </label>
          <button
            disabled={ buttonIsDisabled }
            onClick={ this.submitLogin }
          >
            Entrar

          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  wallet: state.wallet,
  user: state.user,
});
export default connect(mapStateToProps)(Login);

Login.propTypes = {
  dispatch: PropTypes.shape({
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

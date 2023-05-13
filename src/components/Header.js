import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;

    const total = expenses.length > 0
      ? expenses.reduce((acc, expense) => acc
      + Number.parseFloat(expense.exchangeRates[expense.currency].ask), 0) : 0;// expense.value
    console.log(total); // expense.exchangeRates[expense.currency].ask ;
    return (
      <div className="header">
        <div>
          TrybeWallet:
          <span data-testid="email-field">
            {email}
          </span>
        </div>
        <div>
          <h1 data-testid="total-field">{total.toFixed(2)}</h1>

          <h1 data-testid="header-currency-field">BRL</h1>
        </div>

      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.shape().isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);

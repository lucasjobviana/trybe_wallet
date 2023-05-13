import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    console.log(this.props);
    const { email } = this.props;

    console.log(email);
    return (
      <div className="header">
        <div>
          TrybeWallet:
          <span data-testid="email-field">
            {email}
          </span>
        </div>
        <div>
          <h1 data-testid="total-field">{0}</h1>
          <h1 data-testid="header-currency-field">BRL</h1>
        </div>

      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);

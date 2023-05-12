import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    console.log(this.props);
    const { user } = this.props;
    const { email } = user;
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
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Header);

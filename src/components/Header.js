import React, { Component } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Avatar } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const total = expenses.length > 0
      ? expenses.reduce((acc, expense) => acc
      + Number.parseFloat(expense.value)
      * Number.parseFloat(expense.exchangeRates[expense.currency].ask), 0) : 0;

    return (

      <Box sx={ { flexGrow: 1 } }>
        <AppBar position="static">
          <Toolbar
            sx={ { display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between' } }
          >
            <Typography variant="h6" component="div">
              Wallet
            </Typography>

            <Typography variant="h4" component="div">
              BRL -
              {` ${total.toFixed(2)}`}
            </Typography>

            <Typography variant="h6" component="div">
              {
                email
                  ? (
                    <>
                      {/* Email:
{' '}
{email} */}
                      <Avatar sx={ { bgcolor: deepOrange[500] } }>LJ</Avatar>
                    </>
                  )
                  : <Button
                    color="inherit"
                    onClick={ () => this.props.history.push('/') }
                  >
                    Login

                  </Button>
              }
            </Typography>
          </Toolbar>
        </AppBar>

      </Box>

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

export default withRouter(connect(mapStateToProps)(Header));

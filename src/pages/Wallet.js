import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <WalletForm />
        <div>This is vallet content</div>
      </>

    );
  }
}

export default Wallet;

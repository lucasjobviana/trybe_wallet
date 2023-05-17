import React from 'react';
import Header from '../components/Header';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />

        <div>This is vallet content</div>
        <Table />
      </>

    );
  }
}

export default Wallet;

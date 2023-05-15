import React, { Component } from 'react';

class Table extends Component {
  headers = ['Descrição', 'Tag', 'Método de pagamento',
    'Valor', 'Moeda', 'Câmbio utilizado', 'Valor convertido',
    'Moeda de conversão', 'Editar/Excluir'];

  render() {
    const headersElement = this.headers.map((header, index) => (
      <th key={ index }>{header}</th>));

    return (
      <div>
        Table
        <table>
          <tr>{headersElement}</tr>
        </table>
      </div>
    );
  }
}

export default Table;

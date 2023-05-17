import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';
import App from '../App';

const correctEmail = 'lucasjob@gmail.com';

describe('Testando a aplicação', () => {
  it('Testando a página de Login.', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const { history } = renderWithRouterAndRedux(<App />);
    const iptEmail = screen.getByText('E-mail:');
    const iptSenha = screen.getByText('Senha:');
    const btnEntrar = screen.getByText('Entrar');
    userEvent.click(iptEmail);
    expect(screen.getByTestId('email-input')).toHaveFocus();
    userEvent.click(iptSenha);
    expect(screen.getByTestId('password-input')).toHaveFocus();

    userEvent.type(iptEmail, 'lucasjobgmail.com');
    expect(btnEntrar).toBeDisabled();
    userEvent.type(iptSenha, '34556');
    expect(btnEntrar).toBeDisabled();
    userEvent.clear(screen.getByTestId('email-input'));
    userEvent.type(iptEmail, correctEmail);
    expect(btnEntrar).toBeDisabled();
    userEvent.clear(screen.getByTestId('password-input'));
    userEvent.type(iptSenha, '345556');
    expect(btnEntrar).not.toBeDisabled();

    userEvent.click(btnEntrar);

    expect(fetch).toHaveBeenCalledWith('https://economia.awesomeapi.com.br/json/all');
    expect(history.location.pathname).toBe('/carteira');

    screen.getByText('0.00');
    console.log(correctEmail);
    expect(screen.getByTestId('email-field').textContent).toBe(correctEmail);

    const iptValue = screen.getByTestId('value-input');
    const iptDescription = screen.getByTestId('description-input');

    userEvent.type(iptValue, '1');
    userEvent.type(iptDescription, 'Descrição do um');

    act(() => {
      userEvent.click(screen.getByText('Adicionar despesa'));
    });

    const odeioOLint = 'total-field';
    await screen.findAllByText('Descrição do um');
    expect(screen.getByTestId(odeioOLint).textContent).toBe('4.75');
    expect(screen.getByText('Dólar Americano/Real Brasileiro')).toBeInTheDocument();

    userEvent.type(iptValue, '2');
    userEvent.type(iptDescription, 'Descrição do dois');

    act(() => {
      userEvent.click(screen.getByText('Adicionar despesa'));
    });

    await screen.findAllByText('Descrição do dois');
    const b2 = screen.getAllByTestId('delete-btn');

    act(() => { userEvent.click(b2[1]); });
    expect(screen.getByTestId(odeioOLint).textContent).toBe('4.75');

    const b3 = screen.getAllByTestId('edit-btn');
    act(() => { userEvent.click(b3[0]); });

    expect(screen.getByText('x')).toBeInTheDocument();

    userEvent.clear(iptDescription);
    userEvent.type(iptDescription, 'Nova descrição');
    userEvent.clear(iptValue);
    userEvent.type(iptValue, '22');

    act(() => {
      userEvent.click(screen.getByText('Editar despesa'));
    });

    await screen.findAllByText('Nova descrição');
    expect(Math.round(screen.getByTestId('total-field').textContent)).toEqual(Math.round(4.75 * 22));
  });
});

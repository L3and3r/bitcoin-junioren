import { render, screen } from '@testing-library/react';
import App from './App';
import nl from './i18n/nl.json';

test('renders the name screen for a new player', async () => {
  localStorage.clear();
  localStorage.setItem('lang', 'nl');
  render(<App />);
  expect(await screen.findByText(nl.ui.nameScreen.title)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(nl.ui.nameScreen.placeholder)).toBeInTheDocument();
});

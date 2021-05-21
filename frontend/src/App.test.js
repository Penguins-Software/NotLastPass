import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Password Manager link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Password Manager/i);
  expect(linkElement).toBeInTheDocument();
});

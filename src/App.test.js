import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders the global chatbot launcher', () => {
  render(<App />);
  expect(
    screen.getByRole('button', { name: /^open chatbot$/i }),
  ).toBeInTheDocument();
});

test('offers a hover prompt whenever the chatbot is closed', () => {
  render(<App />);

  const helpPrompt = screen.getByRole('tooltip');
  expect(helpPrompt).toBeInTheDocument();
  expect(helpPrompt).toHaveTextContent('How can I help?');
  expect(helpPrompt).toHaveClass('group-hover:opacity-100');

  fireEvent.click(screen.getByRole('button', { name: /^open chatbot$/i }));
  const launcher = screen.getByRole('button', {
    name: /close chatbot/i,
    expanded: true,
  });
  expect(screen.queryByText('How can I help?')).not.toBeInTheDocument();

  fireEvent.click(launcher);
  expect(screen.getByRole('button', { name: /^open chatbot$/i })).toBeInTheDocument();
  expect(screen.getByRole('tooltip')).toHaveTextContent('How can I help?');
});

test('closes an open chatbot when the user clicks outside it', () => {
  render(<App />);

  fireEvent.click(screen.getByRole('button', { name: /^open chatbot$/i }));
  expect(
    screen.getByRole('button', { name: /close chatbot/i, expanded: true }),
  ).toBeInTheDocument();

  fireEvent.mouseDown(document.body);

  expect(screen.getByRole('button', { name: /^open chatbot$/i })).toBeInTheDocument();
});

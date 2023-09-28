import {fireEvent, render, screen} from '@testing-library/react';
import App, {BLUE, RED, replaceCamelCaseWithSpaces} from './App';

// Testing functionalities
test('button has correct initial color, and updates when clicked', () => {
  render(<App />);
  // find element with text
  const button = screen.getByRole('button', {name: 'Change to Midnight Blue'});
  expect(button).toHaveStyle({backgroundColor: RED})

  // expect color to change after click
  fireEvent.click(button)
  expect(button).toHaveStyle({backgroundColor: BLUE})

  // expect text to be "Change to red"
  expect(button).toHaveTextContent('Change to Medium Violet Red')

});

test('checkbox is unchecked and button is enabled initially', () => {
  render(<App />);
  const button = screen.getByRole('button', {name: 'Change to Midnight Blue'});
  expect(button).toBeEnabled();

  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();
});

test('Checkbox disables button on click and disables button on second click', () => {
  render(<App />);
  const button = screen.getByRole('button');
  const checkbox = screen.getByRole('checkbox', {name: 'Disable button'});

  // button is disabled when checkbox is checked
  fireEvent.click(checkbox)
  expect(checkbox).toBeChecked();
  expect(button).toBeDisabled();

  fireEvent.click(checkbox)
  expect(button).toBeEnabled();

});

test('Disabled button has gray background and reverts to red', () => {
  render(<App />);
  const button = screen.getByRole('button');
  const checkbox = screen.getByRole('checkbox', {name: 'Disable button'});

  // button is gray when checkbox is checked
  fireEvent.click(checkbox)
  expect(button).toHaveStyle({backgroundColor: 'gray'});

  fireEvent.click(checkbox)
  expect(button).toHaveStyle({backgroundColor: RED});

});

test('Clicked Disabled button has gray background and reverts to blue', () => {
  render(<App />);
  const button = screen.getByRole('button');
  const checkbox = screen.getByRole('checkbox', {name: 'Disable button'});

  // change button color
  fireEvent.click(button)

  //disable button
  fireEvent.click(checkbox)
  expect(button).toHaveStyle({backgroundColor: 'gray'});

  //
  fireEvent.click(checkbox)
  expect(button).toHaveStyle({backgroundColor: BLUE});

});

describe('Replace Camel Case with Spaces', () => {
  test('Works for no inner capital letter', () => {
    expect(replaceCamelCaseWithSpaces('red')).toBe('red')
  })

  test('Works for one inner capital letter', () => {
    expect(replaceCamelCaseWithSpaces('RedViolet')).toBe('Red Violet')
  })

  test('Works for multiple inner capital letter', () => {
    expect(replaceCamelCaseWithSpaces('RedPurpleBlue')).toBe('Red Purple Blue')
  })
})
import React from 'react';
import { render, waitForElement } from 'react-testing-library';
import App from './App';
import 'jest-dom/extend-expect';

it('renders welcome message', () => {
  const { getByText } = render(<App user={true} />);
  expect(getByText('Realsies')).toBeInTheDOM();
});

it('submits form with correct data', async () => {
  let handleSubmit = jest.fn();
  let payload = [
    { id: +new Date(), to: 'f@q', thing: 'test thingy', when: '2018-07-31' }
  ];

  const { getByTestId, queryByText } = render(<App user={true} />);
  await waitForElement(() => getByTestId('to'));
  // update keyboarddata-testid="to"
  getByTestId('to').value = '1@3.com';
  getByTestId('thing').value = 'dsfsf';
  getByTestId('when').value = '2018-07-31';
  getByTestId('submit').click();
  expect(handleSubmit).toBeCalledWith(payload);
});

it('shows a new realsie in the list', () => {
  expect(true).toBeFalsy();
});
it('deliver a realsie', () => {
  expect(true).toBeFalsy();
});
it('realsie shows up in archive', () => {
  expect(true).toBeFalsy();
});

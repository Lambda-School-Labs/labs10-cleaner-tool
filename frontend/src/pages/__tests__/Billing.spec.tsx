import React from 'react';
import MyStoreCheckout from '../Billing/Checkout';
import { StripeProvider } from 'react-stripe-elements';
import 'jest';
import 'jest-dom/extend-expect';
import { cleanup, render } from 'react-testing-library';

afterEach(cleanup);

describe('Stripe Button', () => {
  test('should render a button', () => {
    const { container } = render(
      // @ts-ignore
      <StripeProvider stripe={null}>
        <MyStoreCheckout />
      </StripeProvider>,
    );
    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
    expect(button).toBeTruthy();
  });
  test('should carry type button', () => {
    const { container } = render(
      <StripeProvider stripe={null}>
        <MyStoreCheckout />
      </StripeProvider>,
    );
    const button = container.querySelector('button');

    expect(button).toHaveAttribute('type', 'button');
  });
  test('should have text "Pay With Card"', () => {
    const { getByText } = render(
      <StripeProvider stripe={null}>
        <MyStoreCheckout />
      </StripeProvider>,
    );
    const button = getByText(/Subscribe/i);
    expect(button).toHaveTextContent('Subscribe!');
  });
});

describe('future accordion component', () => {
  test('should display subscription plans', () => {
    const { getByText, debug } = render(
      <StripeProvider stripe={null}>
        <MyStoreCheckout />
      </StripeProvider>,
    );
    const basePlan = getByText(/baseplan/i);
    const advPlan = getByText(/advanced/i);
    expect(basePlan).toHaveTextContent('Baseplan: 9.99$ / house / month');
    expect(advPlan).toHaveTextContent('Advanced: 50$ / month');
  });

  test('should render a form component', () => {
    const { getByTestId } = render(
      <StripeProvider stripe={null}>
        <MyStoreCheckout />
      </StripeProvider>,
    );
    const form = getByTestId('checkout-form');
    expect(form).toBeInTheDocument();
    expect(form).toHaveStyle('margin: auto;');
  });
});
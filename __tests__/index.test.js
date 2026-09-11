import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../pages/index';

describe('Home page', () => {
  it('renders the hello heading', () => {
    render(<Home />);
    expect(screen.getByText('Hello, DevSecOps!')).toBeInTheDocument();
  });
});

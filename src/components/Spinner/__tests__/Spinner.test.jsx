import { render, screen } from '@testing-library/react';
import Spinner from '../Spinner';

describe('Spinner', () => {
  it('should render spinner overlay', () => {
    const { container } = render(<Spinner />);
    const overlay = container.querySelector('.spinner-overlay');
    expect(overlay).toBeInTheDocument();
  });

  it('should render spinner element', () => {
    const { container } = render(<Spinner />);
    const spinner = container.querySelector('.spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('should have correct structure', () => {
    const { container } = render(<Spinner />);
    const overlay = container.querySelector('.spinner-overlay');
    const spinner = container.querySelector('.spinner');
    
    expect(overlay).toContainElement(spinner);
  });
});


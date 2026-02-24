/**
 * @vitest-environment jsdom
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatBadge } from './StatBadge';

describe('StatBadge', () => {
  it('renders label and value', () => {
    render(<StatBadge label="Height" value="172cm" />);
    expect(screen.getByText('Height')).toBeInTheDocument();
    expect(screen.getByText('172cm')).toBeInTheDocument();
  });

  it('shows em dash for unknown value', () => {
    render(<StatBadge label="Mass" value="unknown" />);
    expect(screen.getByText('Mass')).toBeInTheDocument();
    expect(screen.getByText('—')).toBeInTheDocument();
  });

  it('shows em dash for n/a (lowercase)', () => {
    render(<StatBadge label="Gender" value="n/a" />);
    expect(screen.getByText('—')).toBeInTheDocument();
  });

  it('shows em dash for N/A (uppercase)', () => {
    render(<StatBadge label="Gender" value="N/A" />);
    expect(screen.getByText('—')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <StatBadge label="Test" value="x" className="custom-class" />
    );
    const wrapper = container.querySelector('.custom-class');
    expect(wrapper).toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TabComponent } from './tab';

describe('TabComponent', () => {
  const mockTabConfigs = [
    {
      label: 'Tab 1',
      tabItem: <div>Content for Tab 1</div>
    },
    {
      label: 'Tab 2',
      tabItem: <div>Content for Tab 2</div>
    }
  ];

  it('renders all tab labels', () => {
    render(<TabComponent tabConfigs={mockTabConfigs} />);
    
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
  });

  it('shows first tab content by default', () => {
    render(<TabComponent tabConfigs={mockTabConfigs} />);
    
    expect(screen.getByText('Content for Tab 1')).toBeInTheDocument();
    expect(screen.queryByText('Content for Tab 2')).not.toBeInTheDocument();
  });

  it('switches content when clicking different tabs', () => {
    render(<TabComponent tabConfigs={mockTabConfigs} />);
    
    // Click second tab
    fireEvent.click(screen.getByText('Tab 2'));
    
    // Check that content switched
    expect(screen.queryByText('Content for Tab 1')).not.toBeInTheDocument();
    expect(screen.getByText('Content for Tab 2')).toBeInTheDocument();
    
    // Click first tab again
    fireEvent.click(screen.getByText('Tab 1'));
    
    // Check that content switched back
    expect(screen.getByText('Content for Tab 1')).toBeInTheDocument();
    expect(screen.queryByText('Content for Tab 2')).not.toBeInTheDocument();
  });

  it('has correct ARIA attributes', () => {
    render(<TabComponent tabConfigs={mockTabConfigs} />);
    
    const tabList = screen.getByRole('tablist');
    expect(tabList).toHaveAttribute('aria-label', 'tab navigation');
    
    const tabPanel = screen.getByLabelText('Tab 1');
    expect(tabPanel).toHaveAttribute('id', `simple-tabpanel-1`);
  });
});
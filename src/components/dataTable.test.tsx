import { render, screen, within, fireEvent } from '@testing-library/react';
import { DataTable } from './dataTable';
import { Items } from '../types/generic';

describe('DataTable', () => {
    const mockItems = [
        {
            guid: '123',
            name: 'Test Item',
            path: ['folder', 'subfolder'],
        },
        {
            guid: '456',
            name: 'Another Item',
            path: ['root', 'documents']
        }
    ] as Items;

    it('renders the data grid with correct columns', () => {
        render(<DataTable items={mockItems} />);
        
        // Check if column headers are present
        expect(screen.getByRole('columnheader', { name: /guid/i })).toBeInTheDocument();
        expect(screen.getByRole('columnheader', { name: /name/i })).toBeInTheDocument();
        expect(screen.getByRole('columnheader', { name: /path/i })).toBeInTheDocument();
    });

    it('displays data in correct row structure', () => {
        render(<DataTable items={mockItems} />);
        
        // Get all rows (excluding header row)
        const rows = screen.getAllByRole('row').slice(1);
        expect(rows).toHaveLength(2);

        // Check first row structure
        const firstRow = rows[0];
        const firstRowCells = within(firstRow).getAllByRole('gridcell');
        expect(firstRowCells).toHaveLength(3);
        expect(firstRowCells[0]).toHaveTextContent('123');
        expect(firstRowCells[1]).toHaveTextContent('Test Item');
        expect(firstRowCells[2]).toHaveTextContent('folder/subfolder');

        // Check second row structure
        const secondRow = rows[1];
        const secondRowCells = within(secondRow).getAllByRole('gridcell');
        expect(secondRowCells).toHaveLength(3);
        expect(secondRowCells[0]).toHaveTextContent('456');
        expect(secondRowCells[1]).toHaveTextContent('Another Item');
        expect(secondRowCells[2]).toHaveTextContent('root/documents');
    });
    
    it('calls onRowClick handler when row is clicked', async () => {
        const mockOnRowClick = jest.fn();
        
        render(<DataTable items={mockItems} onRowClickHandler={mockOnRowClick} />);
        
        // Find and click the row (using the name cell as target)
        const row = screen.getByRole('gridcell', { name: 'Test Item' });
        fireEvent.click(row);
        
        // Verify the handler was called
        expect(mockOnRowClick).toHaveBeenCalled();
        // Verify the handler was called with correct row data
        expect(mockOnRowClick.mock.calls[0][0].row).toEqual(mockItems[0]);
    });

});
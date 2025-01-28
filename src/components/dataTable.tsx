import React from 'react';
import { DataGrid, GridColDef, GridEventListener } from '@mui/x-data-grid';
import { Items } from '../types/generic';

const columns: GridColDef[] = [
    { field: 'guid', headerName: 'GUID', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'path', headerName: 'Path', flex: 2, 
        valueGetter: (_, row) => {
            return row.path.join('/');
        },
     },
];


interface DataTableProps {
    items: Items,
    onRowClickHandler?: GridEventListener<'rowClick'>,
}

export const DataTable: React.FC<DataTableProps> = ({ items, onRowClickHandler }) => {
    return <DataGrid getRowId={(row) => row.guid} 
            onRowClick={onRowClickHandler}
            rows={items} columns={columns} hideFooter />;
}
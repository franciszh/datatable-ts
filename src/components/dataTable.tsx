import React from 'react';
import { DataGrid, GridColDef, GridEventListener } from '@mui/x-data-grid';
import { Items } from '../types/generic';

// A default columns setup example, it can be changed to a more generic one
// in a real project
const defultColumns: GridColDef[] = [
    { field: 'guid', headerName: 'GUID', width: 100 },
    { field: 'name', headerName: 'Name', width: 100 },
    { field: 'path', headerName: 'Path', width: 200, 
        valueGetter: (_, row) => {
            return row.path.join('/');
        },
     },
];


interface DataTableProps {
    items: Items,
    columns?: GridColDef[],
    onRowClickHandler?: GridEventListener<'rowClick'>,
}

export const DataTable: React.FC<DataTableProps> = ({ items, onRowClickHandler, columns = defultColumns }) => {
    return <DataGrid getRowId={(row) => row.guid} 
            onRowClick={onRowClickHandler}
            rows={items} columns={columns} hideFooter />;
}
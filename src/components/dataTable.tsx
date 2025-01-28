import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Items } from '../types/generic';

const columns: GridColDef[] = [
    { field: 'guid', headerName: 'GUID', width: 200 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'path', headerName: 'Path', flex: 1, 
        valueGetter: (_, row) => {
            return row.path.join('/');
        },
     },
];


interface DataTableProps {
    items: Items
}

export const DataTable: React.FC<DataTableProps> = ({ items }) => {
    return <DataGrid getRowId={(row) => row.guid} rows={items} columns={columns} hideFooter />;
}
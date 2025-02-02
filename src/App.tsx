import React from 'react';
import { useGetItemsQuery } from './service/generic'
import { DataTable } from './components/dataTable';
import { TabComponent } from './components/tab'
import { useAppSelector, useAppDispatch } from './store/hooks'
import { selectGUID } from './store/selectors'
import { update } from './store/itemSelectionSlice'
import { ITEMS_API_HOST } from './constants/endpoints'
import { ItemProperties } from './types/generic'
import { GridColDef } from '@mui/x-data-grid'
import './App.css';

// Image panel content
const Image = (props: {selectedGUID?: string}) => {
  const { selectedGUID } = props;
  if (selectedGUID) {
    return <img src={ITEMS_API_HOST + 'image/' + selectedGUID} alt="Item image" className='full-width'/>
  }

  return <div>Please select a row item on the data table</div>
}

// Properties panel content
const Properties = (props: {itemProperties?: ItemProperties}) => {
  const { itemProperties } = props;
  if (itemProperties) {
    return(
    <div>
      {Object.entries(itemProperties).map(([key, value]) => {return <div key={key}>{key} : {value}</div>})}
    </div>
    )
  }

  return <div>Please select a row item on the data table</div>
}

// Data table col config
const columns: GridColDef[] = [
  { field: 'guid', headerName: 'GUID', flex: 1 },
  { field: 'name', headerName: 'Name', flex: 1 },
  { field: 'path', headerName: 'Path', flex: 2, 
      valueGetter: (_, row) => {
          return row.path.join('/');
      },
   },
];


const App = () => {
  const { data, error, isLoading } = useGetItemsQuery()
  const dispatch = useAppDispatch()
  const selectedGUID = useAppSelector(selectGUID)
  

  if (isLoading) {
    return <div className='center-text'>Loading...</div>
  }

  if (error) {
    return <div className='center-text'>Sorry, we are unable to retrieve the items at this time.</div>
  }

  if (data) {
    const propertiesOfSelectedItem = selectedGUID ? data.find((row) => row.guid === selectedGUID)?.properties : undefined
    const imagePanel = <Image selectedGUID={selectedGUID} />
    const propertiesPanel = <Properties itemProperties={propertiesOfSelectedItem}/>
    return (
      <div className="App">
        <DataTable items={data} columns={columns}
          onRowClickHandler={(row) => {
          dispatch(update(row.row.guid))
        }}/>
        <TabComponent tabConfigs={[{label: "Properties", tabItem: propertiesPanel}, {label: "Image", tabItem: imagePanel}]}/>
      </div>
    )
  }

  return null
}

export default App;

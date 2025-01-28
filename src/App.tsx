import React from 'react';
import { useGetItemsQuery } from './service/generic'
import { DataTable } from './components/dataTable';
import './App.css';

function App() {
  const { data, error, isLoading } = useGetItemsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Sorry, we are unable to retrieve the items at this time.</div>;
  }

  if (data) {
    return (
      <div className="App">
        <DataTable items={data} />
      </div>
    )
  }

  return null;
}

export default App;

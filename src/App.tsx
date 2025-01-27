import React from 'react';
import { useGetItemsQuery } from './service/generic'
import './App.css';

function App() {
  const { data, error, isLoading } = useGetItemsQuery();

  console.log(data);

  return (
    <div className="App">
      test
    </div>
  )
}


export default App;

import React, { useState } from 'react';
import './App.css';
import Input from './components/input/Input'
import Output from './components/output/Output'

function App() {

  const [listData, setListData] = useState({});

  const handleListData = (data) => {
    console.log(data);
    //setListData(data);
  }

  return (
    <div className="App">
      <Input handleListData = {handleListData}/>
      <Output listData = {listData} />
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import './App.css';
import Input from './components/input/Input'
import Output from './components/output/Output'

function App() {

  const [listData, setListData] = useState({
    output: {
      pages: [
          {
              textlines: [
                  {
                      polys: [
                        [],
                        [],
                        [],
                        []
                      ],
                      text: "",
                      confidence: null
                  }  
              ],
              rotation_angle: null,
              height: null,
              width: null,
              page_num: null,
              url: "" 
          }
      ],
      images: [],
      kv: []
  },
  time: null,
  api_version: "",
  mlchain_version: ""
  });

  const handleListData = (data) => {
      setListData(data);
  }

  return (
    <div className="App">
      <Input handleListData = {handleListData}/>
      <Output listData = {listData} />
    </div>
  );
}

export default App;

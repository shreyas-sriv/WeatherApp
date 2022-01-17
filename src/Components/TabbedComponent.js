import {Tabs,Tab} from 'react-bootstrap';
import React,{useState} from 'react';
import './tab.css' 
function ControlledTabs({tab1,tab2}) {
    const [key, setKey] = useState('home');

  //Map and Weather Data in tabs

    return (
      <Tabs
        id="controlled-tab"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab className='tab1' eventKey="home" title="Map">
         {tab1}
        </Tab>
        <Tab eventKey="profile" title="Weather Data">
          {tab2}
        </Tab>
      </Tabs>
    );
  }
  
export default ControlledTabs;
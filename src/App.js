import './App.css';
import Segment from './Segemnt';
import Navbar from "./Navbar";
import { useState } from 'react';


function App() {
 
  let[segment,setSegment]=useState(false);

  function handleSegment(){
    if(segment===false)
     setSegment(true);
     else
     setSegment(false);

  }
  return (
      <div className="App">
        {segment?<Segment/>:null}
        <Navbar heading="View Audience" />
        

        <main className='mainSec'>
          <button className='segmentButton' onClick={()=>handleSegment()}>Save Segment</button>
        </main>
        
        
      </div>

  );
}

export default App;

import React from "react";
import './segment.css';
import Navbar from "./Navbar";
import { useState } from "react";
import axios from "axios";


export default function Segment() {
    let [schema, setSchema] = useState([]);
    let [segmentName, setSegmentName] = useState("");

    let [options, setOptions] = useState("");
    let [labels, setLabels] = useState("");
    let [schema2, setSchema2] = useState([{
        option: options,
        label: labels
    }])
    
    let [data, setData] = useState([])


    function handleAdd() {
        if (options !== "") {
            setSchema([...schema, options]);
            setSchema2([...schema2, { option: options, label: labels }])
            setOptions("");

            setData([...data,{[options] : labels}]);

                console.log(data);


            document.getElementById("traits").selectedIndex = 0;
        }
    }

    function handleSelect(e) {
        setOptions(e.target.value)
        setLabels(e.target[e.target.selectedIndex].text);

    }

    function handleSubmit(e) {
        e.preventDefault();
        axios.post('https://webhook.site/5ba7801d-a174-40a4-8b86-0b344cb5f661', JSON.stringify({
            segment_name :segmentName,
            schema : data
        })).then((res)=>console.log(res)).catch((error)=>console.log(error))

    }

    return (
        <div className="divSegment">
            <Navbar heading="Saving Segment" />

            <main className="mainSegment">
                <label htmlFor="nameSegment" ><span className="nSegment">Enter the name of the segment</span></label><br></br>
                <input id="nameSegment" placeholder="Name of the segment" onChange={(e) => setSegmentName(e.target.value)} />

                <p className="schemasHeading">To save segment, you need to add the schemas to build the query </p>

                <p className="traitsTag"> <span>🟢 -User Traits  </span>  <span> 🔴 -Group Traits</span></p>

                {(schema.length > 0) ? <div className="traitsDiv">

                    {schema2.map((ele, index) => {

                        if (ele.option !== "")

                            return (<div key={ele.option}><select id="traits2" onChange={(e) => setOptions(e.target.value)}>
                                <option value={ele.option}>{ele.label}</option>
                            </select><br></br></div>)
                        else
                            return null
                    })}
                </div> : null}




                <select id="traits" onChange={(e) => handleSelect(e)}>
                    <option value="" disabled selected>Add schema to segment</option>
                    <option value="first_name" hidden={schema.includes("first_name")}>🟢 First Name</option>
                    <option value="last_name" hidden={schema.includes("last_name")}>🟢 Last Name</option>
                    <option value="gender" hidden={schema.includes("gender")}>🟢  Gender</option>
                    <option value="age" hidden={schema.includes("age")}>🟢 Age</option>
                    <option value="account_name" hidden={schema.includes("account_name")}>🔴 Account Name</option>
                    <option value="city" hidden={schema.includes("city")}>🔴 City</option>
                    <option value="state" hidden={schema.includes("state")}>🔴 State</option>
                </select>
                <input className="addSchema" type="submit" value="+ Add new schema" onClick={() => handleAdd()} /><br />
                </main>

                <div className="buttonDiv">

                <button className="submitButton" type="submit" onClick={(e) => handleSubmit(e)}>Save the segment</button>
                <button className="cancelButton" type="submit">Cancel</button>

                </div>

            
        </div>

    )
}
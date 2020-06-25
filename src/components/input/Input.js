import React, { useState } from 'react'
import './Input.css'
import Select from 'react-select';

const options = [
    { value: '0', label: 'Vietnamese' },
    { value: '1', label: 'English' },
];

export default function Input() {

    const [selectedOption, setSelectedOption] = useState(null);
    const handleChange = selectedOption => {
        setSelectedOption(selectedOption);
    };
    return (
        <div className="container input-style">
            <h3>INPUT</h3>
            <div className="btn-group" role="group">
                <button type="button" className="btn disabled scenario">Scenario</button>
                <Select
                    value={selectedOption}
                    onChange={handleChange}
                    options={options}
                    className="selected-custom"
                />
            </div>
            <div className="btn-group" role="group">
                <button type="button" className="btn disabled scenario">Input</button>
                <input type="text" id='input-text' className="form-control text-input" placeholder='Enter ans URL or Upload file...'/>
                <input type="file" name="" id="file" className="file-input" onChange={(event) => {
                    document.getElementById("input-text").value = event.target.files[0].name;
                }}/>
                <button type="button" className="btn btn-upload"
                    onClick={() => {
                        document.getElementById("file").click();
                    }}
                >
                    Upload File
                </button>
            </div>
            <button type="button" name="" id="" className="btn btn-grad">Run</button>
        </div>
    )
}

import React, { useState } from 'react'
import './Input.css'
import Select from 'react-select';
import axios from 'axios';

const options = [
    { value: '0', label: 'Vietnamese' },
    { value: '1', label: 'English' },
];

const customStyles = {
    option: (provided, state) => ({
      ...provided,
      border: 'none',
      fontWeight: state.isSelected ? 'bold' : '',
      color: 'black',
      backgroundColor: state.isDisabled
        ? null
        : state.isSelected
        ? '#bce0fd'
        : state.isFocused
        ? '#fafafa'
        : null,
    }),
    control: (base, state) => ({
        ...base,
        border: state.isFocused ? 0 : 0,
        boxShadow: state.isFocused ? 0 : 0,
        '&:hover': {
        border: state.isFocused ? 0 : 0
        },
    }),
    placeholder: () => ({
        color: '#63d481',
    }),
    indicatorsContainer: () => ({
        border: 'none',
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
      return { ...provided, color: '#63d481', opacity, transition };
    }
}

export default function Input({handleListData, loadingPage}) {

    const [selectedOption, setSelectedOption] = useState(null);
    const [dataFile, setDataFile] = useState();
    const handleChange = selectedOption => {
        setSelectedOption(selectedOption);
    };

    const handleFile = (e) => {
        if (e.target.files[0]) {
            document.getElementById("input-text").value = e.target.files[0].name;
            setDataFile(e.target.files[0]);
        }
    }

    const handleSendFile = () => {
        const formData = new FormData();
        formData.append('input', dataFile);
        loadingPage(true);
        axios.post('http://103.74.122.136:7100/api/ocr', formData)
             .then(res => handleListData(res.data))
             .catch(error => console.log(error))
    }

    return (
        <div className="container-fluid input-style">
            <h3>INPUT</h3>
            <div className="btn-group" role="group">
                <button type="button" className="btn disabled scenario">Scenario</button>
                <Select
                    value={selectedOption}
                    onChange={handleChange}
                    options={options}
                    className="selected-custom"
                    styles={customStyles}
                />
            </div>
            <div className="btn-group" role="group">
                <button type="button" className="btn disabled scenario">Input</button>
                <input type="text" id='input-text' className="form-control text-input" placeholder='Enter ans URL or Upload file...'/>
                <input type="file" name="" id="file" className="file-input" accept=".pdf" onChange={handleFile}/>
                <button type="button" className="btn btn-upload"
                    onClick={() => {
                        document.getElementById("file").click();
                    }}
                >
                    Upload File
                </button>
            </div>
            <button type="button" name="" id="" className="btn btn-grad" onClick={ handleSendFile}>RUN</button>
        </div>
    )
}

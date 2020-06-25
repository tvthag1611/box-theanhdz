import React, { useState } from 'react'
import './Output.css'
import './Output.scss';
import Switch from "react-switch";
import JSONTreeComponent from "react-json-tree"

export default function Output() {
    const [checked, setChecked] = useState(true);
    const [isTextlines, setIsTextlines] = useState(true);
    const [state, setState] = useState({
        output: {
            pages: [
                {
                    textlines: [
                        {
                            "text": "HỌC VẤN",
                            "confidence": 0.9711343947963079
                        },
                        {
                            "text": "2014 - 2019",
                            "confidence": 0.999746721478729
                        },
                        {
                            "text": "HỌC VIỆN CÔNG NGHỆ BƯU CHÍNH VIỄN THÔNG",
                            "confidence": 0.985105110407201
                        }
                    ],
                    rotation_angle: 0.15099197490648789,
                    height: 2530,
                    width: 1809,
                    page_num: 2,
                    url: "3cad5948-aa22-4ab2-a4b0-bf8c35977ec8/1.jpg"
                },
                {
                    textlines: [],
                    rotation_angle: 0.6729477313724724,
                    height: 2547,
                    width: 1832,
                    page_num: 1,
                    url: "3cad5948-aa22-4ab2-a4b0-bf8c35977ec8/0.jpg"
                }
            ],
            images: [],
            kv: []
        },
        time: 15.47,
        api_version: "0.1",
        mlchain_version: "0.0.9i0"
    });

    const theme = {
        scheme: 'monokai',
        base00: '#272822',
        base01: '#383830',
        base02: '#49483e',
        base03: '#75715e',
        base04: '#a59f85',
        base05: '#f8f8f2',
        base06: '#f5f4f1',
        base07: '#f9f8f5',
        base08: '#f92672',
        base09: '#fd971f',
        base0A: '#f4bf75',
        base0B: '#a6e22e',
        base0C: '#a1efe4',
        base0D: '#66d9ef',
        base0E: '#ae81ff',
        base0F: '#cc6633'
      };

    const handleChange = checked => {
        setChecked(checked);
    }

    const RowJson = () => {
        return (
            <div className="json-content">
                <button type="button" name="" id="" className="btn btn-json">
                    <i className="fa fa-download" aria-hidden="true"></i>
                    Download JSON
                </button>
                <div className="json-data">
                    <JSONTreeComponent data={state} theme={theme} invertTheme={true}/>
                </div>
                
            </div>
        );
    }

    const renderTable = () =>{
        return state.output.pages[0].textlines.map((textline, index) => {
            const {text, confidence} = textline;
            return(
                <tr key={index}>
                    <td> {text} </td>
                    <td>
                        <div className="cover-box">{parseFloat(confidence).toFixed(3)}</div>
                    </td>
                </tr>
            )
        });
    }

    const RowTextlines = () => {
       
            return(
                <table className="table">
                    <thead>
                        <tr className="header">
                            <th className="text">Text</th>
                            <th className="confidence">Confidence</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderTable()}
                    </tbody>
            </table>
            )
        
            
        
    }

    return (
        <div className="container-fluid output-style">
            <h3>OUTPUT</h3>
            <div className="content-output">
                <div className="output-left">
                    <div className="output-left-top">
                        <i className="fa fa-chevron-left" aria-hidden="true"
                            data-toggle="tooltip" data-placement="bottom" title="Previous Page"
                        ></i>
                        <p>Page 1/1</p>
                        <i className="fa fa-chevron-right" aria-hidden="true"
                            data-toggle="tooltip" data-placement="bottom" title="Next Page"
                        ></i>
                        <Switch onChange={handleChange} checked={checked}/>
                        <i className="fa fa-plus" aria-hidden="true"
                            data-toggle="tooltip" data-placement="bottom" title="Zoom In"
                        ></i>
                        <i className="fa fa-minus" aria-hidden="true"
                            data-toggle="tooltip" data-placement="bottom" title="Zoom Out"
                        ></i>
                    </div>
                    <div className="output-left-document container">
                    </div>
                </div>

                <div className="output-right">
                    <div className="title">
                        <div className={isTextlines ? "textlines title-active" : "textlines"}
                            onClick={() => setIsTextlines(true)}
                        >Raw Textlines</div>
                        <div className={!isTextlines ? "json title-active" : "json"}
                            onClick={() => setIsTextlines(false)}
                        >Raw JSON Results</div>
                    </div>
                    {isTextlines ? <RowTextlines /> : <RowJson />}
                </div>

            </div>
        </div>
    )
}

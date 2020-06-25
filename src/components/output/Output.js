import React, { useState } from 'react'
import './Output.css'
import './Output.scss';
import Switch from "react-switch";

export default function Output() {
    const [checked, setChecked] = useState(true);
    const [isTextlines, setIsTextlines] = useState(true);

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
            </div>
        );
    }

    const RowTextlines = () => {
        return (
            <table className="table">
                <tr className="header">
                    <th className="text">Text</th>
                    <th className="confidence">Confidence</th>
                </tr>
                <tr>
                    <td>adgasfhdsfaljgioshgfihsighushng</td>
                    <td>
                        <div className="cover-box">0.967</div>
                    </td>
                </tr>
                <tr>
                    <td>adgasfhdsfaljgioshgfihsighushng</td>
                    <td>
                        <div className="cover-box">0.967</div>
                    </td>
                </tr>
                <tr>
                    <td>adgasfhdsfaljgioshgfihsighushng</td>
                    <td>
                        <div className="cover-box">0.967</div>
                    </td>
                </tr>
            </table>
        );
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

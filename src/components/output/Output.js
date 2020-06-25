import React, { useState } from 'react'
import './Output.css'
import './Output.scss';
import Switch from "react-switch";

export default function Output() {
    const [checked, setChecked] = useState(false);

    const handleChange = checked => {
        setChecked(checked);
    }

    return (
        <div className="container output-style">
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
                    <div className="output-left-document">
                    </div>
                </div>
                <div className="output-left"></div>
            </div>
        </div>
    )
}

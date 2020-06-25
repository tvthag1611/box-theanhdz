import React, { useState } from 'react'
import './Output.css'
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
                        <i className="fa fa-angle-left" aria-hidden="true"></i>
                        <p>Page 1/1</p>
                        <i className="fa fa-angle-right" aria-hidden="true"></i>
                        <Switch onChange={handleChange} checked={checked} />
                        <i className="fa fa-plus" aria-hidden="true"></i>
                        <i className="fa fa-minus" aria-hidden="true"></i>
                    </div>
                </div>
                <div className="output-left"></div>
            </div>
        </div>
    )
}

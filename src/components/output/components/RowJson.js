import React from 'react'
import JSONTreeComponent from "react-json-tree"

export default function RowJson({state}) {
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

    const downloadTxtFile = () => {
        const element = document.createElement("a");
        const file = new Blob([JSON.stringify(state)],    
                    {type: 'data:text/json;charset=utf-8'});
        element.href = URL.createObjectURL(file);
        element.download = "Result_RawJson.json";
        document.body.appendChild(element);
        element.click();
    }

    return (
        <div className="json-content">
            <button type="button" name="" id="" className="btn btn-json"
            onClick={downloadTxtFile}
            >
                <i className="fa fa-download" aria-hidden="true"></i>
                Download JSON
            </button>
            <div className="json-data">
                <JSONTreeComponent data={state} theme={theme} invertTheme={true}/>
            </div>
            
        </div>
    )
}

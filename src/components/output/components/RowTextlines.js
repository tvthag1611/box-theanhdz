import React from 'react'

export default function RowTextlines({state, indexPage}) {
    const renderTable = () =>{
        return state.output.pages[indexPage-1].textlines.map((textline, index) => {
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
    return (
        <div className="table-responsive">
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
        </div>
    )
}

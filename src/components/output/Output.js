import React, { useState, useEffect } from 'react'
import './Output.css'
import './Output.scss';
import Switch from "react-switch";
import JSONTreeComponent from "react-json-tree"
import { Stage, Layer, Rect } from 'react-konva';

export default function Output() {
    const [checked, setChecked] = useState(true);
    const [isTextlines, setIsTextlines] = useState(true);
    const [indexPage, setIndexPage] = useState(1);
    const [state, setState] = useState({
        output: {
            pages: [
                {
                    textlines: [
                        {
                            polys: [
                                [
                                    738,
                                    85
                                ],
                                [
                                    920,
                                    85
                                ],
                                [
                                    921,
                                    121
                                ],
                                [
                                    737,
                                    123
                                ]
                            ],
                            "text": "HỌC VẤN",
                            "confidence": 0.9711343947963079
                        },
                        {
                            polys: [
                                [
                                    1634,
                                    204
                                ],
                                [
                                    1790,
                                    206
                                ],
                                [
                                    1790,
                                    232
                                ],
                                [
                                    1634,
                                    230
                                ]
                            ],
                            "text": "2014 - 2019",
                            "confidence": 0.999746721478729
                        },
                        {
                            polys: [
                                [
                                    608,
                                    188
                                ],
                                [
                                    1242,
                                    195
                                ],
                                [
                                    1242,
                                    225
                                ],
                                [
                                    608,
                                    218
                                ]
                            ],    
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
                    textlines: [
                        {
                            polys: [
                                [
                                    591,
                                    891
                                ],
                                [
                                    1373,
                                    893
                                ],
                                [
                                    1373,
                                    921
                                ],
                                [
                                    591,
                                    919
                                ]
                            ],
                            text: "vậnchuyển hàng như grap. Đều được khách hàng đánh giá cao",
                            confidence: 0.9824769804198147
                        },
                        {
                            polys: [
                                [
                                    1623,
                                    2479
                                ],
                                [
                                    1761,
                                    2482
                                ],
                                [
                                    1759,
                                    2504
                                ],
                                [
                                    1623,
                                    2499
                                ]
                            ],
                            text: "O topcv.vn",
                            confidence: 0.9643418775941204
                        }    
                    ],
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
                            onClick={() => {
                                if (indexPage > 1) {
                                    setIndexPage(indexPage-1);
                                }
                            }}
                        ></i>
                        <p>Page {indexPage}/{state.output.pages.length}</p>
                        <i className="fa fa-chevron-right" aria-hidden="true"
                            data-toggle="tooltip" data-placement="bottom" title="Next Page"
                            onClick={() => {
                                if (indexPage < state.output.pages.length) {
                                    setIndexPage(indexPage+1);
                                }
                            }}
                        ></i>
                        <Switch onChange={handleChange} checked={checked}/>
                        <i className="fa fa-plus" aria-hidden="true"
                            data-toggle="tooltip" data-placement="bottom" title="Zoom In"
                        ></i>
                        <i className="fa fa-minus" aria-hidden="true"
                            data-toggle="tooltip" data-placement="bottom" title="Zoom Out"
                        ></i>
                    </div>
                    <Stage height={610} width={700 * 595 / 842}>
                        <Layer>
                            {
                                state.output.pages[indexPage-1].textlines.map(textline => {
                                    let x = textline.polys[0][0]*(700 * 595 / 842)/state.output.pages[indexPage-1].width;
                                    let y = textline.polys[0][1]*610/state.output.pages[indexPage-1].height;
                                    let width = textline.polys[1][0] - textline.polys[0][0];
                                    let height = textline.polys[3][1] - textline.polys[0][1];
                                    return (
                                        <Rect
                                            x={x}
                                            y={y}
                                            width={width}
                                            height={height}
                                            stroke="red"
                                        />
                                    )
                                })
                            }
                        </Layer>
                    </Stage>
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

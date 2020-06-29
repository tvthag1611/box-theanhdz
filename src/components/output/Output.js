import React, { useState, useEffect, useRef } from 'react'
import './Output.css'
import './Output.scss';
import Switch from "react-switch";
import JSONTreeComponent from "react-json-tree"
import { Stage, Layer, Rect, Image, Text, Shape } from 'react-konva';
import useImage from 'use-image';
import {CopyToClipboard} from 'react-copy-to-clipboard';

export default function Output({listData}) {
    const [checked, setChecked] = useState(true);
    const [isTextlines, setIsTextlines] = useState(true);
    const [indexPage, setIndexPage] = useState(1);
    const [state, setState] = useState(listData);
    const [visit, setVisit] = useState([]);

    useEffect(() => {
        setState(listData);
    }, [listData])

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
                <button type="button" name="" id="" className="btn btn-json"
                onClick={() => {
                    console.log(JSON.stringify(state));
                }}
                >
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

    const useWindowSize = () => {
        const isClient = typeof window === 'object';
      
        function getSize() {
          return {
            width: isClient ? window.innerWidth : undefined,
            height: isClient ? window.innerHeight : undefined
          };
        }
      
        const [windowSize, setWindowSize] = useState(getSize);
      
        useEffect(() => {
          if (!isClient) {
            return false;
          }
          
          function handleResize() {
            setWindowSize(getSize());
          }
      
          window.addEventListener('resize', handleResize);
          return () => window.removeEventListener('resize', handleResize);
        }, []); // Empty array ensures that effect is only run on mount and unmount
      
        return windowSize;
    }

    const size = useWindowSize();
    const widthWindow = size.width;

    let textCopy = '';
    state.output.pages[indexPage-1].textlines.map(textline => {
        textCopy += textline.text + '\n';
    })

    const ImagePage = () => {
        const [image] = useImage('https://d1e7nkzi0xqtmh.cloudfront.net/'+ state.output.pages[indexPage-1].url);
        return <Image image={image}
            height={
                widthWindow > 600 ?
                (700 * 595 / 842)*state.output.pages[indexPage-1].height/state.output.pages[indexPage-1].width :
                widthWindow <= 600 && widthWindow > 435
                ? (500 * 595 / 842)*state.output.pages[indexPage-1].height/state.output.pages[indexPage-1].width :
                (300 * 595 / 842)*state.output.pages[indexPage-1].height/state.output.pages[indexPage-1].width
            }
            width={widthWindow > 600 ? 700 * 595 / 842 : widthWindow <= 600 && widthWindow > 435
            ? 500 * 595 / 842 : 300 * 595 / 842 }
        />;
    };

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
                        {/* <i className="fa fa-plus" aria-hidden="true"
                            data-toggle="tooltip" data-placement="bottom" title="Zoom In"
                        ></i>
                        <i className="fa fa-minus" aria-hidden="true"
                            data-toggle="tooltip" data-placement="bottom" title="Zoom Out"
                        ></i> */}
                    </div>
                    <div className="output-left-document">
                        <Stage
                            height={
                                widthWindow > 600 ?
                                610 :
                                widthWindow <= 600 && widthWindow > 435
                                ? 410 :
                                210
                            }
                            width={widthWindow > 600 ? 700 * 595 / 842 : widthWindow <= 600 && widthWindow > 435
                            ? 500 * 595 / 842 : 300 * 595 / 842 }
                            draggable
                        >
                            <Layer>
                                <ImagePage />
                            </Layer>
                            <Layer>
                                {
                                    checked ?
                                    state.output.pages[indexPage-1].textlines.map((textline, index) => {
                                        const decide =
                                            widthWindow > 600 ?
                                            ((700 * 595 / 842)/state.output.pages[indexPage-1].width) :
                                            widthWindow <= 600 && widthWindow > 435
                                            ? ((500 * 595 / 842)/state.output.pages[indexPage-1].width) :
                                            ((300 * 595 / 842)/state.output.pages[indexPage-1].width)
                                        let x = textline.polys[0][0]* decide;
                                        let y = textline.polys[0][1]* decide;
                                        let width = (textline.polys[1][0] - textline.polys[0][0])* decide;
                                        let height = (textline.polys[3][1] - textline.polys[0][1])* decide;
                                        const handleVisitFalse = () => {
                                            visit[index] = false;
                                            setVisit([...visit]);
                                        }
                                        const handleVisitTrue = () => {
                                            visit[index] = true;
                                            setVisit([...visit]);
                                        }
                                        return (
                                            <Rect
                                                x={x}
                                                y={y}
                                                width={width}
                                                height={height}
                                                stroke="red"
                                                strokeWidth={1}
                                                key={index}
                                                onMouseMove={handleVisitTrue}
                                                onMouseOut={handleVisitFalse}
                                            />
                                        )
                                    }) : null
                                }
                            </Layer>
                            <Layer>
                                {
                                    checked ?
                                    state.output.pages[indexPage-1].textlines.map((textline, index) => {
                                        const decide =
                                            widthWindow > 600 ?
                                            ((700 * 595 / 842)/state.output.pages[indexPage-1].width) :
                                            widthWindow <= 600 && widthWindow > 435
                                            ? ((500 * 595 / 842)/state.output.pages[indexPage-1].width) :
                                            ((300 * 595 / 842)/state.output.pages[indexPage-1].width)
                                        let x = textline.polys[0][0]* decide;
                                        let y = textline.polys[0][1]* decide;
                                        let widthBox = (textline.polys[1][0] - textline.polys[0][0])* decide;
                                        let heightBox = (textline.polys[3][1] - textline.polys[0][1])* decide;
                                        let width = widthBox*13/heightBox;
                                        let height = 20;
                                        let tmp = (width-widthBox)/2;
                                        return (
                                            y < height ?
                                            <Shape
                                                key={index}
                                                sceneFunc={(context, shape) => {
                                                context.beginPath();
                                                context.moveTo(x-tmp, y+heightBox+10+height);
                                                context.lineTo(x+width-tmp, y+height+10+heightBox);
                                                context.lineTo(x+width-tmp, y+5+heightBox);
                                                context.lineTo(x+5-tmp+(width/2), y+5+heightBox);
                                                context.lineTo(x-tmp+(width/2), y+heightBox);
                                                context.lineTo(x-5-tmp+(width/2), y+5+heightBox);
                                                context.lineTo(x-tmp, y+5+heightBox);
                                                context.closePath();
                                                context.fillStrokeShape(shape);
                                                }}
                                                fill="black"
                                                visible = {visit[index] === undefined || visit[index]===false ? false : true}
                                            /> :
                                            <Shape
                                                key={index}
                                                sceneFunc={(context, shape) => {
                                                context.beginPath();
                                                context.moveTo(x-tmp, y-height-10);
                                                context.lineTo(x+width-tmp, y-height-10);
                                                context.lineTo(x+width-tmp, y-5);
                                                context.lineTo(x+5-tmp+(width/2), y-5);
                                                context.lineTo(x-tmp+(width/2), y);
                                                context.lineTo(x-5-tmp+(width/2), y-5);
                                                context.lineTo(x-tmp, y-5);
                                                context.closePath();
                                                context.fillStrokeShape(shape);
                                                }}
                                                fill="black"
                                                visible = {visit[index] === undefined || visit[index]===false ? false : true}
                                            />
                                        )
                                    }) : null
                                }
                            </Layer>
                            <Layer>
                                {
                                    checked ?
                                    state.output.pages[indexPage-1].textlines.map((textline, index) => {
                                        const decide =
                                            widthWindow > 600 ?
                                            ((700 * 595 / 842)/state.output.pages[indexPage-1].width) :
                                            widthWindow <= 600 && widthWindow > 435
                                            ? ((500 * 595 / 842)/state.output.pages[indexPage-1].width) :
                                            ((300 * 595 / 842)/state.output.pages[indexPage-1].width)
                                        let x = textline.polys[0][0]* decide;
                                        let y = textline.polys[0][1]* decide;
                                        let widthBox = (textline.polys[1][0] - textline.polys[0][0])* decide;
                                        let heightBox = (textline.polys[3][1] - textline.polys[0][1])* decide;
                                        let width = widthBox*13/heightBox;
                                        let height = 20;
                                        let tmp = (width-widthBox)/2;
                                        return (
                                            y >= height ?
                                            <Text
                                                text={textline.text}
                                                fill='white'
                                                x={x+4-tmp}
                                                y={y-height-2}
                                                fontSize={12}
                                                visible = {visit[index] === undefined || visit[index]===false ? false : true}
                                                key={index}
                                            /> :
                                            <Text
                                                text={textline.text}
                                                fill='white'
                                                x={x+4-tmp}
                                                y={y+heightBox+12}
                                                fontSize={12}
                                                visible = {visit[index] === undefined || visit[index]===false ? false : true}
                                                key={index}
                                            />
                                        )
                                    }) : null
                                }
                            </Layer>
                        </Stage>
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
                        {
                        isTextlines ?
                            <CopyToClipboard text={textCopy}>
                                <i className="fa fa-clipboard copy-to-clipboard" aria-hidden="true"
                                    data-toggle="tooltip" data-placement="bottom" title="Copy to Clipboard"
                                ></i>
                            </CopyToClipboard>
                        : null
                        }
                    </div>
                    {isTextlines ? <RowTextlines /> : <RowJson />}
                </div>

            </div>
        </div>
    )
}

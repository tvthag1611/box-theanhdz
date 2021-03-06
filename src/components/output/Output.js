import React, { useState, useEffect, useRef } from 'react'
import './Output.css'
import './Output.scss';
import Switch from "react-switch";
import { Stage, Layer, Rect, Text, Shape } from 'react-konva';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import RowJson from './components/RowJson'
import RowTextlines from './components/RowTextlines'
import ImagePage from './components/ImagePage'
import SyncLoader from "react-spinners/SyncLoader";

export default function Output({listData, isLoading}) {
    const [checked, setChecked] = useState(true);
    const [isTextlines, setIsTextlines] = useState(true);
    const [indexPage, setIndexPage] = useState(1);
    const [state, setState] = useState(listData);
    const [visit, setVisit] = useState([]);
    const [stroke, setStroke] = useState([]);
    const [color, setColor] = useState(['green']);
    useEffect(() => {
        setState(listData);
    }, [listData])

    const handleChange = checked => {
        setChecked(checked);
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

    const getTextWidth = (s, size) => {
        const text = document.createElement("span"); 
        document.body.appendChild(text); 
        text.style.font = "times new roman"; 
        text.style.fontSize = size + "px"; 
        text.style.height = 'auto'; 
        text.style.width = 'auto'; 
        text.style.position = 'absolute'; 
        text.style.whiteSpace = 'no-wrap'; 
        text.innerHTML = s;
        const width = Math.ceil(text.clientWidth);
        document.body.removeChild(text);
        return width;
    }

    const setHoverText = (index) => {
        if (index !== null) {
            color[index] = 'green'
            for (let i=0; i<color.length; i++) {
                if (i !== index) {
                    color[i] = 'red';
                }
            }
            setColor([...color]);
        }
    }

    return (
        <div className="container-fluid output-style">
            <h3 style={state.time === null ? {marginBottom: 100} : null}>OUTPUT</h3>
            { state.time !== null ?
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
                        {/* { state.output.pages[0]. */}
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
                                <ImagePage state={state} widthWindow={widthWindow} indexPage={indexPage}/>
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
                                            stroke[index] = 1;
                                            setStroke([...stroke]);
                                            setVisit([...visit]);
                                        }
                                        const handleVisitTrue = () => {
                                            visit[index] = true;
                                            stroke[index] = 2;
                                            setStroke([...stroke]);
                                            setVisit([...visit]);
                                        }
                                        return (
                                            <Rect
                                                x={x}
                                                y={y}
                                                width={width}
                                                height={height}
                                                stroke={color[index] === undefined || color[index]==='red' ? 'red' : 'green'}
                                                strokeWidth={stroke[index] === undefined || stroke[index]===1 ? 1 : 2}
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
                                        let width = getTextWidth(textline.text, 12) + 8;
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
                                        let width = getTextWidth(textline.text, 12) + 8;
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
                    {isTextlines ?
                        <RowTextlines
                            state={state}
                            indexPage={indexPage}
                            setHoverText = {setHoverText}
                        />
                    :
                        <RowJson state={state}/>}
                </div>
            </div>
            :
            <div>
                { !isLoading ? <h4>Chưa có input</h4> : null}
                <SyncLoader
                    size={30}
                    color={"#61cf70"}
                    loading={isLoading}
                />
            </div>
            }
        </div>
    )
}

import React from 'react'
import useImage from 'use-image';
import { Image } from 'react-konva';

export default function ImagePage({widthWindow, indexPage, state}) {
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
}

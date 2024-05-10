import { Button, Slider } from '@nextui-org/react';
import React from 'react';
import { Resizable } from 'react-resizable';

export const ResizableEditArea = ({ image, loading }: any) => {
    const [width, setWidth] = React.useState(500);
    const [height, setHeight] = React.useState(500);
    const [zoom, setZoom] = React.useState<any>(50);
    const [dragging, setDragging] = React.useState(false);
    const [offsetX, setOffsetX] = React.useState(0);
    const [offsetY, setOffsetY] = React.useState(0);
    const [contentOffsetX, setContentOffsetX] = React.useState(0);
    const [contentOffsetY, setContentOffsetY] = React.useState(0);

    const clampedZoom = Math.max(10, Math.min(500, zoom));

    const onResize = (event: any, { size }: any) => {
        setWidth(size.width);
        setHeight(size.height);
    };

    const handleMouseDown = (e: any) => {
        setDragging(true);
        setOffsetX(e.clientX);
        setOffsetY(e.clientY);
    };

    const handleTouchStart = (e: any) => {
        setDragging(true);
        setOffsetX(e.touches[0].clientX);
        setOffsetY(e.touches[0].clientY);
    };

    const handleMouseMove = (e: any) => {
        if (dragging) {
            const clientX = e.clientX || e.touches[0].clientX;
            const clientY = e.clientY || e.touches[0].clientY;
            const deltaX = (clientX - offsetX) / clampedZoom;
            const deltaY = (clientY - offsetY) / clampedZoom;

            const movementSpeed = 100;

            setContentOffsetX(contentOffsetX + deltaX * movementSpeed);
            setContentOffsetY(contentOffsetY + deltaY * movementSpeed);
            setOffsetX(clientX);
            setOffsetY(clientY);
        }
    };

    const handleMouseUp = () => {
        setDragging(false);
    };

    const handleTouchEnd = () => {
        setDragging(false);
    };

    const handleWheel = (e: any) => {
        if (e.deltaY < 0 && zoom < 500) {
            setZoom(zoom + 10);
        } else if (e.deltaY > 0 && zoom > 10) {
            setZoom(zoom - 10);
        }
    };

    const [isCopying, setIsCopying] = React.useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(`http://localhost:8888${image}`)
        setIsCopying(true);
        setTimeout(() => {
            setIsCopying(false);
        }, 1000);
    }

    return (
        <div
            className="edit-area"
            style={{
                cursor: dragging ? 'grabbing' : 'grab',
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleTouchEnd}
            onWheel={handleWheel}
        >
            <Resizable
                width={width}
                height={height}
                onResize={onResize}
                draggableOpts={{ grid: [25, 25] }}
            >
                <div className="content" style={{ transform: `scale(${clampedZoom / 100}) translate(${contentOffsetX}px, ${contentOffsetY}px)` }}>
                    {image === null ? <p>No Image Selected</p> : <img src={image} alt="Resizable Image" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />}
                </div>
            </Resizable>

            <div className={`${loading ? 'blur' : 'blur-fade-out'}`}></div>

            <div style={{ display: "flex", flexDirection: "row", gap: "20px", width: "100%", justifyContent: "flex-end", alignItems: "flex-end" }} className=' z-50'>
                {loading && <img style={{ width: "35px" }} src="/loading.svg" alt="Loading..." />}

                {image && <Button onClick={handleCopy} color={isCopying ? "success" : "default"} isDisabled={isCopying}>{isCopying ? "Copied!" : "Copy Link"}</Button>}

                <Slider
                    label="Zoom"
                    size="lg"
                    color="primary"
                    value={zoom}
                    onChange={setZoom}
                    className="max-w-40"
                    maxValue={500}
                    minValue={10}
                    step={1}
                />
            </div>
        </div>
    );
};

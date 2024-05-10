"use client"

import { ResizableEditArea } from "@/components/EditArea";
import { Gallery } from "@/components/Gallery";
import { TextArea } from "@/components/TextArea";
import "@/module.css/page.css";
import { Button, Select, SelectItem, Slider } from "@nextui-org/react";
import React, { useEffect } from "react";

export default function Home() {
  const [width, setWidth] = React.useState<any>(500);
  const [height, setHeight] = React.useState<any>(500);
  const [res, setRes] = React.useState<any>("square");
  const [quality, setQuality] = React.useState<any>(50);
  const [fit, setFit] = React.useState<any>("cover");
  const [position, setPosition] = React.useState<any>("center");
  const [format, setFormat] = React.useState<any>("png");
  const [loading, setLoading] = React.useState(false);

  const sizes = [
    { label: "Contain", value: "contain" },
    { label: "Cover", value: "cover" },
    { label: "Fill", value: "fill" },
  ]

  const formats = [
    { label: "AVIF", value: "avif" },
    { label: "WEBP", value: "webp" },
    { label: "JPG", value: "jpg" },
    { label: "PNG", value: "png" },
    { label: "GIF", value: "gif" }
  ]

  const positions = [
    { label: "Center", value: "center" },
    { label: "Top", value: "top" },
    { label: "Bottom", value: "bottom" },
    { label: "Left", value: "left" },
    { label: "Right", value: "right" },
  ]

  const resolutions = [
    { label: "Square", value: "square" },
    { label: "Landscape", value: "landscape" },
    { label: "Portrait", value: "portrait" }
  ]

  const [value, setValue] = React.useState<any>(quality);
  const [file, setFile] = React.useState<any>(null);

  const generateImageUrl = () => {
    return `/.netlify/images?url=${file}&fit=${fit}&w=${width}&h=${height}&position=${position}&q=${quality}&fm=${format}`;
  }

  const handleExport = () => {
    const imageUrl = generateImageUrl();
    const linkRef = React.useRef<HTMLAnchorElement>(null);

    React.useEffect(() => {
      if (linkRef.current) {
        linkRef.current.href = imageUrl;
        linkRef.current.download = 'edited_image';
        linkRef.current.click();
      }
    }, [imageUrl, linkRef]);

    return (
      <a ref={linkRef} style={{ display: 'none' }} />
    );
  }

  React.useEffect(() => {
    if (res === "square") {
      setWidth(1024);
      setHeight(1024);
    } else if (res === "landscape") {
      setWidth(1024);
      setHeight(768);
    } else if (res === "portrait") {
      setWidth(768);
      setHeight(1024);
    }
  }, [res]);

  const imageUrl = generateImageUrl();
  const [prevImageUrl, setPrevImageUrl] = React.useState(imageUrl);

  React.useEffect(() => {
    if (file) {
      if (prevImageUrl !== imageUrl) {
        setLoading(true);
        setPrevImageUrl(imageUrl);
      }
    }
  }, [imageUrl]);

  React.useEffect(() => {
    if (file) {
      const img = new Image();
      img.onload = () => {
        setLoading(false);
      };

      img.src = imageUrl;
    }
  }, [imageUrl]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }

    setLoading(true);

    const file = event.target.files[0];

    try {
      const response = await fetch('/api/file/upload', {
        method: 'POST',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();

      setFile(responseData.url);
      setLoading(false);

      const setCookieHeader = response.headers.get('Set-Cookie');
      if (setCookieHeader && typeof window !== 'undefined') {
        const cookieValue = setCookieHeader.split(';')[0];
        document.cookie = cookieValue;
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setLoading(false);
    }
  }

  return (
    <>
      <div className="ground">
        <div className="side-menu">
          <div className="setting">
            <img src="/logo.svg" style={{ width: "120px", margin: "auto" }} />
          </div>
          <div className="setting" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
            <label className="file-input-label">
              {loading && <img style={{ width: "20px" }} src="/loading.svg" alt="Loading..." />}
              Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  if (event.target.files && event.target.files[0].size > 6291456) {
                    alert("File size must be not more than 6MB.");
                    return;
                  }
                  handleFileUpload(event);
                }}
                style={{ display: "none" }}
              />
            </label>

            <Gallery setFile={setFile} />
          </div>

          <div className="setting">
            <TextArea label={"Width"} setNumber={setWidth} placeholder={width} loading={loading || file === null} />
          </div>

          <div className="setting">
            <TextArea label={"Height"} setNumber={setHeight} placeholder={height} loading={loading || file === null} />
          </div>

          <p style={{ margin: "auto" }}>OR</p>

          <div className="setting">
            <Select
              items={resolutions}
              label="Resolution"
              className="max-w-full"
              defaultSelectedKeys={["square"]}
              onChange={(e) => setRes(e.target.value)}
              isDisabled={loading || file === null}
            >
              {(resolution) => <SelectItem key={resolution.value}>{resolution.label}</SelectItem>}
            </Select>
          </div>

          <div className="setting">
            <Slider
              label="Quality"
              size="md"
              color="primary"
              value={value}
              onChange={setValue}
              onChangeEnd={setQuality}
              className="max-w-full"
              maxValue={100}
              minValue={10}
              step={10}
              isDisabled={loading || file === null}
            />
          </div>

          <div className="setting">
            <Select
              items={sizes}
              label="Fit"
              className="max-w-full"
              defaultSelectedKeys={["cover"]}
              onChange={(e) => setFit(e.target.value)}
              isDisabled={loading || file === null}
            >
              {(size) => <SelectItem key={size.value}>{size.label}</SelectItem>}
            </Select>
          </div>

          <div className="setting">
            <Select
              items={positions}
              label="Position"
              className="max-w-full"
              defaultSelectedKeys={["center"]}
              onChange={(e) => setPosition(e.target.value)}
              isDisabled={loading || file === null}
            >
              {(position) => <SelectItem key={position.value}>{position.label}</SelectItem>}
            </Select>
          </div>

          <div className="setting">
            <Select
              items={formats}
              label="Format"
              className="max-w-full"
              defaultSelectedKeys={["png"]}
              onChange={(e) => setFormat(e.target.value)}
              isDisabled={loading || file === null}
            >
              {(format) => <SelectItem key={format.value}>{format.label}</SelectItem>}
            </Select>
          </div>

          <div className="setting">
            <Button size="lg" color="primary" className="w-full" onClick={handleExport} isDisabled={loading || file === null}>Export</Button>
          </div>

        </div>

        <ResizableEditArea image={file === null ? null : generateImageUrl()} loading={loading} />
      </div>
    </>
  )
}
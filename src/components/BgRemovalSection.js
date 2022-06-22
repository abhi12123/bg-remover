import React, { useRef, useState } from "react";
import canvasScreenshot from "canvas-screenshot";

export default function BgRemovalSection() {
  const canvasElementRef = useRef();
  const videoElementRef = useRef();

  const handleLoadEditor = () => {
      //
  };

  const handleCaptureCanvas = async () => {
    const options = {
      useBlob: true,
      download: false,
    };
    const blob = await canvasScreenshot(canvasElementRef.current, options);
    console.log(blob);
  };

  const handleStartCamera = () => {
    function onResults(results) {
      const canvasCtx = canvasElementRef.current.getContext("2d");
      canvasCtx.save();
      canvasCtx.clearRect(
        0,
        0,
        canvasElementRef.current.width,
        canvasElementRef.current.height
      );
      canvasCtx.drawImage(
        results.segmentationMask,
        0,
        0,
        canvasElementRef.current.width,
        canvasElementRef.current.height
      );
      canvasCtx.globalCompositeOperation = "source-in";
      canvasCtx.drawImage(
        results.image,
        0,
        0,
        canvasElementRef.current.width,
        canvasElementRef.current.height
      );

      canvasCtx.restore();
    }

    const selfieSegmentation = new window.SelfieSegmentation({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`;
      },
    });

    selfieSegmentation.setOptions({
      modelSelection: 1,
    });
    selfieSegmentation.onResults(onResults);

    const camera = new window.Camera(videoElementRef.current, {
      onFrame: async () => {
        await selfieSegmentation.send({ image: videoElementRef.current });
      },
      width: 690,
      height: 950,
    });

    camera.start();
  };

  return (
    <div>
      <div className="container">
        <video ref={videoElementRef} className="input_video"></video>
        <canvas
          ref={canvasElementRef}
          className="output_canvas"
          width="345px"
          height="475px"
        ></canvas>
      </div>
      <button onClick={() => handleStartCamera()}>Start</button>
      <button onClick={() => handleCaptureCanvas()}>Capture</button>
      <button onClick={() => handleLoadEditor()}>Load Editor</button>
    </div>
  );
}

import React, { useEffect, useRef, useState } from "react";

export default function UploadImage({
  uploadedFile,
  setUploadedFile,
  originalFileData,
  setOriginalFileData,
}) {
  const originalImageRef = useRef();
  useEffect(() => {
    if (originalImageRef.current) {
      setOriginalFileData({
        ...originalFileData,
        width: originalImageRef.current.naturalWidth,
        height: originalImageRef.current.naturalHeight,
      });
    }
  }, [
    originalImageRef?.current?.naturalWidth,
    originalImageRef?.current?.naturalHeight,
  ]);
  return (
    <article>
      <div className="w3-card w3-margin w3-padding w3-center">
        <h3 className="">Upload Image</h3>
        <input
          onChange={(e) =>
            setUploadedFile(URL.createObjectURL(e.target.files[0]))
          }
          type="file"
          accept="image/*"
        ></input>
        {uploadedFile && (
          <div>
            <img
              src={uploadedFile}
              className="w3-card"
              style={{ height: "200px" }}
              ref={originalImageRef}
            />
            <ul>
              {Object.keys(originalFileData).map((key, index) => {
                return (
                  <li
                    key={index}
                    style={{ width: "fit-content", margin: "auto" }}
                  >
                    {key}:{originalFileData[key]}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}

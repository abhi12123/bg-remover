import React, { useEffect, useRef, useState } from "react";

export default function UploadImage({
  uploadedFile,
  setUploadedFile,
  uploadedFileData,
  setUploadedFileData,
}) {
  const originalImageRef = useRef();
  useEffect(() => {
    if (originalImageRef.current) {
      setUploadedFileData({
        ...uploadedFileData,
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
          onChange={(e) => {
            setUploadedFile(e.target.files[0]);
          }}
          type="file"
          accept="image/*"
        ></input>
        {uploadedFile && (
          <div>
            <img
              src={URL.createObjectURL(uploadedFile)}
              className="w3-card"
              style={{ height: "200px" }}
              ref={originalImageRef}
            />
            <ul>
              {uploadedFileData && Object.keys(uploadedFileData).map((key, index) => {
                return (
                  <li
                    key={index}
                    style={{ width: "fit-content", margin: "auto" }}
                  >
                    {key}:{uploadedFileData[key]}
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

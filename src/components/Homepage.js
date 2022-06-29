import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getDimensions } from "../helper/helper";
import EditedImage from "./EditedImage";
import UploadImage from "./UploadImage";

export default function Homepage() {
  const [uploadedFile, setUploadedFile] = useState(undefined);
  const [uploadedFileData, setUploadedFileData] = useState(undefined);

  const count = useSelector((state) => state.image.originalFile);
  console.log(count)

  useEffect(() => {
    if (!uploadedFile) return;
    console.log(uploadedFile);
    setUploadedFileData({
      ...uploadedFileData,
      size: `${uploadedFile.size * 0.001} KB`,
    });
  }, [uploadedFile]);
  
  return (
    <div>
      <h1 className="w3-center">Application Photo Editor</h1>
      <UploadImage
        uploadedFile={uploadedFile}

        
        setUploadedFile={setUploadedFile}
        uploadedFileData={uploadedFileData}
        setUploadedFileData={setUploadedFileData}
      />
      {uploadedFile && (
        <EditedImage
          uploadedFile={uploadedFile}
          uploadedFileData={uploadedFileData}
        />
      )}
    </div>
  );
}

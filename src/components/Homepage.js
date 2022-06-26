import React, { useEffect, useState } from "react";
import { getDimensions, getSize } from "../helper/helper";
import EditedImage from "./EditedImage";
import UploadImage from "./UploadImage";

export default function Homepage() {
  const [uploadedFile, setUploadedFile] = useState(undefined);
  const [originalFileData, setOriginalFileData] = useState(undefined);

  useEffect(() => {
    getSize(uploadedFile).then((size)=>{
        setOriginalFileData({...originalFileData,size:`${size} KB`})
    })
  }, [uploadedFile]);

  console.log(originalFileData)
  return (
    <div>
      <h1 className="w3-center">Application Photo Editor</h1>
      <UploadImage
        uploadedFile={uploadedFile}
        setUploadedFile={setUploadedFile}
        originalFileData={originalFileData}
        setOriginalFileData={setOriginalFileData}
      />
      {uploadedFile && <EditedImage defaultEditedFile={uploadedFile} defaultEditedFileData={originalFileData}/>}
    </div>
  );
}

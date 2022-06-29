import React, { useEffect, useState } from "react";
import {  } from "../helper/helper";
import Reducer from "./tools/Reducer";

export default function EditedImage({
  uploadedFile,
  uploadedFileData,
}) {
  const [editedFile, setEditedFile] = useState(uploadedFile);
  const [editedFileData, setEditedFileData] = useState(uploadedFileData);

  useEffect(() => {
    setEditedFileData(uploadedFileData);
  }, [uploadedFileData]);

  useEffect(()=>{
    // getSize(editedFile).then((size)=>{
    //     console.log(size)
    // })
  },[editedFile])

  return (
    <>
      <div className="w3-card w3-margin w3-padding">
        <h3 className="w3-center">Edited Image</h3>
        <div className="w3-cell-row">
          <div className="w3-col l4 m4 s12">
            <img
              src={editedFile}
              className="w3-card"
              style={{ height: "200px" }}
            />
            <ul>
              {Object.keys(editedFileData).map((key, index) => {
                return (
                  <li
                    key={index}
                    style={{ width: "fit-content", margin: "auto" }}
                  >
                    {key}:{editedFileData[key]}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="w3-col l4 m4 s12">
            <Reducer uploadedFile={uploadedFile} editedFile={editedFile} setEditedFile={setEditedFile}/>
          </div>
          <div className="w3-col l4 m4 s12">x</div>
        </div>
      </div>
      <div className='w3-center'>
        <button className="w3-green w3-button">Download</button>
      </div>
    </>
  );
}

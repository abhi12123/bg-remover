import canvasScreenshot from "canvas-screenshot";
import React, { Component } from "react";
import Resizer from "react-image-file-resizer";

class Reducer extends Component {
  constructor(props) {
    super(props);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.state = {
      newImage: "",
    };
  }

  async handleCaptureCanvas(){
    const options = {
      useBlob: true,
      download: true,
    };
    const blob = await canvasScreenshot(document.getElementById('canvas-element'), options);
    console.log(blob);
  };

  async fileChangedHandler(event) {
    var fileInput = false;
    if (event.target.files[0]) {
      fileInput = true;
    }
    if (fileInput) {
      try {
        await Resizer.imageFileResizer(
          event.target.files[0],
          300,
          300,
          "JPEG",
          100,
          0,
          (uri) => {
            this.setState({ newImage: uri });
          },
          "base64",
          200,
          200
        );
        console.log("painting", document.getElementById("new-image"));
        document.getElementById("new-image").onload = () => {
          const ctx = document
            .getElementById("canvas-element")
            .getContext("2d");
          ctx.drawImage(
            document.getElementById("new-image"),
            0,
            0,
            400,
            300,
            0,
            0,
            300,
            500
          );
          document.getElementById('canvas-element').width = 300;
          document.getElementById('canvas-element').height = 500;
        };
      } catch (err) {
        console.log(err);
      }
    }
  }

  render() {
    return (
      <div className="reducer">
        <input type="file" onChange={this.fileChangedHandler} />
        <img src={this.state.newImage} alt="" id="new-image" />
        <canvas
          style={{ border: "1px solid black" }}
          width="500"
          height="500"
          id="canvas-element"
        ></canvas>
      </div>
    );
  }
}

export default Reducer;

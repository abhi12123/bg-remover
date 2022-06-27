import canvasScreenshot from "canvas-screenshot";
import React, { Component } from "react";
import Resizer from "react-image-file-resizer";
import { getBlob } from "../../helper/helper";

class Reducer extends Component {
  constructor(props) {
    super(props);
    this.handleUpdateFile = this.handleUpdateFile.bind(this);
    this.handleUpdateValue = this.handleUpdateValue.bind(this);
    this.state = {
      newImage: "",
      updatedValues: {},
    };
  }

  async handleUpdateFile() {
    const { editedFile, setEditedFile } = this.props;
    const { format, quality } = this.state.updatedValues;
    if (!format || !quality || !editedFile) {
      return;
    }
    try {
      await Resizer.imageFileResizer(
        await getBlob(editedFile),
        300,
        300,
        format,
        quality,
        0,
        (uri) => {
          this.setState({ newImage: uri });
          setEditedFile(uri);
        },
        "base64",
        200,
        200
      );
    } catch (err) {
      console.log(err);
    }
  }

  handleUpdateValue(e) {
    console.log(e.target.value, e.target.name)
    this.setState({
      updatedValues: {
        ...this.state.updatedValues,
        [e.target.name]: e.target.value,
      },
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.updatedValues != this.state.updatedValues) {
      this.handleUpdateFile();
    }
  }

  render() {
    return (
      <div className="reducer">
        <form>
          <div className="w3-border w3-padding w3-round">
            <label for="format">Format</label>
            <select
              id="format"
              className="w3-select"
              name="format"
              onChange={this.handleUpdateValue}
            >
              <option value="JPEG" selected>
                JPEG
              </option>
              <option value="PNG">PNG</option>
            </select>
          </div>
          <div className="w3-border w3-padding w3-round w3-margin-top">
            <label for="quality">Quality</label>
            <input
              className="w3-input"
              id="quality"
              type="range"
              min="0"
              max="100"
              name="quality"
              onChange={this.handleUpdateValue}
            ></input>
            <output>{this.state.updatedValues.quality}</output>
          </div>
          <div className="w3-border w3-padding w3-round w3-margin-top">
            <label for="dimensions">Dimensions (in px)</label>
            <div className="w3-row">
              <div className="w3-half w3-padding-small">
                <label>Width</label>
                <input
                  type="number"
                  className="w3-input w3-border"
                  name="width"
                  onChange={this.handleUpdateValue}
                />
              </div>
              <div className="w3-half w3-padding-small">
                <label>Height</label>
                <input
                  type="number"
                  className="w3-input w3-border"
                  name="height"
                  onChange={this.handleUpdateValue}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Reducer;

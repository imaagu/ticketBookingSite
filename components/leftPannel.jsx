import React, { Component } from "react";
import leftImg from "../images/left.jpg";
class LeftPannel extends Component {
  state = {};

  handleChange = (e) => {
    const { currentTarget: input } = e;
    const { namesCheckbox, namesCheckbox1, namesCheckbox2 } = this.props;

    if (input.type === "checkbox" && input.name === "language") {
      let cb = namesCheckbox.find((n1) => n1.name === input.id);

      if (cb) cb.isSelected = input.checked;
    }
    if (input.type === "checkbox" && input.name === "format") {
      let cb2 = namesCheckbox1.find((n1) => n1.name === input.id);
      if (cb2) cb2.isSelected = input.checked;
    }

    if (input.type === "checkbox" && input.name === "genre") {
      let cb2 = namesCheckbox2.find((n1) => n1.name === input.id);
      if (cb2) cb2.isSelected = input.checked;
    }
    this.props.onOptionChange(namesCheckbox, namesCheckbox1, namesCheckbox2);
  };
  render() {
    const { namesCheckbox, namesCheckbox1, namesCheckbox2 } = this.props;

    return (
      <React.Fragment>
        <div className="row d-none d-lg-block">
          <div
            className="col-10 text-center ml-4"
            style={{ backgroundColor: "white", padding: 5 }}
          >
            <img src={leftImg} className="img-fluid" alt="leftImg" />
          </div>
        </div>
        <br />
        <br />
        <div
          className="row ml-3 mr-2 pt-2 pb-2 d-none d-lg-block"
          style={{ backgroundColor: "white", borderRadius: 3 }}
        >
          <div className="col text-primary">
            <i className="fa fa-chevron-up"></i>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Select Language
          </div>
        </div>
        <div>
          {namesCheckbox.map((n1) => (
            <div
              key={n1.name}
              className="form-check ml-3 mr-2 pd-2 d-none d-lg-block"
              style={{ backgroundColor: "white", borderRadius: 3 }}
            >
              <label className="form-check-label ml-3" htmlFor={n1.name}>
                <input
                  className="form-check-input ng-valid ng-dirty ng-touched"
                  name="language"
                  type="checkbox"
                  id={n1.name}
                  onChange={this.handleChange}
                  checked={n1.isSelected}
                />{" "}
                {n1.name}{" "}
              </label>
            </div>
          ))}
        </div>
        <br />
        <div
          className="row ml-3 mr-2 pt-2 pb-2 d-none d-lg-block"
          style={{ backgroundColor: "white", borderRadius: 3 }}
        >
          <div className="col text-primary">
            <i className="fa fa-chevron-up"></i>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Format
          </div>
        </div>
        <div>
          {namesCheckbox1.map((n1) => (
            <div
              key={n1.name}
              className="form-check ml-3 mr-2 pd-2 d-none d-lg-block"
              style={{ backgroundColor: "white", borderRadius: 3 }}
            >
              <label className="form-check-label ml-3" htmlFor={n1.name}>
                <input
                  className="form-check-input ng-valid ng-dirty ng-touched"
                  name="format"
                  type="checkbox"
                  id={n1.name}
                  onChange={this.handleChange}
                  //       checked={n1.isSelected}
                />{" "}
                {n1.name}{" "}
              </label>
            </div>
          ))}
        </div>
        <br />
        <div
          className="row ml-3 mr-2 pt-2 pb-2 d-none d-lg-block"
          style={{ backgroundColor: "white", borderRadius: 3 }}
        >
          <div className="col text-primary">
            <i className="fa fa-chevron-up"></i>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Genre
          </div>
        </div>
        <div>
          {namesCheckbox2.map((n1) => (
            <div
              key={n1.name}
              className="form-check ml-3 mr-2 pd-2 d-none d-lg-block"
              style={{ backgroundColor: "white", borderRadius: 3 }}
            >
              <label className="form-check-label ml-3" htmlFor={n1.name}>
                <input
                  className="form-check-input ng-valid ng-dirty ng-touched"
                  name="genre"
                  type="checkbox"
                  id={n1.name}
                  onChange={this.handleChange}
                  checked={n1.isSelected}
                />{" "}
                {n1.name}{" "}
              </label>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default LeftPannel;

import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.svg";
import "./cssfiles/navbar.css";

class NavBar extends Component {
  state = {
    value: "",
    cities: ["NCR", "Ahmedabad", "Banglore", "Chennai", "Mumbai", "Hyderabad"],
  };
  handleChange = (e) => {
    const { currentTarget: input } = e;
    this.setState({ value: input.value });
  };

  handleClick = (e) => {
    // console.log(e.key);
    if (e.key === "Enter") {
      window.location = "/home/NCR?q=" + this.state.value;
    }
  };

  render() {
    let { path } = this.props;
    path = path ? path : "";
    let splitpath = path.split("/");
    return (
      <nav>
        <div className="row bg-dark text-light">
          <div className="col-lg-2 col-4 mt-1 ml-1">
            <Link className="logo nav-item" to="/home/NCR" title="BookMyShow">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <div className="col-lg-4 col-4 mt-1 text-right">
            <form
              className="form-inline ng-untouched ng-pristine ng-valid"
              noValidate
              role="form"
            >
              <input
                aria-label="q"
                className="form-control form-control-sm fas ng-untouched ng-pristine ng-valid"
                id="q"
                value={this.state.value}
                name="q"
                placeholder="&#xf002;  &nbsp; Search for Movies"
                style={{
                  fontStyle: "normal",
                  textDecoration: "bold",
                  fontFamily: "Arial, FontAwesome",
                }}
                type="text"
                onChange={this.handleChange}
                onKeyPress={this.handleClick}
              />
            </form>
          </div>
          <div className="col-2 mt-1 text-center d-none d-md-block">
            <div className="dropdown">
              <div className="dropbtn">
                {splitpath[2]}{" "}
                <i
                  className="fa fa-chevron-down"
                  id="onhover"
                  style={{ fontSize: 10, color: "lightgrey" }}
                ></i>{" "}
              </div>
              <div className="dropdown-content">
                {this.state.cities.map((city) => (
                  <div key={city}>
                    <Link to={city}>{city}</Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-1 mt-3 text-right d-none d-md-block">
            <a>English</a>
          </div>
          <div className="col-1 mt-3 text-right d-none d-md-block">
            <button className="btn btn-sm btn-outline-light">Sign In</button>
          </div>
        </div>
        <div className="row bg-dark text-light" style={{ fontSize: 14 }}>
          <div className="col-2 text-center ">Movies</div>
          <div className="col-2 text-center">Events</div>
          <div className="col-lg-2 col-2 text-center">Plays</div>
          <div className="col-2 text-center">Activities</div>
          <div className="col-2 text-center">Fanhood</div>
        </div>
      </nav>
    );
  }
}

export default NavBar;

import React, { Component } from "react";
import axios from "axios";
import ".//cssfiles/navbar.css";
import ticket from "../images/ticket.svg";
import food from "../images/food.svg";
import rightImg from "../images/bookmovieRight.jpg";
import NavBar from "./navBar";
import Like from "./like";

class BookMovie extends Component {
  state = {
    movieInfo: {},
    index: 0,
    price: ["0-100 ", "101-200", "201-300", "More than 300"],
    filterprice: "",
    showtime: ["Morning", "Afternoon", "Evening", "Night"],
    filterShowtime: "",
    currdate: "",
  };

  async componentDidMount() {
    let dateSplit = new Date().toLocaleString().split("/");
    let date = dateSplit[1];
    let splitpath = this.props.location.pathname.split("/");
    let id = splitpath[splitpath.length - 1];
    let location = splitpath[splitpath.length - 2];
    console.log(location, id);
    const url =
      "https://us-central1-bkyow-22da6.cloudfunctions.net/app/movies/" +
      location +
      "/" +
      id;
    const { data } = await axios.get(url);
    console.log(data);
    this.setState({ movieInfo: data, currdate: date });
  }

  handleDate = (d) => {
    this.setState({ currdate: d });
    let dateSplit = new Date().toLocaleString().split("/");
    let date = dateSplit[1];
    if (d === +date) this.setState({ index: 0 });
    if (d === +date + 1) this.setState({ index: 1 });
    if (d === +date + 2) this.setState({ index: 2 });
  };

  makeCbStructure(array, parameter) {
    let temp = array.map((n1) => ({
      name: n1,
      isSelected: false,
    }));
    let cnames = parameter.split(",");
    for (let i = 0; i < cnames.length; i++) {
      let obj = temp.find((n1) => n1.name === cnames[i]);
      if (obj) obj.isSelected = true;
    }
    return temp;
  }

  handleChange = (e) => {
    const { currentTarget: input } = e;
    let { price, filterShowtime, filterprice, showtime } = this.state;
    let checkbox1 = this.makeCbStructure(price, filterprice);
    let checkbox2 = this.makeCbStructure(showtime, filterShowtime);

    if (input.type === "checkbox" && input.name === "price") {
      let cb = checkbox1.find((n1) => n1.name === input.id);

      if (cb) cb.isSelected = input.checked;
    }
    if (input.type === "checkbox" && input.name === "time") {
      let cb2 = checkbox2.find((n1) => n1.name === input.id);
      if (cb2) cb2.isSelected = input.checked;
    }

    this.setValues(checkbox1, checkbox2);
  };

  setValues(checkbox1, checkbox2) {
    let filterNames = checkbox1.filter((n1) => n1.isSelected);
    let arrayNames = filterNames.map((n1) => n1.name);
    let filterprice = arrayNames.join(",");
    let filterNames2 = checkbox2.filter((n1) => n1.isSelected);
    let arrayNames2 = filterNames2.map((n1) => n1.name);

    let filterShowtime = arrayNames2.join(",");

    this.setState({ filterprice, filterShowtime });
  }

  getArray(array) {
    console.log(array);
    let finalArray = [];
    // let data1 = array;
    // let data = array;
    //let pArray = [];

    let { filterShowtime, filterprice } = this.state;
    if (filterShowtime === "" && filterprice === "") return array;
    else {
      if (filterprice !== "") {
        let splitprice = filterprice.split(",");
        for (var i = 0; i < splitprice.length; i++) {
          if (splitprice[i] === "More than 300") {
            let array2 = array.map((n1) => ({
              name: n1.name,
              timings: n1.timings.filter((f) => f.price > 250),
            }));
            finalArray = [...finalArray, ...array2];
          } else {
            let value = splitprice[i].split("-");
            let array2 = array.map((n1) => ({
              name: n1.name,
              timings: n1.timings.filter(
                (f) => f.price >= value[0] && f.price <= value[1]
              ),
            }));
            finalArray = [...finalArray, ...array2];
          }
        }

        // console.log(finalArray);
        let arraymain = [];
        for (var i = 0; i < finalArray.length; i++) {
          let p = finalArray[i];
          let index = arraymain.findIndex((n) => n.name === p.name);
          if (index === -1) {
            arraymain.push(p);
          } else {
            arraymain[index].timings = [
              ...arraymain[index].timings,
              ...p.timings,
            ];
          }
        }
        finalArray = arraymain;
        console.log(arraymain);
        return arraymain;
      }
    }

    return array;
  }

  handleSeat = (i, j) => {
    let z = this.state.index;
    let currdate = this.state.currdate;
    let dateSplit = new Date().toLocaleString().split("/");
    let date = dateSplit[1];
    console.log(i, j, z, date);

    window.location =
      this.props.location.pathname +
      "/buyTicket/" +
      i +
      "/" +
      j +
      "/" +
      z +
      "?time=" +
      currdate +
      "%" +
      date +
      "May";
  };

  render() {
    let {
      movieInfo: movie,
      filterShowtime,
      showtime,
      filterprice,
      price,
    } = this.state;
    let checkbox1 = this.makeCbStructure(price, filterprice);
    let checkbox2 = this.makeCbStructure(showtime, filterShowtime);

    let genre = movie.genre;
    genre = genre ? genre : "";
    let genreSplit = genre.split(",");
    let dateSplit = new Date().toLocaleString().split("/");
    let date = dateSplit[1];
    let showTiming = movie.showTiming;
    showTiming = showTiming ? showTiming : "";

    let show = this.getArray(showTiming[this.state.index]);
    return (
      <div className="container-fluid">
        <NavBar path={this.props.location.pathname} />
        <div className="row bg-secondary text-white pt-4">
          <div className="col">
            <h3>{movie.title}</h3>
          </div>
        </div>
        <div className="row bg-secondary text-white">
          <div className="col">
            <i className=" fa fa-heart" style={{ color: "#d6181f" }}>
              {" "}
            </i>
            &nbsp;
            <span style={{ fontSize: 20 }}>
              <strong>{movie.rating}</strong>
            </span>
            &nbsp;&nbsp;
            {genreSplit.map((genre) => (
              <React.Fragment>
                <span className="circle text-light">{genre}</span>
                &nbsp;
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="row bg-secondary text-white">
          <div className="col">
            <span style={{ fontSize: 10 }}>{movie.votes} votes</span>
          </div>
        </div>
        <div className="row bg-light pt-2 pb-2">
          <div className="col-lg-5">
            <button
              className="btn btn-sm btn-light m-1"
              id="buttoncss-true"
              onClick={() => this.handleDate(date)}
            >
              <b>{date} TODAY </b>
            </button>
            <button
              className="btn btn-sm btn-light m-1"
              id="buttoncss-true"
              onClick={() => this.handleDate(+date + 1)}
            >
              <b>{+date + 1} May</b>
            </button>
            <button
              className="btn btn-sm btn-light m-1"
              id="buttoncss-true"
              onClick={() => this.handleDate(+date + 2)}
            >
              <b>{+date + 2} May</b>
            </button>
          </div>
          <div className="col-lg-2 border-right d-none d-lg-block">
            <div className="dropdown">
              <div className="dropbtn">
                Filter Price &nbsp;{" "}
                <span>
                  <i
                    className="fa fa-chevron-down"
                    id="onhover"
                    style={{ fontSize: 10, color: "lightgrey" }}
                  ></i>
                </span>{" "}
              </div>
              <div className="dropdown-content">
                {checkbox1.map((item, index) => (
                  <div key={index}>
                    <div className="checkbox ml-1">
                      <label>
                        <input
                          name="price"
                          id={item.name}
                          type="checkbox"
                          value="item.isSelected"
                          onChange={this.handleChange}
                          className="ng-valid ng-dirty ng-touched"
                        />
                        &nbsp; {item.name}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-lg-2 border-right d-none d-lg-block">
            <div className="dropdown">
              <div className="dropbtn">
                Filter Showtime &nbsp;{" "}
                <span>
                  <i
                    className="fa fa-chevron-down"
                    id="onhover"
                    style={{ fontSize: 10, color: "lightgrey" }}
                  ></i>
                </span>{" "}
              </div>
              <div className="dropdown-content">
                {checkbox2.map((item, index) => (
                  <div key={index}>
                    <div className="checkbox ml-1">
                      <label>
                        <input
                          name="time"
                          id={item.name}
                          type="checkbox"
                          onChange={this.handleChange}
                          value="item.isSelected"
                          className="ng-valid ng-dirty ng-touched"
                        />
                        &nbsp; {item.name}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-9 col-12">
            <div
              className="row"
              style={{ backgroundColor: "rgb(245,191,169)" }}
            >
              <div className="col-lg-6 col-6 border-right">
                <div className="row">
                  <span className="logo nav-item">
                    <img src={ticket} alt="ticket" />
                  </span>
                </div>
                <div className="row" style={{ fontSize: 10 }}>
                  <span>M-Ticket Available</span>
                </div>
              </div>
              <div className="col-lg-6 col-6 border-left">
                <div className="row">
                  <span className="logo nav-item">
                    <img src={food} alt="food" />
                  </span>
                </div>
                <div className="row">
                  <span style={{ fontSize: 10 }}>Food Available</span>
                </div>
              </div>
            </div>
            <div>
              {show === undefined ? (
                ""
              ) : (
                <React.Fragment>
                  {show.map((item, index) => (
                    <div key={index} className="row border-bottom-1 pt-1">
                      <div className="col-lg-1 col-2">
                        <a id="heartcss-false">
                          <i className="fa fa-heart"></i>
                        </a>
                      </div>
                      <div className="col-lg-3 col-9" style={{ fontSize: 12 }}>
                        <div className="row">
                          <strong>{item.name}</strong>
                        </div>
                        <div className="row">
                          <span
                            className="logo nav-item"
                            style={{ fontSize: 10, size: 2 }}
                          >
                            <img src={ticket} style={{ height: 20 }} />
                            M-Ticket
                          </span>
                          &nbsp;&nbsp;
                          <span
                            className="logo nav-item"
                            style={{ fontSize: 10, size: 2 }}
                          >
                            <img src={food} style={{ height: 20 }} />
                            F&B
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        {item.timings.map((t, ind) => (
                          <button
                            onClick={() => this.handleSeat(index, ind)}
                            key={ind}
                            className="btn btn-outline-secondary text-primary btn-sm boeder-muted m-1"
                            routerlinkactive="router-link-active"
                            style={{
                              marginBottom: 12,
                              maxHeight: 40,
                              fontSize: 12,
                            }}
                          >
                            <span data-toggle="tooltip" title={t.price}>
                              {t.name}
                            </span>
                          </button>
                        ))}
                        <ul style={{ fontSize: 12 }}>
                          <li>Cancellation available</li>
                        </ul>
                      </div>
                    </div>
                  ))}
                </React.Fragment>
              )}
            </div>
          </div>
          <div className="col-2 mt-1 d-none d-lg-block">
            <img className="img-fluid" src={rightImg} />
          </div>
        </div>
      </div>
    );
  }
}

export default BookMovie;

import React, { Component } from "react";
import axios from "axios";
import Movies from "./movies";
import screne1 from "../images/screen.svg";
import { Redirect } from "react-router-dom";

//import Payment from "./payment";

class Seat extends Component {
  state = {
    data: [],
    title: "",
    hall: {},
    date: "",
    time: "",
    price: "",
    i: -1,
    j: -1,
    z: -1,
    pri250: {},
    pri420: {},
    index: 0,
    totalPrice: 0,
    totalticket: 0,
    tickets: [],
  };
  async componentDidMount() {
    let splitlocation = this.props.location.pathname.split("/");
    let location = splitlocation[2];
    let movieId = splitlocation[3];
    let i = splitlocation[5];
    let j = splitlocation[6];
    let z = splitlocation[7];
    const { data } = await axios.get(
      "https://us-central1-bkyow-22da6.cloudfunctions.net/app/seats"
    );
    const url =
      "https://us-central1-bkyow-22da6.cloudfunctions.net/app/movies/" +
      location +
      "/" +
      movieId;
    const { data: movie } = await axios.get(url);
    let d1 = data[0].seats.filter((n) => n.price === 250);
    let d2 = data[0].seats.filter((n) => n.price === 420);
    let curr = this.props.location.search.substring(6, 8);
    let actualdate = this.props.location.search.substring(9, 11);
    let date = (curr = actualdate ? curr + " TODAY" : curr);
    console.log(d2);
    this.setState({
      data: data,
      title: movie.title,
      hall: movie.showTiming[z][i],
      time: movie.showTiming[z][i].timings[j].name,
      price: movie.showTiming[z][i].timings[j].price,
      date: date,
      pri250: d1,
      pri420: d2,
      i: i,
      j: j,
      z: z,
    });
  }

  handletime = (time, price) => {
    let index = 0;
    let data = this.state.data;
    if (time % 3 === 0) index = 0;
    if (time % 3 === 1) index = 1;
    if (time % 3 === 2) index = 2;
    let d1 = data[index].seats.filter((n) => n.price === 250);
    let d2 = data[index].seats.filter((n) => n.price === 420);
    this.setState({
      time,
      price,
      pri250: d1,
      pri420: d2,
      totalPrice: 0,
      totalticket: 0,
    });
  };

  handleback = () => {
    let splitpath = this.props.location.pathname.substring(0, 16);
    console.log(splitpath);
    window.location = splitpath;
  };

  handlePrice = (i, index, row, seatno, available, p) => {
    if (available) {
      if (p === 420) {
        let arr = this.state.pri420;
        arr[i].seatList[index].available = !arr[i].seatList[index].available;
        this.setState({ pri420: arr });
      }
      if (p === 250) {
        let arr = this.state.pri420;
        arr[i].seatList[index].available = !arr[i].seatList[index].available;
        this.setState({ pri250: arr });
      }

      let tickets = this.state.tickets;
      tickets.push(row + seatno);
      let ticket = this.state.totalticket;
      ticket = ticket + 1;
      let price = this.state.totalPrice;
      price = price + p;
      this.setState({ totalPrice: price, totalticket: ticket });
    }
  };

  handlePayment = async () => {
    let { totalPrice: amount, tickets, time, title, hall, date } = this.state;
    let movieHall = hall.name;
    //  let tickets = ["A1"];
    let { history, location, match } = this.props;
    console.log(this.props.location.pathname);
    let url = " https://us-central1-bkyow-22da6.cloudfunctions.net/app/seat";
    await axios.post(url, { title, movieHall, tickets, amount, time, date });

    localStorage.setItem("path", this.props.location.pathname);

    window.location = "/payment";
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row bg-dark pt-1 pb-3">
          <div
            className="col-lg-6 col-md-12 col-sm-12 text-left text-white"
            style={{ fontSize: 25 }}
          >
            <div className="row">
              <div
                onClick={() => this.handleback()}
                className="col-lg-1 col-md-1 col-2 pt-2"
              >
                <a>
                  <i className="fa fa-chevron-left"></i>
                </a>
              </div>
              <div className="col-lg-11 col-md-4 col-7">
                <div className="row">
                  <span>{this.state.title}</span>
                </div>
                <div className="row" style={{ fontSize: 15 }}>
                  {this.state.hall.name}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 text-right text-white d-none d-lg-block">
            <div className="row pt-3">
              <div className="col" style={{ fontSize: 12 }}>
                {this.state.totalticket} Tickets
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <a>
                  {" "}
                  <i
                    onClick={() => this.handleback()}
                    className="fa fa-times"
                  ></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div
          className="row pt-3 pb-3"
          style={{ backgroundColor: "#f5f5fa", fontSize: 12 }}
        >
          <div className="col">
            <div className="row" text-center>
              <div className="col-lg-col-12 ml-1 text-center text-lg-left text-md-left">
                {this.state.date} , {this.state.time}
              </div>
            </div>
            <div className="row">
              <div className="col">
                {this.state.hall.timings === undefined ? (
                  ""
                ) : (
                  <React.Fragment>
                    {this.state.hall.timings.map((t, index) => (
                      <button
                        key={t.name}
                        onClick={() => this.handletime(index, t.price)}
                        className={
                          t.name === this.state.time
                            ? "btn btn-success m-1"
                            : "btn btnmd  btn btn-outline-success m-1"
                        }
                        style={{ fontSize: 12 }}
                        id="timingcss-false"
                      >
                        {t.name}
                      </button>
                    ))}
                  </React.Fragment>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="row pb-2 ml-4 mr-4 no-gutters">
          <div className="col text-secondary text-left border-bottom ml-5">
            {" "}
            RECLINER - Rs 420.000
          </div>
        </div>
        <div>
          <div>
            {this.state.data[0] === undefined ? (
              ""
            ) : (
              <React.Fragment>
                {this.state.pri420.map((seat, i) => (
                  <div key={seat.rowName} className="row ml-4 mr-4 no-gutters">
                    <div className="col-1 text-right mr-1">{seat.rowName}</div>
                    <div className="col-10 text-left ">
                      <div
                        style={{
                          marginLeft: 1,
                          marginRight: 1,
                          marginTop: 1,
                          marginBottom: 1,
                          float: "left",
                        }}
                      >
                        {seat.seatList.map((seatlist, index) => (
                          <button
                            onClick={() =>
                              this.handlePrice(
                                i,
                                index,
                                seat.rowName,
                                seatlist.seatNo,
                                seatlist.available,
                                420
                              )
                            }
                            key={index}
                            style={{
                              display: "inline-block",
                              fontSize: 10,
                              textAlign: "center",
                              width: 21,
                              height: 21,
                              borderRadius: 5,
                              marginTop: 4,
                              marginRight: 2,
                              marginBottom: 4,
                              marginLeft: 2,
                            }}
                            className={
                              (seatlist.booked === false) &
                              (seatlist.available === true)
                                ? "btn btn-sm btn-light mr-1 p-1 "
                                : "btn  btn-sm btn-outline-secondary mr-1 p-1"
                            }
                            id="available-true"
                          >
                            <span>{seatlist.seatNo}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </React.Fragment>
            )}
          </div>
        </div>
        <br />
        <div className="row pb-2 ml-4 mr-4">
          <div className="col text-sucondary text-left border-bottom ml-5">
            Gold - Rs 250.00
          </div>
        </div>
        <div>
          <div>
            {this.state.data[0] === undefined ? (
              ""
            ) : (
              <React.Fragment>
                {this.state.pri250.map((seat, i) => (
                  <div key={seat.rowName} className="row ml-4 mr-4 no-gutters">
                    <div className="col-1 text-right mr-1">{seat.rowName}</div>
                    <div className="col-10 text-left ">
                      <div
                        style={{
                          marginLeft: 1,
                          marginRight: 1,
                          marginTop: 1,
                          marginBottom: 1,
                          float: "left",
                        }}
                      >
                        {seat.seatList.map((seatlist, index) => (
                          <React.Fragment>
                            {seatlist.seatNo === 8 || seatlist.seatNo === 19 ? (
                              <span>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              </span>
                            ) : (
                              ""
                            )}
                            <button
                              onClick={() =>
                                this.handlePrice(
                                  i,
                                  index,
                                  seat.rowName,
                                  seatlist.seatNo,
                                  seatlist.available,
                                  250
                                )
                              }
                              key={index}
                              style={{
                                display: "inline-block",
                                fontSize: 10,
                                textAlign: "center",
                                width: 21,
                                height: 21,
                                borderRadius: 5,
                                marginTop: 4,
                                marginRight: 2,
                                marginBottom: 4,
                                marginLeft: 2,
                              }}
                              className={
                                (seatlist.booked === false) &
                                (seatlist.available === true)
                                  ? "btn btn-sm btn-light mr-1 p-1 "
                                  : "btn  btn-sm btn-outline-secondary mr-1 p-1"
                              }
                              id="available-true"
                            >
                              <span>{seatlist.seatNo}</span>
                            </button>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </React.Fragment>
            )}
          </div>
        </div>
        <br />
        <br />
        <div className="row">
          <div className="col text-center">
            <span>
              <img src={screne1} alt="screen" />
            </span>
            <br />
            <span style={{ fontSize: 10 }}> All Eyes this way please! </span>
          </div>
        </div>
        <div className="row">
          {this.state.totalPrice > 0 ? (
            <div className="col text-center">
              <button
                className="btn btn-primary btn-lg m-2"
                onClick={() => this.handlePayment()}
              >
                {" "}
                Pay Rs. {this.state.totalPrice}
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default Seat;

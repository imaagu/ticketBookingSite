import React, { Component } from "react";
import axios from "axios";
import bannar from "../images/paymentBanner.png";
import qr from "../images/qr.png";

class Payment extends Component {
  state = {
    data: {},
    path: "",
  };
  async componentDidMount() {
    let url1 = "https://us-central1-bkyow-22da6.cloudfunctions.net/app/movies/";
    let url = "https://us-central1-bkyow-22da6.cloudfunctions.net/app/details";
    let { data: movie } = await axios.get(url1 + "NCR" + "/" + 0);
    let { data } = await axios.get(url);

    const path = localStorage.getItem("path");
    // console.log(movie);
    console.log(data);

    localStorage.removeItem("hall");
    this.setState({ path, data });
  }

  handleback = () => {
    window.location = this.state.path;
  };

  render() {
    const { data } = this.state;
    return (
      <div className="container-fluid">
        <div className="row bg-dark pt-1 pb-3">
          <div
            className="col-lg-6 col-md-4 text-left text-white"
            style={{ fontSize: 25 }}
          >
            <div className="row">
              <div
                className="col-lg-1 col-2 pt-2"
                onClick={() => this.handleback()}
              >
                {" "}
                <a>
                  <i className="fa fa-chevron-left"></i>
                </a>{" "}
              </div>
              <div className="col-lg-11 col-10">
                <div className="row">
                  <span>{data.title}</span>
                </div>
                <div className="row" style={{ fontSize: 15 }}>
                  {data.movieHall}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-4 text-right text-white d-none d-lg-block">
            <div className="row pt-3">
              <div className="col" styke={{ fontSize: 12 }}>
                <a onClick={() => this.handleback()}>
                  <i className="fa fa-times"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{ backgroundColor: "#f5f5fa" }}>
          <div className="col">
            <div className="row">
              <div
                className="col-lg-8 col-md-4 p-2 m-2"
                style={{ backgroundColor: "white" }}
              >
                <img src={bannar} alt="bookasmile-03" className="img-fluid" />
              </div>
              <div
                className="col-lg-3 col-md-6"
                style={{ backgroundColor: "white" }}
              >
                <div className="row">
                  <div className="col">
                    <div className="row text-danger mt-1 ml-1">
                      BOOKING SUMMARY
                    </div>
                    <br />
                    <div className="row ml-2">
                      <div className="col-6 text-left"> Movie Name</div>
                      <div className="col-6 text-right">{data.title}</div>
                    </div>
                    <div className="row ml-2">
                      <div className="col-6 text-left"> Movie Hall</div>
                      <div className="col-6 text-right">{data.movieHall}</div>
                    </div>
                    <div className="row ml-2">
                      <div className="col-6 text-left"> Total Tickets</div>
                      <div className="col-6 text-right">
                        {data.tickets === undefined ? (
                          ""
                        ) : (
                          <React.Fragment>{data.tickets.length}</React.Fragment>
                        )}
                      </div>
                    </div>
                    <div className="row ml-2">
                      <div className="col-6 text-left"> Tickets</div>
                      <div className="col-6 text-right">
                        {data.movieHall === undefined ? (
                          ""
                        ) : (
                          <React.Fragment>
                            {data.tickets.map((ticket) => (
                              <span key={ticket}>{ticket}, </span>
                            ))}
                          </React.Fragment>
                        )}
                      </div>
                    </div>
                    <div className="row ml-2">
                      <div className="col-6 text-left"> Date</div>
                      <div className="col-6 text-right">{data.date}</div>
                    </div>
                    <div className="row ml-2">
                      <div className="col-6 text-left"> Time</div>
                      <div className="col-6 text-right">{data.time}</div>
                    </div>
                    <div
                      className="row ml-2 pt-2 pb-2"
                      style={{ backgroundColor: "#fffcdc" }}
                    >
                      <div className="col-6 text-left">Amount Paid </div>
                      <div className="col-6 text-right">{data.amount} Rs </div>
                    </div>
                    <div className="row ml-4 text-center">
                      <img
                        src={qr}
                        className="img-fluid"
                        style={{ height: 300, width: 300 }}
                      />
                    </div>
                    <div className="row m1-2" style={{ fontSize: 10 }}>
                      You can cancel the tickets 4 hour(s) before the show.
                      Refund will be done according to Cancellation Policy.
                    </div>
                  </div>
                  <br />
                </div>
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Payment;

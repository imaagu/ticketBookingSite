import React, { Component } from "react";
class RightPannel extends Component {
  state = {};

  handleBookMovie = (index) => {
    let splitpath = this.props.path.split("/");
    let location = splitpath[splitpath.length - 1];
    console.log(location, index);
    window.location = "/bookMovie/" + location + "/" + index;
  };

  render() {
    const { movies } = this.props;
    return (
      <div className="row">
        {movies.length === 0 ? (
          ""
        ) : (
          <React.Fragment>
            {movies.map((movie, index) => (
              <div
                onClick={() => this.handleBookMovie(index)}
                key={index}
                className="col-lg-3 col-md-3 col-5 ml-4 ml-md-5 mr-md-1 ml-lg-1"
                style={{ backgroundColor: "white" }}
              >
                <div className="row">
                  <div className="col-lg-12">
                    <img src={movie.img} className="img-fluid" />{" "}
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-5 col-6">
                    <div className="row">
                      <div
                        className="row col-lg-12"
                        style={{ fontSize: 14 }}
                      ></div>
                      <i
                        className="row  fa fa-heart"
                        aria-hidden="true"
                        style={{ color: "#d6181f" }}
                      ></i>
                    </div>
                    <div className="row d-none d-lg-block">
                      <div
                        className="row text-muted ml-2"
                        style={{ fontSize: 12 }}
                      ></div>
                      votes: {movie.votes}
                    </div>
                  </div>
                  <div className="col-lg-7 col-12">
                    <div className="row ml-2" style={{ fontSize: 14 }}>
                      {movie.title}
                    </div>
                    <div
                      className="row text-muted d-none d-lg-block ml-2"
                      style={{ fontSize: 13 }}
                    >
                      {movie.desc}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        )}{" "}
      </div>
    );
  }
}

export default RightPannel;

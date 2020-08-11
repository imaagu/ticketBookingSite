import React, { Component } from "react";
import axios from "axios";
import queryString from "query-string";
import ImgSlide from "./imageSlider";
import BottomLink from "./bottonlinks";
import RightPannel from "./rightPannel";
import LeftPannel from "./leftPannel";
import NavBar from "./navBar";
class Movies extends Component {
  state = {
    allMovies: [],
    language: ["Hindi", "English", "Punjabi", "Tamil"],
    form: ["2D", "3D", "4DX"],
    gen: ["Action", "Adventure", "Biography", "Comedy"],
  };

  async componentDidMount() {
    let url =
      "https://us-central1-bkyow-22da6.cloudfunctions.net/app/movies/" + "NCR";

    const { data } = await axios.get(url);
    this.setState({ allMovies: data });
  }

  async componentDidUpdate(prevProps) {
    const { pathname, search } = this.props.location;

    let splitpath = pathname.split("/");
    let location = splitpath[splitpath.length - 1];

    let url =
      "https://us-central1-bkyow-22da6.cloudfunctions.net/app/movies/" +
      location +
      search;

    if (prevProps.location.key !== this.props.location.key) {
      const { data } = await axios.get(url);
      this.setState({ allMovies: data });
    }
  }

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

  handleOptionChange = (namesCheckbox, namesCheckbox1, namesCheckbox2) => {
    let { q } = queryString.parse(this.props.location.search);
    q = q ? q : "";
    let filterNames = namesCheckbox.filter((n1) => n1.isSelected);
    let arrayNames = filterNames.map((n1) => n1.name);
    let lang = arrayNames.join(",");
    let filterNames1 = namesCheckbox1.filter((n1) => n1.isSelected);
    let arrayNames1 = filterNames1.map((n1) => n1.name);
    let format = arrayNames1.join(",");
    let filterNames2 = namesCheckbox2.filter((n1) => n1.isSelected);
    let arrayNames2 = filterNames2.map((n1) => n1.name);
    let genre = arrayNames2.join(",");
    console.log(lang);

    this.callUrl("", q, lang, format, genre);
  };

  callUrl = (params, q, lang, format, genre) => {
    console.log(lang);
    let path = this.props.location.pathname;
    params = this.addToParam(params, "q", q);
    params = this.addToParam(params, "lang", lang);
    params = this.addToParam(params, "format", format);
    params = this.addToParam(params, "genre", genre);
    this.props.history.push({
      pathname: path,
      search: params,
    });
  };

  addToParam(params, newParamName, newParamValue) {
    if (newParamValue) {
      if (params) params = params + "&";
      else params = params + "?";
      params = params + newParamName + "=" + newParamValue;
    }
    return params;
  }

  render() {
    let path = this.props.location.pathname;
    const { language, form, gen } = this.state;
    let { lang, format, genre } = queryString.parse(this.props.location.search);
    lang = lang ? lang : "";
    format = format ? format : "";
    genre = genre ? genre : "";
    let namesCheckbox = this.makeCbStructure(language, lang);
    let namesCheckbox1 = this.makeCbStructure(form, format);
    let namesCheckbox2 = this.makeCbStructure(gen, genre);

    const { allMovies: movies } = this.state;
    return (
      <div>
        <NavBar path={this.props.location.pathname} />
        <br />
        <div className="row">
          <div className="col-2"></div>
          <div className="col-8">
            {" "}
            <ImgSlide />
          </div>
          <div className="col-2"></div>
        </div>

        <div className="d-none d-lg-block container ">
          <BottomLink />
        </div>
        <div className="row" style={{ backgroundColor: "#f2f2f2" }}>
          <div className="col-3 d-none d-lg-block">
            <LeftPannel
              onOptionChange={this.handleOptionChange}
              namesCheckbox={namesCheckbox}
              namesCheckbox1={namesCheckbox1}
              namesCheckbox2={namesCheckbox2}
            />
          </div>
          <div className="col-lg-9 col-12">
            <RightPannel movies={movies} path={path} />
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;

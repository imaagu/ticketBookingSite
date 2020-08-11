import React, { PureComponent } from "react";
import img1 from "../images/image1.png";
import img2 from "../images/img2.png";
import img3 from "../images/img3.jpg";
const ImgSlider = () => {
  return (
    <div id="slides" data-ride="carousel" className="carousel slide">
      <ul className="carousel-indicators">
        <li data-target="#slides" data-slide-to="0" className="active"></li>
        <li data-target="#slides" data-slide-to="1"></li>
        <li data-target="#slides" data-slide-to="2"></li>
      </ul>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={img1} alt="" />
        </div>
        <div className="carousel-item ">
          <img src={img2} alt="" />
        </div>
        <div className="carousel-item">
          <img src={img3} />
        </div>
      </div>
    </div>
  );
};

export default ImgSlider;

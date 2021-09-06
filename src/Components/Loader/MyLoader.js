import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Component } from "react";
import Loader from "react-loader-spinner";
import PropTypes from "prop-types";
export default class MyLoader extends Component {
  //other logic
  render() {
    return (
      <Loader
        type="TailSpin"
        color="#00BFFF"
        height={80}
        width={80}
        timeout={3000} //3 secs
      />
    );
  }
}
MyLoader.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  timeout: PropTypes.number,
};

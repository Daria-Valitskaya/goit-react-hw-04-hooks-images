import PropTypes from "prop-types";
import errorImage from "../errorImage.jpg";

export default function ErrorView({ textError }) {
  return (
    <div role="alert">
      <img src={errorImage} alt="sadTony" width="300" />
      <p>{textError}</p>
    </div>
  );
}

ErrorView.propTypes = {
  textError: PropTypes.string.isRequired,
};

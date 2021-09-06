import PropTypes from "prop-types";

export default function LoadMoreBtn({ onBtnClick }) {
  return (
    <div className="btnWrapper">
      <button type="button" onClick={onBtnClick} className="Button">
        Load More
      </button>
    </div>
  );
}

LoadMoreBtn.propTypes = {
  onBtnClick: PropTypes.func.isRequired,
};

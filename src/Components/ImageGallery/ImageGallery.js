import PropTypes from "prop-types";

import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
export default function ImageGallery({ images, onClick }) {
  return (
    <ul className="ImageGallery">
      {images.map((image) => {
        return (
          <ImageGalleryItem key={image.id} onClick={onClick} image={image} />
        );
      })}
    </ul>
  );
}

ImageGallery.propTypes = {
  image: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  onClick: PropTypes.func.isRequired,
};

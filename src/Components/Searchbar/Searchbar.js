import PropTypes from "prop-types";
import { useState } from "react";

export default function Searchbar({ onSubmit }) {
  const [imageName, setImageName] = useState("");

  const onInputChange = (event) => {
    setImageName(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (imageName.trim() === "") {
      alert("Please, enter smthk");
      reset();
      return;
    }
    onSubmit(imageName);
    reset();
  };

  const reset = () => {
    setImageName("");
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={imageName}
          onChange={onInputChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

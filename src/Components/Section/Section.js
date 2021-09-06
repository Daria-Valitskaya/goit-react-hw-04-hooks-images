import PropTypes from "prop-types";
import s from "./Section.module.css";

export default function Section({ children }) {
  return <div className={s.App}>{children}</div>;
}

Section.propTypes = {
  children: PropTypes.node.isRequired,
};

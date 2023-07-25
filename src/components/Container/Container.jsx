import PropTypes from "prop-types";
import s from "./Container.module.scss";

export const Container = ({ children }) => {
  return <div className={s.container}>{children}</div>;
};

Container.propTypes = {
  children: PropTypes.node,
};

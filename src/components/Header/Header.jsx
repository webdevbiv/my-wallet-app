import PropTypes from "prop-types";
import { Container } from "../Container/Container";
import s from "./Header.module.scss";

export const Header = ({ children }) => {
  return (
    <header>
      <Container>
        <div className={s.wrapper}>{children}</div>
      </Container>
    </header>
  );
};

Header.propTypes = {
  children: PropTypes.node,
};

import PropTypes from "prop-types";
import { Container } from "../Container/Container";
import s from "./Footer.module.scss";

const Footer = ({ children }) => {
  return (
    <footer className={s.footer}>
      <Container>{children}</Container>
    </footer>
  );
};

Footer.propTypes = {
  children: PropTypes.node,
};

export default Footer;

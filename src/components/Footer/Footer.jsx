import PropTypes from "prop-types";
import { Container } from "../Container/Container";

const Footer = ({ children }) => {
  return (
    <footer>
      <Container>{children}</Container>
    </footer>
  );
};

Footer.propTypes = {
  children: PropTypes.node,
};

export default Footer;

import { Container } from "../Container/Container";
import PropTypes from "prop-types";
const Main = ({ children }) => {
  return (
    <>
      <main>
        <Container>{children}</Container>
      </main>
    </>
  );
};

export default Main;

Main.propTypes = {
  children: PropTypes.node,
};

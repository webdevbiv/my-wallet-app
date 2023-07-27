import { Container } from "../Container/Container";
import PropTypes from "prop-types";
import s from "./Main.module.scss";
const Main = ({ children }) => {
  return (
    <>
      <main className={s.main}>
        <Container>{children}</Container>
      </main>
    </>
  );
};

export default Main;

Main.propTypes = {
  children: PropTypes.node,
};

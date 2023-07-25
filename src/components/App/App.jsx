import { useState } from "react";
import { WalletContext } from "../../context/WalletContext";
import Footer from "../Footer/Footer";
import { Header } from "../Header/Header";
import Logo from "../Logo/Logo";
import Main from "../Main/Main";
import WalletConnection from "../WalletConnection/WalletConnection";
import WalletForm from "../WalletForm/WalletForm";
import { FooterLink } from "../FooterLink/FooterLink";
// import s from "./App.module.scss";

function App() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  return (
    <>
      <WalletContext.Provider value={{ account, setAccount, balance, setBalance }}>
        <Header>
          <Logo />
          <WalletConnection />
        </Header>
        <Main>
          <WalletForm />
        </Main>
        <Footer>
          <FooterLink />
        </Footer>
      </WalletContext.Provider>
    </>
  );
}

export default App;

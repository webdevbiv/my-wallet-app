import { useState } from "react";
import { WalletContext } from "../../context/WalletContext";
import Footer from "../Footer/Footer";
import { Header } from "../Header/Header";
import Logo from "../Logo/Logo";
import Main from "../Main/Main";
import WalletConnection from "../WalletConnection/WalletConnection";
import WalletForm from "../WalletForm/WalletForm";
import { FooterLinks } from "../FooterLinks/FooterLinks";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
          <ToastContainer position="top-center" autoClose={5000} limit={2} hideProgressBar={true} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss={false} draggable={false} pauseOnHover={false} theme="dark" />
          <WalletForm />
        </Main>
        <Footer>
          <FooterLinks />
        </Footer>
      </WalletContext.Provider>
    </>
  );
}

export default App;

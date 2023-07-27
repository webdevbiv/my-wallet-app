import { ethers } from "ethers";
import { useContext, useState, useEffect, useCallback } from "react";
import { Buffer } from "buffer";
import { ThreeDots } from "react-loader-spinner";
import { WalletContext } from "../../context/WalletContext";
import s from "./WalletConnection.module.scss";
import { toast } from "react-toastify";

window.Buffer = Buffer;

const WalletConnection = () => {
  const { account, setAccount, balance, setBalance } = useContext(WalletContext);
  const [shortAccount, setShortAccount] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [connectMetaMask, setConnectMetaMask] = useState(false);

  const updateBalance = useCallback(
    async (address) => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balance = await provider.getBalance(address);
      const formattedBalance = ethers.utils.formatEther(balance);
      setBalance(parseFloat(formattedBalance).toFixed(3));
    },
    [setBalance]
  );

  useEffect(() => {
    if (window.ethereum) {
      const handler = (accounts) => {
        if (accounts.length === 0) {
          // MetaMask is locked or the user has not connected any accounts
          setAccount(null);
          setShortAccount(null);
          setBalance(null);
          toast.warn("Please connect to MetaMask.");
        } else if (accounts[0] !== account) {
          setAccount(accounts[0]);
          setShortAccount(`${accounts[0].slice(0, 5)}...${accounts[0].slice(-4)}`);
          updateBalance(accounts[0]);
        }
      };

      window.ethereum.on("accountsChanged", handler);

      return () => window.ethereum.removeListener("accountsChanged", handler);
    }
  }, [account, setAccount, updateBalance]);

  const handleMetaMask = async () => {
    if (account || isLoading) {
      return;
    }

    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      try {
        setIsLoading(true);
        setConnectMetaMask(true);

        await window.ethereum.request({ method: "eth_requestAccounts" });
        setConnectMetaMask(false);

        const signer = provider.getSigner();

        signer.getAddress().then(async (address) => {
          // Get account
          setAccount(address);
          setShortAccount(`${address.slice(0, 5)}...${address.slice(-4)}`);
          // Get balance
          await updateBalance(address);
          // console.log("Connected account:", address);
          setIsLoading(false);
        });
      } catch (err) {
        console.log(err);
        setConnectMetaMask(false);
        setIsLoading(false);
        if (err.code === -32002) {
          toast.warn("Please finish connecting to MetaMask");
          return;
        }
        toast.warn("User denied account access to MetaMask");
      }
    } else {
      setConnectMetaMask(false);
      setIsLoading(false);
      toast.warn(
        <a target="_blank" rel="noopener noreferrer" href="https://metamask.io/download/">
          <div className={s.toastWrapper}>
            <span className={s.toastLink}>Follow this link to install: MetaMask</span>
          </div>
        </a>
      );
    }
  };

  const handleDisconnect = () => {
    if (!account) {
      return;
    }

    const confirmation = window.confirm("Are you sure you want to disconnect?");
    if (confirmation) {
      setAccount(null);
      setShortAccount(null);
      setBalance(null);
    }
  };

  return (
    <button type="button" onClick={account ? handleDisconnect : handleMetaMask} className={connectMetaMask ? s.buttonBgMetaMask : account ? s.buttonBgConnect : s.button}>
      {isLoading ? (
        connectMetaMask ? (
          <span>Connect MetaMask</span>
        ) : (
          <ThreeDots height="24px" maxWidth="170px" radius="9" center color="white" ariaLabel="three-dots-loading" wrapperStyle={{ display: "flex", justifyContent: "center", alignItems: "center" }} wrapperClassName="" visible={true} />
        )
      ) : account ? (
        <>
          <span>{balance}</span> <span>{shortAccount}</span>
        </>
      ) : (
        "Connect wallet"
      )}
    </button>
  );
};

export default WalletConnection;

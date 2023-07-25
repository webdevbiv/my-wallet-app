import { useContext, useState } from "react";
import s from "./WalletForm.module.scss";
import { WalletContext } from "../../context/WalletContext";
import { ethers } from "ethers";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";

const WalletForm = () => {
  const { account, setBalance } = useContext(WalletContext);
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateInputs = () => {
    if (!account) {
      toast.warn("Please connect your wallet first!");
      return false;
    }

    // Basic form validation
    if (!receiver || !amount) {
      toast.warn("Please provide both receiver wallet address and amount.");
      return false;
    }

    // Check if the receiver address is valid
    const isAddress = /^0x[a-fA-F0-9]{40}$/.test(receiver);
    if (!isAddress) {
      toast.warn("Invalid Ethereum address format. Must start with 0x followed by 40 hexadecimal characters.");
      return false;
    }

    const decimalAmount = parseFloat(amount);
    if (decimalAmount < 0.000001 || decimalAmount > 100000 || !Number.isFinite(decimalAmount)) {
      toast.warn("Please enter a valid amount between 0.000001 and 100000.");
      return;
    }

    // Check if the receiver address has a correct checksum
    if (receiver !== ethers.utils.getAddress(receiver)) {
      toast.warn("Invalid address checksum.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    setIsLoading(true);

    try {
      // Get the user's address
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Define the transaction
      const transaction = {
        to: receiver,
        value: ethers.utils.parseEther(amount),
      };

      // Send the transaction
      const tx = await signer.sendTransaction(transaction);
      await tx.wait(); // Wait for the transaction to be processed

      // Update the balance
      const newBalance = await provider.getBalance(account);
      const formattedNewBalance = ethers.utils.formatEther(newBalance);
      setBalance(parseFloat(formattedNewBalance).toFixed(3));

      setIsLoading(false);
      toast.success("Transaction successful!");
    } catch (err) {
      setIsLoading(false);
      if (err.code === 4001) {
        toast.error("Transaction cancelled!");
        return;
      }
      toast.error("Transaction failed!");
    }
  };

  return (
    <>
      <div className={account ? s.wrapperConnected : s.wrapper}>
        <form onSubmit={handleSubmit} className={s.formGroup}>
          <label>
            <span> Receiver wallet:</span>
            <input value={receiver} type="text" placeholder="Enter receiver wallet address" onChange={(e) => setReceiver(e.target.value)} />
          </label>
          <label>
            <span>Amount:</span>
            <input value={amount} type="number" step="0.000001" placeholder="Enter amount" onChange={(e) => setAmount(e.target.value)} />
          </label>
          <button type="submit">{isLoading ? <ThreeDots height="24" width="36" radius="9" color="rgba(255, 255, 255, 0.87)" ariaLabel="three-dots-loading" wrapperStyle={{}} wrapperClassName="" visible={true} /> : "Send"}</button>
        </form>
      </div>
    </>
  );
};

export default WalletForm;

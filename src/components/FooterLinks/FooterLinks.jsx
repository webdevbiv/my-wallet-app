import s from "./FooterLinks.module.scss";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

export const FooterLinks = () => {
  return (
    <div className={s.wrapper}>
      <a className={s.link} href="https://github.com/webdevbiv/my-wallet-app" target="_blank" rel="noopener noreferrer">
        <AiFillGithub size={26} /> GitHub
      </a>
      <a className={s.link} href="https://www.linkedin.com/in/webdevbiv/" target="_blank" rel="noopener noreferrer">
        <AiFillLinkedin size={26} />
        LinkedIn
      </a>
    </div>
  );
};

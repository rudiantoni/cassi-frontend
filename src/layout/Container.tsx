import { ReactNode } from "react";
import "./Container.css";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

interface ContainerProps {
  children?: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <>
      <div className="page-container">

        <div className="page-header">
          <a href="#">
            <img className="img-logo" src="/src/assets/logo.png" />
          </a>
        </div>

        <div className="page-content">
          {children}
        </div>

        <div className="page-footer">
          <div className="footer-left">
          <a href="#">
            <img className="img-logo" src="/src/assets/logo.png" />
          </a>
          </div>
          <div className="footer-right">
            <div className="social-container">
              <a className="social-link" href="https://www.facebook.com/CASSISAUDEBR" target="_blank">
                <FaFacebook className="social-icon" />
              </a>
              <a className="social-link" href="https://www.instagram.com/cassi.saude/" target="_blank">
                <FaInstagram className="social-icon handle-radius" />
              </a>
              <a className="social-link" href="https://www.linkedin.com/company/cassi/" target="_blank">
                <FaLinkedin className="social-icon handle-radius" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default Container;

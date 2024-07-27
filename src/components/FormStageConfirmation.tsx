/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";

interface FormStageConfirmationProps {
  setIsInputValid: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormStageConfirmation: React.FC<FormStageConfirmationProps> = ({ setIsInputValid }) => {
  
  useEffect(() => {
    setIsInputValid(false);
  }, [])

  const onResolveCaptcha = (token: string | null) => {
    if (token) {
      setIsInputValid(true);
    } else {
      setIsInputValid(false);
    }
  }

  return (
    <>
      <div style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <ReCAPTCHA sitekey="6Lc8wBgqAAAAAG0JpPAn_BUHLeRdwD37xtsFiKY-" onChange={(token) => onResolveCaptcha(token)} />
      </div>
    </>
  );
};

export default FormStageConfirmation;

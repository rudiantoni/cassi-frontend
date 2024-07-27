import { BrowserRouter, Route, Routes } from "react-router-dom";
import Container from "../layout/Container";
import RegisterProvider from "../pages/RegisterProvider/RegisterProvider";
import { Consts } from "../services/Consts";
import { TAllowedAny } from "../services/Types";

const App = (): JSX.Element => {

  const willSupressLibErrorInputMaskFindDomNodeDeprecated = (...args: TAllowedAny[]): boolean => {
    const textA = 'Warning: '.toLowerCase()
    const textB = 'findDOMNode is deprecated'.toLowerCase()
    const textC = '/node_modules/.vite/deps/react-input-mask.js'.toLowerCase()

    if (args.length == 2) {
      const argMessage = args[0].toLowerCase()
      const argStacktrace = args[1].toLowerCase()
      if (argMessage.includes(textA) && argMessage.includes(textB) && argStacktrace.includes(textC)){
        return true;
      }
    } else if (args.length == 5) {
      const argMessage = args[0].toLowerCase()
      const argSource = args[1].toLowerCase()
      const argStacktrace = args[4].toLowerCase()
      if (argMessage.includes(textA) && textB.includes(argSource) && argStacktrace.includes(textC)){
        return true;
      }
    }
    return false;
  }

  const bootstrapInternal = (): void => {
    if (Consts.SUPRESS_THIRD_PARTY_ERRORS) {
      const originalError = console.error;
      console.error = (...args) => {
        if (willSupressLibErrorInputMaskFindDomNodeDeprecated(...args)) {
          return;
        }
        originalError(...args);
      };
    }
  }
  bootstrapInternal()

  return (
    <>
      <Container>
        <BrowserRouter>
          <Routes>
            <Route path={`/*`} Component={RegisterProvider} />
          </Routes>
        </BrowserRouter>
      </Container>
    </>
  );
};

export default App;

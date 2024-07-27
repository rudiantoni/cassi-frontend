import { Consts } from "./Consts";
import { MOCK_DATA } from "./Data";
import { TMockResponseData } from "./Types";

const get = (route: string): Promise<TMockResponseData> => {
  console.info(`Requesting data from ${route}`);
  return new Promise((resolve, reject) => {
    let isInvalid: boolean = true;
    let data: TMockResponseData = [];
    switch (route) {
      case MOCK_DATA.PROVIDER_TYPES.route:
        data = MOCK_DATA.PROVIDER_TYPES.data;
        isInvalid = false;
        break;
      case MOCK_DATA.SPECIALTIES.route:
        data = MOCK_DATA.SPECIALTIES.data;
        isInvalid = false;
        break;
      case MOCK_DATA.UF.route:
        data = MOCK_DATA.UF.data;
        isInvalid = false;
        break;
      default:
        isInvalid = true;
    }

    setTimeout(() => {
      if (!isInvalid) {
        resolve(data);
      } else {
        reject(new Error(`Impossible to obtain data from ${route}`));
      }
    }, Consts.SIMULATE_API_CALL_MS);
  });
};

export { get };


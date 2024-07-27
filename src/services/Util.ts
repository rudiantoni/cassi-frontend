export class Util {
  static extractNumbers = (str: string): string => {
    const numbers = str.match(/\d+/g);
    return numbers ? numbers.join('') : '';
  };  
  
  static stringHasValue = (str: string | undefined | null): boolean => {
    if (str === undefined || str == null) {
      return false;
    } else {
      return str.trim().length > 0 ?? false;
    }
  };

  static isDefined = (num?: unknown): boolean => {
    return num !== undefined && num !== null;
  };

  static isInteger = (num: number): boolean => {
    return !(num % 1 !== 0);
  };

  static formatStrBytes(bytes: number): {amount: number, unit: string} {
    if (bytes < 1024) {
      return {amount: bytes, unit: 'B'};
    } else if (bytes < 1024 * 1024) {
      const kilobytes = bytes / 1024;
      return {amount: kilobytes, unit: 'KB'};
    } else {
      const megabytes = bytes / (1024 * 1024);
      return {amount: megabytes, unit: 'MB'};
    }
  }

}

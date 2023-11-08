import {
  Guard,
  GuardContainsOption,
  GuardLengthOption,
  GuardNumberOption,
  GuardOption,
  GuardRegexOption,
} from '../guard';

describe('Guard', () => {
  describe('required', () => {
    it('should pass for valid value', () => {
      const option: GuardOption = {
        arg: 'arg',
        value: 'value',
      };

      const result = Guard.required(option);

      expect(result.success).toBeTruthy();
      expect(result.getData()).toBe(option.value);
    });

    it('should fail for null value', () => {
      const option: GuardOption = {
        arg: 'arg',
        value: null,
        errorMessage: 'error',
      };

      const result = Guard.required(option);

      expect(result.success).toBeFalsy();
      expect(result.getError()).toBe(option.errorMessage);
    });

    it('should fail for undefined value', () => {
      const option: GuardOption = {
        arg: 'arg',
        value: undefined,
        errorMessage: 'error',
      };

      const result = Guard.required(option);

      expect(result.success).toBeFalsy();
      expect(result.getError()).toBe(option.errorMessage);
    });
  });

  describe('isString', () => {
    it('should pass for string value', () => {
      const option: GuardOption = {
        arg: 'arg',
        value: 'value',
      };

      const result = Guard.isString(option);

      expect(result.success).toBeTruthy();
      expect(result.getData()).toBe(option.value);
    });

    it('should fail for number value', () => {
      const option: GuardOption = {
        arg: 'arg',
        value: 1234,
        errorMessage: 'error',
      };

      const result = Guard.isString(option);

      expect(result.success).toBeFalsy();
      expect(result.getError()).toBe(option.errorMessage);
    });

    it('should fail for boolean value', () => {
      const option: GuardOption = {
        arg: 'arg',
        value: false,
        errorMessage: 'error',
      };

      const result = Guard.isString(option);

      expect(result.success).toBeFalsy();
      expect(result.getError()).toBe(option.errorMessage);
    });
  });

  describe('isNumber', () => {
    it('should pass for number value', () => {
      const option: GuardOption = {
        arg: 'arg',
        value: 1234,
      };

      const result = Guard.isNumber(option);

      expect(result.success).toBeTruthy();
      expect(result.getData()).toBe(option.value);
    });

    it('should fail for string value', () => {
      const option: GuardOption = {
        arg: 'arg',
        value: 'value',
        errorMessage: 'error',
      };

      const result = Guard.isNumber(option);

      expect(result.success).toBeFalsy();
      expect(result.getError()).toBe(option.errorMessage);
    });

    it('should fail for boolean value', () => {
      const option: GuardOption = {
        arg: 'arg',
        value: false,
        errorMessage: 'error',
      };

      const result = Guard.isNumber(option);

      expect(result.success).toBeFalsy();
      expect(result.getError()).toBe(option.errorMessage);
    });
  });

  describe('isBoolean', () => {
    it('should pass for boolean value', () => {
      const option: GuardOption = {
        arg: 'arg',
        value: false,
      };

      const result = Guard.isBoolean(option);

      expect(result.success).toBeTruthy();
      expect(result.getData()).toBe(option.value);
    });

    it('should fail for number value', () => {
      const option: GuardOption = {
        arg: 'arg',
        value: 1234,
        errorMessage: 'error',
      };

      const result = Guard.isBoolean(option);

      expect(result.success).toBeFalsy();
      expect(result.getError()).toBe(option.errorMessage);
    });

    it('should fail for string value', () => {
      const option: GuardOption = {
        arg: 'arg',
        value: 'value',
        errorMessage: 'error',
      };

      const result = Guard.isBoolean(option);

      expect(result.success).toBeFalsy();
      expect(result.getError()).toBe(option.errorMessage);
    });
  });

  describe('contains', () => {
    it('should pass for valid value', () => {
      const option: GuardContainsOption<string> = {
        arg: 'arg',
        value: 'valid1',
        validValues: ['valid1', 'valid2', 'valid3'],
      };

      const result = Guard.contains(option);

      expect(result.success).toBeTruthy();
      expect(result.getData()).toBe(option.value);
    });

    it('should fail for invalid value', () => {
      const option: GuardContainsOption<string> = {
        arg: 'arg',
        value: 'valid4',
        validValues: ['valid1', 'valid2', 'valid3'],
        errorMessage: 'error',
      };

      const result = Guard.contains(option);

      expect(result.success).toBeFalsy();
      expect(result.getError()).toBe(option.errorMessage);
    });
  });

  describe('match', () => {
    it('should pass for valid value pattern', () => {
      const option: GuardRegexOption = {
        arg: 'arg',
        regex: /^[a-zA-Z]+$/i,
        value: 'RegEx',
      };

      const result = Guard.match(option);

      expect(result.success).toBeTruthy();
      expect(result.getData()).toBe(option.value);
    });

    it('should fail for invalid value pattern', () => {
      const option: GuardRegexOption = {
        arg: 'arg',
        regex: /^[0-9]+$/i,
        value: 'RegEx',
        errorMessage: 'error',
      };

      const result = Guard.match(option);

      expect(result.success).toBeFalsy();
      expect(result.getError()).toBe(option.errorMessage);
    });
  });

  describe('minLength', () => {
    it('should pass for minimum value', () => {
      const option: GuardLengthOption = {
        arg: 'arg',
        length: 1,
        value: 'value',
      };

      const result = Guard.minLength(option);

      expect(result.success).toBeTruthy();
      expect(result.getData()).toBe(option.value);
    });

    it('should fail for less value', () => {
      const option: GuardLengthOption = {
        arg: 'arg',
        length: 10,
        value: 'value',
        errorMessage: 'error',
      };

      const result = Guard.minLength(option);

      expect(result.success).toBeFalsy();
      expect(result.getError()).toBe(option.errorMessage);
    });
  });

  describe('maxLength', () => {
    it('should pass for maximum value', () => {
      const option: GuardLengthOption = {
        arg: 'arg',
        length: 10,
        value: 'value',
      };

      const result = Guard.maxLength(option);

      expect(result.success).toBeTruthy();
      expect(result.getData()).toBe(option.value);
    });

    it('should fail for less value', () => {
      const option: GuardLengthOption = {
        arg: 'arg',
        length: 1,
        value: 'value',
        errorMessage: 'error',
      };

      const result = Guard.maxLength(option);

      expect(result.success).toBeFalsy();
      expect(result.getError()).toBe(option.errorMessage);
    });
  });

  describe('equal', () => {
    it('should pass for equal value', () => {
      const option: GuardNumberOption = {
        arg: 'arg',
        compareTo: 10,
        value: 10,
      };

      const result = Guard.equal(option);

      expect(result.success).toBeTruthy();
      expect(result.getData()).toBe(option.value);
    });

    it('should fail for not equal value', () => {
      const option: GuardNumberOption = {
        arg: 'arg',
        compareTo: 10,
        value: 0,
        errorMessage: 'error',
      };

      const result = Guard.equal(option);

      expect(result.success).toBeFalsy();
      expect(result.getError()).toBe(option.errorMessage);
    });
  });

  describe('notEqual', () => {
    it('should pass for not equal value', () => {
      const option: GuardNumberOption = {
        arg: 'arg',
        compareTo: 10,
        value: 0,
      };

      const result = Guard.notEqual(option);

      expect(result.success).toBeTruthy();
      expect(result.getData()).toBe(option.value);
    });

    it('should fail for equal value', () => {
      const option: GuardNumberOption = {
        arg: 'arg',
        compareTo: 10,
        value: 10,
        errorMessage: 'error',
      };

      const result = Guard.notEqual(option);

      expect(result.success).toBeFalsy();
      expect(result.getError()).toBe(option.errorMessage);
    });
  });

  describe('greaterThan', () => {
    it('should pass for greater value', () => {
      const option: GuardNumberOption = {
        arg: 'arg',
        compareTo: 0,
        value: 10,
      };

      const result = Guard.greaterThan(option);

      expect(result.success).toBeTruthy();
      expect(result.getData()).toBe(option.value);
    });

    it('should fail for less value', () => {
      const option: GuardNumberOption = {
        arg: 'arg',
        compareTo: 10,
        value: 0,
        errorMessage: 'error',
      };

      const result = Guard.greaterThan(option);

      expect(result.success).toBeFalsy();
      expect(result.getError()).toBe(option.errorMessage);
    });
  });

  describe('greaterThanOrEqual', () => {
    it('should pass for greater value', () => {
      const option: GuardNumberOption = {
        arg: 'arg',
        compareTo: 0,
        value: 10,
      };

      const result = Guard.greaterThanOrEqual(option);

      expect(result.success).toBeTruthy();
      expect(result.getData()).toBe(option.value);
    });

    it('should pass for equal value', () => {
      const option: GuardNumberOption = {
        arg: 'arg',
        compareTo: 10,
        value: 10,
      };

      const result = Guard.greaterThanOrEqual(option);

      expect(result.success).toBeTruthy();
      expect(result.getData()).toBe(option.value);
    });

    it('should fail for less value', () => {
      const option: GuardNumberOption = {
        arg: 'arg',
        compareTo: 10,
        value: 0,
        errorMessage: 'error',
      };

      const result = Guard.greaterThanOrEqual(option);

      expect(result.success).toBeFalsy();
      expect(result.getError()).toBe(option.errorMessage);
    });
  });

  describe('lessThan', () => {
    it('should pass for less value', () => {
      const option: GuardNumberOption = {
        arg: 'arg',
        compareTo: 10,
        value: 0,
      };

      const result = Guard.lessThan(option);

      expect(result.success).toBeTruthy();
      expect(result.getData()).toBe(option.value);
    });

    it('should fail for greater value', () => {
      const option: GuardNumberOption = {
        arg: 'arg',
        compareTo: 10,
        value: 100,
        errorMessage: 'error',
      };

      const result = Guard.lessThan(option);

      expect(result.success).toBeFalsy();
      expect(result.getError()).toBe(option.errorMessage);
    });
  });

  describe('lessThanOrEqual', () => {
    it('should pass for less value', () => {
      const option: GuardNumberOption = {
        arg: 'arg',
        compareTo: 10,
        value: 0,
      };

      const result = Guard.lessThanOrEqual(option);

      expect(result.success).toBeTruthy();
      expect(result.getData()).toBe(option.value);
    });

    it('should pass for equal value', () => {
      const option: GuardNumberOption = {
        arg: 'arg',
        compareTo: 10,
        value: 10,
      };

      const result = Guard.lessThanOrEqual(option);

      expect(result.success).toBeTruthy();
      expect(result.getData()).toBe(option.value);
    });

    it('should fail for greater value', () => {
      const option: GuardNumberOption = {
        arg: 'arg',
        compareTo: 10,
        value: 100,
        errorMessage: 'error',
      };

      const result = Guard.lessThanOrEqual(option);

      expect(result.success).toBeFalsy();
      expect(result.getError()).toBe(option.errorMessage);
    });
  });
});

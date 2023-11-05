import { Username, UsernameProps } from '../username';

describe('Username', () => {
  let props: UsernameProps;

  describe('create', () => {
    beforeEach(() => {
      props = {
        value: 'username',
      };
    });

    it('should pass for a valid username', () => {
      const result = Username.create(props);

      expect(result.success).toBeTruthy();

      const username = result.getData();

      expect(username.value).toEqual(props.value);
    });

    it('should fail if username is null', () => {
      props = {
        ...props,
        value: null as unknown as string,
      };

      const result = Username.create(props);

      expect(result.success).toBeFalsy();
    });

    it('should fail if username is undefined', () => {
      props = {
        ...props,
        value: undefined as unknown as string,
      };

      const result = Username.create(props);

      expect(result.success).toBeFalsy();
    });

    it('should fail if username is less than 3 characters', () => {
      props = {
        ...props,
        value: 'us',
      };

      const result = Username.create(props);

      expect(props.value.length).toBeLessThanOrEqual(3);
      expect(result.success).toBeFalsy();
    });

    it('should fail if username is exceed 32 characters', () => {
      props = {
        ...props,
        value:
          'long-long-long-long-long-long-long-long-long-long-long-long-username',
      };

      const result = Username.create(props);

      expect(props.value.length).toBeGreaterThan(32);
      expect(result.success).toBeFalsy();
    });
  });
});

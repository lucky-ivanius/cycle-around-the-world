import { Name, NameProps } from '../name';

describe('Name', () => {
  let props: NameProps;

  describe('create', () => {
    beforeEach(() => {
      props = {
        value: 'name',
      };
    });

    it('should pass for a valid name', () => {
      const result = Name.create(props);

      expect(result.success).toBeTruthy();

      const name = result.getData();

      expect(name.value).toEqual(props.value);
    });

    it('should fail if name is null', () => {
      props = {
        ...props,
        value: null as unknown as string,
      };

      const result = Name.create(props);

      expect(result.success).toBeFalsy();
    });

    it('should fail if name is undefined', () => {
      props = {
        ...props,
        value: undefined as unknown as string,
      };

      const result = Name.create(props);

      expect(result.success).toBeFalsy();
    });

    it('should fail if name is less than 2 characters', () => {
      props = {
        ...props,
        value: 'u',
      };

      const result = Name.create(props);

      expect(props.value.length).toBeLessThan(2);
      expect(result.success).toBeFalsy();
    });

    it('should fail if name is exceed 50 characters', () => {
      props = {
        ...props,
        value: 'long-long-long-long-long-long-long-long-long-long-long-name',
      };

      const result = Name.create(props);

      expect(props.value.length).toBeGreaterThan(50);
      expect(result.success).toBeFalsy();
    });
  });
});

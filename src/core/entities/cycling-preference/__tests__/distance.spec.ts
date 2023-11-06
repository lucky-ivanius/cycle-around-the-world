import { Distance, DistanceProps, DistanceUnit } from '../distance';

describe('Distance', () => {
  let props: DistanceProps;

  describe('create', () => {
    beforeEach(() => {
      props = {
        value: 10,
        unit: 'km',
      };
    });

    it('should pass for a valid distance', () => {
      const result = Distance.create(props);

      expect(result.success).toBeTruthy();

      const distance = result.getData();

      expect(distance.value).toEqual(props.value);
    });

    it('should fail if distance value is null', () => {
      props = {
        ...props,
        value: null as unknown as number,
      };

      const result = Distance.create(props);

      expect(result.success).toBeFalsy();
    });

    it('should fail if distance value is undefined', () => {
      props = {
        ...props,
        value: undefined as unknown as number,
      };

      const result = Distance.create(props);

      expect(result.success).toBeFalsy();
    });

    it('should fail if distance unit is null', () => {
      props = {
        ...props,
        unit: null as unknown as DistanceUnit,
      };

      const result = Distance.create(props);

      expect(result.success).toBeFalsy();
    });

    it('should fail if distance unit is undefined', () => {
      props = {
        ...props,
        unit: undefined as unknown as DistanceUnit,
      };

      const result = Distance.create(props);

      expect(result.success).toBeFalsy();
    });

    it('should fail if distance unit is not a valid distance unit', () => {
      props = {
        ...props,
        unit: 'this-is-invalid' as DistanceUnit,
      };

      const result = Distance.create(props);

      expect(result.success).toBeFalsy();
    });
  });
});

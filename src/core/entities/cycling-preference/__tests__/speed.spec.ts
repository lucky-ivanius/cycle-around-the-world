import { Speed, SpeedProps } from '../speed';

describe('Speed', () => {
  let props: SpeedProps;

  describe('create', () => {
    beforeEach(() => {
      props = {
        value: 10,
      };
    });

    it('should pass for a valid speed', () => {
      const result = Speed.create(props);

      expect(result.success).toBeTruthy();

      const speed = result.getData();

      expect(speed.value).toEqual(props.value);
    });

    it('should fail if speed is null', () => {
      props = {
        ...props,
        value: null as unknown as number,
      };

      const result = Speed.create(props);

      expect(result.success).toBeFalsy();
    });

    it('should fail if speed is undefined', () => {
      props = {
        ...props,
        value: undefined as unknown as number,
      };

      const result = Speed.create(props);

      expect(result.success).toBeFalsy();
    });

    it('should fail if speed is less than 0', () => {
      props = {
        ...props,
        value: -1,
      };

      const result = Speed.create(props);

      expect(result.success).toBeFalsy();
    });
  });
});

import { Geolocation, GeolocationProps } from '../geolocation';

describe('Geolocation', () => {
  let props: GeolocationProps;

  describe('create', () => {
    beforeEach(() => {
      props = {
        latitude: 0,
        longitude: 0,
      };
    });

    it('should pass for valid geolocation', () => {
      const result = Geolocation.create(props);

      expect(result.success).toBeTruthy();

      const geolocation = result.getData();

      expect(geolocation.longitude).toEqual(props.longitude);
      expect(geolocation.latitude).toEqual(props.latitude);
    });

    it('should fail if longitude is null', () => {
      props = {
        ...props,
        longitude: null as unknown as number,
      };

      const result = Geolocation.create(props);

      expect(result.success).toBeFalsy();
    });

    it('should fail if longitude is undefined', () => {
      props = {
        ...props,
        longitude: undefined as unknown as number,
      };

      const result = Geolocation.create(props);

      expect(result.success).toBeFalsy();
    });

    it('should fail if latitude is null', () => {
      props = {
        ...props,
        latitude: null as unknown as number,
      };

      const result = Geolocation.create(props);

      expect(result.success).toBeFalsy();
    });

    it('should fail if latitude is undefined', () => {
      props = {
        ...props,
        latitude: undefined as unknown as number,
      };

      const result = Geolocation.create(props);

      expect(result.success).toBeFalsy();
    });

    it('should fail if longitude is less than -180', () => {
      props = {
        ...props,
        longitude: -200,
      };

      const result = Geolocation.create(props);

      expect(props.longitude).toBeLessThan(-180);
      expect(result.success).toBeFalsy();
    });

    it('should fail if longitude is greater than 180', () => {
      props = {
        ...props,
        longitude: 200,
      };

      const result = Geolocation.create(props);

      expect(props.longitude).toBeGreaterThan(180);
      expect(result.success).toBeFalsy();
    });

    it('should fail if latitude is less than -90', () => {
      props = {
        ...props,
        latitude: -100,
      };

      const result = Geolocation.create(props);

      expect(props.latitude).toBeLessThan(-90);
      expect(result.success).toBeFalsy();
    });

    it('should fail if latitude is greater than 90', () => {
      props = {
        ...props,
        latitude: 100,
      };

      const result = Geolocation.create(props);

      expect(props.latitude).toBeGreaterThan(90);
      expect(result.success).toBeFalsy();
    });
  });
});

import { Geolocation } from '../geolocation';
import { Name } from '../name';
import { Spot, SpotProps } from '../spot';

describe('Spot', () => {
  let props: SpotProps;

  describe('create', () => {
    beforeEach(() => {
      props = {
        name: Name.create({ value: 'name' }).getData(),
        geolocation: Geolocation.create({
          longitude: 0,
          latitude: 0,
        }).getData(),
        cyclingAccessibility: true,
      };
    });

    it('should pass for a valid spot', () => {
      const result = Spot.create(props);

      expect(result.success).toBeTruthy();

      const spot = result.getData();

      expect(spot.id).toBeDefined();
      expect(spot.name).toEqual(props.name);
      expect(spot.geolocation).toEqual(props.geolocation);
      expect(spot.cyclingAccessibility).toEqual(props.cyclingAccessibility);
    });

    it('should fail if name is null', () => {
      props = {
        ...props,
        name: null as unknown as Name,
      };

      const result = Spot.create(props);

      expect(result.success).toBeFalsy();
    });

    it('should fail if name is undefined', () => {
      props = {
        ...props,
        name: undefined as unknown as Name,
      };

      const result = Spot.create(props);

      expect(result.success).toBeFalsy();
    });

    it('should fail if geolocation is null', () => {
      props = {
        ...props,
        geolocation: null as unknown as Geolocation,
      };

      const result = Spot.create(props);

      expect(result.success).toBeFalsy();
    });

    it('should fail if geolocation is undefined', () => {
      props = {
        ...props,
        geolocation: undefined as unknown as Geolocation,
      };

      const result = Spot.create(props);

      expect(result.success).toBeFalsy();
    });

    it('should fail if cycling accessibility is null', () => {
      props = {
        ...props,
        cyclingAccessibility: null as unknown as boolean,
      };

      const result = Spot.create(props);

      expect(result.success).toBeFalsy();
    });

    it('should fail if cycling accessibility is undefined', () => {
      props = {
        ...props,
        cyclingAccessibility: undefined as unknown as boolean,
      };

      const result = Spot.create(props);

      expect(result.success).toBeFalsy();
    });
  });
});

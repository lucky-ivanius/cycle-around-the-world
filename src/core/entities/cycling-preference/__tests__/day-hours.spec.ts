import { DayHours, DayHoursProps } from '../day-hours';

describe('DayHours', () => {
  let props: DayHoursProps;

  describe('create', () => {
    beforeEach(() => {
      props = {
        value: 1,
      };
    });

    it('should pass for a valid day hours', () => {
      const result = DayHours.create(props);

      expect(result.success).toBeTruthy();

      const dayHours = result.getData();

      expect(dayHours.value).toEqual(props.value);
    });

    it('should fail if day hours is null', () => {
      props = {
        ...props,
        value: null as unknown as number,
      };

      const result = DayHours.create(props);

      expect(result.success).toBeFalsy();
    });

    it('should fail if day hours is undefined', () => {
      props = {
        ...props,
        value: undefined as unknown as number,
      };

      const result = DayHours.create(props);

      expect(result.success).toBeFalsy();
    });

    it('should fail if day hours is less than 0', () => {
      props = {
        ...props,
        value: -1,
      };

      const result = DayHours.create(props);

      expect(result.success).toBeFalsy();
    });

    it('should fail if day hours is greater than 24', () => {
      props = {
        ...props,
        value: 25,
      };

      const result = DayHours.create(props);

      expect(result.success).toBeFalsy();
    });
  });
});

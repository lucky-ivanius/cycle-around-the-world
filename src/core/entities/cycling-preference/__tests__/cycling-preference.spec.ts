import { UniqueId } from '../../../common/domain/unique-id';
import {
  CyclingPreference,
  CyclingPreferenceProps,
} from '../cycling-preference';
import { DayHours } from '../day-hours';
import { Distance } from '../distance';
import { Speed } from '../speed';

describe('CyclingPreference', () => {
  let props: CyclingPreferenceProps;

  describe('create', () => {
    beforeEach(() => {
      props = {
        userId: new UniqueId(),
        spotId: new UniqueId(),
        cyclingSpeed: Speed.create({ value: 10 }).getData(),
        dailyCyclingHours: DayHours.create({ value: 2 }).getData(),
        distance: Distance.create({ value: 10, unit: 'km' }).getData(),
        estimatedHoursArrived: 100,
      };
    });

    it('should pass for a valid cycling preference', () => {
      const result = CyclingPreference.create(props);

      expect(result.success).toBeTruthy();

      const cyclingPreference = result.getData();

      expect(cyclingPreference).toBeInstanceOf(CyclingPreference);
      expect(cyclingPreference.id).toBeDefined();
      expect(cyclingPreference.userId).toEqual(props.userId);
      expect(cyclingPreference.spotId).toEqual(props.spotId);
      expect(cyclingPreference.cyclingSpeed).toEqual(props.cyclingSpeed);
      expect(cyclingPreference.dailyCyclingHours).toEqual(
        props.dailyCyclingHours
      );
      expect(cyclingPreference.distance).toEqual(props.distance);
      expect(cyclingPreference.estimatedHoursArrived).toEqual(
        props.estimatedHoursArrived
      );
    });

    it('should fail if user id is null', () => {
      props = {
        ...props,
        userId: null as unknown as UniqueId,
      };

      const result = CyclingPreference.create(props);

      expect(result.success).toBeFalsy();
    });

    it('should fail if user id is undefined', () => {
      props = {
        ...props,
        userId: undefined as unknown as UniqueId,
      };

      const result = CyclingPreference.create(props);

      expect(result.success).toBeFalsy();
    });

    it('should fail if spot id is null', () => {
      props = {
        ...props,
        spotId: null as unknown as UniqueId,
      };

      const result = CyclingPreference.create(props);

      expect(result.success).toBeFalsy();
    });

    it('should fail if spot id is undefined', () => {
      props = {
        ...props,
        spotId: undefined as unknown as UniqueId,
      };

      const result = CyclingPreference.create(props);

      expect(result.success).toBeFalsy();
    });

    it('should fail if cycling speed is null', () => {
      props = {
        ...props,
        cyclingSpeed: null as unknown as Speed,
      };

      const result = CyclingPreference.create(props);

      expect(result.success).toBeFalsy();
    });

    it('should fail if cycling speed is undefined', () => {
      props = {
        ...props,
        cyclingSpeed: undefined as unknown as Speed,
      };

      const result = CyclingPreference.create(props);

      expect(result.success).toBeFalsy();
    });

    it('should fail if daily cycling hours is null', () => {
      props = {
        ...props,
        dailyCyclingHours: null as unknown as DayHours,
      };

      const result = CyclingPreference.create(props);

      expect(result.success).toBeFalsy();
    });

    it('should fail if daily cycling hours is undefined', () => {
      props = {
        ...props,
        dailyCyclingHours: undefined as unknown as DayHours,
      };

      const result = CyclingPreference.create(props);

      expect(result.success).toBeFalsy();
    });
  });

  describe('setDistance', () => {
    let cyclingPreference: CyclingPreference;

    beforeEach(() => {
      props = {
        userId: new UniqueId(),
        spotId: new UniqueId(),
        cyclingSpeed: Speed.create({ value: 10 }).getData(),
        dailyCyclingHours: DayHours.create({ value: 2 }).getData(),
        distance: Distance.create({ value: 10, unit: 'km' }).getData(),
        estimatedHoursArrived: 100,
      };
      cyclingPreference = CyclingPreference.create(props).getData();
    });

    it('should pass for valid distance', () => {
      const distance = Distance.create({ value: 5, unit: 'km' }).getData();

      cyclingPreference.setDistance(distance);

      expect(cyclingPreference.distance).toBe(distance);
    });
  });

  describe('setEstimatedHoursArrived', () => {
    let cyclingPreference: CyclingPreference;

    beforeEach(() => {
      props = {
        userId: new UniqueId(),
        spotId: new UniqueId(),
        cyclingSpeed: Speed.create({ value: 10 }).getData(),
        dailyCyclingHours: DayHours.create({ value: 2 }).getData(),
        distance: Distance.create({ value: 10, unit: 'km' }).getData(),
        estimatedHoursArrived: 100,
      };
      cyclingPreference = CyclingPreference.create(props).getData();
    });

    it('should pass for valid estimated hours arrived', () => {
      const estimatedHoursArrived = 50;

      cyclingPreference.setEstimatedHoursArrived(estimatedHoursArrived);

      expect(cyclingPreference.estimatedHoursArrived).toBe(
        estimatedHoursArrived
      );
    });
  });
});

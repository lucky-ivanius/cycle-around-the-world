import { UniqueId } from '../../../common/domain/unique-id';
import { DayHours } from '../day-hours';
import { Distance } from '../distance';
import { Speed } from '../speed';
import { Trip, TripProps } from '../trip';

describe('Trip', () => {
  let props: TripProps;

  describe('create', () => {
    beforeEach(() => {
      props = {
        userId: new UniqueId(),
        spotId: new UniqueId(),
        cyclingSpeed: Speed.create({ value: 10 }).getData(),
        dailyCyclingHours: DayHours.create({ value: 2 }).getData(),
      };
    });

    it('should pass for a valid trip', () => {
      const result = Trip.create(props);

      expect(result.success).toBeTruthy();

      const trip = result.getData();

      expect(trip).toBeInstanceOf(Trip);
      expect(trip.id).toBeDefined();
      expect(trip.userId).toEqual(props.userId);
      expect(trip.spotId).toEqual(props.spotId);
      expect(trip.cyclingSpeed).toEqual(props.cyclingSpeed);
      expect(trip.dailyCyclingHours).toEqual(props.dailyCyclingHours);
      expect(trip.distanceInKilometers).toBeUndefined();
    });

    it('should fail if user id is null', () => {
      props = {
        ...props,
        userId: null as unknown as UniqueId,
      };

      const result = Trip.create(props);

      expect(result.success).toBeFalsy();
    });

    it('should fail if user id is undefined', () => {
      props = {
        ...props,
        userId: undefined as unknown as UniqueId,
      };

      const result = Trip.create(props);

      expect(result.success).toBeFalsy();
    });

    it('should fail if spot id is null', () => {
      props = {
        ...props,
        spotId: null as unknown as UniqueId,
      };

      const result = Trip.create(props);

      expect(result.success).toBeFalsy();
    });

    it('should fail if spot id is undefined', () => {
      props = {
        ...props,
        spotId: undefined as unknown as UniqueId,
      };

      const result = Trip.create(props);

      expect(result.success).toBeFalsy();
    });

    it('should fail if cycling speed is null', () => {
      props = {
        ...props,
        cyclingSpeed: null as unknown as Speed,
      };

      const result = Trip.create(props);

      expect(result.success).toBeFalsy();
    });

    it('should fail if cycling speed is undefined', () => {
      props = {
        ...props,
        cyclingSpeed: undefined as unknown as Speed,
      };

      const result = Trip.create(props);

      expect(result.success).toBeFalsy();
    });

    it('should fail if daily cycling hours is null', () => {
      props = {
        ...props,
        dailyCyclingHours: null as unknown as DayHours,
      };

      const result = Trip.create(props);

      expect(result.success).toBeFalsy();
    });

    it('should fail if daily cycling hours is undefined', () => {
      props = {
        ...props,
        dailyCyclingHours: undefined as unknown as DayHours,
      };

      const result = Trip.create(props);

      expect(result.success).toBeFalsy();
    });
  });

  describe('updateDistance', () => {
    let trip: Trip;

    beforeEach(() => {
      props = {
        userId: new UniqueId(),
        spotId: new UniqueId(),
        cyclingSpeed: Speed.create({ value: 10 }).getData(),
        dailyCyclingHours: DayHours.create({ value: 2 }).getData(),
        distanceInKilometers: Distance.create({ value: 10 }).getData(),
      };
      trip = Trip.create(props).getData();
    });

    it('should pass for valid distance', () => {
      const distanceInKilometers = Distance.create({ value: 5 }).getData();

      trip.updateDistance(distanceInKilometers);

      expect(trip.distanceInKilometers).toBe(distanceInKilometers);
    });
  });
});

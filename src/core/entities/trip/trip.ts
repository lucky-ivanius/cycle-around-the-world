import { Entity } from '../../common/domain/entity';
import { UniqueId } from '../../common/domain/unique-id';
import { Guard } from '../../common/logic/guard';
import { Result } from '../../common/logic/result';
import { DayHours } from './day-hours';
import { Distance } from './distance';
import { Speed } from './speed';

export interface TripProps {
  userId: UniqueId;
  spotId: UniqueId;
  cyclingSpeed: Speed;
  dailyCyclingHours: DayHours;
  distanceInKilometers?: Distance;
}

export class Trip implements Entity<TripProps> {
  get userId() {
    return this.props.userId;
  }

  get spotId() {
    return this.props.spotId;
  }

  get cyclingSpeed() {
    return this.props.cyclingSpeed;
  }

  get dailyCyclingHours() {
    return this.props.dailyCyclingHours;
  }

  get distanceInKilometers() {
    return this.props.distanceInKilometers;
  }

  private constructor(
    private readonly props: TripProps,
    public readonly id: UniqueId
  ) {}

  public static create(props: TripProps, id?: UniqueId): Result<Trip> {
    const propsGuards = [
      Guard.required({ arg: 'User ID', value: props.userId }),
      Guard.required({ arg: 'Spot ID', value: props.spotId }),
      Guard.required({
        arg: 'Cycling Speed (km/h)',
        value: props.cyclingSpeed,
      }),
      Guard.required({
        arg: 'Daily Cycling Hours',
        value: props.dailyCyclingHours,
      }),
    ];

    const guardResult = Result.combine(...propsGuards);

    if (!guardResult.success) return guardResult as Result<Trip>;

    const trip = new Trip(props, id ?? new UniqueId());

    return Result.ok(trip);
  }

  public updateDistance(distanceInKilometers: Distance) {
    this.props.distanceInKilometers = distanceInKilometers;
  }
}

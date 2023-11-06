import { Entity } from '../../common/domain/entity';
import { UniqueId } from '../../common/domain/unique-id';
import { Guard } from '../../common/logic/guard';
import { Result } from '../../common/logic/result';
import { DayHours } from './day-hours';
import { Distance } from './distance';
import { Speed } from './speed';

export interface CyclingPreferenceProps {
  userId: UniqueId;
  spotId: UniqueId;
  cyclingSpeed: Speed;
  dailyCyclingHours: DayHours;
  distance?: Distance;
  estimatedHoursArrived?: number;
}

export class CyclingPreference implements Entity<CyclingPreferenceProps> {
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

  get distance() {
    return this.props.distance;
  }

  get estimatedHoursArrived() {
    return this.props.estimatedHoursArrived;
  }

  private constructor(
    private readonly props: CyclingPreferenceProps,
    public readonly id: UniqueId
  ) {}

  public static create(
    props: CyclingPreferenceProps,
    id?: UniqueId
  ): Result<CyclingPreference> {
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

    if (!guardResult.success) return guardResult as Result<CyclingPreference>;

    const cycling = new CyclingPreference(props, id ?? new UniqueId());

    return Result.ok(cycling);
  }

  public setDistance(distance: Distance) {
    this.props.distance = distance;
  }

  public setEstimatedHoursArrived(value?: number) {
    this.props.estimatedHoursArrived = value;
  }
}

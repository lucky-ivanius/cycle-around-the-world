import { ValueObject } from '../../common/domain/value-object';
import { Guard } from '../../common/logic/guard';
import { Result } from '../../common/logic/result';

const DISTANCE_UNIT = ['m', 'km', 'mil'] as const;

export type DistanceUnit = (typeof DISTANCE_UNIT)[number];

export interface DistanceProps {
  value: number;
  unit: DistanceUnit;
}

export class Distance implements ValueObject<DistanceProps> {
  get value() {
    return this.props.value;
  }

  get unit() {
    return this.props.unit;
  }

  private constructor(private readonly props: DistanceProps) {}

  public static create(props: DistanceProps): Result<Distance> {
    const propsGuards = [
      Guard.required({ arg: Distance.name, value: props.value }),
      Guard.required({ arg: 'Unit', value: props.unit }),
      Guard.contains({
        arg: 'Unit',
        value: props.unit,
        validValues: DISTANCE_UNIT,
      }),
    ];

    const guardResult = Result.combine(...propsGuards);

    if (!guardResult.success) return guardResult as Result<Distance>;

    const distance = new Distance(props);

    return Result.ok(distance);
  }
}

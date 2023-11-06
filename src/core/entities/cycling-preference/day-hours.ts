import { ValueObject } from '../../common/domain/value-object';
import { Guard } from '../../common/logic/guard';
import { Result } from '../../common/logic/result';

export interface DayHoursProps {
  value: number;
}

const MIN_DAY_HOURS_VALUE = 0;
const MAX_DAY_HOURS_VALUE = 24;

export class DayHours implements ValueObject<DayHoursProps> {
  get value() {
    return this.props.value;
  }

  private constructor(private readonly props: DayHoursProps) {}

  public static create(props: DayHoursProps): Result<DayHours> {
    const propsGuards = [
      Guard.required({ arg: 'Daily Cycling Hours', value: props.value }),
      Guard.greaterThanOrEqual({
        arg: 'Daily Cycling Hours',
        value: props.value,
        compareTo: MIN_DAY_HOURS_VALUE,
      }),
      Guard.lessThanOrEqual({
        arg: 'Daily Cycling Hours',
        value: props.value,
        compareTo: MAX_DAY_HOURS_VALUE,
      }),
    ];

    const guardResult = Result.combine(...propsGuards);

    if (!guardResult.success) return guardResult as Result<DayHours>;

    const dayHours = new DayHours(props);

    return Result.ok(dayHours);
  }
}

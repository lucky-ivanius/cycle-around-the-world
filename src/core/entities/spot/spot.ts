import { Entity } from '../../common/domain/entity';
import { UniqueId } from '../../common/domain/unique-id';
import { Guard } from '../../common/logic/guard';
import { Result } from '../../common/logic/result';
import { Geolocation } from './geolocation';
import { Name } from './name';

export interface SpotProps {
  name: Name;
  geolocation: Geolocation;
  cyclingAccessibility: boolean;
}

export class Spot implements Entity<SpotProps> {
  get name() {
    return this.props.name;
  }

  get geolocation() {
    return this.props.geolocation;
  }

  get cyclingAccessibility() {
    return this.props.cyclingAccessibility;
  }

  private constructor(
    private readonly props: SpotProps,
    public readonly id: UniqueId
  ) {}

  public static create(props: SpotProps, id?: UniqueId): Result<Spot> {
    const propsGuards = [
      Guard.required({ arg: Name.name, value: props.name }),
      Guard.required({ arg: Geolocation.name, value: props.geolocation }),
      Guard.required({
        arg: 'Cycling accessibility',
        value: props.cyclingAccessibility,
      }),
    ];

    const guardResult = Result.combine(...propsGuards);

    if (!guardResult.success) return guardResult as Result<Spot>;

    const spot = new Spot(props, id ?? new UniqueId());

    return Result.ok(spot);
  }
}

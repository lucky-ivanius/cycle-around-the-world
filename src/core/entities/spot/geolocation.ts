import { ValueObject } from '../../common/domain/value-object';
import { Guard } from '../../common/logic/guard';
import { Result } from '../../common/logic/result';

export interface GeolocationProps {
  latitude: number;
  longitude: number;
}

const MIN_LATITUDE_VALUE = -90;
const MAX_LATITUDE_VALUE = 90;

const MIN_LONGITUDE_VALUE = -180;
const MAX_LONGITUDE_VALUE = 180;

export class Geolocation implements ValueObject<GeolocationProps> {
  get latitude() {
    return this.props.latitude;
  }

  get longitude() {
    return this.props.longitude;
  }

  private constructor(private readonly props: GeolocationProps) {
    Object.freeze(this);
  }

  public static create(props: GeolocationProps): Result<Geolocation> {
    const latitudeGuards = [
      Guard.required({ arg: 'Latitude', value: props.latitude }),
      Guard.greaterThanOrEqual({
        arg: 'Latitude',
        value: props.latitude,
        compareTo: MIN_LATITUDE_VALUE,
      }),
      Guard.lessThanOrEqual({
        arg: 'Latitude',
        value: props.latitude,
        compareTo: MAX_LATITUDE_VALUE,
      }),
    ];

    const longitudeGuards = [
      Guard.required({ arg: 'Longitude', value: props.longitude }),
      Guard.greaterThanOrEqual({
        arg: 'Longitude',
        value: props.longitude,
        compareTo: MIN_LONGITUDE_VALUE,
      }),
      Guard.lessThanOrEqual({
        arg: 'Longitude',
        value: props.longitude,
        compareTo: MAX_LONGITUDE_VALUE,
      }),
    ];

    const guardResult = Result.combine(...latitudeGuards, ...longitudeGuards);

    if (!guardResult.success) return guardResult as Result<Geolocation>;

    const geolocation = new Geolocation(props);

    return Result.ok(geolocation);
  }
}

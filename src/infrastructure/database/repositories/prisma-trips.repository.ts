import { Prisma, PrismaClient } from '@prisma/client';
import { UniqueId } from '../../../core/common/domain/unique-id';
import { DayHours } from '../../../core/entities/trip/day-hours';
import { Distance } from '../../../core/entities/trip/distance';
import { Speed } from '../../../core/entities/trip/speed';
import { Trip } from '../../../core/entities/trip/trip';
import { TripsRepository } from '../../../core/repositories/trips.repository';
import { CacheService } from '../../services/cache.service';

type PrismaTrip = Prisma.TripGetPayload<object>;

export class PrismaTripsRepository implements TripsRepository {
  public constructor(
    private readonly prismaClient: PrismaClient,
    private readonly cacheService: CacheService
  ) {}

  private mapTripToDomain(prismaTrip: PrismaTrip): Trip {
    const id = new UniqueId(prismaTrip.id);
    const userId = new UniqueId(prismaTrip.userId);
    const spotId = new UniqueId(prismaTrip.spotId);
    const cyclingSpeed = Speed.create({
      value: prismaTrip.cyclingSpeed,
    }).getData();
    const dailyCyclingHours = DayHours.create({
      value: prismaTrip.dailyCyclingHours,
    }).getData();
    const distanceInKilometers = prismaTrip.distanceInKilometers
      ? Distance.create({
          value: prismaTrip.distanceInKilometers,
        }).getData()
      : undefined;

    const trip = Trip.create(
      {
        userId,
        spotId,
        cyclingSpeed,
        dailyCyclingHours,
        distanceInKilometers,
      },
      id
    ).getData();

    return trip;
  }

  async getTripToSpotByUserId(
    userId: UniqueId,
    spotId: UniqueId
  ): Promise<Trip | null> {
    const key = await this.cacheService.parseFromObjectValue({
      userId: userId.toString(),
      spotId: spotId.toString(),
    });

    const cachedTrip = await this.cacheService.get(key);

    if (cachedTrip) {
      const cachedTripObject: PrismaTrip =
        await this.cacheService.parseToObjectValue(cachedTrip);

      return this.mapTripToDomain(cachedTripObject);
    }

    const trip = await this.prismaClient.trip.findFirst({
      where: {
        userId: userId.toString(),
        spotId: spotId.toString(),
      },
    });

    if (!trip) return null;

    const cacheTrip = await this.cacheService.parseFromObjectValue(trip);

    await this.cacheService.create(key, cacheTrip);

    return this.mapTripToDomain(trip);
  }

  async save(trip: Trip): Promise<void> {
    const updatedTrip = await this.prismaClient.trip.upsert({
      create: {
        id: trip.id.toString(),
        userId: trip.userId.toString(),
        spotId: trip.spotId.toString(),
        cyclingSpeed: trip.cyclingSpeed.value,
        dailyCyclingHours: trip.dailyCyclingHours.value,
        distanceInKilometers: trip.distanceInKilometers?.value,
      },
      update: {
        cyclingSpeed: trip.cyclingSpeed.value,
        dailyCyclingHours: trip.dailyCyclingHours.value,
        distanceInKilometers: trip.distanceInKilometers?.value,
      },
      where: {
        userId_spotId: {
          userId: trip.userId.toString(),
          spotId: trip.spotId.toString(),
        },
      },
    });

    const key = await this.cacheService.parseFromObjectValue({
      userId: trip.userId.toString(),
      spotId: trip.spotId.toString(),
    });

    const cacheTrip = await this.cacheService.parseFromObjectValue(updatedTrip);

    await this.cacheService.create(key, cacheTrip);
  }

  async setDistance(tripId: UniqueId, distance: Distance): Promise<void> {
    await this.prismaClient.trip.update({
      data: {
        distanceInKilometers: distance.value,
      },
      where: {
        id: tripId.toString(),
      },
    });
  }
}

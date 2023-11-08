import { Prisma, PrismaClient } from '@prisma/client';
import { UniqueId } from '../../../core/common/domain/unique-id';
import { DayHours } from '../../../core/entities/trip/day-hours';
import { Distance } from '../../../core/entities/trip/distance';
import { Speed } from '../../../core/entities/trip/speed';
import { Trip } from '../../../core/entities/trip/trip';
import { TripsRepository } from '../../../core/repositories/trips.repository';

type PrismaTrip = Prisma.TripGetPayload<object>;

export class PrismaTripsRepository implements TripsRepository {
  public constructor(private readonly prismaClient: PrismaClient) {}

  private mapTripToDomain(prismaTrip: PrismaTrip): Trip {
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

    const trip = Trip.create({
      userId,
      spotId,
      cyclingSpeed,
      dailyCyclingHours,
      distanceInKilometers,
    }).getData();

    return trip;
  }

  async getTripToSpotByUserId(
    userId: UniqueId,
    spotId: UniqueId
  ): Promise<Trip | null> {
    const trip = await this.prismaClient.trip.findFirst({
      where: {
        userId: userId.toString(),
        spotId: spotId.toString(),
      },
    });

    if (!trip) return null;

    return this.mapTripToDomain(trip);
  }

  async save(trip: Trip): Promise<void> {
    await this.prismaClient.trip.upsert({
      create: {
        id: trip.id.toString(),
        userId: trip.userId.toString(),
        spotId: trip.spotId.toString(),
        cyclingSpeed: trip.cyclingSpeed.value,
        dailyCyclingHours: trip.dailyCyclingHours.value,
        distanceInKilometers: trip.dailyCyclingHours.value,
      },
      update: {
        cyclingSpeed: trip.cyclingSpeed.value,
        dailyCyclingHours: trip.dailyCyclingHours.value,
        distanceInKilometers: trip.dailyCyclingHours.value,
      },
      where: {
        id: trip.id.toString(),
      },
    });
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

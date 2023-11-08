import { Prisma, PrismaClient } from '@prisma/client';
import { UniqueId } from '../../../core/common/domain/unique-id';
import { Geolocation } from '../../../core/entities/spot/geolocation';
import { Name } from '../../../core/entities/spot/name';
import { Spot } from '../../../core/entities/spot/spot';
import { SpotsRepository } from '../../../core/repositories/spots.repository';

type PrismaSpot = Prisma.SpotGetPayload<object>;

export class PrismaSpotsRepository implements SpotsRepository {
  public constructor(private readonly prismaClient: PrismaClient) {}

  private mapSpotToDomain(prismaSpot: PrismaSpot): Spot {
    const name = Name.create({
      value: prismaSpot.name,
      slug: prismaSpot.slug,
    }).getData();
    const geolocation = Geolocation.create({
      latitude: prismaSpot.latitude.toNumber(),
      longitude: prismaSpot.longitude.toNumber(),
    }).getData();
    const cyclingAccessibility = prismaSpot.cyclingAccessibility;

    const spot = Spot.create({
      name,
      geolocation,
      cyclingAccessibility,
    }).getData();

    return spot;
  }

  async getSpotById(spotId: UniqueId): Promise<Spot | null> {
    const spot = await this.prismaClient.spot.findUnique({
      where: {
        id: spotId.toString(),
      },
    });

    if (!spot) return null;

    return this.mapSpotToDomain(spot);
  }

  async getSpotByNameSlug(nameSlug: string): Promise<Spot | null> {
    const spot = await this.prismaClient.spot.findFirst({
      where: {
        slug: nameSlug,
      },
    });

    if (!spot) return null;

    return this.mapSpotToDomain(spot);
  }

  async getSpots(): Promise<Spot[]> {
    const spots = await this.prismaClient.spot.findMany({});

    return spots.map(this.mapSpotToDomain);
  }
}

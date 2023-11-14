import { Prisma, PrismaClient } from '@prisma/client';
import { UniqueId } from '../../../core/common/domain/unique-id';
import { Geolocation } from '../../../core/entities/spot/geolocation';
import { Name } from '../../../core/entities/spot/name';
import { Spot } from '../../../core/entities/spot/spot';
import { SpotsRepository } from '../../../core/repositories/spots.repository';
import { CacheService } from '../../services/cache.service';

type BasePrismaSpot = Prisma.SpotGetPayload<object>;

type PrismaSpot = Omit<BasePrismaSpot, 'longitude' | 'latitude'> & {
  longitude: number;
  latitude: number;
};

export class PrismaSpotsRepository implements SpotsRepository {
  public constructor(
    private readonly prismaClient: PrismaClient,
    private readonly cacheService: CacheService
  ) {}

  private parsePrismaSpot(basePrismaSpot: BasePrismaSpot): PrismaSpot {
    return {
      ...basePrismaSpot,
      latitude: basePrismaSpot.latitude.toNumber(),
      longitude: basePrismaSpot.longitude.toNumber(),
    };
  }

  private mapSpotToDomain(prismaSpot: PrismaSpot): Spot {
    const id = new UniqueId(prismaSpot.id);
    const name = Name.create({
      value: prismaSpot.name,
      slug: prismaSpot.slug,
    }).getData();

    const latitude: number =
      typeof prismaSpot.latitude === 'number'
        ? prismaSpot.latitude
        : prismaSpot.latitude;
    const longitude: number =
      typeof prismaSpot.longitude === 'number'
        ? prismaSpot.longitude
        : prismaSpot.longitude;

    const geolocation = Geolocation.create({
      latitude: latitude,
      longitude: longitude,
    }).getData();
    const cyclingAccessibility = prismaSpot.cyclingAccessibility;

    const spot = Spot.create(
      {
        name,
        geolocation,
        cyclingAccessibility,
      },
      id
    ).getData();

    return spot;
  }

  async getSpotById(spotId: UniqueId): Promise<Spot | null> {
    const key = await this.cacheService.parseFromObjectValue({
      spotId: spotId.toString(),
    });

    const cachedSpot = await this.cacheService.get(key);

    if (cachedSpot) {
      const cachedSpotObject: PrismaSpot =
        await this.cacheService.parseToObjectValue(cachedSpot);

      return this.mapSpotToDomain(cachedSpotObject);
    }

    const prismaSpot = await this.prismaClient.spot.findUnique({
      where: {
        id: spotId.toString(),
      },
    });

    if (!prismaSpot) return null;

    const spot = this.parsePrismaSpot(prismaSpot);

    const cacheSpot = await this.cacheService.parseFromObjectValue(spot);

    await this.cacheService.create(key, cacheSpot);

    return this.mapSpotToDomain(spot);
  }

  async getSpotByNameSlug(nameSlug: string): Promise<Spot | null> {
    const key = await this.cacheService.parseFromObjectValue({
      nameSlug: nameSlug,
    });

    const cachedSpot = await this.cacheService.get(key);

    if (cachedSpot) {
      const cachedSpotObject: PrismaSpot =
        await this.cacheService.parseToObjectValue(cachedSpot);

      return this.mapSpotToDomain(cachedSpotObject);
    }

    const prismaSpot = await this.prismaClient.spot.findFirst({
      where: {
        slug: nameSlug,
      },
    });

    if (!prismaSpot) return null;

    const spot = this.parsePrismaSpot(prismaSpot);

    const cacheSpot = await this.cacheService.parseFromObjectValue(spot);

    await this.cacheService.create(key, cacheSpot);

    return this.mapSpotToDomain(spot);
  }

  async getSpots(): Promise<Spot[]> {
    const prismaSpots = await this.prismaClient.spot.findMany({});

    return prismaSpots.map((spot) =>
      this.mapSpotToDomain(this.parsePrismaSpot(spot))
    );
  }
}

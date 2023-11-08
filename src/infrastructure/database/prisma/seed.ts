import { bcryptHashingService, prismaClient } from '../../di/container';

async function seedUsers() {
  await prismaClient.user.create({
    data: {
      username: 'admin',
      password: await bcryptHashingService.hash('admin'),
    },
  });
}

async function seedSpots() {
  const spots = [
    {
      name: 'Antarctica',
      slug: 'antarctica',
      latitude: -79.40631,
      longitude: 0.31493,
      cyclingAccessibility: false,
    },
    {
      name: 'Greenland',
      slug: 'greenland',
      latitude: 77.61923,
      longitude: -42.8126,
      cyclingAccessibility: false,
    },
    {
      name: 'Easter Island',
      slug: 'easter-island',
      latitude: 47.42142,
      longitude: -121.67105,
      cyclingAccessibility: true,
    },
    {
      name: 'Machu Picchu',
      slug: 'machu-picchu',
      latitude: -13.16442,
      longitude: -72.54509,
      cyclingAccessibility: false,
    },
    {
      name: 'Mount Everest',
      slug: 'mount-everest',
      latitude: 27.98824,
      longitude: 86.92502,
      cyclingAccessibility: false,
    },
    {
      name: 'Great Barrier Reef',
      slug: 'great-barrier-reef',
      latitude: 27.98824,
      longitude: 86.92502,
      cyclingAccessibility: false,
    },
    {
      name: 'Stonehenge',
      slug: 'stonehenge',
      latitude: 51.17883,
      longitude: -1.82618,
      cyclingAccessibility: true,
    },
    {
      name: 'Trans-Siberian Railway',
      slug: 'trans-siberian-railway',
      latitude: 42.7289,
      longitude: 133.07688,
      cyclingAccessibility: false,
    },
    {
      name: 'Uluru (Ayers Rock)',
      slug: 'uluru-ayers-rock',
      latitude: -25.34555,
      longitude: 131.03696,
      cyclingAccessibility: false,
    },
    {
      name: 'The Great Wall of China',
      slug: 'great-wall-of-china',
      latitude: 40.35586,
      longitude: 116.00941,
      cyclingAccessibility: true,
    },
  ];

  await prismaClient.spot.createMany({
    data: spots,
  });
}

async function seed() {
  await seedUsers();
  await seedSpots();
}

seed()
  .then(async () => {
    await prismaClient.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prismaClient.$disconnect();
    process.exit(1);
  });

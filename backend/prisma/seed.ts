import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const districts = ['Kolkata', 'Howrah', 'Hooghly', 'North 24 Parganas', 'South 24 Parganas', 'Burdwan', 'Siliguri', 'Durgapur'];

const players = [
  { name: 'Sunil Mallick', email: 'sunil@example.com', elo: 1950, district: 'Kolkata' },
  { name: 'Shamim Mondal', email: 'shamim@example.com', elo: 1880, district: 'Howrah' },
  { name: 'Krishnendu Das', email: 'krishnendu@example.com', elo: 1820, district: 'Kolkata' },
  { name: 'Rajesh Kumar', email: 'rajesh@example.com', elo: 1760, district: 'Howrah' },
  { name: 'Amit Ghosh', email: 'amit@example.com', elo: 1700, district: 'Hooghly' },
  { name: 'Priya Singh', email: 'priya@example.com', elo: 1650, district: 'North 24 Parganas' },
  { name: 'Debashis Roy', email: 'debashis@example.com', elo: 1600, district: 'South 24 Parganas' },
  { name: 'Sanjay Patra', email: 'sanjay@example.com', elo: 1550, district: 'Burdwan' },
  { name: 'Mohan Chatterjee', email: 'mohan@example.com', elo: 1500, district: 'Siliguri' },
  { name: 'Arun Biswas', email: 'arun@example.com', elo: 1480, district: 'Durgapur' },
  { name: 'Tapas Sarkar', email: 'tapas@example.com', elo: 1450, district: 'Kolkata' },
  { name: 'Subhash Mandal', email: 'subhash@example.com', elo: 1420, district: 'Howrah' },
  { name: 'Rina Dey', email: 'rina@example.com', elo: 1380, district: 'Hooghly' },
  { name: 'Bikash Halder', email: 'bikash@example.com', elo: 1350, district: 'North 24 Parganas' },
  { name: 'Kamal Nandi', email: 'kamal@example.com', elo: 1300, district: 'South 24 Parganas' },
  { name: 'Debjit Sen', email: 'debjit@example.com', elo: 1280, district: 'Burdwan' },
  { name: 'Sourav Banerjee', email: 'sourav@example.com', elo: 1250, district: 'Kolkata' },
  { name: 'Nilesh Mukherjee', email: 'nilesh@example.com', elo: 1220, district: 'Howrah' },
  { name: 'Tanmoy Saha', email: 'tanmoy@example.com', elo: 1200, district: 'Siliguri' },
  { name: 'Prasenjit Bose', email: 'prasenjit@example.com', elo: 1180, district: 'Durgapur' },
];

async function main() {
  console.log('Seeding database...');

  // Create clubs
  const club1 = await prisma.club.upsert({
    where: { name: 'Lake Town Carrom Club' },
    update: {},
    create: {
      name: 'Lake Town Carrom Club',
      description: 'Premier carrom club of North Kolkata',
      district: 'Kolkata',
      city: 'Kolkata',
      foundedYear: 2010,
    },
  });

  const club2 = await prisma.club.upsert({
    where: { name: 'Howrah Strikers' },
    update: {},
    create: {
      name: 'Howrah Strikers',
      description: 'Competitive carrom club from Howrah',
      district: 'Howrah',
      city: 'Howrah',
      foundedYear: 2015,
    },
  });

  // Create admin user
  await prisma.user.upsert({
    where: { email: 'admin@carromcarrom.com' },
    update: {},
    create: {
      email: 'admin@carromcarrom.com',
      name: 'Admin',
      displayName: 'Admin',
      role: 'SUPER_ADMIN',
      eloRating: 1200,
      district: 'Kolkata',
      city: 'Kolkata',
    },
  });

  // Create players
  const createdUsers: any[] = [];
  for (let i = 0; i < players.length; i++) {
    const p = players[i];
    const clubId = i < 5 ? club1.id : i < 10 ? club2.id : null;
    const wins = Math.floor(Math.random() * 30) + 10;
    const losses = Math.floor(Math.random() * 20) + 5;
    const draws = Math.floor(Math.random() * 5);

    const user = await prisma.user.upsert({
      where: { email: p.email },
      update: {},
      create: {
        email: p.email,
        name: p.name,
        displayName: p.name.split(' ')[0],
        eloRating: p.elo,
        district: p.district,
        city: p.district,
        state: 'West Bengal',
        clubId,
        totalMatches: wins + losses + draws,
        wins,
        losses,
        draws,
        winStreak: Math.floor(Math.random() * 5),
        bestWinStreak: Math.floor(Math.random() * 8) + 3,
      },
    });
    createdUsers.push(user);
  }

  // Create matches
  for (let i = 0; i < 50; i++) {
    const p1Idx = Math.floor(Math.random() * createdUsers.length);
    let p2Idx = Math.floor(Math.random() * createdUsers.length);
    while (p2Idx === p1Idx) {
      p2Idx = Math.floor(Math.random() * createdUsers.length);
    }

    const p1Score = Math.floor(Math.random() * 26);
    const p2Score = Math.floor(Math.random() * 26);
    const winnerId = p1Score > p2Score
      ? createdUsers[p1Idx].id
      : p1Score < p2Score
        ? createdUsers[p2Idx].id
        : null;

    const daysAgo = Math.floor(Math.random() * 90);
    const playedAt = new Date();
    playedAt.setDate(playedAt.getDate() - daysAgo);

    await prisma.match.create({
      data: {
        player1Id: createdUsers[p1Idx].id,
        player2Id: createdUsers[p2Idx].id,
        player1Score: p1Score,
        player2Score: p2Score,
        winnerId,
        status: 'CONFIRMED',
        matchType: 'SINGLES',
        venue: `${districts[Math.floor(Math.random() * districts.length)]} Club`,
        playedAt,
        recordedById: createdUsers[p1Idx].id,
      },
    });
  }

  // Create a tournament
  const tournament = await prisma.tournament.create({
    data: {
      name: 'Premier Carrom Championship 2026',
      description: 'Annual premier championship for West Bengal',
      format: 'SINGLE_ELIMINATION',
      status: 'COMPLETED',
      startDate: new Date('2026-01-15'),
      endDate: new Date('2026-01-20'),
      venue: 'Netaji Indoor Stadium',
      district: 'Kolkata',
      city: 'Kolkata',
      maxParticipants: 16,
      organizerClubId: club1.id,
    },
  });

  // Add participants
  for (let i = 0; i < 8 && i < createdUsers.length; i++) {
    await prisma.tournamentParticipant.create({
      data: {
        tournamentId: tournament.id,
        userId: createdUsers[i].id,
        placement: i + 1,
      },
    });
  }

  console.log('Seed complete!');
  console.log(`Created ${createdUsers.length} players, 2 clubs, 50 matches, 1 tournament`);
  console.log('Admin login: admin@carromcarrom.com (OTP: 123456)');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

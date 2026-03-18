import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Clearing existing data...')
  await prisma.registration.deleteMany()
  await prisma.teamMember.deleteMany() // Just in case, though handled by cascade
  await prisma.event.deleteMany()

  console.log('Seeding new events...')
  
  const events = [
    // Games
    {
      eventName: 'Volleyball',
      category: 'Games',
      description: '6 players team competition.',
      eventDate: new Date('2026-04-10T09:00:00Z'),
      isTeamEvent: true,
      minTeamSize: 6,
      maxTeamSize: 6,
    },
    {
      eventName: 'Carrom',
      category: 'Games',
      description: '2 players team competition.',
      eventDate: new Date('2026-04-11T10:00:00Z'),
      isTeamEvent: true,
      minTeamSize: 2,
      maxTeamSize: 2,
    },
    {
      eventName: 'Chess',
      category: 'Games',
      description: 'Solo chess championship.',
      eventDate: new Date('2026-04-12T11:00:00Z'),
      isTeamEvent: false,
    },
    {
      eventName: 'ESport BGMI',
      category: 'Games',
      description: '4 players team battle royale.',
      eventDate: new Date('2026-04-13T14:00:00Z'),
      isTeamEvent: true,
      minTeamSize: 4,
      maxTeamSize: 4,
    },
    {
      eventName: 'Badminton',
      category: 'Games',
      description: '2 players team competition.',
      eventDate: new Date('2026-04-14T09:00:00Z'),
      isTeamEvent: true,
      minTeamSize: 2,
      maxTeamSize: 2,
    },
    // Cultural
    {
      eventName: 'Debate competition',
      category: 'Cultural',
      description: 'Solo debate competition.',
      eventDate: new Date('2026-04-15T15:00:00Z'),
      isTeamEvent: false,
    },
    {
      eventName: 'Essay writing',
      category: 'Cultural',
      description: 'Solo essay writing competition.',
      eventDate: new Date('2026-04-16T10:00:00Z'),
      isTeamEvent: false,
    },
    {
      eventName: 'Quiz competition',
      category: 'Cultural',
      description: 'Solo quiz competition testing knowledge.',
      eventDate: new Date('2026-04-17T14:00:00Z'),
      isTeamEvent: false,
    },
    {
      eventName: 'Funny games sangeet khurchi',
      category: 'Cultural',
      description: 'Solo musical chairs competition.',
      eventDate: new Date('2026-04-18T16:00:00Z'),
      isTeamEvent: false,
    },
    {
      eventName: 'Speech competition',
      category: 'Cultural',
      description: 'Solo speech delivery contest.',
      eventDate: new Date('2026-04-19T11:00:00Z'),
      isTeamEvent: false,
    }
  ]

  for (const ev of events) {
    await prisma.event.create({
      data: ev
    })
  }

  console.log('Seeding complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

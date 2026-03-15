import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding events...')
  
  const events = [
    {
      eventName: 'Chess Championship',
      category: 'Games',
      description: 'Annual college chess tournament.',
      eventDate: new Date('2026-04-10T10:00:00Z'),
      entryFee: 50,
    },
    {
      eventName: 'Futsal Cup',
      category: 'Games',
      description: '5v5 football tournament on artificial turf.',
      eventDate: new Date('2026-04-12T16:00:00Z'),
    },
    {
      eventName: 'Badminton Doubles',
      category: 'Games',
      description: 'Campus open badminton doubles competition.',
      eventDate: new Date('2026-04-15T09:00:00Z'),
    },
    {
      eventName: 'Dance Competition',
      category: 'Cultural',
      description: 'Solo and group dance performances across styles.',
      eventDate: new Date('2026-04-20T18:00:00Z'),
    },
    {
      eventName: 'Singing Idol',
      category: 'Cultural',
      description: 'Find the best vocal talent on campus.',
      eventDate: new Date('2026-04-22T17:30:00Z'),
    },
    {
      eventName: 'Drama Festival',
      category: 'Cultural',
      description: 'Short play and skit competition.',
      eventDate: new Date('2026-04-25T14:00:00Z'),
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

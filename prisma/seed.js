const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {

  const user = await prisma.user.create({
    data: {
      username: "StellaSpirit",
      email: "stella@spiritfarer.com",
      password: "damnItGw3n876",
      profile: {
        create: {
          firstName: "Stella",
          lastName: "Spiritfarer",
          age: 38,
          pictureUrl: "https://static.wikia.nocookie.net/spiritfarer/images/d/de/Stella_Artwork.png/revision/latest/scale-to-width-down/270?cb=20210129092157"
        }
      }
    }
  })

  const category = await prisma.category.create({
    data: {
      name: "Goodbyes"
    }
  })

  const post = await prisma.post.create({
    data: {
      title: "The Everdoor",
      content: "Coming up to the everdoor for the last time. It's been so delightful to help every single one of you to achieve peace. Now it's my turn. Thank you everyone.",
      imageUrl: "https://static.wikia.nocookie.net/spiritfarer/images/b/bb/Everdoor.png/revision/latest/scale-to-width-down/756?cb=20210424061357",
      categories: {
        connect: {
          id: category.id
        }
      },
      user: {
        connect: {
          id: user.id
        }
      }
    }
  })

  const comment = await prisma.comment.create({
    data: {
      content: "I'll miss you all!",
      user: {
        connect: {
          id: user.id
        }
      },
      post: {
        connect: {
          id: post.id
        }
      }
    }

  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createUser = async (req, res) => {
    const {
        username,
        email,
        password,
        firstName,
        lastName,
        age,
        pictureUrl
    } = req.body;

    const createdUser = await prisma.user.create({
        data: {
            username,
            email,
            password,
            profile: {
                create: {
                    firstName,
                    lastName,
                    age,
                    pictureUrl
                }
            }
        },

        include: {
            profile: true
        }
    })

    res.json({ data: createdUser });
}

const updateUser = async (req, res) => {
    const userId = parseInt(req.params.id)
    const {
        username,
        email,
        password,
        firstName,
        lastName,
        age,
        pictureUrl
    } = req.body;

    if (username) {
        const updatedUser = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                username
            },
            include: {
                profile: true
            }
        })

        res.json({ data: updatedUser });
    } else if (email) {
        const updatedUser = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                email
            },
            include: {
                profile: true
            }
        })

        res.json({ data: updatedUser });
    } else if (password) {
        const updatedUser = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                password
            },
            include: {
                profile: true
            }
        })

        res.json({ data: updatedUser });
    } else if (firstName) {
        const updatedUser = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                profile: {
                    update: {
                        firstName
                    }
                }
            },
            include: {
                profile: true
            }
        })

        res.json({ data: updatedUser });
    } else if (lastName) {
        const updatedUser = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                profile: {
                    update: {
                        lastName
                    }
                }
            },
            include: {
                profile: true
            }
        })

        res.json({ data: updatedUser });
    } else if (age) {
        const updatedUser = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                profile: {
                    update: {
                        age
                    }
                }
            },
            include: {
                profile: true
            }
        })

        res.json({ data: updatedUser });
    } else if (pictureUrl) {
        const updatedUser = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                profile: {
                    update: {
                        pictureUrl
                    }
                }
            },
            include: {
                profile: true
            }
        })

        res.json({ data: updatedUser });
    } 
}

module.exports = {
    createUser,
    updateUser
};
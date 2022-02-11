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

    let dataInfo = {}

    if(username) {
        dataInfo.username = username
    }
    if(email) {
        dataInfo.email = email
    }
    if(password) {
        dataInfo.password = password
    }
    if(firstName) {
        dataInfo.firstName = firstName
    }
    if(lastName) {
        dataInfo.lastName = lastName
    }
    if(age) {
        dataInfo.age = age
    }
    if(pictureUrl) {
        dataInfo.pictureUrl = pictureUrl
    }

    const reqParam = {
        where: {
            id: userId
        },
        data: {
            ...dataInfo
        },
        include: {
            profile: true
        }
    }
    const updatedUser = await prisma.user.update(reqParam)
    res.json({ data: updatedUser });

    /*if (username) {
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
    }*/
}

const deleteUser = async (req, res) => {
    const userDeleteId = parseInt(req.params.id)
    const relevantComments = await prisma.comment.deleteMany({
        where: {
            userId: userDeleteId
        }
    })
    const relevantPosts = await prisma.post.deleteMany({
        where: {
            userId: userDeleteId
        }
    })
    const deletedUser = await prisma.user.delete({
        where: {
            id: userDeleteId
        }
    })
    res.json("User Deleted")
}

module.exports = {
    createUser,
    updateUser,
    deleteUser
};
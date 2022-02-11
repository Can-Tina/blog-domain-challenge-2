const { use } = require('../routers/post');
const prisma = require('../utils/prisma');

const createPost = async (req, res) => {
    const {
        title,
        content,
        imageUrl,
        name,
        userId
    } = req.body;

    const createdPost = await prisma.post.create({
        data: {
            title,
            content,
            imageUrl,
            user: {
                connect: {
                    id: userId
                }
            },
            categories: {
                connectOrCreate: {
                    where: { name },
                    create: { name }
                }
            }
        },
    });

    res.json({ data: createdPost });
}

const getPosts = async (req, res) => {
    if (!req.query.number && !req.query.user && !req.query.order) {
        console.log("Getting all posts")
        const posts = await prisma.post.findMany({
            include: {
                categories: true,
                comments: true
            }
        })

        res.json({ data: posts })
    } else if (req.query.number) {
        console.log("Getting a number of posts")
        const number = parseInt(req.query.number)
        const posts = await prisma.post.findMany({
            take: number,
            include: {
                categories: true,
                comments: true
            }
        })

        res.json({ data: posts })
    } else if (req.query.user) {
        const user = req.query.user
        if (isNaN(user) === true) {
            console.log("Getting posts by username")
            const posts = await prisma.post.findMany({
                where: {
                    user: {
                        username: user
                    }
                },
                include: {
                    categories: true,
                    comments: true
                }
            })
    
            res.json({ data: posts })
        } else {
            console.log("Getting posts by id")
            const userId = parseInt(user)
            const posts = await prisma.post.findMany({
                where: {
                    user: {
                        id: userId
                    }
                },
                include: {
                    categories: true,
                    comments: true
                }
            })
    
            res.json({ data: posts })
        }
    } else if (req.query.order) {
        console.log("Getting and ordering posts")
        const order = req.query.order
        if (order === "recent") {
            const posts = await prisma.post.findMany({
                orderBy: {
                    updatedAt: 'desc'
                },
                include: {
                    categories: true,
                    comments: true
                }
            })
    
            res.json({ data: posts })
        } else if (order === "oldest") {
            const posts = await prisma.post.findMany({
                orderBy: {
                    updatedAt: 'asc'
                },
                include: {
                    categories: true,
                    comments: true
                }
            })
    
            res.json({ data: posts })
        }
    }
}

const updatePost = async (req, res) => {
    const postId = parseInt(req.params.id)
    const {
        title,
        content,
        imageUrl,
        name
    } = req.body;

    let dataInfo = {}

    if (title) {
        dataInfo.title = title
    }
    if (content) {
        dataInfo.content = content
    }
    if (imageUrl) {
        dataInfo.imageUrl = imageUrl
    }
    if (name) {
        dataInfo.name = name
    }

    const reqParam = {
        where: {
                id: postId
            },
            data: {
                ...dataInfo
            },
            include: {
                user: true
            }
    }

    const updatedPost = await prisma.post.update(reqParam)
    res.json({ data: updatedPost });

    /*if (title) {
        const updatedPost = await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                title
            },
            include: {
                user: true
            }
        })

        res.json({ data: updatedPost });
    } else if (content) {
        const updatedPost = await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                content
            },
            include: {
                user: true
            }
        })

        res.json({ data: updatedPost });
    } else if (imageUrl) {
        const updatedPost = await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                imageUrl
            },
            include: {
                user: true
            }
        })

        res.json({ data: updatedPost });
    } else if (name) {
        const updatedPost = await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                categories: {
                    disconnect: true,
                    connect: {
                        name
                    }
                }
            },
            include: {
                user: true
            }
        })

        res.json({ data: updatedPost });
    }*/
}

const deletePost = async (req, res) => {
    const postDeleteId = parseInt(req.params.id)
    console.log("delId: ", postDeleteId)
    const relevantComments = await prisma.comment.deleteMany({
        where: {
            postId: postDeleteId
        }
    })
    const deletedPost = await prisma.post.delete({
        where: {
            id: postDeleteId
        }
    })
    res.json("Post Deleted")
}

module.exports = {
    createPost,
    getPosts,
    updatePost,
    deletePost
};
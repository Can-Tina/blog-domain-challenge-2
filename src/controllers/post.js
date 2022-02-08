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
            userId
        },
        include: {
            user: {
                include: {
                    profile: true
                }
            }
        }
    });

    const createdCat = await prisma.post.update({
        where: {
            id: createdPost.id
        },
        data: {
            categories: {
                connectOrCreate: {
                    where: { name },
                    create: { name }
                }
            }
        }
    });

    res.json({ data: {...createdPost, category: createdCat } });
}

const getPosts = async (req, res) => {
    const posts = await prisma.post.findMany({
        
    })
    res.json({ data: posts })
}

module.exports = {
    createPost,
    getPosts
};
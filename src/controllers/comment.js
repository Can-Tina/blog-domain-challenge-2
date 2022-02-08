const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createComment = async (req, res) => {
    const {
        parentId,
        content,
        userId,
        postId
    } = req.body;

    const createdComment = await prisma.comment.create({
        data: {
            parentId,
            content,
            userId,
            postId
        },

        include: {
            user: true,
            post: true
        }
    })

    res.json({ data: createdComment });
}

module.exports = {
    createComment
};
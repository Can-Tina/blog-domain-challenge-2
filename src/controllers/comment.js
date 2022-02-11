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

const updateComment = async (req, res) => {
    const userId = parseInt(req.params.id)
    const {
        content
    } = req.body;
    const updatedComment = await prisma.comment.update({
        where: {
            id: userId
        },
        data: {
            content
        },
        include: {
            user: true
        }
    })

    res.json({ data: updatedComment });
}

const deleteComment = async (req, res) => {
    const commentId = parseInt(req.params.id)
    const childComments = await prisma.comment.findMany({
        where: {
            parentId: commentId
        }
    })
    if (childComments.length > 0) {
        const deletedComment = await prisma.comment.update({
            where: {
                id: commentId
            },
            data: {
                content: "[REMOVED]"
            }
        })
    } else {
        const deletedComment = await prisma.comment.delete({
            where: {
                id: commentId
            }
        })
    }
    res.json("Comment Deleted")
}

module.exports = {
    createComment,
    updateComment,
    deleteComment
};
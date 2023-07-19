function postedBy(parent, args, context, info) {
    return context.prisma.Movement.findUnique({
        where: {
            id: parent.id
        }
    }).postedBy()
}

function likes(parent, args, context, info) {
    return context.prisma.Movement.findUnique({
        where: {
            id: parent.id
        }
    }).likes()
}

module.exports = {
    postedBy,
    likes,
}
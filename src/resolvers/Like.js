function user(parent, args, context, info) {
    return context.prisma.Like.findUnique({
        where: {
            id: parent.id
        }
    }).user()
} 

function movement(parent, args, context, info) {
    return context.prisma.Like.findUnique({
        where: {
            id: parent.id
        }
    }).movement()
}

module.exports = {
    user,
    movement,
}
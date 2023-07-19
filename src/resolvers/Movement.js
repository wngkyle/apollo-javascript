function postedBy(parent, args, context, info) {
    return context.prisma.Movement.findUnique({
        where: {
            id: parent.id
        }
    }).postedBy()
}

module.exports = {
    postedBy,
}
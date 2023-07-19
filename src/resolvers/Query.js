function feed(parent, args, context) {
    return context.prisma.Link.findMany()
}

function showAllUsers(parent, args, context) {
    return context.prisma.User.findMany()
}

function show(parent, args, context) {
    return context.prisma.Movement.findMany()
}

function link(parent, args, context) {
    return context.prisma.Link.findUnique({
        where: {
            id: args.id,
        },
    })
}

function movement(parent, args, context) {
    return context.prisma.Movement.findUnique({
        where: {
            id: args.id,
        },
    })
}


module.exports ={
    feed,
    show,
    link,
    movement,
    showAllUsers,
}
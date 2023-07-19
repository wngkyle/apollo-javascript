function links(parent, args, context) {
    return context.prisma.User.findUnique({ 
        where: { 
            id: parent.id 
        }
    }).links()
}

function movements(parent, args, context) {
    return context.prisma.User.findUnique({
        where: {
            id: parent.id
        }
    }).movements()
}

module.exports = {
    links,
    movements,
}
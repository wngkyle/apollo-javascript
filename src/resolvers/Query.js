async function feed(parent, args, context) {
    const where = args.filter 
        ? { 
            OR: [
                { description: { contains: args.filter } },
                { url: { contains: args.filter } },
            ],
        }
        : {}

        const links = await context.prisma.link.findMany({
            where: where,
            skip: args.skip,
            take: args.take,
            orderBy: args.orderBy,
        })

        const count = await context.prisma.link.count({ where })

    return {
        links, 
        count
    }
}

function showAllUsers(parent, args, context) {
    return context.prisma.User.findMany()
}

function show(parent, args, context) {
    const where = args.filter 
    ? {
        OR: [
            { name: { contains: args.filter } },
            { description: { contains: args.filter } }
        ]
    }
    : {}

    const movements = context.prisma.Movement.findMany({
        where: where,
        skip: args.skip,
        take: args.take,
        orderBy: args.orderBy,
    })

    return movements
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
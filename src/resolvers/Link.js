function postedBy(parent, args, context) {
    // First fetching the Link from the database using the Prisma instance
    // and then invoke postedBy() on it
    // Notice that the resolver needs to be called postedBy because it resolves
    // the postedBy field from the Link type in schema.graphql
    return context.prisma.Link.findUnique({ 
        where: { 
            id: parent.id 
        }
    }).postedBy()
}

module.exports = {
    postedBy,
}

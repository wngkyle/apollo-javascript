const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../util')
const { user } = require('./Vote')

async function signup(parent, args, context, info) {
    // Encrypting the User's password using the bcrypt.js library 
    const password = await bcrypt.hash(args.password, 10)

    // Use PrismaClient instance to store the new User record in the database
    const user = await context.prisma.user.create({ data: { ...args, password }})

    // Generate a JSON web token which is signed with an APP_SECRET
    // You still need to create this APP_SECRET and install the jwt library 
    const token = jwt.sign({ userId: user.id }, APP_SECRET)

    // Returning the token and the user in an object that adheres to the shape of an AuthPayload object
    return {
        token,
        user,
    }
}

async function login(parent, args, context, info) {
    // Use PrismaClient instance to retrieve an existing User record by the email address
    // If no user is found, return a corresponding error
    const user = await context.prisma.user.findUnique({ where: { email: args.email } })
    if (!user) {
        throw new Error("No such user found")
    }
    
    // Compare the provided password with the one that is stored in the database
    // If don't match, then return an error
    const valid = await bcrypt.compare(args.password, user.password)
    if (!valid) {
        throw new Error("Invalid Password")
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET)

    // Return token and user
    return {
        token,
        user,
    }
}

// Using userId to connect the Link to be created with the User who is creating it
async function post(parent, args, context, info) {
    const { userId } = context
  
    const newLink = await context.prisma.Link.create({
        data: {
            url: args.url,
            description: args.description,
            postedBy: { connect: { id: userId } },
        }
    })
    context.pubsub.publish("NEW_LINK", newLink)

    return newLink
}

async function vote(parent, args, context, info) {
    const userId = context.userId

    // Check double-voting
    // fetch a vote with the same linkId and userId
    // If the vote exists, it will be stored in the vote variable, resulting in the boolean true from the call to Boolean(Vote)
    // If Boolean(Vote) returns false, the vote.create method will be used to create a new Vote that's connected to the User and the Link
    const vote = await context.prisma.Vote.findUnique({
        where: {
            linkId_userId: {
                linkId: Number(args.linkId),
                userId: userId
            }
        }
    })

    if(Boolean(vote)) {
        throw new Error(`Already voted for link: ${args.linkId}`)
    }

    const newVote = context.prisma.Vote.create({
        data: {
            user: { connect: { id: userId} },
            link: { connect: { id: Number(args.linkId) } },
        }
    })
    context.pubsub.publish("NEW_VOTE", newVote)

    return newVote
}


async function addmovement(parent, args, context, info) {
    const { userId } = context

    const newMovement = await context.prisma.Movement.create({
        data: {
            name: args.name,
            exercise: args.exercise,
            targetMuscle: args.targetMuscle,
            movementPattern: args.movementPattern,
            equipment: args.equipment,
            skillLevel: args.skillLevel,
            description: args.description,
            postedBy: { connect: { id: userId } },
        }
    })
    context.pubsub.publish("NEW_MOVEMENT", newMovement)

    return newMovement
}

function deleteMovement(parent, args, context) {
    return context.prisma.Movement.delete({
        where: { 
            id: args.id 
        },
    })
}

async function like(parent, args, context, info) {
    const userId = context.userId

    const like = await context.prisma.Like.findUnique({
        where: {
            movementId_userId: {
                movementId: Number(args.movementId),
                userId: userId
            }
        }
    })
    
    if (Boolean(like)) {
        throw new Error(`Already voted for movement: ${args.movementId}`)
    }

    const newLike = context.prisma.Like.create({
        data: {
            user: { connect: { id: userId } },
            movement: { connect: { id: Number(args.movementId) } }
        }
    })
    context.pubsub.publish("NEW_LIKE", newLike)

    return newLike
}

module.exports = {
    signup,
    login,
    post,
    addmovement,
    deleteMovement,
    vote,
    like,
}
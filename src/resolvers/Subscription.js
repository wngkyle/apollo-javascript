// Rather than returning any data directly, they return an AsyncIterator which subsequently is used 
// by the GraphQL server to push the event data to the client
// asyncIterator() : a function that is used to resolve subsriptions and push the event data
function newLinkSubscribe(parent, args, context, info) {
    return context.pubsub.asyncIterator("NEW_LINK")
}

// Subscription resolvers are wrapped inside an object and need to be provided as the value for a
// subscribe field 
// You also need to provide another field called resolve that actually returns the data from the 
// data emitted by the AsyncIterator
const newLink = {
    subscribe: newLinkSubscribe,
    // Payload here represents the data sent to the subscribed clients when a new vote is published
    // payload = new vote data
    resolve: payload => {
        return payload
    },
}

function newVoteSubscribe(parent, args, context, info) {
    return context.pubsub.asyncIterator("NEW_VOTE")
}

const newVote = {
    subscribe: newVoteSubscribe,
    resolve: payload => {
        return payload
    }
}

function newMovementSubscribe(parent, args, context, info) {
    return context.pubsub.asyncIterator("NEW_MOVEMENT")
}

const newMovement = {
    subscribe: newMovementSubscribe,
    resolve: payload => {
        return payload
    }
}

function newLikeSubscribe(parent, args, context, info) {
    return context.pubsub.asyncIterator("NEW_LIKE")
}

const newLike = {
    subscribe: newLikeSubscribe,
    resolve: payload => {
        return payload
    }
}

module.exports = {
    newLink,
    newVote,
    newMovement,
    newLike,
}
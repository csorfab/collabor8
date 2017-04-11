export const ADD_OFFER = 'ADD_OFFER'
export const REMOVE_ALL_OFFERS = 'REMOVE_ALL_OFFERS'
export const REMOVE_RANDOM_OFFERS = 'REMOVE_RANDOM_OFFERS'
export const SIGNED_IN = 'SIGNED_IN'
export const LOGOUT = 'LOGOUT'
export const UPDATE_STATUS = 'UPDATE_STATUS'
export const SET_GAUTH2 = 'SET_GAUTH2'


export const logout = () => ({
    type: LOGOUT
})

export const signedIn = (user) => ({
    type: SIGNED_IN,
    user: user
})

export function removeRandomOffers() {
    return {
        type: REMOVE_RANDOM_OFFERS
    }
}

export function removeAllOffers() {
    return {
        type: REMOVE_ALL_OFFERS
    }
}

var offerId = 1

export function addRandomOffer(user) {
    return {
        type: ADD_OFFER,
        offer: {
            id: -1,
            numberOfParticipants: Math.ceil(Math.random()*100),
            description: "We are offering 120 english speaking psychology BA students as \
                participants for experiments.",
            availabilityFrom: "2017-03-02",
            availabilityTill: "2018-03-02",
            locationString: "Budapest, Hungary",
            languages: "Hungarian (native), Englsh",
            online: true,
            lab: true,
            field: false,
            type: 'pay',
            user
        }
    }
}
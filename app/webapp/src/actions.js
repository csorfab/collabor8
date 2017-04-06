export const ADD_OFFER = 'ADD_OFFER'
export const REMOVE_ALL_OFFERS = 'REMOVE_ALL_OFFERS'
export const REMOVE_RANDOM_OFFERS = 'REMOVE_RANDOM_OFFERS'
export const UPDATE_STATUS = 'UPDATE_STATUS'
export const SIGNED_IN = 'SIGNED_IN'
export const LOGOUT = 'LOGOUT'

export const logout = () => (
    {
        type: LOGOUT
    }
)

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

export function addRandomOffer() {
    return {
        type: ADD_OFFER,
        offer: {
            id: offerId++,
            numberOfParticipants: Math.ceil(Math.random()*100),
            description: "We are offering 120 english speaking psychology BA students as \
                participants for experiments.",
            availability: "2017.03.02 - 2017.07.30",
            location: "Budapest, Hungary",
            languages: "Hungarian (native), Englsh",
            online: 1,
            lab: 1,
            field: 0,
            type: 2,
            user: {
                name: 'Ikszipsz Ilona',
                organization: {
                    name: 'Department of cognitive sciences',
                    uniname: 'ELTE-PPK',
                    location: 'Budapest'
                }
            }
        }
    }
}
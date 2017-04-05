export const ADD_OFFER = 'ADD_OFFER'


export function addRandomOffer() {
    return {
        type: ADD_OFFER,
        offer: {
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
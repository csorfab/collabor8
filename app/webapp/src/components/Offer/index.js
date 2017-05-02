import Offer from './Offer';

export const blankOffer = (session = {user: {}}) => ({
    id: -1,
    numberOfParticipants: '',
    description: '',
    availabilityFrom: "2017-03-02",
    availabilityTill: "2018-03-02",
    location: {
        label: ""
    },
    languageNative: '',
    languageSecond: '',
    testMethods: {},
    devices: {},
    payment: '',
    user_id: session.user.id,
    user: session.user
})

export default Offer;

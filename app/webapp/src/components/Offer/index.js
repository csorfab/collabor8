import Offer from './Offer';

export const blankOffer = () => ({
        id: -1,
        numberOfParticipants: Math.ceil(Math.random()*100),
        description: "We are offering 120 english speaking psychology BA students as \
            participants for experiments.",
        availabilityFrom: "2017-03-02",
        availabilityTill: "2018-03-02",
        locationString: "Budapest, Hungary",
        languages: "Hungarian (native), Englsh",
        online: 1,
        lab: 1,
        field: 0,
        type: 'pay'
})

export default Offer;

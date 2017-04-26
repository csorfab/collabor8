import Offer from './Offer';

export const blankOffer = () => ({
    id: -1,
    numberOfParticipants: '',
    description: '',
    availabilityFrom: "2017-03-02",
    availabilityTill: "2018-03-02",
    locationString: "Budapest, Hungary",
    languages: "Hungarian (native), Englsh",
    online: 1,
   // lab: 0,
    //field: 0,
    type: 'pay'
})

export default Offer;

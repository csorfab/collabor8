import React, { Props } from 'react'
import Offers from '../components/Offers'

const offersSeed = [
    {
        numberOfParticipants: 121,
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
    },

    {
        numberOfParticipants: 67,
        description: "We are offering 45 english speaking psychology BA students as \
                participants for experiments.",
        availability: "2017.05.02 - 2017.07.30",
        location: "Budapest, Hungary",
        languages: "Hungarian (native), Englsh",
        online: 1,
        lab: 1,
        field: 0,
        type: 2,
        user: {
            name: 'Lofasz Ilona',
            organization: {
                name: 'Department of anyad sciences',
                uniname: 'ELTE-PSK',
                location: 'Bukarest'
            }
        }
    }    
    
]

const App = () => (
    <div>
        <header className="navbar navbar-static-top">
            <div className="container">
                <div className="navbar-header">Collabor8</div>
                <nav className="collapse navbar-collapse">
                    <ul className="nav navbar-nav navbar-right">
                        <li>How it works</li>
                        <li>Sign up</li>
                        <li>Request resource</li>
                        <li>Offer resource</li>
                    </ul>
                </nav>
            </div> 
        </header>
        <div className="container c8-main-box">
            <h1>Access or share behavioral testing resources by collaborating with other researchers around the world.</h1>
            <div className="container-fluid">
                <div className="col-md-3">I'm looking for  test participants,</div>
                <div className="col-md-3">Who are located in or available online</div>
                <div className="col-md-3">Speaking any languages</div>
            </div>
        </div>
        <Offers offers={offersSeed} />
    </div>
)

export default App

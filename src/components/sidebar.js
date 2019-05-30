import React from 'react';
import './sidebar.css';
import UpcomingMatches from './upcomingMatches';
import LiveScores from './liveScore';
class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            upcomingMatch: true,
            liveScore: false,
            value: 'UpcomingMatch'
        }
    }
    display = () => {
        if (this.state.value === 'UpcomingMatch')
            return <UpcomingMatches upcomingMatch={this.state.upcomingMatch} />
        else if (this.state.value === 'LiveScore')
            return <LiveScores liveScore={this.state.liveScore} />
    }
    handleUpcomingMatch = (e) => {
        e.preventDefault();
        this.setState({
            upcomingMatch: true,
            value: 'UpcomingMatch',
            liveScore:false
        })
    }
    handleLiveScore = () => {
        this.setState({
            liveScore: true,
            value: 'LiveScore',
            upcomingMatch:false

        })
    }
    render() {
        return (
            <div className="dashboard">
                <div className="sidebar">
                    <ul className="menu">
                        <li>
                            <div className="link" onClick={this.handleUpcomingMatch} ><label>Upcoming Match</label></div>
                        </li>
                        <li>
                            <div className="link" onClick={this.handleLiveScore} ><label>Live Score</label></div>
                        </li>
                    </ul>
                </div>
                <div className="container">
                    {this.display()}
                </div>
            </div>
        )
    }
}
export default Sidebar;
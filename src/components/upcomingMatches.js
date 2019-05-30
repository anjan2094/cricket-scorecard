import React from 'react';
import Squad from './squad';

class UpcomingMatches extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            upcomingMatch: null,
            check: false,
            squadCheck: false,
            squadFile: '',
            localTeamId: '',
            visitorTeamId: '',
            localTeam: '',
            visitorTeam: ''
        }
    }
    refresh () {
        return window.location.reload();
    }
    componentDidMount() {
        fetch(`http://www.goalserve.com/getfeed/188d83fe0dde43258886f0b262233b37/cricket/schedule?json=1`)
            .then(res => res.json())
            .then(result => {
                console.log(result)
                this.setState({
                    upcomingMatch: result,
                    check: true,
                    matchCheck: false,
                })
            })
    }
    handleSquad = (e, squadFile, localTeamId, visitorTeamId, localTeam, visitorTeam) => {
        e.preventDefault()
        console.log('chech file---', squadFile)
        this.setState({
            squadCheck: true,
            check: false,
            squadFile,
            localTeamId,
            visitorTeamId,
            localTeam,
            visitorTeam
        })
    }
    render() {
        if (this.state.check) {
            return (
                <div className="root">
                    <h1>Upcoming Matches</h1>
                    <button className="button" onClick={this.refresh}>Reload</button>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Date / Time</th>
                                <th>Tournament</th>
                                <th>Home team</th>
                                <th>Visitor team</th>
                                <th>Venue</th>
                                <th>Format</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.upcomingMatch.fixtures.category.map(match => {
                                return <tr className="squad-link" key={match.id + 10000}
                                    onClick={e => this.handleSquad(e, match.squads_file, match.match.localteam.id, match.match.visitorteam.id, match.match.localteam.name, match.match.visitorteam.name)}>
                                    <td>{match.match.date}/{match.match.time}</td>
                                    <td>{match.name}</td>
                                    <td>{match.match.localteam.name}</td>
                                    <td>{match.match.visitorteam.name}</td>
                                    <td>{match.match.matchinfo.info[3].value}</td>
                                    <td>{match.match.type}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            )
        }
        else if (this.state.squadCheck) {
            return (
                <Squad file={this.state.squadFile} localTeamId={this.state.localTeamId}
                    visitorTeamId={this.state.visitorTeamId} localTeam={this.state.localTeam} visitorTeam={this.state.visitorTeam} />
            )
        }
        else {
            return (
                <div className="message">
                    <h1>Loading Upcoming Matches !!!</h1>
                </div>
            )
        }
    }
}
export default UpcomingMatches;
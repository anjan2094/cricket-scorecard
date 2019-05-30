import React from 'react';

class Squad extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squad: null,
            file: props.file,
            localTeamId: props.localTeamId,
            visitorTeamId: props.visitorTeamId,
            localTeam: props.localTeam,
            visitorTeam: props.visitorTeam,
            isSquad: false,
            localTeamRole: {},
            visitorTeamRole: {}
        }
    }
    componentDidMount() {
        fetch(`http://www.goalserve.com/getfeed/188d83fe0dde43258886f0b262233b37/cricketfixtures/${this.state.file}?json=1`)
            .then(res => res.json())
            .then(result => {
                result.squads.category.team.map(team => {
                    if (team.id === this.state.localTeamId) {
                        this.setState({
                            localTeamRole: team
                        })
                    }
                    else if (team.id === this.state.visitorTeamId) {
                        this.setState({
                            visitorTeamRole: team
                        })
                    }
                })
                console.log(result)
                this.setState({
                    isSquad: true,
                    squad: result,
                })
            })
    }
    render() {
        if (this.state.isSquad) {
            return (
                <div className="squad">
                    <h1>Squad</h1>
                    <div className="all-table">
                        <div><label>{this.state.localTeamRole.name}</label>
                            <table className="squad-table">
                                <thead>
                                    <tr>
                                        <th>Home team</th>
                                        <th>Role</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.localTeamRole.player.map(player => {
                                        return <tr className="squad-item">
                                            <td>{player.id}</td>
                                            <td>{player.role}</td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <label>{this.state.visitorTeamRole.name}</label>
                            <table className="squad-table">
                                <thead>
                                    <tr>
                                        <th>Home team</th>
                                        <th>Role</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.visitorTeamRole.player.map(player => {
                                        return <tr className="squad-item">
                                            <td>{player.id}</td>
                                            <td>{player.role}</td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="message">
                    <h1>Squad is loading !!!</h1>
                </div>
            )
        }
    }
}
export default Squad;
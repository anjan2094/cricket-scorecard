import React from 'react';
class ScoreCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            check: false,
            match: props.match,
            globalPlayerJSON: [],
        }
    }
    refresh() {
        return window.location.reload();
    }

    calculateStorePoints({ source, playerName, playerId, runs, fours, sixes, maiden_over, wickets, run_out, stumping, catchOuts }) {
        console.log(typeof (runs, fours, sixes))
        let hasFound = false
        this.state.globalPlayerJSON.forEach(gpj => {
            if (gpj.playerId === playerId) {
                hasFound = true
                gpj.points = gpj.points + ((+runs || 0) + 2 * ((+fours || 0) + (+sixes || 0)) + 10 * (+maiden_over || 0) + 20 * (+wickets || 0) + 10 * (+catchOuts || 0) + 10 * (+stumping || 0) + 10 * (+run_out || 0))
            }
        })
        if (!hasFound) {
            this.state.globalPlayerJSON.push({
                playerId,
                playerName,
                points: ((+runs || 0) + 2 * ((+fours || 0) + (+sixes || 0)) + 10 * (+maiden_over || 0) + 20 * (+wickets || 0) + 10 * (+catchOuts || 0) + 10 * (+stumping || 0) + 10 * (+run_out || 0))
            })
        }

        return (+runs || 0) + 2 * ((+fours || 0) + (+sixes || 0)) + 10 * (+maiden_over || 0) + 20 * (+wickets || 0) + 10 * (+catchOuts || 0) + 10 * (+stumping || 0) + 10 * (+run_out || 0);

    }
    render() {
        if (this.state.match && this.state.match.match && this.state.match.match.inning) {
            return (
                <div className="match">
                    <button className="button" onClick={this.refresh}>Reload</button>
                    <h1>{this.state.match.name}</h1>
                    {/* If inning is an array */}
                    <div>
                        {Array.isArray(this.state.match.match.inning) && this.state.match.match.inning.map(inning => {
                            return <div key={inning.inningnum + 10}>
                                <div className="team-score">
                                    <p className="team1">{inning.name}</p>
                                    <p className="score">{inning.total.tot}/{inning.total.wickets}</p>
                                </div>
                                <table className="inning">
                                    <thead>
                                        <tr>
                                            <th>Batting Stats</th>
                                        </tr>
                                    </thead>
                                    <thead>
                                        <tr>
                                            <th>Batsman Name</th>
                                            <th>Runs</th>
                                            <th>Balls</th>
                                            <th>4s</th>
                                            <th>6s</th>
                                            <th>Strike Rate</th>
                                            <th>Dots</th>
                                            <th>Status</th>
                                            <th>Batsmen Points</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {inning.batsmanstats.player.map(player => {
                                            return <tr className="batsman-info">
                                                <td>{player.batsman}</td>
                                                <td>{player.r}</td>
                                                <td>{player.b}</td>
                                                <td>{player.s4}</td>
                                                <td>{player.s6}</td>
                                                <td>{player.sr}</td>
                                                <td>{player.dots}</td>
                                                <td>{player.status}</td>
                                                <td>{this.calculateStorePoints({ source: 'batting', playerName: player.batsman, playerId: player.profileid, runs: player.r, fours: player.s4, sixes: player.s6 })}</td>
                                            </tr>
                                        })}
                                    </tbody>
                                    <thead>
                                        <tr>
                                            <th>Bowling Stats</th>
                                        </tr>
                                    </thead>
                                    <thead>
                                        <tr>
                                            <th>Bowler Name</th>
                                            <th>Overs</th>
                                            <th>Maidens</th>
                                            <th>Runs</th>
                                            <th>Wickets</th>
                                            <th>Economy</th>
                                            <th>Noball</th>
                                            <th>Wideball</th>
                                            <th>Bowler Points</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {inning.bowlers.player.map(player => {
                                            return <tr className="bowler-info">
                                                <td>{player.bowler}</td>
                                                <td>{player.o}</td>
                                                <td>{player.m}</td>
                                                <td>{player.r}</td>
                                                <td>{player.w}</td>
                                                <td>{player.er}</td>
                                                <td>{player.nb}</td>
                                                <td>{player.wd}</td>
                                                <td>{this.calculateStorePoints({ source: 'bowling', playerName: player.bowler, playerId: player.profileid, maiden_over: player.m, wickets: player.w })}</td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        })}
                    </div>
                    {/* If inning is an object */}
                    <div>
                        {(typeof this.state.match.match.inning === 'object' && !Array.isArray(this.state.match.match.inning)) &&
                            <div>
                                <div className="team-score">
                                    <p className="team1">{this.state.match.match.inning.name}</p>
                                    <p className="score">{this.state.match.match.inning.total.tot}/{this.state.match.match.inning.total.wickets}</p>
                                </div>
                                <table className="inning">
                                    <thead>
                                        <tr>
                                            <th>Batting Stats</th>
                                        </tr>
                                    </thead>
                                    <thead>
                                        <tr>
                                            <th>Batsman Name</th>
                                            <th>Runs</th>
                                            <th>Balls</th>
                                            <th>4s</th>
                                            <th>6s</th>
                                            <th>Strike Rate</th>
                                            <th>Dots</th>
                                            <th>Status</th>
                                            <th>Batsmen Points</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.match.match.inning.batsmanstats.player.map(player => {
                                            return <tr className="batsman-info">
                                                <td>{player.batsman}</td>
                                                <td>{player.r}</td>
                                                <td>{player.b}</td>
                                                <td>{player.s4}</td>
                                                <td>{player.s6}</td>
                                                <td>{player.sr}</td>
                                                <td>{player.dots}</td>
                                                <td>{player.status}</td>
                                                <td>{this.calculateStorePoints({ source: 'batting', playerName: player.batsman, playerId: player.profileid, runs: player.r, fours: player.s4, sixes: player.s6 })}</td>
                                            </tr>
                                        })}
                                    </tbody>
                                    <thead>
                                        <tr>
                                            <th>Bowling Stats</th>
                                        </tr>
                                    </thead>
                                    <thead>
                                        <tr>
                                            <th>Bowler Name</th>
                                            <th>Overs</th>
                                            <th>Maidens</th>
                                            <th>Runs</th>
                                            <th>Wickets</th>
                                            <th>Economy</th>
                                            <th>Noball</th>
                                            <th>Wideball</th>
                                            <th>Bowler Points</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.match.match.inning.bowlers.player.map(player => {
                                            return <tr className="bowler-info">
                                                <td>{player.bowler}</td>
                                                <td>{player.o}</td>
                                                <td>{player.m}</td>
                                                <td>{player.r}</td>
                                                <td>{player.w}</td>
                                                <td>{player.er}</td>
                                                <td>{player.nb}</td>
                                                <td>{player.wd}</td>
                                                <td>{this.calculateStorePoints({ source: 'bowling', playerName: player.bowler, playerId: player.profileid, maiden_over: player.m, wickets: player.w })}</td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        }
                    </div>

                    <div className="fielding-stats">
                        {(this.state.match.match.lineups.localteam) &&
                            <div>
                                <h3>{this.state.match.match.localteam.name}</h3>
                                <table className="fielding-stats-table">
                                    <thead>
                                        <tr>
                                            <th>Fielding Stats</th>
                                        </tr>
                                    </thead>
                                    <thead>
                                        <tr>
                                            <th>Player Name</th>
                                            <th>Catches</th>
                                            <th>Stumpings</th>
                                            <th>Runouts</th>
                                            <th>Fielding Points</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.match.match.lineups.localteam.player.map(player => {
                                            return <tr >
                                                <td>{player.name}</td>
                                                <td>{player.c}</td>
                                                <td>{player.st}</td>
                                                <td>{player.ro}</td>
                                                <td>{this.calculateStorePoints({ source: 'fielding', playerName: player.name, playerId: player.profileid, stumping: player.st, catchOuts: player.c, run_out: player.ro })}</td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        }
                        {(this.state.match.match.lineups.visitorteam) &&
                            <div>
                                <h3>{this.state.match.match && this.state.match.match.visitorteam.name}</h3>
                                <table className="fielding-stats-table">
                                    <thead>
                                        <tr>
                                            <th>Fielding Stats</th>
                                        </tr>
                                        <tr>
                                            <th>Player Name</th>
                                            <th>Catches</th>
                                            <th>Stumpings</th>
                                            <th>Runouts</th>
                                            <th>Fielding Points</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.match.match.lineups.visitorteam.player.map(player => {
                                            return <tr >
                                                <td>{player.name}</td>
                                                <td>{player.c}</td>
                                                <td>{player.st}</td>
                                                <td>{player.ro}</td>
                                                <td>{this.calculateStorePoints({ source: 'fielding', playerName: player.name, playerId: player.profileid, stumping: player.st, catchOuts: player.c, run_out: player.ro })}</td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        }
                    </div>
                    <div className="player-points">
                        <h2>Player Points</h2>
                        <table className="point-table">
                            <thead>
                                <tr>
                                    <th>Player Name</th>
                                    <th>Point</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.globalPlayerJSON.map(player => {
                                    return <tr key={player.playerId}>
                                        <td>{player.playerName}</td>
                                        <td>{player.points}</td>
                                    </tr>
                                })}

                            </tbody>
                        </table>
                    </div>
                </div >
            )
        }
        else {
            return (
                <div className="page-load">
                    <h2>Match is not started yet</h2>
                </div>
            )
        }
    }
}
export default ScoreCard;

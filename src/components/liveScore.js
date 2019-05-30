import React from 'react';
import ScoreCard from './scoreCard';
class LiveScore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            liveScores: '',
            isScore: false,
            match: '',
            isScoreCheck: false
        }
    }
    componentDidMount() {
        fetch(`http://www.goalserve.com/getfeed/188d83fe0dde43258886f0b262233b37/cricket/livescore?json=1`)
            .then(res => res.json())
            .then(result => {
                console.log('live score--', result)
                this.setState({
                    liveScores: result,
                    isScore: true,
                })
            })
    }
    handleLiveScore = (e, match) => {
        this.setState({
            isScore: false,
            isScoreCheck: true,
            match
        })
    }
    render() {
        if (this.state.isScore) {
            return (
                <div className="live-score">
                    <div>
                        <label>Live Score</label>
                    </div>
                    <div>
                        <table className="live-score-table">
                            <thead>
                                <tr>
                                    <th>Match</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.liveScores.scores.category.map(score => {
                                        return <tr className="score-card-link" key={score.id + 1000} onClick={e => this.handleLiveScore(e, score)}>
                                            <th>{score.name}</th>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        }
        else if (this.state.isScoreCheck) {
            return <ScoreCard match={this.state.match} />
        }
        else {
            return (
                <div className="message">
                    <h1>Live score is loading !!!</h1>
                </div>
            )
        }
    }
}
export default LiveScore;
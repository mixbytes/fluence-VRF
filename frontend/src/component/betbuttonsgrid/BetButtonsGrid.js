import React, {Component} from 'react';
import './BetButtonsGrid.css';
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/es/Fab/Fab";

class BetButtonsGrid extends Component {

    getButton = (n) => {
        return (
            <Fab disabled={this.props.selected} color={"primary"} key={n} size={"small"} style={{
                margin: 5
            }} onClick={() => {
                if (this.props.onClick)
                    this.props.onClick(n);
            }}>
                {n}
            </Fab>
        );
    };

    getTable = () => {
        return (
            <div className="BetTable">
                <div/>
                {this.getButton(0)}
                <div/>
                {Array(36).fill(0).map((v, i) => {
                    return i + 1
                }).map(v => {
                    return this.getButton(v);
                })}
            </div>
        );
    };

    render() {
        return (
            <div className={"BetButtonsGrid"}>
                {this.getTable()}
            </div>
        );
    }
}

export default BetButtonsGrid;

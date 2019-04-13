import React, {Component} from 'react';
import './Game.css';
import Wheel from "../wheel/Wheel";
import BetButtonsGrid from "../betbuttonsgrid/BetButtonsGrid";
import {withFluence} from "../../model/withFluence";

class Game extends Component {

    constructor(props) {
        super(props);
        this.state = {
            wheelSelected: -1
        }
    }

    componentDidMount() {
        // setInterval(() => {
        //     this.setState({
        //         wheelRotation: this.state.wheelRotation + 0.1
        //     })
        // }, 10);
    }

    render() {
        let {wheelSelected} = this.state;
        return (
            <div className={"Game"}>
                <div className={"GameGrid"}>
                    <div className={"GameGrid"}>
                        <Wheel selected={wheelSelected}/>
                    </div>
                    <BetButtonsGrid/>
                </div>
            </div>
        );
    }
}

export default withFluence(Game);

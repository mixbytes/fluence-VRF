import React, {Component} from 'react';
import './Game.css';
import Wheel from "../wheel/Wheel";
import BetButtonsGrid from "../betbuttonsgrid/BetButtonsGrid";
import {withFluence} from "../../model/withFluence";
import PlayersList from "../playerslist/PlayersList";

class Game extends Component {

    constructor(props) {
        super(props);
        this.state = {
            wheelSelected: -1,
            selected: undefined,
            players: [],
            game_status: 0,
        };
        this.session = null;
        this.updater = null;
    }

    getPlayersList = () => {
        // this.session = this.props.fluence.session;
        // this.session.request("participants").then(r => {
        //     this.setState({
        //         players: JSON.parse(r)
        //     });
        // });
        // this.updater = setInterval(() => {
        //     this.session.request("game_status").then(r => {
        //         this.setState({
        //             game_status: r
        //         });
        //         switch (r) {
        //             case 0:
        //                 break;
        //             case 1:
        //                 break;
        //             case 2:
        //                 break;
        //         }
        //     });
        // },1000);
    };

    render() {
        if (!this.props.fluence)
            return null;
        if (!this.session) {
            this.getPlayersList();
        }
        let {wheelSelected} = this.state;
        let publicKey = this.props.fluence.publicKey;
        return (
            <div className={"Game"}>
                <div className={"GameGrid"} style={{
                    flexDirection: "row"
                }}>
                    <div className={"GameGrid"} style={{
                        flexDirection: "column",
                        justifyContent: "start"
                    }}>
                        <Wheel selected={wheelSelected}/>
                        <PlayersList players={this.state.players}/>
                    </div>
                    <BetButtonsGrid selected={this.state.selected} onClick={(n) => {
                        this.setState({selected: n});
                        // this.session.request(`add_stake n ${publicKey}`).then(r => {
                        // });
                    }}/>
                </div>
            </div>
        );
    }
}

export default withFluence(Game);

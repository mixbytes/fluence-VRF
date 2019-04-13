import React, {Component} from 'react';
import './App.css';
import * as fluence from 'fluence';
import {FluenceContext} from "./model/withFluence";
import Game from "./component/game/Game";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import RouletteTheme from "./model/RouletteTheme";


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fluence: null,
        }
    }


    componentDidMount() {
        // address to Fluence contract in Ethereum blockchain.
        // Interaction with blockchain created by MetaMask or with local/remote Ethereum node
        let contractAddress = "0xeFF91455de6D4CF57C141bD8bF819E5f873c1A01";

        // set ethUrl to `undefined` to use MetaMask instead of Ethereum node
        let ethUrl = "http://rinkeby.fluence.one:8545/";

        // application to interact with that stored in Fluence contract
        let appId = "43";

        // create a session between client and backend application
        fluence.connect(contractAddress, appId, ethUrl).then((session) => {
            console.log("Session created");
            let bls = window.bls;
            bls.init().then(() => {
                const sec = new bls.SecretKey();
                sec.setByCSPRNG();
                const pub = sec.getPublicKey();
                this.setState({
                    fluence: {
                        instance: fluence,
                        session: session,
                        privateKey: sec.serializeToHexStr(),
                        publicKey: pub.serializeToHexStr(),
                    }
                });
            });
        });
    }

    render() {
        return (
            <MuiThemeProvider theme={RouletteTheme}>
                <div className={"App"}>
                    <FluenceContext.Provider value={this.state.fluence}>
                        <Game/>
                    </FluenceContext.Provider>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;

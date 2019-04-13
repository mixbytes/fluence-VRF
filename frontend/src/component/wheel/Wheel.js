import React, {Component} from 'react';
import './Wheel.css';
import * as PropTypes from "prop-types";

class Wheel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            angle: 0
        }
    }

    getWheelImg = () => {
        let selected = this.props.selected;
        let angle = selected / 33 * 360;
        return (
            <img alt={""}
                 src={"/img/wheel.png"}
                 className={"Wheel"}
                 style={selected === -1 ? {
                     animation: "Wheel-spin infinite 2s linear"
                 } : {
                     transform: `rotate(${angle}deg)`
                 }}
                 ref={(wheel) => window.wheel = wheel}
            />
        );
    };

    render() {
        return (
            <div className={"WheelWrapper"}>
                {this.getWheelImg()}
            </div>
        );
    }
}

Wheel.defaultProps = {
    selected: 0
};

Wheel.propTypes = {
    selected: PropTypes.number
};

export default Wheel;

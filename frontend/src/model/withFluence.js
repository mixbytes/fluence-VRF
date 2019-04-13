import React from "react";

export const FluenceContext = React.createContext();

export function withFluence(Component) {
    return function ConnectedComponent(props) {
        return (
            <FluenceContext.Consumer>
                {fluence => <Component {...props} fluence={fluence}/>}
            </FluenceContext.Consumer>
        );
    }
}

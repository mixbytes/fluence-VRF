import React, {Component} from 'react';
import './PlayersList.css';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ListItemSecondaryAction from "@material-ui/core/es/ListItemSecondaryAction/ListItemSecondaryAction";
import Typography from "@material-ui/core/es/Typography/Typography";
import Paper from "@material-ui/core/es/Paper/Paper";

class PlayersList extends Component {
    render() {
        return (
            <div className={"PlayersList"}>
                <Paper style={{
                    backgroundColor: "#f44336"
                }}>
                    <List color={"primary"}>
                        {this.props.players.map(player => {
                            return (
                                <div key={player.pk}>
                                    <ListItem>
                                        <Typography style={{
                                            color: "white"
                                        }}>
                                            {player.pk}
                                        </Typography>
                                        {player.selected !== undefined &&
                                        <ListItemSecondaryAction>
                                            <Typography style={{
                                                color: "white"
                                            }}>
                                                {player.selected}
                                            </Typography>
                                        </ListItemSecondaryAction>
                                        }
                                    </ListItem>
                                    <Divider/>
                                </div>
                            );
                        })}
                    </List>
                </Paper>
            </div>
        );
    }
}

export default PlayersList;

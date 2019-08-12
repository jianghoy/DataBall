import React, { Component } from "react";
import Profile from "./Profile";
import Axios from "axios";
import DataView from "./DataViewCountainer";
import SearchBar from "./SearchBar";

class Main extends Component {
  state = {
    playerInfo: {}
  };

  loadPlayerInfo = (param) => {
    Axios.get("/get-player-info",{
      params:param
    })
    .then(response => {
      this.setState({ playerInfo: response.data });
    })
    .catch(error => {
      console.log(error);
    })
    .then(function() {});
  }
  componentDidMount() {
    // remember to bind this in Axios since it definitely can't find this
    this.loadPlayerInfo();
  }

  handleSelectPlayer = playerName =>{
    this.loadPlayerInfo({name:playerName});
  }
  render() {
    return (
      <div className="main">
        <SearchBar loadPlayerInfo={this.handleSelectPlayer} />
        <div className="player">
          <Profile playerInfo={this.state.playerInfo} />
          <DataView playerId={this.state.playerInfo.playerId} />
        </div>
      </div>
    );
  }
}
export default Main;

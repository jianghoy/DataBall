import React, { Component } from "react";
import nba from "nba";
import { Icon, Input, AutoComplete } from "antd";
import { PROFILE_PIC_URL_PREFIX } from "./Constants";

const Option = AutoComplete.Option;
class SearchBar extends Component {
  state = {
    dataSource: []
  };

  // TODO: adjust to move it onto server side
  // TODO: hack out the baked json file
  getPlayerIds = value => {
    return nba.searchPlayers(value).map(player => ({
      fullName: player.fullName,
      playerId: player.playerId
    }));
  };

  handleSearch = value => {
    this.setState({
      dataSource: !value ? [] : this.getPlayerIds(value)
    });
  };

  onSelect = playerName => this.props.loadPlayerInfo(playerName);
  render() {
    const { dataSource } = this.state;
    const options = dataSource.map(player => (
      <Option
        // the key is for react and it must be unique
        // is that guaranteed in baked json file?
        key={player.playerId}
        value={player.fullName}
        className="player-option"
      >
        <img
          className="player-option-image"
          src={`${PROFILE_PIC_URL_PREFIX}/${player.playerId}.png`}
        />
        <span className="player-option-label">{player.fullName}</span>
      </Option>
    ));

    return (
      <AutoComplete
        className="search-bar"
        size="large"
        dataSource={options}
        onSelect={this.onSelect}
        onSearch={this.handleSearch}
        placeholder="Search NBA player"
        optionLabelProp="text"
      >
        <Input
          suffix={<Icon type="search" className="certain-category-icon" />}
        />
      </AutoComplete>
    );
  }
}

export default SearchBar;

import React from "react";
import * as d3 from "d3";
import { hexbin } from "d3-hexbin";
import { court, shots } from "d3-shotchart";
import PropTypes from "prop-types";
import Axios from "axios";

window.d3_hexbin = { hexbin: hexbin }; // workaround library problem

class ShotChart extends React.Component {
  static propTypes = {
    playerId: PropTypes.number.isRequired,
    minCount: PropTypes.number,
    chartType: PropTypes.string,
    displayTooltip: PropTypes.bool,
  };

  // TODO: see if I can skip eager fetch data
  componentDidUpdate() {
    Axios.get("/get-shots-info", {
      params: { id: this.props.playerId }
    }).then(response => {

      const final_shots = response.data.shot_Chart_Detail.map(shot => ({
        x: (shot.locX + 250) / 10,
        y: (shot.locY + 50) / 10,
        action_type: shot.actionType,
        shot_distance: shot.shotDistance,
        shot_made_flag: shot.shotMadeFlag
      }));

      const courtSelection = d3.select("#shot-chart");
      courtSelection.html('');
      const chart_court = court().width(500);
      const chart_shots = shots()
        .shotRenderThreshold(this.props.minCount)
        .displayToolTips(this.props.displayTooltip)
        .displayType(this.props.chartType);
      courtSelection.call(chart_court);
      courtSelection.datum(final_shots).call(chart_shots);
    });
  }
  render() {
    return <div id="shot-chart" />;
  }
}

export default ShotChart;

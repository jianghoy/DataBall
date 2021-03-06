import React, { Component } from "react";
import ShotChart from "./ShotChart";
import CountSlider from "./CountSlider";
import { Radio, Row, Col, Switch } from "antd";
import _ from "lodash";

class DataView extends Component {
  // set default state
  state = {
    minCount: 2,
    chartType: "hexbin",
    displayTooltip: true
  };

  onCountSliderChange = cleanValue => {
    this.setState({ minCount: cleanValue });
  };

  onChartTypeChange = e => {
    this.setState({ chartType: e.target.value });
  };

  onTooltipChange = displayTooltip => {
    this.setState({ displayTooltip });
  };

  render() {
    return (
      <div className="data-view">
        <ShotChart
          playerId={this.props.playerId}
          minCount={this.state.minCount}
          chartType={this.state.chartType}
          displayTooltip={this.state.displayTooltip}
        />
        <div className="filters">
          {this.state.chartType === "hexbin" ? (
            <CountSlider
              minCount={this.state.minCount}
              onCountSliderChange={_.debounce(this.onCountSliderChange, 500)}
            />
          ) : null}
          <br />
          <Row>
            <Col span={9}>
              <Radio.Group
                onChange={this.onChartTypeChange}
                value={this.state.chartType}
              >
                <Radio value="hexbin">Hexbin</Radio>
                <Radio value="scatter">Scatter</Radio>
              </Radio.Group>
            </Col>
            <Col span={4}>
              <Switch
                checkedChildren="On"
                unCheckedChildren="Off"
                onChange={this.onTooltipChange}
                defaultChecked
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default DataView;

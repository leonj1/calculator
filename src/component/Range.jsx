import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Range extends Component {
  constructor(props) {
    super(props);
    this.updateRange = this.updateRange.bind(this);
  }

  updateRange(e) {
    this.props.updateRange(e.target.value);
  }

  render() {
    // console.log(this.props);
    return (
      <div>
        <input id="range" type="range"
               value={this.props.value}
               min={this.props.min}
               max={this.props.max}
               step={this.props.step}
               onChange={this.updateRange}
        />
        <span id="output">{this.props.value}</span>
      </div>
    )
  }
}

Range.PropTypes = {
  updateRange: PropTypes.func.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
};

export default Range;

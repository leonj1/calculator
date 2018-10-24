import React, { Component } from 'react';

class ToggleSwitch extends Component {
  constructor ( props ) {
    super( props );
    this.state = {
      isChecked: null
    };
    this._handleChange = this._handleChange.bind(this);
  }

  componentWillMount () {
    this.setState( { isChecked: this.props.isChecked } );
  }

  render () {
    return(
      <div className="switch-container">
        <label>
          <div className="toggle_switch_wrapper">
            <input ref="switch"
                   checked={ this.state.isChecked }
                   onChange={ this._handleChange }
                   className="toggle_switch"
                   value={this.props.value}
                   type="checkbox" />
          </div>
        </label>
      </div>
    );
  }

  _handleChange () {
    let newValue = !this.state.isChecked;
    this.props.change(newValue);
    this.setState( { isChecked: newValue } );
  }
}

export default ToggleSwitch;

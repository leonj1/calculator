import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Intended to sit at top-most of the display
 * - expand open slowly
 * - show some contents
 * - close slowly
 */
class MyToast extends Component {
  state = {
    visibilityStyle: "mytoast-show",
    additionalClass: {}
  };

  componentDidMount() {
    let self = this;
    if(this.props.duration && this.props.duration > 0) {
      setTimeout(function() {
        self.setState({visibilityStyle: "mytoast-hide"});
        self.props.onClose();
      }, this.props.duration)
    }
    if(this.props.clazz) {
      this.setState({additionalClass: this.props.clazz});
    }
  }

  render(){
    return (
      <div className={"my-toast " + this.state.visibilityStyle + " "}
           style={this.state.additionalClass}>
        { this.props.children }
      </div>
    )
  }

}

MyToast.PropTypes = {
  duration: PropTypes.number, // ms of how long to display the toast
  clazz: PropTypes.shape, // additional css class to apply
  onClose: PropTypes.func.isRequired, // callback when its closed
};

export default MyToast;

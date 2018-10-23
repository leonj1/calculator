import React, { Component } from 'react';
import Settings from "./Settings";
import AffordabilityCalculator from "./AffordabilityCalculator";

class HomeAffordability extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ranges: {
        mortgage: {
          min: 500000,
          max: 700000
        },
        interest_rate: {
          min: 2.1,
          max: 4.5
        },
        taxes: {
          min: 4000,
          max: 20000
        }
      },
      net_income: 0,
      net_expenses: 0,
      concessions: {
        include: false,
        percentage: 0.6
      },
      down_payment: 0,
      initialized: false,
      show_settings: true,
    };
    this.doneSettingsHandler = this.doneSettingsHandler.bind(this);
    this.cancelSettingsHandler = this.cancelSettingsHandler.bind(this);
    this.showSettingsHandler = this.showSettingsHandler.bind(this);
  }

  doneSettingsHandler = function(ranges, concessions) {
    this.setState({
      ranges: ranges,
      concessions: concessions,
      initialized: true,
      show_settings: false
    })
  };

  cancelSettingsHandler = function() {
    this.setState({show_settings: false});
  };

  showSettingsHandler = function() {
    this.setState({show_settings: true});
  };

  render() {
    return (
      <div className="home-affordability-calculator">
        {this.state.show_settings ? (
          <Settings first_time={this.state.initialized}
                    ranges={this.state.ranges}
                    concessions={this.state.concessions}
                    done={this.doneSettingsHandler}
                    cancel={this.doneSettingsHandler}/>
        ) : (
          <AffordabilityCalculator  first_time={this.state.initialized}
                                    net_income={this.state.net_income}
                                    net_expenses={this.state.net_expenses}
                                    down_payment={this.state.down_payment}
                                    showSettingsHandler={this.showSettingsHandler}
                                    ranges={this.state.ranges}
                                    concessions={this.state.concessions}/>
        )}
      </div>
    )
  }
}

export default HomeAffordability;

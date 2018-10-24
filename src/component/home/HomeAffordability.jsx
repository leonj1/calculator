import React, { Component } from 'react';
import Settings from "./Settings";
import AffordabilityCalculator from "./AffordabilityCalculator";

class HomeAffordability extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ranges: {
        mortgage: {
          min: 200000,
          max: 300000
        },
        interest_rate: {
          min: 2.1,
          max: 4.5
        },
        taxes: {
          min: 4000,
          max: 10000
        }
      },
      net_income: 0,
      net_expenses: 0,
      concessions: {
        include: false,
        percentage: 0.6
      },
      down_payment: 0,
      first_time: true,
      show_settings: true,
      pmi_percent: 1.0,
    };
    this.doneSettingsHandler = this.doneSettingsHandler.bind(this);
    this.cancelSettingsHandler = this.cancelSettingsHandler.bind(this);
    this.showSettingsHandler = this.showSettingsHandler.bind(this);
  }

  doneSettingsHandler = function(ranges, concessions, pmi_percent) {
    this.setState({
      ranges: ranges,
      concessions: concessions,
      initialized: true,
      show_settings: false,
      pmi_percent: pmi_percent,
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
          <Settings first_time={this.state.first_time}
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
                                    pmi_percent={this.state.pmi_percent}
                                    concessions={this.state.concessions}/>
        )}
      </div>
    )
  }
}

export default HomeAffordability;

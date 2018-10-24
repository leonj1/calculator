import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
  card1: {
    minWidth: 275,
    maxWidth: 300,
    padding: "5px 10px 5px 10px",
    backgroundColor: "#F5914E",
  },
  card2: {
    minWidth: 275,
    maxWidth: 300,
    padding: "5px 10px 5px 10px",
    backgroundColor: "#F5914E",
    marginTop: "10px",
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

class CalculatorChoices extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return(
      <div>
        <Link to="home" className="NavBar-Item">
          <Card className={classes.card1}>
            <CardContent>
              <Typography variant="h5" component="h2">
                Home Affordability
              </Typography>
              <Typography component="p">
                Help determine if you can afford the home including your expenses and income.
              </Typography>
            </CardContent>
          </Card>
        </Link>
        <Link to="calculator" className="NavBar-Item">
          <Card className={classes.card2}>
            <CardContent>
              <Typography variant="h5" component="h2">
                Basic Calculator
              </Typography>
              <Typography component="p">
                Always handy
              </Typography>
            </CardContent>
          </Card>
        </Link>
      </div>
    );
  }
}

export default withStyles(styles)(CalculatorChoices);
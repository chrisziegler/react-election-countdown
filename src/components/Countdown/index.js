import React, { Component } from 'react';
import Timer from './Timer';
import Controls from './Controls';
import Datepicker from './Datepicker';
import moment from 'moment';

export default class Countdown extends Component {
  state = {
    currentDate: moment(),
    // nextDate: moment({ year: moment().year() + 1 }),
    // Elections
    nextDate: moment('11-06-2018'),
    paused: false
  };

  componentDidMount() {
    this.resume();
  }

  // stop execution of setInterval once component is unmounted
  componentWillUnmount() {
    this.pause();
  }

  resume = () => {
    this.interval = setInterval(() => {
      this.setState({
        currentDate: moment()
      });
    }, 1000);
  };

  pause = () => {
    clearInterval(this.interval);
  };

  getRemainingTime() {
    let { currentDate, nextDate } = this.state,
      diff = nextDate.diff(currentDate);

    return moment.duration(diff);
  }

  handlePausedToggle = () => {
    this.setState(prevState => {
      const paused = !prevState.paused;

      if (paused) {
        this.pause();
      } else {
        this.resume();
      }

      return { paused };
    });
  };

  handleDateReset = nextDate => {
    this.setState({
      nextDate
    });
  };

  render() {
    const { paused, nextDate } = this.state,
      duration = this.getRemainingTime();
    return (
      <section className="hero is-dark is-bold is-fullheight has-text-centered">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              {nextDate.format('MMMM Do, YYYY')} is Coming Up
            </h1>
            <section className="section">
              <Timer duration={duration} />
            </section>
            <Datepicker onDateReset={this.handleDateReset} />
            <Controls
              paused={paused}
              onPausedToggle={this.handlePausedToggle}
            />
          </div>
        </div>
      </section>
    );
  }
}

import React, { Component } from 'react';
import moment from 'moment';

export default class Datepicker extends Component {
  state = {
    date: '',
    valid: true,
    dirty: false
  };

  handleDateChange = ({ target: { value } }) => {
    const date = moment(value),
      valid = date.isValid() && date.isAfter(moment());
    this.setState({
      valid,
      // store our e.target.value in component state for controlled input
      date: value,
      dirty: true
    });
    // if valid set nextDate on application state
    // currentDate is calculated there from moment()
    // duration is calculated when getRemainingTime is called from Timer in index.js
    valid && this.props.onDateReset(date);
  };

  // REMOVED FORM AND FORM SUBMIT THIS HANDLED
  // handleDateSubmit = e => {
  //   const { valid, date } = this.state;
  //   e.preventDefault();
  //   valid && this.props.onDateReset(moment(date));
  // };

  render() {
    let { date, valid, dirty } = this.state,
      classes = 'input';

    valid && dirty && (classes += ' is-success');
    !valid && dirty && (classes += ' is-danger');
    return (
      <div
        className="field is-grouped is-grouped-centered"
        style={{ marginBottom: 40 }}
      >
        <p className="control has-text-centered">
          <input
            className={classes}
            onChange={this.handleDateChange}
            value={date}
            placeholder="MM/DD/YYYY"
          />
          {!valid && (
            <i className="help is-danger is-size-6">
              Please type a valid (and future) date!
            </i>
          )}
        </p>
      </div>
    );
  }
}

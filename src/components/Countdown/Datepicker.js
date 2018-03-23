import React, { Component } from 'react';
import moment from 'moment';

export default class Datepicker extends Component {
  state = {
    date: '',
    valid: true,
    dirty: false
  };

  handleDateChange = ({ target: { value } }) => {
    const date = moment(value, 'MM-DD-YYYY');
    this.setState({
      date: value,
      valid: date.isValid() && date.isAfter(moment()),
      dirty: true
    });
  };

  handleDateSubmit = e => {
    const { valid, date } = this.state;
    e.preventDefault();
    valid && this.props.onDateReset(moment(date));
  };

  render() {
    let { date, valid, dirty } = this.state,
      classes = 'input';

    valid && dirty && (classes += ' is-success');
    !valid && dirty && (classes += ' is-danger');
    return (
      <form onSubmit={this.handleDateSubmit}>
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
          <p className="control">
            <button className="button button is-white is-outlined">
              Reset
            </button>
          </p>
        </div>
      </form>
    );
  }
}

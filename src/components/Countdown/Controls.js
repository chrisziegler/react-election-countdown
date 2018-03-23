import React from 'react';

export default ({ paused, onPausedToggle }) => (
  <div className="field is-grouped is-grouped-centered">
    <p className="control">
      <button
        className="button is-danger is-outlined is-medium"
        disabled={paused}
        onClick={onPausedToggle}
      >
        Pause
      </button>
    </p>
    <p className="control">
      <button
        className="button is-success is-outlined is-medium"
        disabled={!paused}
        onClick={onPausedToggle}
      >
        Resume
      </button>
    </p>
  </div>
);

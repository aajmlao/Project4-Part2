// src/components/UsernameEntry/UsernameEntry.js
import React, { useState } from 'react';

function UsernameEntry({ onUsernameSubmit }) {
  const [handle, setUsername] = useState('');

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    onUsernameSubmit(handle);
  };
  

  return (
    <div className="username-entry">
      <form onSubmit={handleUsernameSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={handle}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <button type="submit" className="btn btn-primary">
          Enter
        </button>
      </form>
    </div>
  );
}

export default UsernameEntry;

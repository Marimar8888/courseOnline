import React from 'react';
import { Link } from 'react-router-dom';

export default function () {
  return (
    <div>
        <h2>Sorry, that page doesn´t exist!</h2>
        <Link to="/">Return to homepage</Link>
    </div>
  )
}

import {
  Link
} from "react-router-dom";
import React from 'react';

const NoMatch = () => {
	return (
        <div className="d-flex flex-column h-100">
	<nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
		<div className="container">
			<Link className="navbar-brand" to="/">Hexlet Chat</Link>
		</div>
	</nav>
</div>
  );
}

export default NoMatch;
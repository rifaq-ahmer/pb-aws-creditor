import React from "react";

import "./dropdown.css";

function DropdownComponent({ setStatusOption, onSubmit, onChange }) {
	return (
		<form onSubmit={onSubmit} onChange={onChange} className="custom-dropdown">
			<select value={setStatusOption.status}>
				{setStatusOption.map((option) => (
					<option key={setStatusOption.status} value={option.status}>
						{option.status_ID}
					</option>
				))}
			</select>

			<input type="submit" value="Submit" />
		</form>
	);
}

export default DropdownComponent;

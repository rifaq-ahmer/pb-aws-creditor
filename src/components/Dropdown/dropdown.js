import React from "react";

import "./dropdown.css";

function DropdownComponent({
	setStatusOption,
	onSubmit,
	onChange,
	loanStatus,
	name,
	value,
}) {
	return (
		<form onSubmit={onSubmit} onChange={onChange} className="custom-dropdown">
			<select
				id={name}
				name={name}
				value={value || loanStatus}
				disabled={loanStatus === 8}
			>
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

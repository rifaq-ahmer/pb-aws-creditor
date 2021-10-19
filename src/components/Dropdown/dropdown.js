import React from "react";

import "./dropdown.css";

function DropdownComponent({
	setStatusOption,
	onSubmit,
	onChange,
	loanStatus,
}) {
	return (
		<form onSubmit={onSubmit} onChange={onChange} className="custom-dropdown">
			<select
				value={loanStatus || setStatusOption.status}
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

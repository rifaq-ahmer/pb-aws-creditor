import React, { useState, useEffect } from "react";
import DropdownComponent from "../Dropdown/dropdown";
import { Auth, API } from "aws-amplify";
import "./creditor.css";

function Creditor() {
	const [status, setStatus] = useState([]);
	const [loanData, setLoanData] = useState([]);
	const [dropDownValue, setDropDownValue] = useState({});

	useEffect(() => {
		Auth.currentAuthenticatedUser().then((response) => {
			const token = response.signInUserSession.accessToken.jwtToken;
			localStorage.setItem("accessToken", token);
			const request = {
				headers: {
					Authorization: token,
				},
			};
			API.get("LoanApprovalApi", "/creditapproval/creditor", request)
				.then((res) => {
					if (typeof res !== "string") {
						setLoanData(res);
					}
				})
				.catch((error) => console.log(error));
		});
		Auth.currentAuthenticatedUser().then(() => {
			const token = localStorage.getItem("accessToken");
			const request = {
				headers: {
					Authorization: token,
				},
			};
			API.get(
				"LoanApprovalApi",
				"/getloanstatustypecreditor/loanstatus",
				request
			)
				.then((res) => setStatus(res))
				.catch((error) => console.log(error));
		});
	}, []);

	const handleChange = (event, name) => {
		const data = { ...dropDownValue };
		data[name] = event.target.value;
		setDropDownValue(data);
	};

	const handleSubmit = async (event, id, name) => {
		event.preventDefault();
		await Auth.currentAuthenticatedUser().then(() => {
			const token = localStorage.getItem("accessToken");
			const request = {
				headers: {
					Authorization: token,
				},
				body: {
					input: JSON.stringify({
						CreditorAssigned_ID: id,
						LoanApplication_Status: dropDownValue[name],
						LoanApplication_BankerComment: "",
					}),
					name: "MyExecution",
					stateMachineArn:
						"arn:aws:states:ap-south-1:618393550001:stateMachine:PBLoanProcessOrchestration",
				},
			};
			API.post("LoanApprovalApi", "/execution", request)
				.then((json) => {
					alert("Loan Status has been changed");
				})

				.catch((err) => {
					console.log(err);
				});
		});
	};

	return (
		<>
			<div className="container">
				<h3 className="grid-heading">All Loan Details</h3>
				<div className="data-grid-header">
					<div>Name</div>
					<div>Buisness</div>
					<div>Loan Amount</div>
					<div>Status</div>
				</div>
				{loanData.length > 0 ? (
					loanData.map((loan, index) => (
						<>
							<div key={loan.Applicant_ID} className="data-grid">
								<div>
									{loan.Applicant_fname} {loan.Applicant_mname}{" "}
									{loan.Applicant_lname}
								</div>
								<div>{loan.Business_Name}</div>
								<div>{loan.LoanApplication_Amount}</div>
								<div>
									<DropdownComponent
										name={`status.${index}`}
										value={dropDownValue[`status.${index}`]}
										setStatusOption={status}
										loanStatus={loan.LoanApplication_Status}
										onSubmit={(event) =>
											handleSubmit(
												event,
												loan.LoanApplication_ID,
												`status.${index}`
											)
										}
										onChange={(e) => handleChange(e, `status.${index}`)}
									/>
								</div>
							</div>
						</>
					))
				) : (
					<h1>No Loan Data Found </h1>
				)}
			</div>
		</>
	);
}

export default Creditor;

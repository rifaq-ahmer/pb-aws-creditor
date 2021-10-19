import React, { useState, useEffect } from "react";
import DropdownComponent from "../Dropdown/dropdown";
import { Auth, API } from "aws-amplify";
import "./creditor.css";

function Creditor() {
	const [status, setStatus] = useState([]);
	const [loanData, setLoanData] = useState([]);

	console.log(status);

	let currentStatus = "";

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

	const handleChange = (event) => {
		currentStatus = event.target.value;
	};

	const handleSubmit = async (event, id) => {
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
						LoanApplication_Status: currentStatus,
						LoanApplication_BankerComment: "Sent To Decision Engine 1234",
					}),
					name: "MyExecution",
					stateMachineArn:
						"arn:aws:states:ap-south-1:052987743965:stateMachine:PBLoanProcessOrchestration",
				},
			};
			API.post("LoanApprovalApi", "/execution", request)
				.then((json) => {
					console.log(json);
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
					loanData.map((loan) => (
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
										setStatusOption={status}
										loanStatus={loan.LoanApplication_Status}
										onSubmit={(event) =>
											handleSubmit(event, loan.CreditorAssigned_ID)
										}
										onChange={handleChange}
									/>
								</div>
							</div>
						</>
					))
				) : (
					<h1>No Load Data Found </h1>
				)}
			</div>
		</>
	);
}

export default Creditor;

// {
/* {loan.LoanApplication_Status !== 8 ? (
									<div>
										<DropdownComponent
											setStatusOption={status}
											onSubmit={(event) =>
												handleSubmit(event, loan.CreditorAssigned_ID)
											}
											onChange={handleChange}
										/>
									</div>
								) : (
									<div className="disabled">
										<DropdownComponent
											setStatusOption={closedStatus}
											onSubmit={(event) =>
												handleSubmit(event, loan.CreditorAssigned_ID)
											}
											onChange={handleChange}
										/>
									</div>
								)} */
// }

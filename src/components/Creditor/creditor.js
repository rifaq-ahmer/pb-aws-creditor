import React, { useState, useEffect } from "react";
import DropdownComponent from "../Dropdown/dropdown";
import axios from "axios";
import { API_ENDPONT } from "../../App";
import "./creditor.css";
import { APP_CLIENT_ID } from "../../App";

function Creditor() {
	const [status, setStatus] = useState([]);
	const [loanData, setLoanData] = useState([]);

	let currentStatus = "";

	const userName = localStorage.getItem(
		`CognitoIdentityServiceProvider.${APP_CLIENT_ID}.LastAuthUser`
	);

	const accessToken = localStorage.getItem(
		`CognitoIdentityServiceProvider.${APP_CLIENT_ID}.${userName}.accessToken`
	);

	axios.defaults.headers.common["Authorization"] = accessToken;
	useEffect(() => {
		axios
			.get(`${API_ENDPONT}/getloanstatustypecreditor/loanstatus`)
			.then((res) => setStatus(res.data))
			.catch((error) => console.log(error));
		axios
			.get(`${API_ENDPONT}/creditapproval/creditor`)
			.then((res) => {
				if (typeof res.data !== "string") {
					setLoanData(res.data);
				}
			})
			.catch((error) => console.log(error));
	}, []);

	const handleChange = (event) => {
		currentStatus = event.target.value;
	};

	const handleSubmit = async (event, id) => {
		event.preventDefault();

		// console.log(currentStatus, currentComment);
		await axios

			.post(`${API_ENDPONT}/execution`, {
				input: JSON.stringify({
					CreditorAssigned_ID: id,
					LoanApplication_Status: currentStatus,
					LoanApplication_BankerComment: "Sent To Decision Engine 1234",
				}),
				name: "MyExecution",
				stateMachineArn:
					"arn:aws:states:ap-south-1:052987743965:stateMachine:PBLoanProcessOrchestration",
			})
			.then((res) => {
				alert(`Data Saved`);
			})

			.catch((err) => {
				console.log(err);
			});
	};
	console.log(loanData);

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

//https://dc1nrv6pua.execute-api.ap-south-1.amazonaws.com/dev/creditapproval/creditor/{loanid}

// {
// 	LoanApplication_Status: status.value,

// 	LoanApplication_BankerComment: " Sent To Decision Engine",
// }

// 	"input": "$util.escapeJavaScript($input.json('$'))",
// 	"stateMachineArn": "arn:aws:states:us-east-1:123456789012:stateMachine:HelloWorld"
// }

// "CreditorCallBackURL":"https://g9yh14f7ve.execute-api.ap-south-1.amazonaws.com/Authorizeddev/creditapproval/creditor")

//input: $util.escapeJavaScript($input.json("CreditorAssigned_ID"= 1,
// 					"LoanApplication_Status"= "5",
// 					"LoanApplication_BankerComment"= "Approved 1234",
// 					"CreditorCallBackURL"="https://g9yh14f7ve.execute-api.ap-south-1.amazonaws.com/Authorizeddev/creditapproval/creditor")),
// name: "MyExecution",
// stateMachineArn:
// 	"arn:aws:states:ap-south-1:052987743965:stateMachine:PBLoanProcessOrchestration",

import React, { useState, useEffect } from "react";
import DropdownComponent from "../Dropdown/dropdown";
import axios from "axios";

import "./creditor.css";

function Creditor() {
	const [status, setStatus] = useState([]);
	const [loanData, setLoanData] = useState([]);

	let currentStatus = "";

	axios.defaults.headers.common["Authorization"] =
		"eyJraWQiOiJXSlpET21BQ0RuS3FHVVhZU2VFXC9pU0J5Y2VRS0xLNlJXdmFiK2pXcDFyWT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIyODEwZmM1OS1lZjNiLTRjNjctYmY5Ni0xMzEzZjExYjdiMzUiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIHBob25lIG9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXV0aF90aW1lIjoxNjMzMzIwMjk0LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGgtMS5hbWF6b25hd3MuY29tXC9hcC1zb3V0aC0xX281WHZTRDluOCIsImV4cCI6MTYzMzQwNjY5NCwiaWF0IjoxNjMzMzIwMjk1LCJ2ZXJzaW9uIjoyLCJqdGkiOiJhNzZkNzAwNS0xOTA2LTRjODEtYjg0Ny1kMjBjZjA1MTM3NDMiLCJjbGllbnRfaWQiOiI0Y2EwNDU1ajM2cXVyNmVtdWY0bzhjZmxrYyIsInVzZXJuYW1lIjoiY3JlZGl0b3IxIn0.ohcnQ3BLyx9h0D75PZ1lMX_4jU-oVmfpC7vXC0AQzLCERwdjOL5xiLWKd_uCTqdCqBmivO8Ncc-cOxZe0j-_jGh8d-gG_LjOUJ0GGq930YFBN01mvwvChWnUAvlwp3z7-taKsqxsfPhHrNs4NIbPaEhxcH4CswuGLrZgS1UiJZdKILAFeQp2XEwzL2dumhd_KVEhIuyR2pOTN4hvSAnuiwEKSmIyyqa9lTw4pHQuxEB8zo-AvSozR_dlSy-JmSlnXpsg0eqVUbbXZQM0BlaA1nh-Epy1fdfA7mqF8PKzrYxiwOXtDoiW2VsDhTNp0Rx69A5GWvIiA_VVrSdBviHW-w";

	useEffect(() => {
		axios
			.get(
				"https://g9yh14f7ve.execute-api.ap-south-1.amazonaws.com/Authorizeddev/getloanstatustypecreditor/loanstatus"
			)
			.then((res) => setStatus(res.data))
			.catch((error) => console.log(error));
		axios
			.get(
				"https://g9yh14f7ve.execute-api.ap-south-1.amazonaws.com/Authorizeddev/creditapproval/creditor"
			)
			.then((res) => setLoanData(res.data))
			.catch((error) => console.log(error));
	}, []);

	const handleChange = (event) => {
		currentStatus = event.target.value;
	};

	const handleSubmit = async (event, id) => {
		event.preventDefault();

		// console.log(currentStatus, currentComment);
		await axios

			.post(
				`https://g9yh14f7ve.execute-api.ap-south-1.amazonaws.com/Authorizeddev/execution`,
				{
					input: JSON.stringify({
						CreditorAssigned_ID: id,
						LoanApplication_Status: currentStatus,
						LoanApplication_BankerComment: "Sent To Decision Engine 1234",
					}),
					name: "MyExecution",
					stateMachineArn:
						"arn:aws:states:ap-south-1:052987743965:stateMachine:PBLoanProcessOrchestration",
				}
			)
			.then((res) => {
				alert(`Data Saved`);
			})

			.catch((err) => {
				console.log(err);
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
				{loanData.map((loan) => (
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
				))}
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

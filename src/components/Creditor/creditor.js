import React, { useState, useEffect } from "react";
import DropdownComponent from "../Dropdown/dropdown";
import axios from "axios";
import { API_ENDPONT } from "../../App";
import "./creditor.css";

function Creditor() {
	const [status, setStatus] = useState([]);
	const [loanData, setLoanData] = useState([]);

	let currentStatus = "";

	axios.defaults.headers.common["Authorization"] =
		"eyJraWQiOiJXSlpET21BQ0RuS3FHVVhZU2VFXC9pU0J5Y2VRS0xLNlJXdmFiK2pXcDFyWT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIyODEwZmM1OS1lZjNiLTRjNjctYmY5Ni0xMzEzZjExYjdiMzUiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIHBob25lIG9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXV0aF90aW1lIjoxNjMzOTI2NzExLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGgtMS5hbWF6b25hd3MuY29tXC9hcC1zb3V0aC0xX281WHZTRDluOCIsImV4cCI6MTYzNDAxMzExMSwiaWF0IjoxNjMzOTI2NzExLCJ2ZXJzaW9uIjoyLCJqdGkiOiIzZjY5MmRlZS0zZGRhLTQwZjgtODYzZS0wZWVkOGIxYjJiNDEiLCJjbGllbnRfaWQiOiI0Y2EwNDU1ajM2cXVyNmVtdWY0bzhjZmxrYyIsInVzZXJuYW1lIjoiY3JlZGl0b3IxIn0.wWRZYrlionGvUXQ_CnolRSMOPuPJj9uclUzVh4BV_m5IG8bDEhAfF6ss6js3QzikYSEBXayWgGo-rYJeqmWJpYmWCjhiNF06IXLM6CxsLXLUxBIMqXkaBTe-t7ILqobGuYWqYkMqYbod-GXIOdYVJeCgY5xdmdlb6-lOiGVImNiYTcweITA5yowvH3O20-gvWMKrG8RQgHSOG9Eewx7NAQZhyiwNAtlacqC4k2DQtfi8Xnxix0M9PTvjSDdmsJHhPWJF0Ho5ItDZJolrS9-dk9RgerZ9GPPIdKQFFsawHX06C0WbqH6gNqg9_eabFeqRoAcQlMfaFhckB-Ba2Tn24A";

	useEffect(() => {
		axios
			.get(`${API_ENDPONT}/getloanstatustypecreditor/loanstatus`)
			.then((res) => setStatus(res.data))
			.catch((error) => console.log(error));
		axios
			.get(`${API_ENDPONT}/creditapproval/creditor`)
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

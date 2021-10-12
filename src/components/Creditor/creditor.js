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
	// "eyJraWQiOiJXSlpET21BQ0RuS3FHVVhZU2VFXC9pU0J5Y2VRS0xLNlJXdmFiK2pXcDFyWT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIyODEwZmM1OS1lZjNiLTRjNjctYmY5Ni0xMzEzZjExYjdiMzUiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIHBob25lIG9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXV0aF90aW1lIjoxNjM0MDExMjc0LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGgtMS5hbWF6b25hd3MuY29tXC9hcC1zb3V0aC0xX281WHZTRDluOCIsImV4cCI6MTYzNDA5NzY3NCwiaWF0IjoxNjM0MDExMjc0LCJ2ZXJzaW9uIjoyLCJqdGkiOiJlMTkzODc1My1jNjk4LTQyYmUtOTJkMC1jMjEyNWI1OGQxOTgiLCJjbGllbnRfaWQiOiI0Y2EwNDU1ajM2cXVyNmVtdWY0bzhjZmxrYyIsInVzZXJuYW1lIjoiY3JlZGl0b3IxIn0.DTMhOdk0QL9PqyQQpf2hCDFjpttFDy3O6M26uVikFt0MV0pGrb3K6m2ob28lHKzbtJ_XiGReljwhuXCALATPz_ia-2JwB8suioS2WuCMNoM9-rbmx8q5qZIXo-kEBFXSzw1nBc-SQtR1XBNZysJ-gdYLF0Q4uE5cm_QlOuG_Ed95WgEPW21BmclUc-FRHPghGQzxwUM6iKwityhggR5_k49PrBR6xWb6eAWFQfs3WvVtynePpF1ilUsWQvv3E4tYetjHos4DlMPo1x8HiaRttPD7n3ZNpKpNEaHUeSwvowFk0UCSDXh4W2Oh-2WMGxKB6SkKOwMfmNeFCl14QeH8-A";

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

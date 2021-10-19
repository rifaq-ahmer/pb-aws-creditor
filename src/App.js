import Creditor from "./components/Creditor/creditor";
import Amplify from "aws-amplify";
import { AmplifySignOut, withAuthenticator } from "@aws-amplify/ui-react";
import { config } from "./aws-config";
Amplify.configure(config);
const onSignOut = () => {
	localStorage.clear();
	console.log("Local Storage Clear");
};

function App() {
	return (
		<>
			<div className="container">
				<div className="page-heading">
					<AmplifySignOut onClick={onSignOut} />
					<h1>Credit Approval</h1>
				</div>
				<Creditor />
			</div>
		</>
	);
}

export default withAuthenticator(App);

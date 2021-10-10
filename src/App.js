import Creditor from "./components/Creditor/creditor";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import { AmplifySignOut, withAuthenticator } from "@aws-amplify/ui-react";

Amplify.configure(awsconfig);

function App() {
	return (
		<>
			<div className="container">
				<div className="page-heading">
					<AmplifySignOut />
					<h1>Creditor Application</h1>
				</div>
				<Creditor />
			</div>
		</>
	);
}

export default withAuthenticator(App);

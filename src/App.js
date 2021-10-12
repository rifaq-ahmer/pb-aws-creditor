import Creditor from "./components/Creditor/creditor";
import Amplify from "aws-amplify";
import { AmplifySignOut, withAuthenticator } from "@aws-amplify/ui-react";
import { config } from "./aws-exports";
Amplify.configure(config);

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

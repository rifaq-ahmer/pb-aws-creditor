import Creditor from "./components/Creditor/creditor";
import Amplify from "aws-amplify";
// import awsconfig from "./aws-exports";
import { AmplifySignOut, withAuthenticator } from "@aws-amplify/ui-react";
export const API_ENDPONT =
	"https://g9yh14f7ve.execute-api.ap-south-1.amazonaws.com/Authorizeddev";

export const APP_CLIENT_ID = "53gsekise9sfi48b35vfs8givp";

Amplify.configure({
	API: {
		endpoints: [
			{
				name: "LoanApprovalApi",

				endpoint: API_ENDPONT,
			},
		],
	},

	Auth: {
		// REQUIRED - Amazon Cognito Region

		region: "ap-south-1",

		// OPTIONAL - Amazon Cognito Federated Identity Pool Region

		// Required only if it's different from Amazon Cognito Region

		identityPoolRegion: "ap-south-1",

		// OPTIONAL - Amazon Cognito User Pool ID

		userPoolId: "ap-south-1_o5XvSD9n8",

		// OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)

		userPoolWebClientId: APP_CLIENT_ID,

		// OPTIONAL - Enforce user authentication prior to accessing AWS resources or not

		mandatorySignIn: false,

		// OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'

		authenticationFlowType: "USER_SRP_AUTH",

		// OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers

		clientMetadata: { myCustomKey: "myCustomValue" },

		// OPTIONAL - Hosted UI configuration

		oauth: {
			domain: "https://creditor.auth.ap-south-1.amazoncognito.com",

			scope: ["email", "openid"],

			redirectSignIn: "https://master.d4rmkb7obg8gl.amplifyapp.com/",

			logoutUri: "https://master.d4rmkb7obg8gl.amplifyapp.com/",

			redirectUri: "https://master.d4rmkb7obg8gl.amplifyapp.com/",

			redirectSignOut: "https://master.d4rmkb7obg8gl.amplifyapp.com/",

			responseType: "token", // or 'token', note that REFRESH token will only be generated when the responseType is code
		},
	},
});

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

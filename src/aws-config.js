export const config = {
	API: {
		endpoints: [
			{
				name: "LoanApprovalApi",

				endpoint: "https://en7wrjhse8.execute-api.ap-south-1.amazonaws.com/v1",
			},
		],
	},

	Auth: {
		region: "ap-south-1",

		identityPoolRegion: "ap-south-1",

		userPoolId: "ap-south-1_R9tG1Ct0U",

		userPoolWebClientId: "2jrih0ro8vp7mds9smi8us1q82",

		mandatorySignIn: true,

		authenticationFlowType: "USER_SRP_AUTH",

		clientMetadata: { myCustomKey: "myCustomValue" },

		oauth: {
			domain: "creditor.auth.us-east-2.amazoncognito.com",

			scope: ["email", "openid"],

			redirectSignIn: "https://master.d4rmkb7obg8gl.amplifyapp.com/",

			logoutUri: "https://master.d4rmkb7obg8gl.amplifyapp.com/",

			redirectUri: "https://master.d4rmkb7obg8gl.amplifyapp.com/",

			redirectSignOut: "https://master.d4rmkb7obg8gl.amplifyapp.com/",

			responseType: "token",
		},
	},
};

const awsmobile = {
	aws_project_region: "ap-south-1",
	aws_cognito_identity_pool_id:
		"ap-south-1:fcb3054a-fb02-4fe1-babf-4d3bdea3df97",
	aws_cognito_region: "ap-south-1",
	aws_user_pools_id: "ap-south-1_o5XvSD9n8",
	aws_user_pools_web_client_id: "4qdbb642mufclr809nhr0o5g5v",
	oauth: {},
	aws_cognito_login_mechanisms: ["EMAIL"],
	aws_cognito_signup_attributes: ["EMAIL"],
	aws_cognito_mfa_configuration: "OFF",
	aws_cognito_mfa_types: ["SMS"],
	aws_cognito_password_protection_settings: {
		passwordPolicyMinLength: 8,
		passwordPolicyCharacters: [],
	},
};

export default awsmobile;

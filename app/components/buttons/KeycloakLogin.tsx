import { createButton } from "react-social-login-buttons";

const config = {
    text: "SSO",
    icon: "google",
    iconFormat: (name: String) => `fa fa-${name}`,
    style: { background: "#3b5998" },
    activeStyle: { background: "#293e69" },
};

const KeycloakLogin = createButton(config);

export default KeycloakLogin;
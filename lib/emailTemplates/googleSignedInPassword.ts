export const googleSignedInPassword = `<!DOCTYPE html>
<html>
<head>
    <title>Welcome to MyFesko</title>
</head>
<body>
    <div style="font-family: Arial, Helvetica, sans-serif; font-size: 18px; text-align: center;">
        <h1>Hi {{name}}</h1>
        <h2>Welcome to MyFesko</h2>
        <p>Your account has been successfully created, but one more step is required to activate it. Please confirm your account by clicking on the link below:</p>
        <a href="{{url}}" target="_blank" style="color: #ffffff; background-color: #ff7d14; padding: 10px; border-radius: 4px; text-decoration: none; font-size: 16px;">Activate Account</a>
        <div>
            <p>Here is your generated password. Please ensure to change it after your first login for security purposes:</p>
            <p><strong>{{generated_password}}</strong></p>
        </div>
        <footer>
            <p>© 2024 MyFesko</p>
        </footer>
    </div>
</body>
</html>
`;
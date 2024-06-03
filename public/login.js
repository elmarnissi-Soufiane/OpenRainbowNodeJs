function handleLoginButtonClick() {
    // Redirect the user to the login endpoint
    window.location.href = "/login";
    redirectToRainbowAuthentication();
}

function redirectToRainbowAuthentication() {
    var rainbowAuthURI = "https://sandbox.openrainbow.com/api/rainbow/authentication/v1.0/oauth/authorize?response_type=token&client_id=ac1da9d002eb11ef9f25994f9ae1ef66&redirect_uri=https://127.0.0.1:8080/&scope=all";

    window.location.replace(rainbowAuthURI);

}


document.getElementById('loginBtn').addEventListener('click', handleLoginButtonClick);
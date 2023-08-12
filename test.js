const CLIENT_ID = '919095192679-gmpjoetkkdvvn7rgp4lh3d8jkmpmhnik.apps.googleusercontent.com';
const REDIRECT_URI = 'http://localhost/googleAuthProject';
const ACCESS_TYPE = "offline";
const SCOPES = 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file'; // Adjust scope as needed

// let SCOPE = "https://www.googleapis.com/auth/spreadsheets \
//                 https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";
//                 https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file \
// fetch data from google sheet :
// https://docs.google.com/spreadsheets/d/1zPjGL2wChv3KUGf2S0UHAegslmCmndp6kv9SoGbUdxE/edit?usp=sharing

async function getSheetData() {
    let sheetId = "1zPjGL2wChv3KUGf2S0UHAegslmCmndp6kv9SoGbUdxE";
    let base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
    let sheetName = "testSheet";
    let query = encodeURIComponent('Select *');
    let url = `${base}&sheet=${sheetName}&tq=${query}`;
    fetch(url).then(res => res.text()).then((response) => {
        let resFromSheet = JSON.parse(response.substring(47).slice(0, -2));
        console.log(resFromSheet);
    });
}

let signIn = function () {
    google.accounts.id.initialize({
        client_id: '467340086670-v3111utlv09ssep44tp0gpmg12agge3n.apps.googleusercontent.com',
        callback: handleCredentialResponse
    });
    google.accounts.id.prompt();
};

function handleCredentialResponse(responseFromGooglePrompt) {
    console.log("Response : ");
    console.log(responseFromGooglePrompt);
    // getSheetData();
    startAuth(responseFromGooglePrompt);
}

// Step 1: Redirect the user to Google's OAuth 2.0 consent page
function startAuth() {

    // to get the access-token and refresh-token
    // &access_type=${ACCESS_TYPE}
    // this Url Get the access Token & Refresh Token
    // https://oauth2.googleapis.com/token?code=4%2F0Adeu5BUOYXHZopIyFBdWCj5IQzEy4kpaBDBjjJMHRyADeMM4dOFwnE2dhfl_KyZV-ZnEcA&client_id=919095192679-gmpjoetkkdvvn7rgp4lh3d8jkmpmhnik.apps.googleusercontent.com&client_secret=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&access_type=offline&redirect_uri=http://localhost/googleAuthProject&grant_type=authorization_code
    // let authUrl =  `https://accounts.google.com/o/oauth2/v2/auth?scope=${SCOPES}&access_type=offline&response_type=code&redirect_uri=${REDIRECT_URI}&client_id=${CLIENT_ID}`;

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?\
                    client_id=${CLIENT_ID}\
                    &redirect_uri=${REDIRECT_URI}\
                    &response_type=code\
                    &access_type=offline\
                    &scope=${SCOPES}`;
    
    // https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPES}
    // window.open(authUrl);
    
    console.log(authUrl);

    // handleCallback();
}

// Step 2: Handle the callback
function handleCallback() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    console.log("Code : " , code);
    // Use the obtained code to exchange for an access token
    // You'll need to make a server-side request to exchange the code for tokens
}

// Once you have the access token, use it to make requests to the Google Sheets API

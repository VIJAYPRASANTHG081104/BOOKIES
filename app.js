const {google} = require('googleapis');
//get pdf file from request



//PATH OF THE IMAGE
const path = require('path');
const fs = require('fs');

const CLIENT_ID = '617940386148-g6rlgt0si63480rgmptk6k5jnem71ca7.apps.googleusercontent.com';
const CLIENT_SECRET ='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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN = '1//04l_yvAlqD2NvCgYIARAAGAQSNwF-L9IrSrSeP1Ja5F37hUSPHCZ04q7XTMK4zubOuGGj3kbwO57uYRUdqsbzlqEMp7dFJYBUV3A';

//initialize the oauth client
const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

//set credentials to the oauth client
oauth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN
});


// initialize the drive
const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
});

const filePath = path.join(__dirname, 'demo.pdf');

//uploading the file to the drive
async function uploadFile(){
    // trying to upload the file
    try{
        const response = await drive.files.create({
            requestBody: {
                name: 'demo.pdf', //This can be name of your choice , name of the file that is stored in the drive
                mimeType: 'application/pdf'// mimeType of your file for image mimeType is 'image/jpeg'
            },
            media: {
                mimeType: 'application/pdf',
                body: fs.createReadStream(filePath)// read streams the file and uploads it to the drive
            }
        })
        console.log(response.data);

    }
    catch(error){
        console.log(error.message);
    }
}

//delete the file from the drive
async function deleteFile(){
    try{
        const response = await drive.files.delete({
            fileId: '1N_0K-NDiyxafSAFllVWirjuEclMwWTfP'
        })
        console.log(response.data, response.status);
    }
    catch(error){
        console.log(error.message);
    }
}


//generate public url for the file
async function generatePublicUrl(){
    try{
       const fileId = '1W3yzsdPCNuxPso-h9g20sr1hNvFTm6fB';
         await drive.permissions.create({
            fileId: fileId,
            requestBody: {
                role: 'reader',
                type: 'anyone'
            }
        })
        const result = await drive.files.get({
            fileId: fileId,
            fields: 'webViewLink, webContentLink' //webContentLink is the download link, webViewLink is the view link
        })
        console.log(result.data);
    }

    catch(error){
        console.log(error.message);
    }
}
generatePublicUrl();
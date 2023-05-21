const {google} = require('googleapis');
//get pdf file from request
const fileName = "cat2.jpg";
const mimeTypes = "image/jpg";
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

const filePath = path.join(__dirname, fileName);

//uploading the file to the drive
async function uploadFile(){
    // trying to upload the file
    try{
        const response = await drive.files.create({
            requestBody: {
                name: fileName, //This can be name of your choice , name of the file that is stored in the drive
                mimeType: mimeTypes// mimeType of your file for image mimeType is 'image/jpeg'
            },
            media: {
                mimeType: mimeTypes,
                body: fs.createReadStream(filePath)// read streams the file and uploads it to the drive
            }
        })
        console.log(response.data);
        return response.data.id;

    }
    catch(error){
        console.log(error.message);
    }
}

//delete the file from the drive
async function deleteFile(id){
    try{
        const response = await drive.files.delete({
            fileId: id
        })
        console.log(response.data, response.status);
    }
    catch(error){
        console.log(error.message);
    }
}


//generate public url for the file
async function generatePublicUrl(id){
    try{
       const fileId = id;
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

exports.module = uploadFile
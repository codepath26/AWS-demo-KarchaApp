exports.emailSent = (req,res)=>{
console.log(req.email)
res.status(201).json(req.email)
  }
require('dotenv').config();
const Brevo = require('sib-api-v3-sdk');
const defaultClient = Brevo.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.EMAIL_API_KEY;
const apiInstance = new Brevo.TransactionalEmailsApi();



apiInstance.sendTransacEmail({
      sender: { email: 'parththakor2610@gmail.com', name: 'Parth' },
      subject: 'This is my default subject line',
      htmlContent: '<!DOCTYPE html><html><body><h1>My First Heading</h1><p>My first paragraph.</p></body></html>',
      params: {
         greeting: 'This is the default greeting',
         headline: 'This is the default headline'
      },
      to: [
         {
            email: 'parththakor1026@gmail.com',
            name: 'Bob Anderson'
         }
      ]
    })
    .then(function(data) {
      console.log('API called successfully. Returned data: ' + data);
    })
    .catch(function(error) {
       console.error(error);
      });
      
      
   
const serverless = require('serverless-http');
let invoice = require('./lib/invoice');
const bodyParser = require('body-parser');
var cors = require('cors');

const app = express();

app.use(cors());

app.use(bodyParser.json({ strict: false }));

app.get('/getAllInvoices', async (req, res) => {
  res.send('Get all Invoice');
});

app.post('/createInvoice', async (req, res) => {
  res.send('Post Invoice');
});

app.put('/updateInvoice', async (req, res) => {
  res.send('Update Invoice');
});

app.put('/updateInvoiceStatus', async (req, res) => {
  res.send('Update Invoice Status');
});

app.delete('/deleteInvoice', async (req, res) => {
  res.send('Delete Invoice');
});

module.exports.handler = serverless(app);

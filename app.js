const dotenv = require('dotenv')
dotenv.config()

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));


const events = require('events');
const eventEmitter = new events.EventEmitter();


global._config = require('./config/config.js');
console.log('Environment:', _config.app);


app.get('/', (req, res) => {
    res.send('Hello World!');
});


const AdminRouter = require('./routers/admin.js');
const FAQsRouter = require('./routers/faqs.js');
const FeedbackRouter = require('./routers/feedback.js');
const ContactRouter = require('./routers/contactUs.js');
const BusinessCategoryRouter = require('./routers/businessCategories.js');
const PartnersLogoRouter = require('./routers/partnersLogo.js');
const TeamRouter = require('./routers/team.js');
const homeBannerRouter = require('./routers/homeBanner.js');
const SubscribeRouter = require('./routers/subscribe.js');
const BlogRouter = require('./routers/blog.js');
const UploadFilesRouter = require('./routers/upload-files.js');
const downloadsRouter = require('./routers/downloads.js');
const serviceProvidersRouter = require('./routers/serviceProviders.js');
const serveiceProviderCategoryRouter = require('./routers/serviceProviderCategories.js');
const msmeBusinessRouter = require('./routers/msmeBusiness.js');



app.use('/api/admin', AdminRouter);
app.use('/api/faq', FAQsRouter);
app.use('/api/feedback', FeedbackRouter);
app.use('/api/contact', ContactRouter);
app.use('/api/business-category', BusinessCategoryRouter);
app.use('/api/partners-logo', PartnersLogoRouter);
app.use('/api/team', TeamRouter);
app.use('/api/home-banner', homeBannerRouter);
app.use('/api/subscribe', SubscribeRouter);
app.use('/api/blog', BlogRouter);
app.use('/api/upload', UploadFilesRouter);
app.use('/api/downloads', downloadsRouter);
app.use('/api/service-providers', serviceProvidersRouter);
app.use('/api/service-provider-category', serveiceProviderCategoryRouter);
app.use('/api/msme-business', msmeBusinessRouter);


const db = require('./db/database.js')(eventEmitter);
eventEmitter.once('db-connection-established', () => {
    console.log('Database connection established.')
});

module.exports= app;

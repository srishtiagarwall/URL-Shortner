const express = require("express");
const { connectToMongoDB } = require("./connect");
const urlRoute = require('./routes/url');
const URL = require('./models/url');
const { handleGenerateNewShortURL } = require("./controllers/url");
const app = express();
const shortid = require("shortid");
const port = 8001;

connectToMongoDB("mongodb://localhost:27017/URL-Shortner")
.then(() => console.log('mongodb connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());

app.use('/url', urlRoute);

app.post('/url', handleGenerateNewShortURL);

app.get('/:shortId', async (req, res) => {
    try{
        const shortId = req.params.shortId;
        const entry = await URL.findOneAndUpdate(
            { shortId }, 
            { $push: { visitHistory: { timestamp: Date.now() } } }
        );
        
        if (!entry) {
            return res.status(404).json({ error: 'Short URL not found' });
        }
        
        res.send(entry.redirectURL);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(port, () => {
    console.log(`Server started on port: ${port}`)
});
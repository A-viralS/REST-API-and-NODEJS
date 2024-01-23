const express = require("express");
const { connectToMongoDB } = require("./connection");
const urlRoute = require("./routes/url");
const staticRoute=require('./routes/staticRouter')
const userRoute=require('./routes/user')
const {restrictToLoggedinUserOnly,checkAuth}= require('./middlewares/auth')
const URL = require("./models/url");
const cookieParser= require('cookie-parser')
const app = express();
app.use(cookieParser());//IMP PLACE THIS BEFORE ANY ROUTER USING COOKIES 
const path= require('path')

app.use(express.json());// used when we put raw data from the postman 
app.use(express.urlencoded({extended:false}))//json and form data

app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use("/user", userRoute);
app.use("/", checkAuth, staticRoute);
app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry?.redirectURL);
});


//VIEW ENGINE 
app.set('view engine', 'ejs');
app.set('./views',path.resolve('./views'))
app.get('/test', async (req, res) => {
    const allURLs = await URL.find({});
   res.render('home')
});

const PORT = 8000;

connectToMongoDB("mongodb://127.0.0.1:27017/urlShortner").then(() =>
  console.log("Mongodb connected")
);


app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));

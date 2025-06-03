import express from "express"
import env from "dotenv"
import connectDb from "./src/db/db.js";
import customerRoute from "./src/route/customerRoute.js"
import orderRoute from "./src/route/orderRoute.js"
import segmentRouter from "./src/route/segmentRoute.js"
import logRoutes from "./src/route/logRoutes.js"
import vendorRoute from "./src/route/vendorRoute.js"
import aiRouter from "./src/route/aiRoute.js"
import cors from "cors"
import session from "express-session";
import passport from "passport";
import "./src/auth/passport.js"
import worker from "./src/worker/customerWorker.js"

const app = express();
app.use(express.json());
env.config();

connectDb();

app.use(cors({
    origin : "http://localhost:5173",
    credentials : true,
}))

app.use(session({
    secret : process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());

worker();


app.get("/auth/google", passport.authenticate('google', {scope : ['profile', 'email']}));

app.get("/auth/google/callback", passport.authenticate('google', {
    failureRedirect : '/',
    successRedirect : 'http://localhost:5173/dashboard'
}))

app.get('/auth/logout', (req, res) => {
    req.logout(() => {
        res.redirect("/");
    })
})

app.get("/auth/user", (req, res) => {
    if(req.isAuthenticated()){
        res.json(req.user);
    } else {
        res.status(401).json({message : "Please authenticate first"});
    }
})

const PORT = process.env.PORT;

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.use("/api/customer", customerRoute);
app.use("/api/order", orderRoute);
app.use("/api/segment", segmentRouter);
app.use("/api/logs", logRoutes);
app.use("/vendor", vendorRoute);
app.use("/api/generate", aiRouter);

app.listen(PORT, () => {
    console.log(`Server started at port :  ${PORT}`);
})
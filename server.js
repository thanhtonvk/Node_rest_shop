const express = require("express");
const morgan = require("morgan");
const app = express();
const port = process.env.PORT || 3000;
const productRoutes = require("./api/routes/product");
const orderRoutes = require("./api/routes/orders");
const bodyParser = require("body-parser");

var mongoose = require("mongoose");
mongoose.connect(
    "mongodb+srv://NodeShop:pKNQH4Rr9e2FQVi@nodeshop.xcj7t.mongodb.net/nodeshop?retryWrites=true&w=majority", {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }
);

app.use(morgan("dev"));

app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);

app.use(bodyParser.json());

app.use("/product", productRoutes);
app.use("/orders", orderRoutes);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept,Authorization"
    );
    if (res.method === "OPTION") {
        res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE");
        return res.status(200).json({});
    }
    next();
});
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    });
});

app.listen(port, () => {
    console.log(`Run http://locahost:${port}`);
});
const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Post order",
    });
});

router.post("/", (req, res, next) => {
    const order = {
        productID: req.body.productID,
        quantity: req.body.quantity,
    };
    res.status(201).json({
        message: "Oders were create",
        order: order,
    });
});

router.get("/:orderID", (req, res, next) => {
    res.status(201).json({
        message: "Oder details",
        orderID: req.params.orderID,
    });
});
router.delete("/:orderID", (req, res, next) => {
    res.status(201).json({
        message: "Oder delete",
        orderID: req.params.orderID,
    });
});

module.exports = router;
const express = require("express");
const router = express.Router();
const Student = require("../models/student");
const mongoose = require("mongoose");

router.get("/", (req, res, next) => {
    Student.find()
        .exec()
        .then((docs) => {
            if (docs.length > 0) {
                console.log(docs);
                res.status(200).json(docs);
            } else {
                res.status(500).json({
                    message: "nothing",
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
});
router.post("/", (req, res, next) => {
    const student = new Student({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        gender: req.body.gender,
        address: req.body.address,
        dateofbirth: req.body.dateofbirth
    });
    student.save().then((result) => {
        console.log(result)
    }).catch((err) => {
        console.log(err);
    })
    res.status(200).json({
        message: 'Success',
        createStudent: student
    })
})
router.get("/:studentID", (req, res, next) => {
    const id = req.params.studentID;
    Student.findById(id).exec().then((doc) => {
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(400).json({
                message: 'Student not found'
            })
        }
    }).catch((err) => {
        console.log(err);
        res.status(400).json({
            error: err
        })
    })
})
router.patch("/:studentID", (req, res, next) => {
    const id = req.params.studentID;
    Student.update({
            _id: id
        }, {
            $set: {
                name: req.body.name,
                gender: req.body.gender,
                address: req.body.address,
                dateofbirth: req.body.dateofbirth
            }
        }).exec()
        .then((result) => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        })
})
router.delete("/:studentID", (req, res, next) => {
    const id = req.params.studentID;
    Student.remove({
            _id: id,
        })
        .exec().then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.json(500).json({
                error: err
            })
        })
})
router.get("/search/:searchString", (req, res, next) => {
    const searchString = req.params.searchString;
    Student.find({ name: searchString }).exec().then((docs) => {
        if (docs.length > 0) {
            console.log(doc);
            res.status(200).json(docs);
        } else {
            res.status(500).json({ message: "nothing" });
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            error: err,
        })
    });
})
router.get("/address/:searchString", (req, res, next) => {
    const searchString = req.params.searchString;
    Student.find({ address: searchString }).exec().then((docs) => {
        if (docs.length > 0) {
            console.log(doc);
            res.status(200).json(docs);
        } else {
            res.status(500).json({ message: "nothing" });
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            error: err,
        })
    });
})
module.exports = router;
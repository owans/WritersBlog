const express = require('express');
const router = express.Router();
const ArticleModel = require('../models/articlemodel');
const AuthMiddleware = require('../middlewares/auth');
const jwt = require('jsonwebtoken');

//create an artcle
router.post('/', AuthMiddleware, async function(req, res){
    try{

        const article = await ArticleModel.create({
            title: req.body.title,
            content: req.body.content,
            writer: req.user
        });

            res.json({
                status: "Success",
                data: article
            })

    }catch(err){
        res.status(500).json({status: 'error', message: "an error occured while creating your article"});
    }
})

//get all writer articles
router.get('/', AuthMiddleware, async function (req, res){
    try{

        const articles = await ArticleModel.find({writer: req.user});

        res.json({
            status: "Success",
            data: articles
        })

    }catch(err){
        res.status(500).json({
            status: 'error',
            message: "Could not find articles"
        })
    }
})

module.exports = router;
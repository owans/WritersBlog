const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const WriterModel = require('../models/writermodel');
const AuthMiddleware = require('../middlewares/auth');
const router = express.Router();

const SECRET = "LEV3LUP!74";

//create writers
router.post('/', async function(req, res){
    try{
        //hash password using bcrypt
        req.body.password = await bcrypt.hash(req.body.password, 10);

        const Writer = await WriterModel.create(req.body);

        //convert to mongo document to json in order to access its properties and delete
        const result = Writer.toJSON();

        delete result.password;

        const token = jwt.sign({id: Writer.id}, SECRET, {expiresIn: '1hr'})

        res.status(200).json({
            status: 'Success',
            data: {Writer: result, token}
        })
    }catch(err){
        console.log(err);

        res.status(500).json({
            status: 'error',
            message: "An error occured while creating your account"
        })
    }
});


router.get('/profile', AuthMiddleware, async function(req, res){
    try{
        const writer = await WriterModel.findById(req.user);

        res.json({status: 'Success', data: writer});
    }catch(err){
        console.log(err);

        //show error to user
        res.status(401).json({status: 'error', message: err.message})
    }
})

//login a writer
router.post('/login', async function(req, res){
    try{

        const writer = await WriterModel.findOne(
            {email: req.body.email}, 
            '+password');

        if(!writer) return res
        .status(401)
        .json({status: 'error', 
            message: "Invalid login details"});

        //compare user's password to log the user in
        const isPasswordValid = await bcrypt.compare(req.body.password, writer.password);

        if(!isPasswordValid) return res.status(401).json(
            {status: 'error', 
            message: "Invalid login details"});

            const token = jwt.sign({id: writer.id}, SECRET);

        res.json({status: "Success", data: { token } });

    }catch(err){
        res.status(500).json({
            status: "error",
            message: " an error occurred"
        })
    }
})

//find writer by email and update req.body
router.put('/:email', async function(req,res){
    try{
            const updatedWriter = await WriterModel
            .findOneAndUpdate({email: req.params.email}, 
                req.body, 
                {new: true});

                //check if the writer was found and updated
                if(!updatedWriter){
                    res.status(404).json({
                        status: 'error',
                        message:   'update failed, writer not found'
                    })
                    return;        
                }

                res.json({
                    status: 'Success',
                    data: updatedWriter
                })

    }catch(err){
        console.log(err);

        res.json({
            status: 'error',
            message: 'Failed to update new information'
        })
    }
})

//delete a writer
router.delete('/:email', async function(req, res){
    try{
        const deletedWriter = await WriterModel
        .findOneAndDelete({email: req.params.email});

        if(!deletedWriter){
            res.status(404).json({
                status: 'error',
                message: 'Sorry you cannot delete a writer that does not exist'
            })
            return;
        }

        res.json({
            status: 'Success',
            message: 'Successfully deleted a writer'
        })

    }catch(err){
        console.log(err);

        res.status(500).json({
            status: 'error',
            message: 'An error occured while deleting a writer'
        })
    }
})

//get a writer by email
router.get('/:email', async function(req, res){
    try{

        const writer = await WriterModel.findOne({email: req.params.email});

        //check if writer was found
        if(!writer){
            res.status(404).json({
                status: 'error',
                message:   'writer not found'
            })
            return;
        }
        res.json({
            status: 'Success',
            data: writer
        })

    }catch(err){
        console.log(err);

        res.status(500).json({
            status: 'error',
            message: "An error occured while getting the writer"
        })
    }
})

//get all writers
router.get('', async function(req, res){
    
    try{
        const search = req.query.gender ? {gender: req.query.gender} : {};

        const writers = await WriterModel.find(search);
        res.json({
            status: 'Success',
            data: writers
        })

    }catch(err){
        console.log(err);

        res.status(200).json({
            status: 'error',
            message: 'An error occurred while trying to get an account'
        })
    }
})


module.exports = router;

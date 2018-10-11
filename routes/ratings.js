const router = require('express').Router();
const ratingsHandler = require("../handlers/ratings");
router.post('/',  (req, res) => {
    
    ratingsHandler.addRating(req.body,result => {
        res.status(200).json(result);
    });
    

    console.error("test");

 });



module.exports = router;
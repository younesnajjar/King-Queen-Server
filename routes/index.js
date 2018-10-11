const router = require('express').Router();

router.get('/',  (req, res) => {


    res.status(200).json("{'hello':'first try index ;)'}");

    console.error("test");

 });



module.exports = router;
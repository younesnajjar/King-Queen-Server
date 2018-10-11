const router = require('express').Router();
const studentsHandler = require("../handlers/students");
router.get('/:rater_id',  (req, res) => {
    const rater_id = parseInt(req.params.rater_id);
    studentsHandler.bringAllUnratedStudents(rater_id,result => {
        res.status(200).json(result);
    });

 });
 router.post('/verifyexistence', (req, res) => {
     
     
    var response = Object.assign(req.body);
    // console.log(body.name+"somestuff");
    studentsHandler.verifyExistenceByName(response,result => {
        
        res.status(200).json(result);
    });

 });



module.exports = router;
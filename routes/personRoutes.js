const express = require('express');
const router = express.Router();
const person = require('./../models/person'); // Import the Person model

router.get('/',async (req, res) => {
    try{
        const data = await person.find({}); // Fetch all documents from the person collection
        console.log('data fetched');
        res.status(200).json(data);
    } 
    catch(error){
        console.log(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.post('/', async (req, res) => {
    try {
        //Assuming the request body contains the person data
        const data = req.body; 

        //Create a newPerson document using the Mongoose model
        const newPerson = new person(data); 

        //Save the new Person to the database
        const response = await newPerson.save(); 
        console.log('Data saved');
        res.status(201).json(response); // Send the saved person data as a response
    
    } catch (error){
        console.log(error);
        res.status(500).json({error: 'Internal Server Error'}); // Send an error response if something goes wrong
    }
});

router.get('/:workType',async(req,res)=> {
    try{
        const workType = req.params.workType; 
        if(workType == 'chef' || workType == 'manager' || workType == 'waiter' || workType == 'cleaner'){
            const response = await person.find({work: workType}); // Fetch documents from the menu collection based on work type  
            console.log('response fetched');
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error:'Invalid work type'});
        } 
    }catch(error){
        console.log(error);
        res.status(500).json({error:'Internal server error'}); // Send an error response if something goes wrong
    }
})

router.put('/:id',async (req,res)=>{
    try{
        const personId = req.params.id;
        const updatePersonData = req.body;
        
        const response = await person.findByIdAndUpdate(personId, updatePersonData,{
            new : true,
            runValidators : true // Validate the updated data against the schema
        });

        if(!response){
            return res.status(404).json({error:'Person not found'}); // Send a 404 error if the person is not found
        }
        console.log('data updated');
        res.status(200).json(response);
         
    }catch(error){
        console.log(error);
        res.status(500).json({error:'Internal server error'}); // Send an error response if something goes wrong
    }
})

router.delete('/:id', async(req,res) => {
    try{
        const personId = req.params.id;

        const response = await person.findByIdAndDelete(personId);
        console.log('data deleted');
        res.status(200).json({message: 'Person data Deleted Succesfully'});
        if(!personId){
            res.status(404).json({error: 'Person not found'});
        }

    }
    catch(error){
        console.log(error);
        res.status(500).json({error: 'Internal server error'}); // Send an error response if something goes wrong
    }
});

module.exports = router; // Export the router for use in other files
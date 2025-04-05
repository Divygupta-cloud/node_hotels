const express = require('express');
const router = express.Router(); 

const menuItem = require('./../models/menuItem'); 

router.post('/',async(req,res)=> {
    try{
        const data = req.body;
        const newMenu = new menuItem(data);
        const response = await newMenu.save();
        console.log('data saved');
        res.status(200).json(response);
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:'Internal server error'});
    }
});

router.get('/',async(req,res)=> {
    try{
        const data = await menuItem.find(); // Fetch all documents from the menu collection
        console.log('data fetched');
        res.status(200).json(data); // Send the fetched data as a response
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:'Internal server error'}); // Send an error response if something goes wrong
    }
});

router.put('/:id',async(req,res) => {
    try{
        const menuId = req.params.id; // Get the menu item ID from the request parameters
        const updateMenuData = await menuItem.findByIdAndUpdate(menuId, req.body, {
            new: true, // Return the updated document
            runValidators: true // Validate the updated data against the schema
        });
        if(!updateMenuData) {
            return res.status(404).json({error: 'Menu item not found'}); // Send a 404 error if the menu item is not found
        }
        console.log('Menu item updated');
        res.status(200).json(updateMenuData); // Send the updated menu item as a response
    }
    catch(error){
        console.log(error);
        res.status(500).json({error: 'Internal server Error'}); // Send an error response if something goes wrong
    }
});

router.delete('/:id', async(req,res) => {
    try{
        const menuId = req.params.id; // Get the menu item ID from the request parameters
        const response = await menuItem.findByIdAndDelete(menuId); // Delete the menu item from the database
        if(!response) {
            return res.status(404).json({error: 'Menu item not found'}); // Send a 404 error if the menu item is not found
        }
        console.log('Menu item deleted');
        res.status(200).json({message: 'Menu Item Deleted Successfully'}); // Send a success message as a response
    }
    catch(error){
        console.log(error);
        res.status(500).json({error: 'Internal server error'}); // Send an error response if something goes wrong
    }
}); 

module.exports = router; // Export the router for use in other files
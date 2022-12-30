const express = require("express");
const router = new express.Router();
const MensRanking = require("../models/mens");

// handling post request
router.post("/mens", async(req, resp)=>{
    try {
        const addingMensRecodrds = new MensRanking(req.body);
        console.log(req.body);
        const insertMens = await addingMensRecodrds.save();
        resp.status(201).send(insertMens);
    } catch (error) {
        resp.status(400).send(error);
    }
})

// handling get request
router.get("/mens", async(req, resp)=>{
    try {
        const mensData = await MensRanking.find();
        resp.status(201).send(mensData);
    } catch (error) {
        resp.status(400).send(error);
    }
})
// handling get request of individual
router.get("/mens/:id", async(req, resp)=>{
    try {
        const _id = req.params.id;
        const mensData = await MensRanking.findById(_id);
        if(!mensData){
            return resp.status(404).send();
        }else{
            resp.status(201).send(mensData);
        }
    } catch (error) {
        resp.status(400).send(error);
    }
})
// handling patch request of individual
router.patch("/mens/:id", async(req, resp)=>{
    try {
        const _id = req.params.id;
        const mensData = await MensRanking.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        if(!mensData){
            return resp.status(404).send();
        }else{
            resp.status(201).send(mensData);
        }
    } catch (error) {
        resp.status(500).send(error);
    }
})
// handling delete request
router.delete("/mens/:id", async(req, resp)=>{
    try {
        const _id = req.params.id;
        const mensData = await MensRanking.findByIdAndDelete(_id);
        if(!mensData){
            return resp.status(404).send();
        }else{
            resp.status(201).send(mensData);
        }
    } catch (error) {
        resp.status(500).send(error);
    }
})

module.exports = router;
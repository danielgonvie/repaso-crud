const express = require('express')
const router = express.Router()
const Park = require("../models/park.model.js");
// Aquí los endpoints


router.get("/new", (req, res, next) => res.render("parks/new-park"));
router.post("/new", (req, res, next) => {
    Park.create({
      name: req.body.name,
      description: req.body.description,
      active: true,
      
    })
      .then(() => res.redirect("/parks/new"))
      .catch(function() {
        next();
        throw new Error("Como puedes ser tan desgraciado de no ser capaz de añadir algo!");
      });
    })

module.exports = router
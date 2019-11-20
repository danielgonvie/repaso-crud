const express = require('express')
const router = express.Router()
const Coaster = require("../models/coaster.model.js");
const Park = require("../models/park.model.js");
// Aquí los endpoints
/* router.get("/new", (req, res, next) => res.render("coasters/new-coaster")); */

router.get("/", (req, res, next) => {
    Coaster.find({}).populate("park")
      .then(allCoaster =>
        res.render("coasters/coasters-index", {coasters: allCoaster})
      )
      .catch(function() {
        next();
        throw new Error("There's an error.");
      });
  });




router.get("/new", (req, res, next) => {
    Park.find({})
      .then(allParks =>
        res.render("coasters/new-coaster", {parks: allParks})
        
      )
      .catch(function() {
        next();
        throw new Error("There's an error.");
      });
  });
router.post("/new", (req, res, next) => {
    Coaster.create({
        name: req.body.name,
        description: req.body.description,
        inversions:	req.body.inversions,
        length:	req.body.length,
        active:	true,
        park: req.body.park,
    })
      .then(() => res.redirect("/new"))
      .catch(function() {
        next();
        throw new Error("Como puedes ser tan desgraciado de no ser capaz de añadir algo!");
      });
    })


      router.get("/:id", (req, res, next) => {
        
        Coaster.findById(req.params.id).populate("park")
          .then(coaster => {
                res.render("coasters/coaster-details", { coaster })

        })
          
          .catch(function() {
            next();
            throw new Error("There's an error 2.0!");
          });
      });
      
    

module.exports = router
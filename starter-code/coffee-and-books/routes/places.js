var express = require("express");
var router = express.Router();

const Place = require("../models/place");
//list all places
router.get("/", function(req, res, next) {
  Place.find({}, (err, placesArray) => {
    if (err) {
      return next(err);
    }

    res.render("places/index", {
      places: placesArray
    });
  });
});
//list one place

router.get("/:id", function(req, res, next) {
  const placeId = rep.params.id;
  Place.findbyId(
    { placeId },
    (err,
    placesDetails => {
      if (err) {
        return next(err);
      }

      res.render("places/show", {
        place: placeDetails
      });
    })
  );
});

router.post("/", (req, res, next) => {
  const placeDetails = {
    title: req.body.title,
    description: req.body.description,
    location: req.body.location
  };
  const newPlace = new place(placeDetails);
  newPlace.save(err => {
    if (err) {
      next(err);
      res.render("places/new", { errors: newPlace.errors });
    }
    res.redirect("/places");
  });
});

router.post("/:id/delete", (req, res, next) => {
  const placeId = req.params.id;
  Place.findByIdAndRemove({ placeId }, (err, place) => {
    if (err) {
      next(err);
    }
    res.redirect("/places");
  });
});

router.get("/:id/edit", (req, res, next) => {
  const placeId = req.params.id;
  Place.findById({ placeId }, (err, placeDetails) => {
    if (err) {
      next(err);
    }
    res.render("places/edit", { place: placeDetails });
  });
});

router.post("/:id", (req, res, next) => {
  const placeId = req.params.id;
  const updates = {
    title: req.body.title,
    description: req.body.description,
    location: req.body.location
  };
  Place.findByIdAndUpdate(placeId, updates, (err, place) => {
    place.save(err => {
      if (err) {
        next(err);
        res.render("places/new");
      }
      res.redirect("/places");
    });
  });
});

//location with Map
router.post((req, res, next) => {
  // Get Params from POST
  let location = {
    type: "Point",
    coordinates: [req.body.longitude, req.body.latitude]
  };

  // Create a new Place with location
  const newPlace = {
    name: req.body.name,
    description: req.body.description,
    location: location
  };

  // Save the place to the Database
  place.save(error => {
    if (error) {
      console.log(error);
    } else {
      res.redirect("/");
    }
  });
});

module.exports = router;

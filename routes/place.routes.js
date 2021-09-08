const router = require('express').Router();

const Place = require('./../models/place.model');

router.get('/', (req, res) => {
	Place
        .find()
		.then((places) => res.render('places/', { places }))
		.catch((err) => console.error(err));
});



router.get('/new', (req, res) => {
	res.render('places/new-place');		
});



router.post('/new', (req, res) => {
    const { name, type } = req.body;
    const location = {
        type: 'Point',
        coordinates: [req.body.latitude, req.body.longitude]
    };
	Place
        .create({name, type, location})
        .then(() => res.redirect('/mapa'))
		.catch((err) => console.log(err));
});



router.get("/mapa", (req, res) => res.render("map/map"))



router.get('/:id/edit', (req, res) => {
    Place
        .findById(req.params.id)
        .then((place) => res.render('places/edit-place', { place }))
        .catch((err) => console.error(err));
})



router.post('/:id/edit', (req, res) => {
    const { name, type, lat, lng } = req.body
    const { id } = req.params
    Place
        .findByIdAndUpdate(id, { name, type, lat, lng })
        .then(() => res.redirect('/places'))
        .catch(err => console.log('Error', err))
})



router.post('/:id/delete', (req, res) => {

    Place
        .findByIdAndRemove(req.params.id)
        .then(() => res.redirect('/places'))
        .catch(err => console.log('Error', err))
})

module.exports = router;
const router = require('express').Router();
let Exercise = require('../models/exercise.model');

router.route('/').get((req, res) => {
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const item = req.body.item;
  const image = req.body.image;
  const description = req.body.description;
  const price = Number(req.body.price);
  const size = req.body.size;
  const color = req.body.color;
  const sku = Number(req.body.sku);
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({
    item,
    image,
    description,
    price,
    size,
    color,
    sku,
    date,
  });

  newExercise.save()
  .then(() => res.json('Exercise added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => {
      exercise.item = req.body.item;
      exercise.image = req.body.image;
      exercise.description = req.body.description;
      exercise.price = Number(req.body.price);
      exercise.size = req.body.size;
      exercise.color = req.body.color;
      exercise.sku = Number(req.body.sku);
      exercise.date = Date.parse(req.body.date);

      exercise.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
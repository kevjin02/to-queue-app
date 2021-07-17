const express = require('express');
const router = express.Router();

const QItems = require('../../models/QItem');




/**
 * @route GET api/queues
 * @description Get all queues.
 * @access Public
 */
router.get('/', (req, res) => {
  QItems.find()
    .then(qItems => res.json(qItems))
    .catch(err => res.status(404).json({ noqitemsfound: 'No such Queue.' }));
});


/**
 * @route GET api/queues/:id
 * @description Get single queue by id
 * @access Public
 */
// router.get('/:id', (req, res) => {
//   QItems.findById(req.params.id)
//     .then(qItem => res.json(qItem))
//     .catch(err => res.status(404).json({ noqitemsfound: 'No such Queue.' }));
// });


/**
 * @route POST api/queues
 * @description Add and save queue
 * @access Public
 */
router.post('/', (req, res) => {
  QItems.create(req.body)
    .then(qItem => res.json({content: qItem, msg: 'Queue added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to post queue.' }));
});


/**
 * @route PUT api/queues/:id
 * @description update a queue
 * @access Public
 */
router.put('/:id', (req, res) => {
  QItems.findByIdAndUpdate(req.params.id, req.body)
    .then(qItem => res.json({ content: qItem, msg: 'Queues updated successfully.' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update queue.' })
    );
});


/**
 * @route DELETE api/queues/:id
 * @description Delete a queue by id
 * @access Public
 */
router.delete('/:id', (req, res) => {
  QItems.findByIdAndRemove(req.params.id, req.body)
    .then(qItem => res.json({ mgs: 'Queue deleted.' }))
    .catch(err => res.status(404).json({ error: 'Queue does not exist.' }));
});

module.exports = router;
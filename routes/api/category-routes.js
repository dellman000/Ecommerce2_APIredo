const router = require('express').Router();
const { Category, Product } = require('../../models');
const {log}=console
// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const currentCategory= await Category.findAll({
    include:Product
  })
  // console.log(currentCategory)
  res.send(currentCategory)
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const findID= req.params.id;

  const currentCategory= await Category.findOne({
    where:{ id: findID  },
    include:Product
  })
  log(currentCategory)
  res.send(currentCategory)

});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;

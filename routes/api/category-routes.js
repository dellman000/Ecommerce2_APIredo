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

router.post('/:name', async (req, res) => {
  const NewCategoryName=req.params.name
  // create a new category
  try{
    const NewCategory = await Category.create({category_name:NewCategoryName})
    res.send(NewCategory)
  } catch(err){
    log(err)
    res.send(err)
  }  
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const UpdateID=req.params.id
  const UpdateBody=req.body
  try{
    // get a  instance of a category
    const CurrentCategory = await Category.findByPk(UpdateID)
    if(!CurrentCategory){
      return res.send({message:"Id is not found"})
    }
    // update it 
      CurrentCategory.category_name = UpdateBody.Newname
    // save it
      await CurrentCategory.save()
    res.send({message:`ID:${UpdateID} is updated with name ${UpdateBody}`})
  } catch(err){
    log(err)
    res.send(err)
  }  
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
  
    const RemoveID = req.params.id
  
    const CurrentCategory = await Category.findByPk(RemoveID)
  
    if (!CurrentCategory) {
  
      return res.send({ message: "ID is not found" })
    
    }
  
    await CurrentCategory.destroy()
    res.send({message:`ID:${RemoveID} is removed`})
  } catch (err) {
    
    log(err)

    res.send(err)
  }
});

module.exports = router;

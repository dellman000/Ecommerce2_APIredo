const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  const currentTag = await Tag.findAll({
    include:Product
  })
  res.send(currentTag)
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const findID= req.params.id;
    const SingleProduct = await Tag.findOne({
      where:{ id: findID  },
      include:Product
    })

    if(!SingleProduct){
      return res.send({message:"Tag ID is not found"})
    }


    res.send(SingleProduct)
    
  } catch (error) {
      log(error)
  }
});

router.post('/:name', async (req, res) => {
  // create a new tag
  const NewTagName=req.params.name
  // create a new category
  try{
    const NewTag = await Tag.create({tag_name:NewTagName})
    res.send(NewTag)
  } catch(err){
    log(err)
    res.send(err)
  }  
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const UpdateID=req.params.id
  const UpdateBody=req.body
  try{
    // get a  instance of a category
    const CurrentTag = await Tag.findByPk(UpdateID)
    if(!CurrentTag){
      return res.send({message:"Tag ID is not found"})
    }
    // update it 
    CurrentTag.tag_name = UpdateBody.NewTagName
    // save it
      await CurrentTag.save()
    res.send({message:`ID:${UpdateID} is updated with name ${UpdateBody.NewTagName}`})
  } catch(err){
    log(err)
    res.send(err)
  }  



});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
  
    const RemoveID = req.params.id
  
    const CurrentTag = await Tag.findByPk(RemoveID)
  
    if (!CurrentTag) {
  
      return res.send({ message: "ID is not found" })
    
    }
  
    await CurrentTag.destroy()
    res.send({message:`ID:${RemoveID} is removed`})
  } catch (err) {
    
    log(err)

    res.send(err)
  }
});

module.exports = router;

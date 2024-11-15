const categoryModel=require('../models/categoryModel')


const getCategory = (req,res) =>{

    categoryModel.find()
    .then(Category => {

        console.log(Category,"123")
        res.json({
            status: 200,
            success: true,
            data: Category
        });
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({
            status: 500,
            success: false,
            msg: "Internal server error"
        });
    });
}

const saveCategory = (req, res) => {

    try{
    const { categoryName } = req.body;
    const cObj = new categoryModel();
      cObj.categoryName = categoryName;

      cObj.save().then(() => {
        res.json({
          status: 200,
          success: true,
          msg: "Data is saved to database successfully",
        });
      });
    }
    catch (error){
        res.json({
            status: 500,
            success: false,
            msg: "Error saving producy"+ error,
          });

    }
}

module.exports={
    getCategory,
    saveCategory
};
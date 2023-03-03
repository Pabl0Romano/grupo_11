module.exports = (sequelize, dataTypes) =>{

    const category = sequelize.define('category',{
                name: {
                    type: dataTypes.STRING
                },
    });

    category.associate = (models => {
        category.hasMany(models.Product,{as:'productos'})
    })

    // let alias = "categories"

    // let cols = {
    //     name: {
    //         type: dataTypes.STRING
    //     }
    // }

    // let config = {
    //     tableName: "categories",
    //     timestamps: false,
    //     underscored: true,
    // }

    // const Category = sequelize.define(alias,cols,config);

    // Category.associate = function(models){
    //     Category.hasMany(models.product,{
    //         as:"product",
    //     })
    // }

    return category;
}
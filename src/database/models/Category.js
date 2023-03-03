module.exports = (sequelize, dataTypes) =>{

    // const category = sequelize.define('category',{
    //             name: {
    //                 type: dataTypes.STRING
    //             },
    // });

    // category.associate = (models => {
    //     category.hasMany(models.Product,{as:'productos'})
    // })

    let alias = "categories"

    let cols = {
        name: {
            type: dataTypes.STRING
        }
    }

    let config = {
        tableName: "categories",
        timestamps: false,
        underscored: true,
    }

    const category = sequelize.define(alias,cols,config);

    category.associate = function(models){
        category.hasMany(models.product,{
            as:"product",
        })
    }

    return category;
}
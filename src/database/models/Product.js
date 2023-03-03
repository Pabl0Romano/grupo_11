const {sequelize,dataTypes} = require("sequelize")
module.exports = (sequelize, dataTypes) =>{


    const Product = sequelize.define('product',{
        name: {
                    type: dataTypes.STRING
                },
                description: {
                    type: dataTypes.STRING
                },
                price: {
                    type: dataTypes.INTEGER
                },
                categories_id: {
                    type: dataTypes.INTEGER
                },
                brands_id: {
                    type: dataTypes.INTEGER
                }
    });

    Product.associate = (models => {
        Product.belongsTo(models.Category,{as:'categorias'})
    })
    Product.associate = (models => {
        Product.belongsTo(models.Brand,{as:'brands'})
    })

    // let alias = "product"

    // let cols = {
    //     id: {
    //         type: dataTypes.INTEGER,
    //         primaryKey: true,
    //         autoIncrement: true,
    //         allowNull: false
    //     },
    //     name: {
    //         type: dataTypes.STRING
    //     },
    //     description: {
    //         type: dataTypes.STRING
    //     },
    //     price: {
    //         type: dataTypes.INTEGER
    //     },
    //     categories_id: {
    //         type: dataTypes.INTEGER
    //     },
    //     brands_id: {
    //         type: dataTypes.INTEGER
    //     }
        
    // }

    // let config = {
    //     tableName: "products",
    //     timestamps: false,
    //     underscored: true,
    // }

    // const Product = sequelize.define(alias,cols,config);

    // Product.associate = function(models){
    //     Product.belongsTo(models.categories,{
    //         as:"category",
    //         foreingKey:"categories_id",
    //     })
    //     Product.belongsTo(models.brand,{
    //         as:"brand",
    //         foreingKey:"brands_id"
    //     })
    // }

    return Product;
}
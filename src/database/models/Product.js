const {sequelize,dataTypes} = require("sequelize")
module.exports = (sequelize, dataTypes) =>{


    // const Product = sequelize.define('product',{
    //     name: {
    //                 type: dataTypes.STRING
    //             },
    //             description: {
    //                 type: dataTypes.STRING
    //             },
    //             price: {
    //                 type: dataTypes.INTEGER
    //             },
    //             categories_id: {
    //                 type: dataTypes.INTEGER
    //             },
    //             brands_id: {
    //                 type: dataTypes.INTEGER
    //             }
    // });

    // Product.associate = (models => {
    //     Product.belongsTo(models.Category,{as:'categorias'})
    // })
    // Product.associate = (models => {
    //     Product.belongsTo(models.Brand,{as:'brands'})
    // })

    let alias = "product"

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING
        },
        description: {
            type: dataTypes.STRING
        },
        price: {
            type: dataTypes.INTEGER
        },
        category_id: {
            type: dataTypes.INTEGER
        },
        brand_id: {
            type: dataTypes.INTEGER
        },
        image: {
            type: dataTypes.STRING
        }
        
    }

    let config = {
        tableName: "products",
        timestamps: false,
        underscored: true,
    }

    const product = sequelize.define(alias,cols,config);

    product.associate = function(models){
        product.belongsTo(models.categories,{
            as:"category",
            foreingKey:"category_id",
        })
        product.belongsTo(models.brand,{
            as:"brand",
            foreingKey:"brand_id"
        })
    }

    return product;
}
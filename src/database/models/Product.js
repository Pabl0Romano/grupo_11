module.exports = (sequelize, dataTypes) =>{

    let alias = "Product"

    let cols = {
        id_product: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
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
        id_category: {
            type: dataTypes.INTEGER
        },
        id_brand: {
            type: dataTypes.INTEGER
        }
        
    }

    let config = {
        tableName: "products",
        timestamps: false,
        underscored: true,
    }

    const Product = sequelize.define(alias,cols,config);

    Product.associate = function(models){
        Product.belongsTo(models.Category,{
            as:"Category",
            foreingKey:"id_category",
        })
        Product.belongsTo(models.Brand,{
            as:"Brand",
            foreingKey:"id_brand",
        })
    }

    return Product;
}
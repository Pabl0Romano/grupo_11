module.exports = (sequelize, dataTypes) =>{

    let alias = "Products"

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
        id_brand: {
            type: dataTypes.INTEGER,
            references: {
                model: Brand,
                key: "id_brand"
            }
        },
        id_category: {
            type: dataTypes.INTEGER,
            references: {
                model: Category,
                key: "id_category"
            }
        }
    }

    let config = {
        tableName: "products",
        timeStamps: false
    }

    const Product = sequelize.define(alias,cols,config);

    return Product;
}
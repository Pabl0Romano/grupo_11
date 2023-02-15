module.exports = (sequelize, dataTypes) =>{

    let alias = "Category"

    let cols = {
        id_category: {
            type: dataTypes.INTEGER,
            primaryKey: true
        },
        name: {
            type: dataTypes.STRING
        }
    }

    let config = {
        tableName: "categories",
        timestamps: false
    }

    const Category = sequelize.define(alias,cols,config);

    Category.associate = function(models){
        Category.hasMany(models.Product,{
            as:"products",
            foreingKey:"id_category"
        })
    }

    return Category;
}
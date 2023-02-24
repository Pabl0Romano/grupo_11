module.exports = (sequelize, dataTypes) =>{

    let alias = "Category"

    let cols = {
        idcategory: {
            type: dataTypes.INTEGER,
            primaryKey: true
        },
        name: {
            type: dataTypes.STRING
        }
    }

    let config = {
        tableName: "categories",
        timestamps: false,
        underscored: true,
    }

    const Category = sequelize.define(alias,cols,config);

    Category.associate = function(models){
        Category.hasMany(models.Product,{
            as:"Product",
            foreingKey:"id_category",
        })
    }

    return Category;
}
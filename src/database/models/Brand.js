module.exports = (sequelize, dataTypes) =>{

    let alias = "Brands";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true
        },
        name: {
            type: dataTypes.STRING
        }
    }

    let config = {
        tableName: "brands",
        timestamps: false,
        underscored: true,
    }

    const Brand = sequelize.define(alias,cols,config);

    Brand.associate = function(models){
        Brand.hasMany(models.Products,{
            as:"product",
            foreingKey:"id_brand"
        })
    }


    return Brand;
}
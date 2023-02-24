module.exports = (sequelize, dataTypes) =>{

    let alias = "Brand";

    let cols = {
        id_brand: {
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
        Brand.hasMany(models.Product,{
            as:"Product",
            foreingKey:"id_brand",
        })
    }


    return Brand;
}
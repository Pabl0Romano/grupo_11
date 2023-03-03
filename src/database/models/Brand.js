module.exports = (sequelize, dataTypes) =>{

    // const brand = sequelize.define('brand',{
    //     name: {
    //                 type: dataTypes.STRING
    //             },
    // });

    // brand.associate = (models => {
    //     brand.hasMany(models.Product,{as:'productos'})
    // })


    let alias = "brand";

    let cols = {
        name: {
            type: dataTypes.STRING
        }
    }

    let config = {
        tableName: "brands",
        timestamps: false,
        underscored: true,
    }

    const brand = sequelize.define(alias,cols,config);

    brand.associate = function(models){
        brand.hasMany(models.product,{
            as:"product",
        })
    }


    return brand;
}
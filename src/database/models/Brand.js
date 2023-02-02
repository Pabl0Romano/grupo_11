module.exports = (sequelize, dataTypes) =>{

    let alias = "Brands";

    let cols = {
        id_brand: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        }
    }

    let config = {
        tableName: "brands",
        timeStamps: false
    }

    const Brand = sequelize.define(alias,cols,config);

    return Brand;
}
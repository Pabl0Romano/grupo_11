module.exports = (sequelize, dataTypes) =>{

    let alias = "Categories"

    let cols = {
        id_category: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    }

    let config = {
        tableName: "categories",
        timeStamps: false
    }

    const Category = sequelize.define(alias,cols,config);

    return Category;
}
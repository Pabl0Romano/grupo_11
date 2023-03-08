module.exports = (sequelize, dataTypes) => {
    let alias = "Cities"

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        },
        postal_code: {
            type: dataTypes.INTEGER
        },
        province: {
            type: dataTypes.STRING
        },
        country: {
            type: dataTypes.STRING
        }
    }

    let config = {
        tableName: "cities",
        timestamps: false,
        underscored: true
    }

    const City = sequelize.define(alias,cols,config);

    // City.associate = function(models){
    //     City.hasMany(models.Users,{
    //         as:"usuario",
    //     })
    // }

    return City;
}
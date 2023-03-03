module.exports = (sequelize,dataTypes) =>{
    let alias = "Users";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: dataTypes.STRING
        },
        last_name: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        password: {
            type: dataTypes.STRING
        },
        phone_number: {
            type: dataTypes.INTEGER
        },
        rol: {
            type: dataTypes.INTEGER
        },
        direccion: {
            type: dataTypes.STRING
        },
        cities_id: {
            type: dataTypes.INTEGER,
        }
    }

    let config = {
        tableName: "users",
        timestamps: false,
        underscored: true
    }

    const User = sequelize.define(alias,cols,config);

    User.associate = function(models){
        User.belongsTo(models.Cities,{
            as:"Ciudad",
            foreingKey:"cities_id",
        })
    }
    return User;
}
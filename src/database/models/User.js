module.exports = (sequelize,dataTypes) =>{
    let alias = "Users";

    let cols = {
        id_user: {
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
        id_city: {
            type: dataTypes.INTEGER,
            references: {
                model: "City",
                key: "id_city"
            }
        }
    }

    let config = {
        tableName: "users",
        timestamps: false
    }

    const User = sequelize.define(alias,cols,config);

    return User;
}
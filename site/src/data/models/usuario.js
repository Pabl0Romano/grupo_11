/*function usuariosData(sequelize, dataTypes) {

    const alias = "Usuarios"

    const cols = {
        id: {
            type:dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre : {
            type : dataTypes.STRING(255),
            allowNull: false
        },
        apellido : {
            type : dataTypes.STRING(255),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        contraseña: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        
        avatar : {
            type : dataTypes.STRING(255)
        },
       
        fecha_inscripcion : {
            type : dataTypes.DATE,
            defaultValue: '2021-10-10'
        }
    
}

config = {camelCase: false, timestamps: false}; 

const Usuario = sequelize.define(alias, cols, config);

Usuario.associate = (models) => {

    Usuario.hasMany(models.Productos, {
        as: 'productos',
        foreignKey: 'FKcoleccionista'
    })
    Usuario.hasMany(models.Venta, {
        as : 'ventas',
        forgeinKey: 'Fkusuario'
    })
}

return Usuario
}

module.exports = usuariosData;*/
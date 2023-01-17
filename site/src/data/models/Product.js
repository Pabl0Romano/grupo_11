/*module.exports = (sequelize, DataTypes)=>{
    let alias = "Product"
        let cols = {
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull:false
            },
            model:{
                type: DataTypes.STRING, 
                allowNull:false
            },
            cc:{
                type:DataTypes.STRING, 
                allowNull:false
            },
            brandId: {
                type: DataTypes.INTEGER,
                allowNull:false
            },
            colorId:{
                type: DataTypes.INTEGER,
                allowNull:false
            },
            stock:{
                type:DataTypes.INTEGER,
                allowNull:false
            },
            description:{
                type: DataTypes.STRING,
                allowNull:false, 
            },
            coin:{
                type: DataTypes.STRING,
                allowNull:false,
            },
            specification:{
                type: DataTypes.STRING,
                allowNull:false
            },
            iva: DataTypes.INTEGER,
            brakes: {
                type: DataTypes.STRING,
                allowNull:false
            },
            gross:{
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }
        let config= {
           tableName:"products"  
       }
     
        let Product= sequelize.define(alias, cols, config)
    
        Product.associate=function(models){
            Product.belongsTo(models.Color,{
                as:"color",
                foreingKey:"colorId"
            })
            Product.belongsTo(models.Brand,{
                as:"brand",
                foreingKey:"brandId"
            })  
            Product.belongsToMany(models.Image,{
                as:"image",
                through:"imageProduct",
                foreingKey:"productId",
                otherKey:"imageId"
            })
            Product.belongsToMany(models.User,{
                as:"user",
                through:"cartProduct",
                foreingKey:"productId",
                otherKey:"userId"
            })      
        }
    return Product;
    }*/
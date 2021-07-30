const sequelize = require('../db');
const{DataTypes} = require('sequelize');

const User = sequelize.define('user',{
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    nickname:{type: DataTypes.STRING, unique:true, allowNull: false},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    role: {type: DataTypes.STRING, defaultValue:"USER"},
    password: {type: DataTypes.STRING, allowNull: false},
    firstname:{type: DataTypes.STRING},
    secondname:{type: DataTypes.STRING}

});
const Picture = sequelize.define('picture',{
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    header:{type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING},
    img: {type: DataTypes.STRING, allowNull: false},
});
const PictureLike = sequelize.define('picture_like',{
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
});
const PictureTag = sequelize.define('picture_tag',{
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    text:{type:DataTypes.STRING, allowNull: false}
});
const PictureInfo = sequelize.define('picture_info',{
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    title:{type:DataTypes.STRING, allowNull: false},
    description:{type:DataTypes.STRING, allowNull: false}
});
const Comment = sequelize.define('comment',{
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    text:{type:DataTypes.STRING, allowNull: false},
});
const CommentLike = sequelize.define('comment_like',{
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
});


User.hasMany(Picture);
Picture.belongsTo(User);

User.hasMany(PictureLike);
PictureLike.belongsTo(User);

User.hasMany(Comment);
Comment.belongsTo(User);

User.hasMany(CommentLike);
CommentLike.belongsTo(User);

Picture.hasMany(PictureLike);
PictureLike.belongsTo(Picture);

Picture.hasMany(PictureTag);
PictureTag.belongsTo(Picture);

Picture.hasMany(PictureInfo);
PictureInfo.belongsTo(Picture);

Picture.hasMany(Comment);
Comment.belongsTo(Picture);

Comment.hasMany(CommentLike);
CommentLike.belongsTo(Comment);

module.exports = {
    User,
    Picture,
    PictureInfo,
    PictureLike,
    PictureTag,
    Comment,
    CommentLike
};
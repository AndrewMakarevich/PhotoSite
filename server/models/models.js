const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nickname: { type: DataTypes.STRING, unique: true, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
    password: { type: DataTypes.STRING, allowNull: false },
    isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
    activationLink: { type: DataTypes.STRING },
    firstname: { type: DataTypes.STRING },
    secondname: { type: DataTypes.STRING }

});
const Picture = sequelize.define('picture', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    header: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    img: { type: DataTypes.STRING, allowNull: false },
});
const Type = sequelize.define('type', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false }
});
const PictureLike = sequelize.define('picture_like', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});
const PictureTag = sequelize.define('picture_tag', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    text: { type: DataTypes.STRING, allowNull: false }
});
const PictureInfo = sequelize.define('picture_info', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false }
});
const Comment = sequelize.define('comment', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    text: { type: DataTypes.TEXT, allowNull: false },
});
const CommentLike = sequelize.define('comment_like', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});
const ReplyComment = sequelize.define('reply_comment', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    text: { type: DataTypes.TEXT, allowNull: false }
});
const ReplyCommentLike = sequelize.define('reply_comment_like', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

// ПРОМЕЖУТОЧНАЯ ТАБЛИЦА
const PicturesTags = sequelize.define('pictures_tags', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
});


User.hasMany(Picture);
Picture.belongsTo(User);

User.hasMany(PictureLike);
PictureLike.belongsTo(User);

User.hasMany(Comment);
Comment.belongsTo(User);

User.hasMany(CommentLike);
CommentLike.belongsTo(User);

User.hasMany(ReplyComment);
ReplyComment.belongsTo(User);

User.hasMany(ReplyCommentLike);
ReplyCommentLike.belongsTo(User);

Picture.hasMany(PictureLike, { as: "likes" });
PictureLike.belongsTo(Picture);

Picture.belongsToMany(PictureTag, { as: "tags", through: PicturesTags });
PictureTag.belongsToMany(Picture, { through: PicturesTags });

Picture.hasMany(PictureInfo, { as: "add_info" });
PictureInfo.belongsTo(Picture);

Picture.hasMany(Comment, { as: "comments" });
Comment.belongsTo(Picture);

Type.hasMany(Picture);
Picture.belongsTo(Type);

Comment.hasMany(CommentLike);
CommentLike.belongsTo(Comment);

Comment.hasMany(ReplyComment, { as: "reply_comments" });
ReplyComment.belongsTo(Comment);

ReplyComment.hasMany(ReplyCommentLike, { as: "likes" });
ReplyCommentLike.belongsTo(ReplyComment);

module.exports = {
    User,
    Picture,
    Type,
    PictureInfo,
    PictureLike,
    PictureTag,
    Comment,
    CommentLike,
    ReplyComment,
    ReplyCommentLike,
    PicturesTags
};
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define(
    'todo',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      todo: {
        type: DataTypes.STRING(500),
      },
      complete: {
        type: DataTypes.BOOLEAN,
      },
    },
    { timestamps: false }
  );
  return Todo;
};

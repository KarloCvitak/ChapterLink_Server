module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('knjige_has_autori_knjiga', {
            book_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Book',
                    key: 'book_id'
                },
                onDelete: 'CASCADE'
            },
            author_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Author',
                    key: 'author_id'
                },
                onDelete: 'CASCADE'
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('knjige_has_autori_knjiga');
    }
};

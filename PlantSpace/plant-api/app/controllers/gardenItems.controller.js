const db = require('../index');
const { v4: uuid } = require('uuid');

exports.getAllGardenItems = (req, res) => {
    const script = `
        SELECT * 
        FROM garden_items;
    `;
    db.query(script, (err, results) => {
        if (err) {
            res.status(500).send({
                error: err,
                message: 'There was a problem finding all garden items, please try again'
            })
        } else if (results.length == 0) {
            res.status(404).send({
                error: err,
                message: 'No garden items were found'
            })
        } else {
            res.send(results)
        }
    })
}

exports.getGardenItemsByUserId = (req, res) => {

    const { userId } = req.params

    const script = `
        SELECT plants.*
            FROM garden_items
        INNER JOIN plants 
            ON garden_items.plant_id = plants.id
        WHERE user_id = ?;
    `;

    const placeholderValues = [userId];

    db.query(script, placeholderValues, (err, results) => {
        if (err) {
            res.status(500).send({
                error: err,
                message: 'There was a problem finding this garden item, please try again'
            })
        } else if (results.length == 0) {
            res.status(404).send({
                error: err,
                message: 'There was no garden item at this id, please input a valid id'
            })
        } else {
            res.send(results)
        }
    })
}

exports.createGardenItems = (req, res) => {

    const { userId, plantId } = req.body

    const script = `
        INSERT INTO garden_items
            (user_id, plant_id)
        VALUES
            (?, ?);
    `;
    const id = uuid();

    const placeholderValues = [userId, plantId];

    db.query(script, placeholderValues, (err, results) => {
        if (err || results.affectedRows == 0) {
            res.status(500).send({
                error: err,
                message: 'There was an error creating the garden item. Please try again.'
            });
            return;
        }
        res.send({
            message: "Garden item was created successfully",
            newGardenItemId: id
        });
    });
}

exports.removeFromGarden = (req, res) => {

    let { userId, plantId } = req.params

    const script = `
        DELETE
        FROM garden_items
        WHERE user_id = ?
            AND plant_id = ?
    `

    const placeholderValues = [userId, plantId];

    db.query(script, placeholderValues, (err, results) => {
        if (err) {
            res.status(500).send({
                error: err,
                message: 'There was a problem deleting your garden item, please try again'
            })
            return;
        } else if (results.affectedRows == 0) {
            res.status(400).send({
                error: err,
                message: 'There was no garden item at this id, please enter a valid id'
            })
        } else {
            res.send({
                message: 'garden item was successfully deleted'
            })
        }
    })
}
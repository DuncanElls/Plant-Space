const db = require('../index');

exports.getAllPlants = (req, res) => {
    const script = `
        SELECT * 
        FROM plants
    `;

    db.query(script, (err, results) => {
        if (err) {
            res.status(500).send({
                error: err,
                message: 'There was a problem finding all plants, please try again'
            })
        } else if (results.length == 0) {
            res.status(404).send({
                error: err,
                message: 'No plants were found'
            })
        } else {
            res.send(results)
        }

    })
}

exports.getPlantsByCategory = (req, res) => {

    const { category } = req.params

    const script = `
    SELECT *
    FROM plants
    WHERE category = ?
    `

    const placeholderValues = [category];

    db.query(script, placeholderValues, (err, results) => {
        if (err) {
            res.status(500).send({
                error: err,
                message: 'There was a problem finding this category, please try again'
            })
        } else if (results.length == 0) {
            res.status(404).send({
                error: err,
                message: 'There was no data at this category, please input a valid category'
            })
        } else {
            res.send(results)
        }
    })
}

exports.getPlantsById = (req, res) => {

    const { id } = req.params;

    const script = `
        SELECT *
        FROM plants
        WHERE id = ?
    `

    const placeholderValues = [id];

    db.query(script, placeholderValues, (err, results) => {
        if (err) {
            res.status(500).send({
                error: err,
                message: 'There was a problem finding this plant, please try again'
            })
        } else if (results.length == 0) {
            res.status(404).send({
                error: err,
                message: 'There was no plant at this id, please input a valid id'
            })
        } else {
            res.send(results[0])
        }
    })
}

exports.createPlant = (req, res) => {

    const { id, name, price, size, category, temperature, description, lightLevel, image } = req.body

    if (!id || (typeof id != 'string')) {
        res.status(400).send({
            message: 'id name is invalid'
        });
        return;
    } else if (!name || (typeof name != 'string')) {
        res.status(400).send({
            message: 'invalid name input'
        });
        return;
    } else if (!price || (typeof price != 'number')) {
        res.status(400).send({
            message: 'invalid price input'
        });
        return;
    } else if (!size || (typeof size != 'string')) {
        res.status(400).send({
            message: 'invalid size input'
        });
        return;
    } else if (!category || (typeof category != 'string')) {
        res.status(400).send({
            message: 'invalid category input'
        });
        return;
    } else if (!temperature || (typeof temperature != 'string')) {
        res.status(400).send({
            message: 'invalid temperature input'
        });
        return;
    } else if (!brand || (typeof brand != 'string')) {
        res.status(400).send({
            message: 'invalid brand input'
        });
        return;
    } else if (!description || (typeof description != 'string')) {
        res.status(400).send({
            message: 'invalid description input'
        });
        return;
    } else if (!lightLevel || (typeof lightLevel != 'string')) {
        res.status(400).send({
            message: 'invalid light input'
        });
        return;
    } else if (!image || (typeof image != 'string')) {
        res.status(400).send({
            message: 'invalid image input'
        });
        return;
    }

    const script = `
        INSERT INTO plants
            (id, name, price, size, category, temperature, description, light-level, image)
        VALUES
            (?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    const placeholderValues = [id, name, price, size, category, temperature, description, lightLevel, image];

    db.query(script, placeholderValues, (err, results) => {
        if (err || results.affectedRows == 0) {
            res.status(500).send({
                error: err,
                message: 'There was an error creating the plant. Please try again.'
            });
            return;
        }
        res.send({
            message: "Plant was created successfully",
            newPlantId: id
        });
    });
}

exports.updatePlant = async (req, res) => {
    const id = req.params
    const { name, price, size, category, temperature, description, lightLevel, image } = req.body

    if (!name || (typeof name != 'string')) {
        res.status(400).send({
            message: 'plant name is invalid'
        });
        return;
    } else if (!price || (typeof price != 'number')) {
        res.status(400).send({
            message: 'invalid price input'
        });
        return;
    } else if (!size || (typeof size != 'string')) {
        res.status(400).send({
            message: 'invalid price input'
        });
        return;
    } else if (!category || (typeof category != 'string')) {
        res.status(400).send({
            message: 'invalid category input'
        });
        return;
    } else if (!temperature || (typeof temperature != 'string')) {
        res.status(400).send({
            message: 'invalid temperature input'
        });
        return;
    } else if (!description || (typeof description != 'string')) {
        res.status(400).send({
            message: 'invalid description input'
        });
        return;
    } else if (!lightLevel || (typeof lightLevel != 'string')) {
        res.status(400).send({
            message: 'invalid light input'
        });
        return;
    } else if (!image || (typeof image != 'string')) {
        res.status(400).send({
            message: 'invalid image input'
        });
        return;
    }

    const script = `
        UPDATE plants 
        SET name = ?, 
            price = ?, 
            size = ?,
            category = ?, 
            temperature = ?, 
            description = ?,
            light-level 
            image = ?
        WHERE id = ?;
    `;

    const placeholderValues = [name, price, size, category, temperature, description, lightLevel, image, id]

    db.query(script, placeholderValues, (err, results) => {
        if (err) {
            res.status(500).send({
                error: err,
                message: "There was a problem editing the plant"
            })
            return
        } else if (results.affectedRows == 0) {
            res.status(404).send({
                message: "No plant was updated with that id",
                id
            })
            return;
        } else {
            res.send(results)
            message: "Your plant was updated"
            id
        }
    })
}

exports.deletePlantById = (req, res) => {

    let id = req.params

    const script = `
        DELETE
        FROM plants
        WHERE id = ?
    `

    const placeholderValues = [id];

    db.query(script, placeholderValues, (err, results) => {
        if (err) {
            res.status(500).send({
                error: err,
                message: 'There was a problem deleting your plant, please try again'
            })
            return;
        } else if (results.affectedRows == 0) {
            res.status(400).send({
                error: err,
                message: 'There was no plant at this id, please enter a valid id'
            })
        } else {
            res.send({
                message: 'Plant was successfully deleted'
            })
        }
    })
}
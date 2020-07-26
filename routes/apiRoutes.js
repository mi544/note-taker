const tableData = require("../data/tableData");
const waitListData = require("../data/waitlistData");

module.exports = app => {
    app.get("/api/notes", (req, res) => {
        // Should read the `db.json` file and return all saved notes as JSON.
    });

    app.post("/api/tables", (req, res) => {
        const reservation = req.body;

        if (tableData.length < 5) {
            tableData.push(reservation);
            res.json(true);
        } else {
            waitListData.push(reservation);
            res.json(false);
        }
    });


    app.post("/api/notes", (req, res) => {
        // Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
    });


    app.delete("/api/notes/:id", (req, res) => {
        // Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
    });
};
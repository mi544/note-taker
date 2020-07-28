const fs = require("fs");
const util = require("util");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

module.exports = app => {
    app.get("/api/notes", async (req, res) => {
        console.log("GET /api/notes");
        const db = await readFileAsync("db/db.json", "utf8");
        res.json(JSON.parse(db));
    });

    app.post("/api/notes", async (req, res) => {
        const newNote = req.body;
        const db = JSON.parse(await readFileAsync("db/db.json", "utf8"));
        newNote.id = db.length + 1;
        db.push(newNote);
        await writeFileAsync("db/db.json", JSON.stringify(db), "utf8");
        res.json(JSON.stringify(newNote));
    })


    app.delete("/api/notes/:id", async (req, res) => {
        const id = Number(req.params.id);
        console.log(id);
        const db = JSON.parse(await readFileAsync("db/db.json", "utf8"));
        db.splice(id - 1, 1);
        // updating ID values so that they always remain unique
        // (using individual indexes of items)
        for (const i in db) {
            db[i].id = Number(i) + 1;
        }
        await writeFileAsync("db/db.json", JSON.stringify(db), "utf8");
        res.send(true);
    });
};
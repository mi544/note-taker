const fs = require("fs");
const util = require("util");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

module.exports = app => {
    app.get("/api/notes", async (req, res) => {
        const db = await readFileAsync("db/db.json", "utf8");
        res.json(JSON.parse(db));
    });

    app.post("/api/notes", async (req, res) => {
        const newNote = req.body;
        const db = JSON.parse(await readFileAsync("db/db.json", "utf8"));
        newNote.id = db.length + 1;
        db.push(newNote);
        await writeFileAsync("db/db.json", JSON.stringify(db), "utf8");
        console.log(JSON.stringify(newNote));
        res.json(JSON.stringify(newNote));
    })


    app.delete("/api/notes/:id", async (req, res) => {
        const id = req.params.id - 1;
        const db = JSON.parse(await readFileAsync("db/db.json", "utf8"));
        db.splice(id, 1);
        console.log(db, '\n');
        for (const i in db) {
            db[i].id = Number(i) + 1;
        }
        console.log(db, '\n');
        await writeFileAsync("db/db.json", JSON.stringify(db), "utf8");
        res.send(true);
    });
};
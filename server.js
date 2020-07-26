const express = require("express");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.use(express.static("public"));



// ================================================================================
// ROUTES
// Note: The routes are stored in an external module and required here
// ================================================================================

// The (app) at the end of each require threads the `app` object through to the routes, so they can use methods like app.get(), app.post(), etc
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);



// ================================================================================
// Listener
// ================================================================================
// Kicks the server off to listen for requests on the specified port number
app.listen(PORT, () => console.log(`App listening 'http://localhost:${PORT}'`));
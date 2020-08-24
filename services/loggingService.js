const Sentry = require("@sentry/node");

module.exports = function (app) {
    Sentry.init({
        dsn: "https://d7e35d45ccf74c34b307ece38a518635@o387344.ingest.sentry.io/5403197",
    });

    app.use(Sentry.Handlers.requestHandler());

    app.use(Sentry.Handlers.errorHandler({
        shouldHandleError(error) {
            // Capture all 404 and 500 errors
            if (error.status === 404 || error.status === 500) {
                return true;
            }
            return false;
        },
    }));

    app.use(function onError(err, req, res, next) {
        // The error id is attached to `res.sentry` to be returned
        // and optionally displayed to the user for support.
        res.statusCode = 500;
        res.end(res.sentry + "\n");
    });

    app.get("/debug-sentry", function mainHandler(req, res) {
        throw new Error("My first Sentry error!");
    });
};
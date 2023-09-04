const port = process.env.PORT || 3000;

const runServer = (app) => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

module.exports = runServer
module.exports = {
    msg: (msg) => {
        console.log(JSON.stringify(msg));
    },
    time: () => {
        return Math.floor(new Date() / 1000);
    }
}
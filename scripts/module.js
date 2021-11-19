Hooks.once('init', async function() {

});

Hooks.once('ready', async function() {
    //
    CONFIG.Item.documentClass.prototype.test = () => {
        game.symbaroum.log("Testing");
    }
});

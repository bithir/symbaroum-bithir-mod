import { BITHIRMODCONF } from './config.js';
import { getItemModifierUncannycoordination } from './abilities/uncannycoordination.js';
import { BithirMacros } from './lib/libmacros.js';

Hooks.once('init', async function() {    
    // Add (or replace) prototype functions for integration in to the system
    CONFIG.Item.documentClass.prototype.getItemModifierUncannycoordination = getItemModifierUncannycoordination;

});


Hooks.once('ready', async function() {
    //

    game.bithirmod = {
        config: BITHIRMODCONF,
        macros: new BithirMacros()
    };    
    game.symbaroum.log("Module ready hook");
});
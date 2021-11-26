import { getItemModifierUncannycoordination } from './abilities/uncannycoordination.js';

Hooks.once('init', async function() {    
    // Add (or replace) prototype functions for integration in to the system
    CONFIG.Item.documentClass.prototype.getItemModifierUncannycoordination = getItemModifierUncannycoordination;
});

Hooks.once('ready', async function() {
    //
    game.symbaroum.log("Module ready hook");
});
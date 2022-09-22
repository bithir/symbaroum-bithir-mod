import { BITHIRMODCONF } from './config.js';
import { getItemModifierUncannycoordination } from './abilities/uncannycoordination.js';
import { getItemModifierBerserkerv2, abilitySetupBerserkerv2 } from './abilities/berserk.js';
import { BithirMacros } from './lib/libmacros.js';

Hooks.once('init', async function() {    
    // Add (or replace) prototype functions for integration in to the system
    CONFIG.Item.documentClass.prototype.getItemModifierUncannycoordination = getItemModifierUncannycoordination;
    CONFIG.Item.documentClass.prototype.getItemModifierBerserkerv2 = getItemModifierBerserkerv2;
    CONFIG.Item.documentClass.prototype.abilitySetupBerserkerv2 = abilitySetupBerserkerv2;

    game.symbaroum.config.scriptedAbilities.push("berserkerv2");
    CONFIG.statusEffects.push({
        id: "berserkerv2",
        label: "ABILITY_LABEL.BERSERKER",
        icon: "systems/symbaroum/asset/image/berserker.svg"
      });
});


Hooks.once('ready', async function() {
    //

    game.bithirmod = {
        config: BITHIRMODCONF,
        macros: new BithirMacros()
    };    
    game.symbaroum.log("Module ready hook");
});
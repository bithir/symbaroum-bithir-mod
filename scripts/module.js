import { BITHIRMODCONF } from './config.js';
import { getItemModifierUncannycoordination } from './abilities/uncannycoordination.js';
import { getItemModifierBerserkerv2, abilitySetupBerserkerv2 } from './abilities/berserk.js';
import { BithirMacros } from './lib/libmacros.js';
import { sendDevMessage } from './devmessage.js';
import { LocationDie, EventDie, CreatureDie, RewardDie } from './inspiration/die.js';

const moduleId = 'symbaroum-bithir-mod';
const adventurePack = `${moduleId}.bithir-mods`;
const adventureName = "Required items for Bithir's mods";

Hooks.once('init', async function() {    
    // Add (or replace) prototype functions for integration in to the system
    CONFIG.Item.documentClass.prototype.getItemModifierUncannycoordination = getItemModifierUncannycoordination;
    CONFIG.Item.documentClass.prototype.getItemModifierBerserkerv2 = getItemModifierBerserkerv2;
    CONFIG.Item.documentClass.prototype.abilitySetupBerserkerv2 = abilitySetupBerserkerv2;

    game.settings.register(moduleId, 'moduleVersion', {
        name: 'Module Version',
        scope: 'world',
        config: false,
        type: String,
        default: '0',
    });

    game.settings.register(moduleId, 'devMessageVersionNumber', {
        name: 'Development message version',
        scope: 'world',
        config: false,
        type: String,
        default: '0',
    });

    game.symbaroum.config.scriptedAbilities.push("berserkerv2");
    CONFIG.statusEffects.push({
        id: "berserkerv2",
        label: "ABILITY_LABEL.BERSERKER",
        icon: "systems/symbaroum/asset/image/berserker.svg"
    });

    // Dice
    CONFIG.Dice.terms[LocationDie.DENOMINATION] = LocationDie;
    CONFIG.Dice.terms[EventDie.DENOMINATION] = EventDie;
    CONFIG.Dice.terms[CreatureDie.DENOMINATION] = CreatureDie;
    CONFIG.Dice.terms[RewardDie.DENOMINATION] = RewardDie;
    // game.symbaroum.info(`Module[${moduleId}] init hook complete`);
});


Hooks.once('ready', async function() {
    //

    game.bithirmod = {
        config: BITHIRMODCONF,
        macros: new BithirMacros()
    };
    if (game.user.isGM) {
        ModuleImport();
        sendDevMessage();
    }
    game.symbaroum.info(`Module[${moduleId}] ready hook complete`);
});

export async function ModuleImport() {
    //
    // Imports all assets in the Adventure Collection.  
    // Will overwrite existing assets. 
    //
    const moduleVersion = game.modules.get(moduleId)?.version;
    if(!foundry.utils.isNewerVersion(moduleVersion, game.settings.get(moduleId, 'moduleVersion') ) ) {
        game.symbaroum.info(`moduleVersion[${moduleVersion}] is not never than moduleVersion setting[${game.settings.get(moduleId, 'moduleVersion')}]`);
        return;
    }

    const id = Hooks.on('importAdventure', (adventure, formData, created, updated) => {
        // console.log('adventure',adventure,'formData',formData,'created',created,'updated',updated)
        if (adventure.name === adventureName) {
            // game.symbaroum.log(`Removing hook[${id}]`);
            Hooks.off('importAdventure', id);
            if(created || updated) {
                game.settings.set(moduleId, 'moduleVersion', moduleVersion);                
                ui.notifications.notify(`Import of ${adventureName} Complete`);
                return;
            } else {
                return ui.notifications.warn(`There was a problem with the Import of ${adventureName}`);
            }
        }
    });

    const pack = game.packs.get(adventurePack);
    const adventureId = pack.index.find(a => a.name === adventureName)?._id;    
    const adventure = await pack.getDocument(adventureId);
    await adventure.sheet.render(true);
};

Hooks.once('diceSoNiceReady', (dice3d) => {
    dice3d.addColorset(LocationDie.diceSoNiceColorset);
    dice3d.addDicePreset(LocationDie.diceSoNiceDicePreset);
    dice3d.addColorset(EventDie.diceSoNiceColorset);
    dice3d.addDicePreset(EventDie.diceSoNiceDicePreset);
    dice3d.addColorset(CreatureDie.diceSoNiceColorset);
    dice3d.addDicePreset(CreatureDie.diceSoNiceDicePreset);
    dice3d.addColorset(RewardDie.diceSoNiceColorset);
    dice3d.addDicePreset(RewardDie.diceSoNiceDicePreset);

});
import { BITHIRMODCONF } from './config.js';
import { getItemModifierUncannycoordination } from './abilities/uncannycoordination.js';
import { getItemModifierBerserkerv2, abilitySetupBerserkerv2 } from './abilities/berserk.js';
import { BithirMacros } from './lib/libmacros.js';
import { sendDevMessage } from './devmessage.js';
import { LocationDie, EventDie, CreatureDie, RewardDie } from './inspiration/die.js';
import { BithirApi } from './api.js';

const moduleId = 'symbaroum-bithir-mod';
const adventurePack = `${moduleId}.bithir-mods`;
const adventureName = "Required items for Bithir's mods";

Hooks.once('init', async function() {    

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

    game.settings.register(moduleId, 'hideShadowGeneration', {
        name: 'BITHIRMOD.SHADOW_hideGeneration',
        hint: 'BITHIRMOD.SHADOW_hideGeneration_hint',
        scope: "world",
        config: true,
        default: false,
        type: Boolean
    });

    game.settings.register(moduleId, 'hideShadowLabel', {
        name: 'BITHIRMOD.SHADOW_hideLabel',
        hint: 'BITHIRMOD.SHADOW_hideLabel_hint',
        scope: "world",
        config: true,
        default: false,
        type: Boolean
    });


    game.symbaroum.config.scriptedAbilities.push("berserkerv2");
    // Dice
    CONFIG.Dice.terms[LocationDie.DENOMINATION] = LocationDie;
    CONFIG.Dice.terms[EventDie.DENOMINATION] = EventDie;
    CONFIG.Dice.terms[CreatureDie.DENOMINATION] = CreatureDie;
    CONFIG.Dice.terms[RewardDie.DENOMINATION] = RewardDie;

    game.bithirmod = {
        config: BITHIRMODCONF,
        macros: new BithirMacros(),
        api: new BithirApi()
    };


    // Add (or replace) prototype functions for integration in to the system
    game.symbaroum.api.registerItemModifier("uncannycoordination", getItemModifierUncannycoordination);
    game.symbaroum.api.registerItemModifier("berserkerv2", getItemModifierBerserkerv2 );
    game.symbaroum.api.registerAbility("berserkerv2", abilitySetupBerserkerv2 ); // <- not item modifier
    // CONFIG.Item.documentClass.prototype.abilitySetupBerserkerv2 = abilitySetupBerserkerv2;

});


Hooks.once('ready', async function() {  
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
        game.symbaroum.info(`moduleVersion[${moduleVersion}] is not newer than moduleVersion setting[${game.settings.get(moduleId, 'moduleVersion')}]`);
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

Hooks.on('renderActorSheet', (app, html, data) => {
    if (game.settings.get(moduleId, 'hideShadowGeneration') || 
        !app.object.testUserPermission(game.user, foundry.CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER) ) {
        return;
    }
    const config = game.bithirmod.config;
    const api = game.bithirmod.api;
    let title = api.localize('SHADOW_TITLE');
    let labelTxt = api.localize('SHADOW_LABELTEXT');
    if (game.settings.get(moduleId, 'hideShadowLabel')) {
        labelTxt = "";
    }
    // TODO labelTxt to be made optional
    // <i class="fa-solid fa-circle-half-stroke"></i>
    let actor = app.object;
    let openBtn = $(`<a class="bithirmod-generate-shadow" data-tooltip="${title}"><i class="fa-solid fa-circle-half-stroke"></i>${labelTxt}</a>`);
    openBtn.click(ev => {
        let shadowSelection = duplicate(config.shadowTypes);
        // Option - generate for shadowTypes + "Restore" (if there is one to restore)        
        if(actor.getFlag(config.moduleId,'originalShadow')) {
            shadowSelection.push('restoreshadow');
        }
        let shadowList = shadowSelection.map( (elem) => {
            return `<option value="${elem}">${api.localize(`SHADOW_${elem}`)}</option>`;
        });

        let dialog_content = `<div class="form-group bithirmod">
            <h2>${api.localize('SHADOW_SELECTSHADOWTYPE')}</h2>
            <br />
            <div style="dialogHeader">
                <div style="width:10em;min-width:10em;"><select id="shadow" name="shadow">${shadowList}</select></div>
            </div><br/>
        </div>`;
        const x = new Dialog({
            content : dialog_content,
            buttons : 
            {
            Ok : { label : api.localize(`OK`), callback : async (html)=> {
                    const selectedShadow = html.find('#shadow')[0].value;
                    if(selectedShadow == 'restoreshadow') {
                        // get from flag
                        let originalShadow = await actor.getFlag(config.moduleId, 'originalShadow');
                        actor.update({'system.bio.shadow':originalShadow });
                    } else {
                        // if no flag and not empty, set orginal flag
                        if(actor.system.bio.shadow != '') {
                            await actor.setFlag(config.moduleId, 'originalShadow', actor.system.bio.shadow );
                        }
                        // generate shadow
                        const newShadow = await api.generateShadow(selectedShadow, actor);
                        actor.update({'system.bio.shadow':newShadow.capitalize() });
                    }
                }
            },
            Cancel : {label : api.localize(`CANCEL`)}
            }
        });
        
        x.options.width = 200;
        x.position.width = 300;
        
        x.render(true);        
    });
    html.closest('.app').find('.bithirmod-generate-shadow').remove();
    let titleElement = html.closest('.app').find('.window-title');
    openBtn.insertAfter(titleElement);
});
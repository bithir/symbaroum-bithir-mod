
export class BithirMacros
{
    async generateAbominationMacro()
    {
        const config = game.bithirmod.config;
        // Capture exp level (from drop down)
        let expLevel = '';
        for(let resistLv of config.resistanceLevels) {
            expLevel += `<option value="${resistLv.name}">${resistLv.name}</option>`;
        }
        let dialog_content = `  
        <div class="form-group">
        <h2>Select abomination resistance level</h2>
        <br />
        <div style="flex-basis: auto;flex-direction: row;display: flex;">
        <div style="width:10em;min-width:10em;"><select id="expLevel" name="expLevel">${expLevel}</select></div>
        </div><br/>
        </div>`;
        const x = new Dialog({
            content : dialog_content,
            buttons : 
            {
            Ok : { label : `Ok`, callback : async (html)=> {
                    const expLevelName = html.find('#expLevel')[0].value;
                    const selectedExpLevel = config.resistanceLevels.filter( resistLv => { 
                        return resistLv.name == expLevelName;
                    });
                    if(selectedExpLevel.length > 0) {
                        await this.generateAbomination(selectedExpLevel[0]);
                    } else {
                        // Panic - someone clicked the Ok button, but somehow nothing matched in the selection drop down
                        // Should technically be impossible, so I am just going to ignore it for now
                    }
                }
            },
            Cancel : {label : `Cancel`}
            }
        });
        
        x.options.width = 200;
        x.position.width = 300;
        
        x.render(true);
    

    }

    async generateAbomination(xpLevel) {        
        const config = game.bithirmod.config;
        game.symbaroum.log(`Making a ${xpLevel.name} abomination starting at ${xpLevel.abilities} abilities`);
        // Create what will become monster actor
        const actorDetails = {
            name: "A name",
            type: "monster",
            folder: null,
            sort: 12000,
            system: {},
            token: {},
            items: [],
            flags: {}        
        }

        // Randomise stat block
        const statBlock = config.abominationStatBlocks[Math.floor(Math.random()*config.abominationStatBlocks.length)];
        game.symbaroum.log(`Picked stat block of ${statBlock.name}`,statBlock);
        this.setAttributes(actorDetails, statBlock);
        const roll = await new Roll(xpLevel.abilities).evaluate({async: true});
        let maxAbilityCount = roll.total;
        console.log(maxAbilityCount);
        let currentAbilityCount = 0;
        let actor = await Actor.create(actorDetails);
        // Estimate how many starting abilities we get from exp level
        let actorItems = []; // This will contain all abilities & traits

        // Duplicate abilities so that we do not change them
        let abilities = duplicate(game.bithirmod.config.abominationAbilities);
        abilities.core = abilities.core.filter( abilityKeep => { return !statBlock.excludedAbilities.includes(abilityKeep)})
        abilities.core = abilities.core.concat( statBlock.includedAbilities );
        // So this is the pleatora of skills
        game.symbaroum.log(abilities, `max ability count ${maxAbilityCount}`);

        for(let i = 0; i < maxAbilityCount; i++) {
            this.addAbility(actorItems, abilities.core[Math.floor(Math.random()*abilities.core.length)]);
        }

        // Pick core abilities that are not excluded by the stat block & random levels (allow this to exceed )


        // Randomise abilities that are not excluded by the stat block, increase odds for those that are included
        // with that, until xp is exceeded, if same ability is picked, increase it (I -> II -> III)
        await actor.createEmbeddedDocuments("Item", actorItems);

        // total exp spent here would be actor.system.experience.spent - only known after adding abilities
        
        let healMe = {_id:actor.id};
        foundry.utils.setProperty(healMe, "system.health.toughness.value", getProperty(actor, "system.health.toughness.max") );
        await Actor.updateDocuments([healMe]);
        actor.sheet.render(true);
    }

    addAbility(actorItems, ability) {
        game.symbaroum.log(`Looking for ability[${ability.reference}]`);
        // Should check if the ability is already present, and if so, just increase it one point
        let selectedAbility = actorItems.find(elem => elem.system.reference == ability.reference);
        
        // If it is not present, add a new ability
        if(!selectedAbility) {
            const newAbility = game.items.filter(element => element.system.reference == ability.reference && element.system.isPower && element.system.hasLevels);
            if(newAbility.length > 0) {
                game.symbaroum.log("Retriveved from the item catalogue");
                selectedAbility = duplicate(newAbility[0]);
                let rnd = Math.floor(Math.random()*3);
    
                foundry.utils.setProperty(selectedAbility, "system.master.isActive", rnd > 1);
                foundry.utils.setProperty(selectedAbility, "system.adept.isActive", rnd > 0);
                foundry.utils.setProperty(selectedAbility, "system.novice.isActive", true);
                actorItems.push( selectedAbility);
            }
        } else {
            if(foundry.utils.getProperty(selectedAbility,"system.adept.isActive") ) {
                foundry.utils.setProperty(selectedAbility, "system.master.isActive", true);
            }
            if(foundry.utils.getProperty(selectedAbility,"system.novice.isActive") ) {
                foundry.utils.setProperty(selectedAbility, "system.adept.isActive", true);
            }
            game.symbaroum.log("Found existing one");
        }
        console.log(selectedAbility);
    }

    setAttributes(actorDetails, statBlock) {

        // setProperty(newValues, "data.health.corruption.permanent", parseInt(extractData(expectedData,corruptionPattern))); 
        for(let stat in statBlock.attributes) {
            foundry.utils.setProperty(actorDetails, `system.attributes.${stat}.value`), statBlock.attributes[stat];
        }
    }
}
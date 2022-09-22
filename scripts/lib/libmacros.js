
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
        
        // Randomise stat block
        const statBlock = config.abominationStatBlocks[Math.floor(Math.random()*config.abominationStatBlocks.length)];
        game.symbaroum.log(`Picked stat block of ${statBlock.name}`,statBlock);

        const actorDetails = {
            name: `${config.abominationAdjectives[Math.floor(Math.random()*config.abominationAdjectives.length)]} ${statBlock.name}`,
            type: "monster",
            folder: null,
            sort: 12000,
            system: {},
            token: {},
            items: [],
            flags: {}        
        }

        this.setAttributes(actorDetails, statBlock);
        const roll = await new Roll(xpLevel.abilities).evaluate({async: true});
        let startCoreCount = roll.total;
        game.symbaroum.log(startCoreCount);
        let currentAbilityCount = 0;
        let actor = await Actor.create(actorDetails);
        // Estimate how many starting abilities we get from exp level

        // Create a weighted list of abilities
        let sumWeight = 0;        
        // Sum up rarities, so that we know the whole span
        // then we can decide the total random number range and select the correct one
        let actorItems = []; // This will contain all abilities & traits

        // Duplicate abilities so that we do not change them
        let abilities = duplicate(game.bithirmod.config.abominationAbilities);
        abilities.core.abilityRef = abilities.core.abilityRef.filter( abilityKeep => { return !statBlock.excludedAbilities.includes(abilityKeep)})
        abilities.core.abilityRef = abilities.core.abilityRef.concat( statBlock.includedAbilities );
        // So this is the pleatora of skills
        game.symbaroum.log(abilities, `start ability count ${startCoreCount}`);
        for(let i = 0; i < startCoreCount; i++) {
            this.addAbility(actor, actorItems, abilities.core.abilityRef[Math.floor(Math.random()*abilities.core.abilityRef.length)]);
            currentAbilityCount++;
        }
        await actor.createEmbeddedDocuments("Item", actorItems);

        // Pick core abilities that are not excluded by the stat block & random levels (allow this to exceed )


        // Randomise abilities that are not excluded by the stat block, increase odds for those that are included
        // with that, until xp is exceeded, if same ability is picked, increase it (I -> II -> III)

        // 1 chance in 111 for a rare ability
        // 10 chances in 111 for a unusual ability
        // 100 chances in 111 for a common ability
        
        

        // total exp spent here would be actor.system.experience.spent - only known after adding abilities
        
        let healMe = {_id:actor.id};
        foundry.utils.setProperty(healMe, "system.health.toughness.value", getProperty(actor, "system.health.toughness.max") );
        await Actor.updateDocuments([healMe]);
        actor.sheet.render(true);
    }

    addAbility(actor, actorItems, ability) {
        // game.symbaroum.log(`Looking for ability[${ability.reference}]`);
        // TODO: Check actor 

        // Should check if the ability is already present, and if so, just increase it one point
        let selectedAbility = actorItems.find(elem => elem.system.reference == ability.reference);
        
        // If it is not present, add a new ability
        if(!selectedAbility) {
            const newAbility = game.items.filter(element => element.system.reference == ability.reference && element.system.isPower && element.system.hasLevels);
            if(newAbility.length > 0) {
                game.symbaroum.log("Retriveved from the item catalogue");
                selectedAbility = duplicate(newAbility[0]);
                let rnd = Math.floor(Math.random()*60);
    
                foundry.utils.setProperty(selectedAbility, "system.master.isActive", rnd > 50);
                foundry.utils.setProperty(selectedAbility, "system.adept.isActive", rnd > 30);
                foundry.utils.setProperty(selectedAbility, "system.novice.isActive", true);
                actorItems.push( selectedAbility);
            }
        } else {
            // upgrade the ability
            if(foundry.utils.getProperty(selectedAbility,"system.adept.isActive") ) {
                foundry.utils.setProperty(selectedAbility, "system.master.isActive", true);
            }
            if(foundry.utils.getProperty(selectedAbility,"system.novice.isActive") ) {
                foundry.utils.setProperty(selectedAbility, "system.adept.isActive", true);
            }
            game.symbaroum.log("Found existing one");
        }
        // console.log(selectedAbility);
    }

    setAttributes(actorDetails, statBlock) {
        // setProperty(newValues, "data.health.corruption.permanent", parseInt(extractData(expectedData,corruptionPattern))); 
        for(let stat in statBlock.attributes) {
            // game.symbaroum.log(`${actorDetails.name} setting attribute[${stat}] to value[${statBlock.attributes[stat]}]`);
            foundry.utils.setProperty(actorDetails, `system.attributes.${stat}.value`, statBlock.attributes[stat]);
        }
    }
}
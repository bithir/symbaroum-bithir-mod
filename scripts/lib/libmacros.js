
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
        const folderId = await this.getFolderID("Generated Abominations");
        const {files} = await FilePicker.browse("data", config.midjourneyNonPaidDir);        
    

        game.symbaroum.log(`Making a ${xpLevel.name} abomination starting at ${xpLevel.abilities} abilities`);
        // Create what will become monster actor
        
        // Randomise stat block
        const statBlock = config.randomElement(config.abominationStatBlocks); 
        game.symbaroum.log(`Picked stat block of ${statBlock.name}`,statBlock);

        const actorDetails = {
            name: this.expandDescription(`{adjective} ${statBlock.name}`).capitalize(),
            type: "monster",
            img: config.randomElement(files),
            folder: null,
            sort: 12000,
            folder: folderId,
            system: {},
            token: {},
            items: [],
            flags: {}        
        }
        foundry.utils.setProperty(actorDetails, "system.bio.race", "abomination");
        foundry.utils.setProperty(actorDetails, "system.bio.shadow",  this.generateShadow().capitalize());
        foundry.utils.setProperty(actorDetails, "system.bio.appearance", ""); 

        this.setAttributes(actorDetails, statBlock);
        const roll = await new Roll(xpLevel.abilities).evaluate({async: true});
        let startCoreCount = roll.total;
        game.symbaroum.log(`startCoreCount[${startCoreCount}]`);
        let actor = await Actor.create(actorDetails);

        let actorItems = []; // This will contain all abilities & traits
        // Duplicate abilities so that we do not change the normal configuration
        let abilities = duplicate(game.bithirmod.config.abominationAbilities);
        // Create a weighted list of abilities
        let sumWeight = 0;        
        // Sum up rarities, so that we know the whole span
        for(var abil in abilities) {
            sumWeight += abilities[abil].weight;
            abilities[abil].abilityRef = abilities[abil].abilityRef.filter( abilityKeep => { return !statBlock.excludedAbilities.includes(abilityKeep)})
        }
        game.symbaroum.log(`Weight[${sumWeight}]`);

        // Core abilities
        abilities.core.abilityRef = abilities.core.abilityRef.concat( statBlock.includedAbilities );        

        // Add any included abilities
        abilities.common.abilityRef = abilities.common.abilityRef.concat( statBlock.includedAbilities );
        // Add core to common abilities
        abilities.common.abilityRef = abilities.common.abilityRef.concat( abilities.core.abilityRef );

        let currentXp = 0;
        // So this is the pleatora of skills
        game.symbaroum.log(abilities, `start ability count ${startCoreCount}`);
        for(let i = 0; i < startCoreCount; i++) {
            currentXp += this.addAbility(actorItems, config.randomElement(abilities.core.abilityRef));
        }
        while(currentXp < xpLevel.experience) {
            game.symbaroum.log(`currentXp[${currentXp}] < xpLevel.experience[${xpLevel.experience}]`);
            // Pick rarity (value between 1 and 111)
            let rarity = Math.floor(Math.random()*sumWeight)+1;            
            // Sum up rarities, so that we know the whole span
            for(var abil in abilities) {
                if(abil == "core" ) continue;
                // game.symbaroum.log(`rarity[${rarity}] - abilities[${abil}].weight[${abilities[abil].weight}]`);
                rarity -= abilities[abil].weight;
                if( rarity <= 0) {
                    // This is the rarity of the ability we want
                    // game.symbaroum.log(`Rarity ${abil} ability required`);
                    currentXp += this.addAbility(actorItems, config.randomElement(abilities[abil].abilityRef) );
                    break;
                }
            }
        }
        game.symbaroum.log(`currentXp[${currentXp}] < xpLevel.experience[${xpLevel.experience}]`);

        // Add weapon
        const unarmedWeapons = game.items.filter(element => element.system.isWeapon && element.system.reference == "unarmed" );  
        if(unarmedWeapons.length > 0) {
            const weapon = duplicate(config.randomElement(unarmedWeapons));
            foundry.utils.setProperty(weapon, "system.state", "active");
            foundry.utils.setProperty(weapon, "name", this.expandDescription(`{adjective} ${weapon.name}`).capitalize() );
            actorItems.push(weapon);
        }
        const armorSkins = game.items.filter(element => element.system.isSkin);
        if(armorSkins.length > 0) {
            const armor = duplicate(config.randomElement(armorSkins));
            foundry.utils.setProperty(armor, "system.state", "active");
            foundry.utils.setProperty(armor, "name", this.expandDescription(`{adjective} ${armor.name}`).capitalize() );
            actorItems.push(armor);
        }
        const thoroughlycorrupt = game.items.filter(element => element.system.reference == "thoroughlycorrupt" );
        if(thoroughlycorrupt.length > 0) {
            actorItems.push(duplicate(thoroughlycorrupt[0]));
        }

        await actor.createEmbeddedDocuments("Item", actorItems);

        let healMe = {_id:actor.id};
        foundry.utils.setProperty(healMe, "system.health.toughness.value", getProperty(actor, "system.health.toughness.max") );
        foundry.utils.setProperty(healMe, "system.experience.total", getProperty(actor, "system.experience.spent") );
        await Actor.updateDocuments([healMe]);
        actor.sheet.render(true);
    }

    /**
     * 
     * @param {*} actorItems 
     * @param {*} ability 
     * @return The number of Experience that it costs
     */

    addAbility(actorItems, ability) {
        // game.symbaroum.log(`Looking for ability[${ability.reference}]`);
        // Should check if the ability is already present, and if so, just increase it one point
        let selectedAbility = actorItems.find(elem => elem.system.reference == ability.reference);
        
        // If it is not present, add a new ability
        if(!selectedAbility) {
            const newAbility = game.items.filter(element => element.system.reference == ability.reference && element.system.isPower && element.system.hasLevels);
            if(newAbility.length > 0) {
                selectedAbility = duplicate(newAbility[0]);
                game.symbaroum.log(`Retriveved[${selectedAbility.name}] from the item catalogue`);
                let rnd = Math.floor(Math.random()*60);
                let level = rnd > 50 ? 3: rnd > 30 ? 2 : 1;
                if(selectedAbility.system.marker == "active") { level = 1; }
    
                foundry.utils.setProperty(selectedAbility, "system.master.isActive", level > 2);
                foundry.utils.setProperty(selectedAbility, "system.adept.isActive", level > 1);
                foundry.utils.setProperty(selectedAbility, "system.novice.isActive", true);                
                actorItems.push( selectedAbility);
                return game.bithirmod.config.expCost(level);
            }
            game.symbaroum.log(`Could not find ${ability.reference}`);
            return 0;
        } else {
            if(selectedAbility.system.marker == "active") {
                return 0; // Already have it, can't increase in levels/cost
            }
            game.symbaroum.log(`Upgrading[${selectedAbility.name}]`);
            // upgrade the ability
            let currentXPCost = game.bithirmod.config.expCost( this.getLevel(selectedAbility) );

            if(foundry.utils.getProperty(selectedAbility,"system.adept.isActive") ) {
                foundry.utils.setProperty(selectedAbility, "system.master.isActive", true);
            }
            if(foundry.utils.getProperty(selectedAbility,"system.novice.isActive") ) {
                foundry.utils.setProperty(selectedAbility, "system.adept.isActive", true);
            }
            game.symbaroum.log(`Found existing ability ${selectedAbility.name}`);
            return game.bithirmod.config.expCost( this.getLevel(selectedAbility) ) - currentXPCost;
        }
        // console.log(selectedAbility);
    }

    getLevel(selectedAbility) {
        if(foundry.utils.getProperty(selectedAbility,"system.master.isActive")) {
            return 3;
        }
        else if(foundry.utils.getProperty(selectedAbility,"system.adept.isActive")) {
            return 2;
        }
        return 1;
    }

    setAttributes(actorDetails, statBlock) {
        // setProperty(newValues, "data.health.corruption.permanent", parseInt(extractData(expectedData,corruptionPattern))); 
        for(let stat in statBlock.attributes) {
            // game.symbaroum.log(`${actorDetails.name} setting attribute[${stat}] to value[${statBlock.attributes[stat]}]`);
            foundry.utils.setProperty(actorDetails, `system.attributes.${stat}.value`, statBlock.attributes[stat]);
        }
    }

    /**
     * 
     * @param {*} str The string to expand from abomination descriptions (example "{color} smurf with {adjective} nose")
     * @returns The expanded description with random values
     */
    expandDescription(str) {
        const descs = game.bithirmod.config.abominationDescriptions;

        if(str == null) { return ""; }

        str = str.replace(/\{\w+\}/g, function(all) {
            all = all.replace(/[\{\}]/g,'');
            return game.bithirmod.config.randomElement(descs[all]) || all;
        });
        return str;
    }

    generateShadow() {
        return this.expandDescription(game.bithirmod.config.randomElement(game.bithirmod.config.abominationShadows));

    }

    async getFolderID(folderName) {
        let folder = game.folders.filter( f => { return f.name == folderName && f.type == 'Actor'; });
        if(folder.length == 0) {
            // Create folder            
            let f = await Folder.create({
                name: folderName,
                type: 'Actor',
            });
            return f.id;
        } else { 
            return folder[0].id;
        }
    }
}
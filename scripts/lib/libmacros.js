
export class BithirMacros
{
    async generateNPCMacro()
    {
        const api = game.bithirmod.api;
        const generatorFileRegex = /.*\/(.*)-generator.json/;
        let generatorList = '';
        const {files} = await FilePicker.browse("data", 'modules/symbaroum-bithir-mod/data/');
        for(let i = 0; i < files.length; i++) {
            let mymatch = files[i].match(generatorFileRegex);
            if(mymatch == null ) { continue; }
            generatorList += `<option value="${mymatch[1]}">${mymatch[1]}</option>`;
        }
        // Capture exp level (from drop down)
        let expLevel = '';
        for(let resistLv of game.bithirmod.config.resistanceLevels) {
            expLevel += `<option value="${resistLv.name}">${resistLv.name}</option>`;
        }
        let dialog_content = `  
        <div class="form-group">
            <h2>${api.localize('GENERATOR_SELECTGENERATORTYPE')}</h2>
            <br />
            <div style="flex-basis: auto;flex-direction: row;display: flex;">
                <div class="dialogEntry"><select id="generator" name="generator">${generatorList}</select></div>
            </div><br/>
            <h2>Select generator resistance level</h2>
            <br />
            <div style="flex-basis: auto;flex-direction: row;display: flex;">
                <div class="dialogEntry"><select id="expLevel" name="expLevel">${expLevel}</select></div>
            </div>
            <br/>        
        </div>`;
        const x = new Dialog({
            content : dialog_content,
            buttons : 
            {
            Ok : { label : api.localize(`OK`), callback : async (html)=> {
                    const generatorConfigName = html.find('#generator')[0].value;
                    const expLevelName = html.find('#expLevel')[0].value;
                    const selectedExpLevel = game.bithirmod.config.resistanceLevels.find( resistLv => { 
                        return resistLv.name == expLevelName;
                    });
                    if(selectedExpLevel) {
                        await this.generateNPC(generatorConfigName, selectedExpLevel);
                    } else {
                        // Panic - someone clicked the Ok button, but somehow nothing matched in the selection drop down
                        // Should technically be impossible, so I am just going to ignore it for now
                    }
                }
            },
            Cancel : {label : api.localize(`CANCEL`)}
            }
        });
        
        x.options.width = 200;
        x.position.width = 350;
        
        x.render(true);
    }

    async generateNPC(generatorConfigName, xpLevel) {        
        const generatorConfig = await foundry.utils.fetchJsonWithTimeout(`modules/symbaroum-bithir-mod/data/${generatorConfigName}-generator.json`);
        const config = game.bithirmod.config;
        const folderId = await this.getFolderID(generatorConfig.folderName);        
        // Create what will become monster actor
        
        // Randomise stat block
        const statBlock = config.randomElement(generatorConfig.statBlocks); 
        game.symbaroum.log(`Making a ${xpLevel.name} ${statBlock.race} starting at ${xpLevel.abilities} abilities`);
        game.symbaroum.log(`Picked stat block of ${statBlock.name}`,statBlock);
        let gender = null;
        if(generatorConfig.gender && generatorConfig.gender.length > 0)
        {
            // gender is masculine, feminine (can't do noble in any easy way)
            gender = `${config.randomElement(generatorConfig.gender)}`;
        }
        const {files} = await FilePicker.browse("data", [generatorConfig.images, gender].join('/'));        

        let name = '';
        // Use built-in generator (or not) - format is
        // {@generateNames[category]}
        const builtin = /\{\@generateNames\[([^\]]*)\]\}/;
        const nameMatch = statBlock.name.match(builtin);
        if(nameMatch == null) {
            name = (await game.bithirmod.api.parseSimpleElement(generatorConfig.shadow, {}, `${statBlock.name}`)).capitalize()
        } else {
            // This should be a loop for each match - which then needs to be async
            // default to generate the name from the race entry for the stat block
            let category = nameMatch[1];
            if(!nameMatch.includes('-') && gender)  {
                category = `${nameMatch[1]}-${gender}`;                
            }
            console.log(`Generating name for ${category}`);
            name = (await game.symbaroum.api.generateNames(category, 1))[0];
        }

        const actorDetails = {
            name: name,
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
        foundry.utils.setProperty(actorDetails, "system.bio.race", statBlock.race);
        foundry.utils.setProperty(actorDetails, "system.bio.appearance", ""); 
        foundry.utils.setProperty(actorDetails, "system.bio.occupation", statBlock.occupation ?? "");

        this.setAttributes(actorDetails, statBlock);
        const roll = await new Roll(xpLevel.abilities).evaluate({async: true});
        let startCoreCount = roll.total;
        let actor = await Actor.create(actorDetails);

        // List of table roll of items
        let itemList = generatorConfig.includedItems;

        let actorItems = []; // This will contain all abilities & traits
        let abilities = generatorConfig.abilities;
        // Create a weighted list of abilities
        let sumWeight = 0;        
        // Sum up rarities, so that we know the whole span
        for(var abil in abilities) {
            sumWeight += abilities[abil].weight;
            // Strip out abilities that the stat block does not want
            abilities[abil].abilityRef = abilities[abil].abilityRef.filter( abilityKeep => { return !statBlock.excludedAbilities.includes(abilityKeep)})
        }
        game.symbaroum.log(`Weight[${sumWeight}]`);

        // Core abilities
        abilities.core.abilityRef = abilities.core.abilityRef.concat( statBlock.includedAbilities );        

        // Add core to common abilities
        abilities.common.abilityRef = abilities.common.abilityRef.concat( abilities.core.abilityRef );

        let currentXp = 0;
        // So this is the pleatora of skills
        game.symbaroum.log(abilities, `start ability count ${startCoreCount}`);
        for(let i = 0; i < startCoreCount; i++) {
            let chosenAbility = config.randomElement(abilities.core.abilityRef);
            currentXp += this.addAbility(actorItems, chosenAbility);
            // Remove stuff
            for(let abil2 in abilities) {
                abilities[abil2].abilityRef = abilities[abil2].abilityRef.filter( (elem) => { return !chosenAbility.excludedAbilities.includes(elem.reference)});
            }
            // Add stuff
            if(chosenAbility.includedAbilities.length > 0) {
                abilities["common"].abilityRef = abilities["common"].abilityRef.concat(chosenAbility.includedAbilities.map( elem => {
                    return { "reference": elem, "forcedAbilities": [], "excludedAbilities": [], "includedAbilities": [], "includesItems":[] }
                }));
            }
        }

        let rarityModifier = 0;
        while(currentXp < xpLevel.experience) {
            game.symbaroum.log(`currentXp[${currentXp}] < xpLevel.experience[${xpLevel.experience}]`);
            // Pick rarity (value between 1 and 111)
            let rarity = Math.floor(Math.random()*(sumWeight))+1;            
            // Sum up rarities, so that we know the whole span
            for(let abil in abilities) {
                if(abil == "core" ) continue;
                // game.symbaroum.log(`rarity[${rarity}] - abilities[${abil}].weight[${abilities[abil].weight}]`);
                rarity -= abilities[abil].weight;
                if( rarity <= 0) {
                    // This is the rarity of the ability we want
                    // game.symbaroum.log(`Rarity ${abil} ability required`);
                    // Chosen ability
                    let chosenAbility = config.randomElement(abilities[abil].abilityRef);
                    let moreXp = this.addAbility(actorItems, chosenAbility);
                    currentXp += moreXp;
                    if(moreXp == 0) {
                        // remove chosen ability too                        
                        chosenAbility.excludedAbilities.push(chosenAbility.reference);
                    }
                    // Remove stuff
                    for(let abil2 in abilities) {
                        abilities[abil2].abilityRef = abilities[abil2].abilityRef.filter( (elem) => { return !chosenAbility.excludedAbilities.includes(elem.reference)});
                    }
                    // Add stuff
                    if(chosenAbility.includedAbilities.length > 0) {
                        console.log('Will add included Abilities', chosenAbility);
                        console.log('Pre values', abilities["common"].abilityRef);
                        let commonAbilities = abilities["common"].abilityRef;
                        abilities["common"].abilityRef = commonAbilities.concat(chosenAbility.includedAbilities.map( elem => {
                            return { "reference": elem, "forcedAbilities": [], "excludedAbilities": [], "includedAbilities": [], "includesItems":[] }
                        }));
                        console.log('Post values', abilities["common"].abilityRef);
                    }
                    break;
                }
            }
        }
        game.symbaroum.log(`currentXp[${currentXp}] < xpLevel.experience[${xpLevel.experience}]`);
        // item list to do magic
        const itemConfig = await foundry.utils.fetchJsonWithTimeout(`modules/symbaroum-bithir-mod/data/equipment.json`);

        console.log('itemConfig',itemConfig,'actorItems',actorItems, "itemList", itemList)
        for(let ability of actorItems) {
            if(itemConfig[ability.system.reference]) {
                itemList = itemList.concat(itemConfig[ability.system.reference])
            }
        }
        console.log('itemList',itemList);

        let armorAdded = false;
        for(let itemdesc of itemList) {
            if(itemdesc.match(/\{#[^\}]+\}/)) {
                // we got {#} to roll table
                let table = game.tables.getName(itemdesc.match(/\{#([^\}]+)\}/)[1]);
                if(!table) {
                    console.log(`Can't find table for ${itemdesc}`);
                    continue;
                }
                let tableDraw = await table.roll();
                let itemToAdd = null;
                let name = null;
                for(let tr of tableDraw.results) {
                    if(tr.documentCollection == 'Item') {
                        itemToAdd = duplicate(game.items.get(tr.documentId));
                    } else if(tr.documentId == null) {
                        name = tr.text;
                    }
                }
                if(!itemToAdd) {
                    console.log(`Can't locate item from table results of ${itemdesc} in table`, tableDraw);
                }
                if(name) {
                    foundry.utils.setProperty(itemToAdd, "name", (await game.bithirmod.api.parseSimpleElement(generatorConfig.shadow,{},name)).capitalize() );
                }
                if(itemToAdd.type == 'weapon' || itemToAdd.type == 'armor' && !armorAdded) {
                    itemToAdd.system.state = "active";
                    armorAdded = true;
                }
                console.log("Adding item",itemToAdd);
                actorItems.push(itemToAdd);
            } else {
                let match = itemdesc.match(/(?<number>[^]*)@(?<nameReg>.*)/);
                let number = "1";
                if(match) {
                    number = match.groups.number;
                    itemdesc = match.groups.nameReg;
                }
                // Search actor catalogue for matching name or for weapons, the reference, (and pick 1)
                let itemPick = game.items.filter( elem => {
                    if(!elem.system.isGear) return false;
                    let regex = new RegExp(itemdesc,'i');
                    if(elem.system.isWeapon && elem.system.reference.match(regex) || elem.name.match(regex)) {
                        return true;
                    }
                    return false;
                })                
                if(itemPick.length == 0) {
                    console.log(`Can't find matching item in the Foundry item catalogue for ${itemdesc}`);
                    continue;
                }
                let roll = await new Roll(number).evaluate();
                let r = roll.total;

                for(let i = 0; i < r; i++) {
                    let itemToAdd =  duplicate(config.randomElement(itemPick));                    
                    if(itemToAdd.type == 'weapon' || itemToAdd.type == 'armor' && !armorAdded) {
                        foundry.utils.setProperty(itemToAdd, "system.state", "active");
                        armorAdded = true;
                    }
                    actorItems.push(itemToAdd);
                }
            }

        }
        await actor.createEmbeddedDocuments("Item", actorItems);

        let healMe = {_id:actor.id};
        const myShadow = await game.bithirmod.api.generateShadow(generatorConfig.shadow, actor);        
        foundry.utils.setProperty(healMe, "system.bio.shadow", myShadow.capitalize() );
        foundry.utils.setProperty(healMe, "system.health.toughness.value", getProperty(actor, "system.health.toughness.max") );
        foundry.utils.setProperty(healMe, "system.experience.total", getProperty(actor, "system.experience.spent") );
        await Actor.updateDocuments([healMe]);
        actor.sheet.render(true);
    }

    /**
     * 
     * @param {*} actorItems 
     * @param {*} itemList
     * @param {*} ability
     * @return The new ability list and number of Experience that it costs {abilitylist : [ .. ], expCost; [0-9]+}
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
                let rnd = Math.floor(Math.random()*100);
                let level = rnd > 95 ? 3: rnd > 70 ? 2 : 1;

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

    /**
     * 
     * @param {*} selectedAbility 
     * @returns 
     */
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

    async thusSpoke() {
        const api = game.bithirmod.api;
        let data = await foundry.utils.fetchJsonWithTimeout(`modules/symbaroum-bithir-mod/data/aroaleta-verses.json`);
        console.log(data);
        const keys = Object.keys(data);
        const selectedKey = game.bithirmod.config.randomElement(keys);
        const aroaletaText = game.bithirmod.config.randomElement(data[selectedKey]);
        let template = `<blockquote style="border-left:0px" class="symbaroum-mod fancytextright">
            <div style="display: flex;align-items: center;justify-content: center;"><span style="display:flex" class="symbaroum-mod fancyheader">&nbsp;</span></div>
            <span class="symbaroum-mod"><h5 data-anchor="thus-spoke-aroaleta">${api.localize('VERSES_HEADER')}</h5></span>
            <p class="symbaroum-mod fancytext">
                “${aroaletaText}”
            </p>
            <p class="symbaroum-mod fancytext">${selectedKey}</p>
            <div style="display: flex;align-items: center;justify-content: center;"><span style="display:flex" class="symbaroum-mod fancyheader">&nbsp;</span></div>
        </blockquote>`;
        ChatMessage.create({
            speaker: { alias: "Aroelata" },
            content: template
        });
    }

    async rollRollInspiration() {
        //
        const api = game.bithirmod.api;
        let dialog_content = `  
        <div class="form-group bithirmod">
        <div class="dialogHeader">
                    <div class="dialogEntry"><label for="location" class="dialogEntry">Location dice</label></div><div><input type="text" name="location" value="1" class="inspirationInput"></div>
        </div>
        <div class="dialogHeader">
                    <div class="dialogEntry"><label for="event" class="dialogEntry">Event dice</label></div><div><input type="text" name="event" value="1" class="inspirationInput"></div>
        </div>
        <div class="dialogHeader">
                    <div class="dialogEntry"><label for="creature" class="dialogEntry">Creature dice</label></div><div><input type="text" name="creature" value="1" class="inspirationInput"></div>
        </div>
        <div class="dialogHeader">
                    <div class="dialogEntry"><label for="reward" class="dialogEntry">Reward dice</label></div><div><input type="text" name="reward" value="1" class="inspirationInput"></div>
        </div>
        <br/>
        </div>`;
        let x = new Dialog({
            title: api.localize('inspiration_title'),
            content : dialog_content,
            buttons : 
            {
                Ok :{ label : api.localize('OK'), callback : async (html) => {             
                                                let location = parseInt(html.find("input[name='location'")[0].value);
                                                let event = parseInt(html.find("input[name='event'")[0].value);
                                                let creature = parseInt(html.find("input[name='creature'")[0].value);
                                                let reward = parseInt(html.find("input[name='reward'")[0].value);
                                                let rollString = [];
                                                if(!isNaN(location) || location !== 0) {                                                    
                                                    rollString.push(`${location}dl`);
                                                }
                                                if(!isNaN(event) || event !== 0) {                                                    
                                                    rollString.push(`${event}de`);
                                                }
                                                if(!isNaN(creature) || creature !== 0) {                                                    
                                                    rollString.push(`${creature}dc`);
                                                }
                                                if(!isNaN(reward) || reward !== 0) {                                                    
                                                    rollString.push(`${reward}dr`);
                                                }
                                                console.log("RollString "+ rollString.join('+'));
                                                let rolls = await new Roll(rollString.join('+')).evaluate({async:true});
                                                let rollData = {
                                                    formula: rolls.formula,
                                                    rolls: this.assembleInspirationResults(rolls)
                                                }
                                                const template = await renderTemplate(`${game.bithirmod.config.templatePath}/inspirationroll.hbs`, rollData);

                                                // Once we go to non-API version of DsN, then set this in chatData: type: CONST.CHAT_MESSAGE_TYPES.ROLL,
                                                let chatData = {
                                                    user: game.user.id,
                                                    speaker: ChatMessage.getSpeaker({ 
                                                    alias: api.localize('inspiration_results')
                                                    }),
                                                    type: CONST.CHAT_MESSAGE_TYPES.ROLL,
                                                    roll: JSON.stringify(rolls),
                                                    rollMode: game.settings.get('core', 'rollMode'),
                                                    content: template,
                                                };
                                                if(game.modules.get("dice-so-nice")?.active ) {
                                                    const dsnsettings = game.user.getFlag("dice-so-nice", "settings");

                                                    if(!dsnsettings || dsnsettings.hideAfterRoll) {
                                                        if(!dsnsettings) {
                                                            await game.user.setFlag('dice-so-nice', 'settings', game.dice3d.constructor.CONFIG() );
                                                        }
                                                        const timeout = parseInt(game.user.getFlag("dice-so-nice", "settings").timeBeforeHide);
                                                        if(isNaN(timeout) ) {
                                                            return;
                                                        }
                                                        // Not persisted - just change in-memory value for the time it takes to make the
                                                        // roll and the time it takes before dsn tries to clear the dices from the display
                                                        game.user.getFlag("dice-so-nice", "settings").hideAfterRoll = false;
                                                        setTimeout(() => { 
                                                                game.user.getFlag("dice-so-nice", "settings").hideAfterRoll = true;
                                                            },
                                                            timeout+500
                                                        );
                                                    }
                                                }
                                                ChatMessage.create(chatData);
                                            }
                },
                Cancel : {label : api.localize('CANCEL')}
            }  
        });
        x.options.width = 200;
        x.position.width = 300;
        
        x.render(true);
    }

    assembleInspirationResults(rolls) {
        let assembledResults = [];
        for(const dice of rolls.dice) {
            for(const result of dice.results) {
                result.css = dice.getResultCSS(result).join(' ');
                result.img = dice.getResultLabel(result);
                assembledResults.push(result);
            }
        }
        return assembledResults;
    }
}

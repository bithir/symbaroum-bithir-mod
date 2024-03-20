export class InspirationDie extends Die {    
    constructor(termData) {
        termData.faces=6;
        super(termData);
    }

  /** @inheritdoc */
    roll({minimize=false, maximize=false}={}) {
        const roll = {result: undefined, active: true};
        roll.result = Math.ceil((CONFIG.Dice.randomUniform() * this.faces));
        roll.tooltip = game.i18n.localize(game.bithirmod.config.i18nPath+`inspiration_tooltip_${this.denomination}${roll.result}`);
        this.results.push(roll);
        return roll;
    }

    /* -------------------------------------------- */
    inspirationFromModifier(modifier) {
        console.log(`MODIFIERS ${modifier}`);
    }

    /** @inheritdoc */
    getResultCSS(result) {
        return [
            "inspirationdie",
            this.constructor.name.toLowerCase()
        ];
    }    

    get denomination() { return InspirationDie.DENOMINATION; }

    /** @override */
    static DENOMINATION = "i";

    /** @inheritdoc */
    static MODIFIERS = {
    };

    /** @override */
    get total(){
        return this.results.length;
    }

    /* -------------------------------------------- */

    /** @override */
    getResultLabel(result) {      
        return `<img src="${game.bithirmod.config.assetPath}/inspirationdice/i${this.denomination}d${result.result}.png" data-tooltip="${result.tooltip}"/>`;
    }

}

export class LocationDie extends InspirationDie {

    /** @override */
    static DENOMINATION = "l";

    /** @override */    
    get denomination() { return LocationDie.DENOMINATION; }

    static get diceSoNiceColorset() {
        return {
            name: 'LocationDice',
            description: 'LocationDice',
            category: 'Symbaroum',
            foreground: '#000000',
            background: '#b9fb9d',
            outline: '#268a19',
            texture: 'cloudy_2',
            edge: '#438e44',
        };
    }

    static get diceSoNiceDicePreset() { 
        return {
            type:`d${LocationDie.DENOMINATION}`,
            labels:[
                `${game.bithirmod.config.assetPath}/inspirationdice/i${LocationDie.DENOMINATION}d1d.png`, 
                `${game.bithirmod.config.assetPath}/inspirationdice/i${LocationDie.DENOMINATION}d2d.png`, 
                `${game.bithirmod.config.assetPath}/inspirationdice/i${LocationDie.DENOMINATION}d3d.png`, 
                `${game.bithirmod.config.assetPath}/inspirationdice/i${LocationDie.DENOMINATION}d4d.png`, 
                `${game.bithirmod.config.assetPath}/inspirationdice/i${LocationDie.DENOMINATION}d5d.png`, 
                `${game.bithirmod.config.assetPath}/inspirationdice/i${LocationDie.DENOMINATION}d6d.png`
            ],
            bumpMaps:[
                `${game.bithirmod.config.assetPath}/inspirationdice/i${LocationDie.DENOMINATION}d1b.png`, 
                `${game.bithirmod.config.assetPath}/inspirationdice/i${LocationDie.DENOMINATION}d2b.png`, 
                `${game.bithirmod.config.assetPath}/inspirationdice/i${LocationDie.DENOMINATION}d3b.png`, 
                `${game.bithirmod.config.assetPath}/inspirationdice/i${LocationDie.DENOMINATION}d4b.png`, 
                `${game.bithirmod.config.assetPath}/inspirationdice/i${LocationDie.DENOMINATION}d5b.png`, 
                `${game.bithirmod.config.assetPath}/inspirationdice/i${LocationDie.DENOMINATION}d6b.png`
            ],
            colorset:"LocationDice",
            system:"symbaroum"
        }
    
    }

}

export class EventDie extends InspirationDie {

    /** @override */
    static DENOMINATION = "e";
    /** @override */    
    get denomination() { return EventDie.DENOMINATION; }

    static get diceSoNiceColorset() {
        return {
            name: 'EventDice',
            description: 'EventDice',
            category: 'Symbaroum',
            foreground: '#000000',
            background: '#f5adff',
            outline: '#e27af0',
            texture: 'paper',
            edge: '#d052e0',
        };
    }

    static get diceSoNiceDicePreset() { 
        return {
            type:`d${EventDie.DENOMINATION}`,
            labels:[
                `${game.bithirmod.config.assetPath}/inspirationdice/i${EventDie.DENOMINATION}d1d.png`, 
                `${game.bithirmod.config.assetPath}/inspirationdice/i${EventDie.DENOMINATION}d2d.png`, 
                `${game.bithirmod.config.assetPath}/inspirationdice/i${EventDie.DENOMINATION}d3d.png`, 
                `${game.bithirmod.config.assetPath}/inspirationdice/i${EventDie.DENOMINATION}d4d.png`, 
                `${game.bithirmod.config.assetPath}/inspirationdice/i${EventDie.DENOMINATION}d5d.png`, 
                `${game.bithirmod.config.assetPath}/inspirationdice/i${EventDie.DENOMINATION}d6d.png`
            ],
            bumpMaps:[
                `${game.bithirmod.config.assetPath}/inspirationdice/i${EventDie.DENOMINATION}d1b.png`, 
                `${game.bithirmod.config.assetPath}/inspirationdice/i${EventDie.DENOMINATION}d2b.png`, 
                `${game.bithirmod.config.assetPath}/inspirationdice/i${EventDie.DENOMINATION}d3b.png`, 
                `${game.bithirmod.config.assetPath}/inspirationdice/i${EventDie.DENOMINATION}d4b.png`, 
                `${game.bithirmod.config.assetPath}/inspirationdice/i${EventDie.DENOMINATION}d5b.png`, 
                `${game.bithirmod.config.assetPath}/inspirationdice/i${EventDie.DENOMINATION}d6b.png`
            ],
            colorset:"EventDice",
            system:"symbaroum"
        }    
    }

}

export class CreatureDie extends InspirationDie {

    /** @override */
    static DENOMINATION = "c";
    /** @override */    
    get denomination() { return CreatureDie.DENOMINATION; }

    static get diceSoNiceColorset() {
        return {
            name: 'CreatureDice',
            description: 'CreatureDice',
            category: 'Symbaroum',
            foreground: '#ffffff',
            background: '#830101',
            outline: '#f20707',
            texture: 'cloudy_2',
            edge: '#6a0101',
        };
    }

    static get diceSoNiceDicePreset() { 
        return {
            type:`d${CreatureDie.DENOMINATION}`,
            labels:[
                `${game.bithirmod.config.assetPath}/inspirationdice/i${CreatureDie.DENOMINATION}d1d.png`, 
                `${game.bithirmod.config.assetPath}/inspirationdice/i${CreatureDie.DENOMINATION}d2d.png`, 
                `${game.bithirmod.config.assetPath}/inspirationdice/i${CreatureDie.DENOMINATION}d3d.png`, 
                `${game.bithirmod.config.assetPath}/inspirationdice/i${CreatureDie.DENOMINATION}d4d.png`, 
                `${game.bithirmod.config.assetPath}/inspirationdice/i${CreatureDie.DENOMINATION}d5d.png`, 
                `${game.bithirmod.config.assetPath}/inspirationdice/i${CreatureDie.DENOMINATION}d6d.png`
            ],
            bumpMaps:[
                `${game.bithirmod.config.assetPath}/inspirationdice/i${CreatureDie.DENOMINATION}d1b.png`, 
                `${game.bithirmod.config.assetPath}/inspirationdice/i${CreatureDie.DENOMINATION}d2b.png`, 
                `${game.bithirmod.config.assetPath}/inspirationdice/i${CreatureDie.DENOMINATION}d3b.png`, 
                `${game.bithirmod.config.assetPath}/inspirationdice/i${CreatureDie.DENOMINATION}d4b.png`, 
                `${game.bithirmod.config.assetPath}/inspirationdice/i${CreatureDie.DENOMINATION}d5b.png`, 
                `${game.bithirmod.config.assetPath}/inspirationdice/i${CreatureDie.DENOMINATION}d6b.png`
            ],
            colorset:"CreatureDice",
            system:"symbaroum"
        }    
    }

}

export class RewardDie extends InspirationDie {

    /** @override */
    static DENOMINATION = "r";
    /** @override */    
    get denomination() { return RewardDie.DENOMINATION; }

    static get diceSoNiceColorset() {
        return {
            name: 'RewardDice',
            description: 'RewardDice',
            category: 'Symbaroum',
            foreground: '#000000',
            background: '#ffd500',
            outline: '#d39c03',
            texture: 'paper',
            edge: '#fdc77c',
        };
    }

    static get diceSoNiceDicePreset() { 
        return {
            type:`d${RewardDie.DENOMINATION}`,
            labels:[
                `${game.bithirmod.config.assetPath}/inspirationdice/i${RewardDie.DENOMINATION}d1d.png`, 
                `${game.bithirmod.config.assetPath}/inspirationdice/i${RewardDie.DENOMINATION}d2d.png`, 
                `${game.bithirmod.config.assetPath}/inspirationdice/i${RewardDie.DENOMINATION}d3d.png`, 
                `${game.bithirmod.config.assetPath}/inspirationdice/i${RewardDie.DENOMINATION}d4d.png`, 
                `${game.bithirmod.config.assetPath}/inspirationdice/i${RewardDie.DENOMINATION}d5d.png`, 
                `${game.bithirmod.config.assetPath}/inspirationdice/i${RewardDie.DENOMINATION}d6d.png`
            ],
            bumpMaps:[
                `${game.bithirmod.config.assetPath}/inspirationdice/i${RewardDie.DENOMINATION}d1b.png`, 
                `${game.bithirmod.config.assetPath}/inspirationdice/i${RewardDie.DENOMINATION}d2b.png`, 
                `${game.bithirmod.config.assetPath}/inspirationdice/i${RewardDie.DENOMINATION}d3b.png`, 
                `${game.bithirmod.config.assetPath}/inspirationdice/i${RewardDie.DENOMINATION}d4b.png`, 
                `${game.bithirmod.config.assetPath}/inspirationdice/i${RewardDie.DENOMINATION}d5b.png`, 
                `${game.bithirmod.config.assetPath}/inspirationdice/i${RewardDie.DENOMINATION}d6b.png`
            ],
            colorset:"RewardDice",
            system:"symbaroum"
        }    
    }

}
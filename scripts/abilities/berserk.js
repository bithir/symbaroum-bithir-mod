export function getItemModifierBerserkerv2(combatMods, armors, weapons, abilities) {
    // Get the level of the ability
    let lvl = this.getLevel();
    // If no abilities have been learnt - abort
    if(lvl.level == 0) return;

    if(!this.actor.getFlag(game.system.id, "berserkerv2") ) {
        this.actor.removeCondition("berserkerv2");
    }
    
    /// Check if berserk is active on the character (actor)
    if (!this.actor.hasCondition("berserker") && !this.actor.getFlag(game.system.id, "berserker")) {
        this.system.isIntegrated = false;        
        return;
    }
    // Check all weapons for melee weapons and if they are a melee weapon, add damage
    for(let i = 0; i < weapons.length; i++)
    {
        if(weapons[i].system.alternativeDamage !== "none" || !weapons[i].system.isMelee) {
            continue;
        }
        let base = this._getBaseFormat();
        base.type = game.symbaroum.config.DAM_MOD;
        base.value = "+1d6";
        base.alternatives = [{
            damageMod: "+1d6",
            damageModNPC: 3,
        }];
        combatMods.weapons[weapons[i].id].package[0].member.push(base);
        this.system.isIntegrated = true;
    }


    for(let i = 0; i < armors.length; i++)
    {
        if( armors[i].system.isStackableArmor) {
            continue;
        }
        if(lvl.level > 1) {
            let base = this._getBaseFormat();
            base.type = base.type = game.symbaroum.config.DAM_DICEUPGRADE;
            base.diceUpgrade = 2;
            combatMods.armors[armors[i].id].protectionChoices.push(base);
            this.system.isIntegrated = true;
        }
        if(lvl.level < 3) {
            combatMods.armors[armors[i].id].specialEffects.push(game.symbaroum.config.SPECIAL_MIN_DEFENSE);
            this.system.isIntegrated = true;
        }
    }
}

export function abilitySetupBerserkerv2(base) {
    base.casting = game.symbaroum.config.CASTING_NOT;
    base.gmOnlyChatResultNPC = true;
    base.flagTest = "berserker";
    base.flagPresentFSmod = {
        introText: game.i18n.localize('ABILITY_BERSERKER.CHAT_DEACTIVATE'),
        resultTextSuccess: game.i18n.localize('ABILITY_BERSERKER.CHAT_RESULT_DEACTIVATE'),
        removeCasterEffect: [CONFIG.statusEffects.find(e => e.id === "berserker")]
    };
    base.flagNotPresentFSmod = {
        flagData: base.powerLvl.level,
        introText: game.i18n.localize('ABILITY_BERSERKER.CHAT_ACTIVATE'),
        addCasterEffect: [CONFIG.statusEffects.find(e => e.id === "berserker")]
    }    
    if(base.powerLvl.level == 2) base.flagNotPresentFSmod.resultTextSuccess = game.i18n.localize('ABILITY_BERSERKER.CHAT_RESULT_LVL2');
    else if(base.powerLvl.level > 2) base.flagNotPresentFSmod.resultTextSuccess = game.i18n.localize('ABILITY_BERSERKER.CHAT_RESULT_LVL3');
    else base.flagNotPresentFSmod.resultTextSuccess = game.i18n.localize('ABILITY_BERSERKER.CHAT_RESULT_LVL1');
    return(base);
}
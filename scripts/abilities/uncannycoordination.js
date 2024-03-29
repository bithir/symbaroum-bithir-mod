
export function getItemModifierUncannycoordination(combatMods, armors, weapons, abilities) {
    let lvl = this.getLevel();
    if(lvl.level == 0) return;        
    for(let i = 0; i < weapons.length; i++)
    {
        if(weapons[i].system.qualities.deepImpact) {
            let base = this._getBaseFormat();
            base.type = game.symbaroum.config.DAM_MOD;
            base.value = "+1";
            base.alternatives = [{
                damageMod: "+1d1",
                damageModNPC: 1,
            }];
            combatMods.weapons[weapons[i].id].package[0].member.push(base);                 
        }
        if(weapons[i].system.qualities.precise) {
            // Add 1
            let base = this._getBaseFormat();
            base.type = game.symbaroum.config.TYPE_ROLL_MOD;
            base.modifier = 1;
            base.value = "1";
            combatMods.weapons[weapons[i].id].package[0].member.push(base);
        }            
    }
    if( lvl.level < 2) return;

    for(let i = 0; i < armors.length; i++)
    {
        if(armors[i].system.isStackableArmor || armors[i].isNoArmor ) {
            continue;
        }
        if(armors[i].system.qualities.reinforced) {
            let base = this._getBaseFormat();
            base.type = game.symbaroum.config.DAM_FIXED;
            base.alternatives = [{
                protectionMod: "+1d1",
                protectionModNPC: 1,
            }];
            combatMods.armors[armors[i].id].protectionChoices.push(base);
        }
        if(armors[i].system.qualities.flexible) {
            let base = this._getBaseFormat();
            base.modifier = 1;
            combatMods.armors[armors[i].id].defenseModifiers.push(base);
        }
        let base = this._getBaseFormat();
        base.type = game.symbaroum.config.TYPE_ATTRIBUTE;
        base.attribute = "accurate";
        combatMods.armors[armors[i].id].attributes.push(base);
    }
}
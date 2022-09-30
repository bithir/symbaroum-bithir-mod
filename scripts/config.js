// Namespace Configuration Values
export const BITHIRMODCONF = {};

BITHIRMODCONF.moduleId = 'symbaroum-bithir-mod';
BITHIRMODCONF.expCost = function(level) { return level * (level +1 )/2 * 10; };
BITHIRMODCONF.randomElement = function(list) {
    return Array.isArray(list) ? list[Math.floor(Math.random()*list.length)] : null;
};

// Namespace Configuration Values
export const BITHIRMODCONF = {};

BITHIRMODCONF.moduleId = 'symbaroum-bithir-mod';
BITHIRMODCONF.basePath = `modules/${BITHIRMODCONF.moduleId}`
BITHIRMODCONF.assetPath = `${BITHIRMODCONF.basePath}/assets`;
BITHIRMODCONF.templatePath = `${BITHIRMODCONF.basePath}/templates`;
BITHIRMODCONF.i18nPath = `BITHIRMOD.`;


BITHIRMODCONF.expCost = function(level) { return level * (level +1 )/2 * 10; };
BITHIRMODCONF.randomElement = function(list) {
    return Array.isArray(list) ? list[Math.floor(Math.random()*list.length)] : null;
};

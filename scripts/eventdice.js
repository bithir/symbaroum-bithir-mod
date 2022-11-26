export class EventDice extends Die {
    eventDiceType = null;

	constructor(termData) {
		termData.faces = 6;        
		super(termData);
	}

	/* -------------------------------------------- */

	/** @override */
	static DENOMINATION = "e";

	/** @override */
	get total() {
		return this.results.length;
	}

	/* -------------------------------------------- */

	/** @override */
	getResultLabel(result) {
        // Switch on type?!
		return {
			1: '<img src="modules/symbaroum-bithir-mod/assets/dice-so-nice/alien-dice-b0.png" />',
			2: '<img src="modules/symbaroum-bithir-mod/assets/dice-so-nice/alien-dice-b0.png" />',
			3: '<img src="modules/symbaroum-bithir-mod/assets/dice-so-nice/alien-dice-b0.png" />',
			4: '<img src="modules/symbaroum-bithir-mod/assets/dice-so-nice/alien-dice-b0.png" />',
			5: '<img src="modules/symbaroum-bithir-mod/assets/dice-so-nice/alien-dice-b0.png" />',
			6: '<img src="modules/symbaroum-bithir-mod/assets/dice-so-nice/alien-dice-b6.png" />',
		}[result.result];
	}
}
export class AlienRPGStressDie extends Die {
	constructor(termData) {
		termData.faces = 6;
		super(termData);
	}

	/* -------------------------------------------- */

	/** @override */
	static DENOMINATION = "s";

	/** @override */
	get total() {
		return this.results.length;
	}

	/* -------------------------------------------- */

	/** @override */
	getResultLabel(result) {
		return {
			1: '<img src="modules/symbaroum-bithir-mod/assets/dice-so-nice/alien-dice-y1.png" />',
			2: '<img src="modules/symbaroum-bithir-mod/assets/dice-so-nice/alien-dice-y0.png" />',
			3: '<img src="modules/symbaroum-bithir-mod/assets/dice-so-nice/alien-dice-y0.png" />',
			4: '<img src="modules/symbaroum-bithir-mod/assets/dice-so-nice/alien-dice-y0.png" />',
			5: '<img src="modules/symbaroum-bithir-mod/assets/dice-so-nice/alien-dice-y0.png" />',
			6: '<img src="modules/symbaroum-bithir-mod/assets/dice-so-nice/alien-dice-y6.png" />',
		}[result.result];
	}
}

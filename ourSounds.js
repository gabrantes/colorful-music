var mySound = new Pizzicato.Sound({
	source: 'wave',
	options: {
		type:  'square',
		frequency: 440,
		release: 0.2
	}
});

function incrementSound(sound) {
	sound.frequency *= (6/5);
}

function decrementSound(sound) {
	sound.frequency *= (5/6);
}
var mySound = new Pizzicato.Sound({
	source: 'wave',
	options: {
		type:  'square',
		frequency: 440,
		release: 0.5
	}
});

mySound.play();
setTimeout(mySound.stop(), 1000);
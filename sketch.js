let ball, p1, p2, retroFont;
let go = false;

function preload() {
	retroFont = loadFont('ARCADECLASSIC.TTF');
}

function setup() {
  
	alert('-> W,S and Setinhas para mover as barras\n'+
		  '-> Aperte o ESPAÇO para começar cada round, e R reseta a bola\n'+
		  '-> Pong Clássico Alura 3B\n\n'+
	    'Boa Sorte!');

	createCanvas(700, 400)
	ball = new Ball(width/2, height/2, 10, 10);

	p1 = new Paddle(20, height/2 - 50, 10, 100);
	p2 = new Paddle(width - 30, height/2 - 50, 10, 100);
}


function draw() {
	background(52);
	backdrop();

	moveparede();
	p1.show();
	p2.show();

	let oob = ball.outOfBounds();
	if (oob) {
		// Debounce para a bola estar no meio
		go = false;
		if (oob == 'right') {
			p1.score++;
		} else {
			p2.score++
		}
	}

	if (go) ball.update();

	ball.hit(p1, p2);

	ball.show()
}


function moveparede() {
	// 87 = 'W'
	if (keyIsDown(87)) {
		p1.move(-5);
	}
	
	// 83 = 'S'
	if (keyIsDown(83)) {
		p1.move(5);
	}
	
	// 38 = 'Setinha cima'
	if (keyIsDown(38)) {
		p2.move(-5);
	}
	
	// 40 = 'Seta baixo'
	if (keyIsDown(40)) {
		p2.move(5);
	}
}

function keyTyped() {
	if (key == ' ') {
		go = true;
	}

	if (key == 'r') {
		p1.score = 0;
		p2.score = 0;
		ball.resetball();
		go = false;
	}

	// for safety
	return false;
}

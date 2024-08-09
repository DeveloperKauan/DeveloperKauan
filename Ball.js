let velo = Math.random (0.5,4)

class Ball {
    
    constructor(x, y, r, speed = 4) {
    this.r = 12;
        this.spawn = createVector(x, y)
        this.speed = 6;
        this.r = r;
        this.resetball();
    }
    
    
    resetball() {
        this.pos = this.spawn.copy();
        let angle = random(-PI/4, PI/4)
        this.vel = p5.Vector.fromAngle(angle, this.speed);
        if (random(1) > 0.5) this.vel.x *= -1;
    }

    outOfBounds() {
    
        // If the ball is out of the screen,
        // return the side, otherwise return false
        
        if (this.pos.x > width + this.r)  {
            this.resetball();
            return 'right';
        }
        
        if (this.pos.x < -this.r) {
            this.resetball();
            return 'left';
        }
        
        return false;
    
    }

   
    hit(p1, p2) {
        for (let pad of [p1, p2]) {
            let padX  = pad.pos.x;
            let padY  = pad.pos.y;
            let ballX = ball.pos.x;
            let ballY = ball.pos.y;
            let r = this.r

            // if ball collides on x-axis
            if ((padX - r) < (ballX) && (ballX) < (padX + pad.w + r)) {
                // and on y-axis
                if ((padY - r) < ballY && ballY < (padY + pad.h + r)) {
                    // bola colidiu
                    
                    let padCenter = createVector(pad.pos.x + pad.w/2, pad.pos.y + pad.h/2)
                   this.vel.x += velo
                    this.vel.y += velo
                    // Vetor do centro da bola vira o centro da tela
                    this.vel = this.pos.copy().sub(padCenter);
                    this.vel.limit(7);
                    
                    // angulo fica mais ao centro
                    let a = this.vel.heading();
                    if (a > -PI/2 && a < PI/2) {
                        this.vel = p5.Vector.fromAngle(a/2, 10);
                    } else {
                        this.vel.rotate(PI);
                        let a = this.vel.heading();
                        this.vel = p5.Vector.fromAngle(PI + a/2, 10);
                    }

                }
            }
        }
    }
    
    update() {
        this.pos.add(this.vel);
        
        // bounce na parede de cima e baixo
        if (this.pos.y + this.r >= height || this.pos.y - this.r <= 0) {
            this.pos.y = constrain(this.pos.y, this.r, height - this.r);
            this.vel.y *= -1;
          this.vel.x += velo
          this.vel.y += velo
        }
        
    }

    show() {
        fill(255);
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.r*2);
    }

    

}

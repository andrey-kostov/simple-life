
document.addEventListener("DOMContentLoaded", () => {

    //Variables

    let canvasHeight = $('#canvasWrapper').height();
    let canvasWidth = $('#canvasWrapper').width();
    let particleSize = 2;
    let particleCount = 200;


    $('.setting').on('change',function(){
        updateSettings();
    });

    $('#life').attr({width:canvasWidth,height:canvasHeight});
   

    // get the plane to work with and specify it as 2D 
    m = document.getElementById('life').getContext('2d');

    draw = (x, y, c, s1, s2) => {
        m.fillStyle = c;
        m.fillRect(x, y, s1, s2);
        
    }

    //every particle has position (x,y), velocity (vx, vy) and color.
    particles = [];
    particle = (x, y, c) => {
        return { "x": x, "y": y, "vx": 0, "vy": 0, "color": c };
    };

    //create randomizing function
    random = () => {
        return Math.random() * canvasWidth - 50;
    }

    //create function that will create group of particles with number and color
    create = (number, color) => {
        group = [];
        for (let i = 0; i < number; i++) {
            group.push(particle(random(), random(), color));
            particles.push(group[i]);
        }
        return group;
    }

    //to create actions we must create rules

    rule = (particles1, particles2, g) => {
        for (let i = 0; i < particles1.length; i++) {
            fx = 0;
            fy = 0;
            for (let j = 0; j < particles2.length; j++) {
                a = particles1[i];
                b = particles2[j];
                dx = a.x - b.x;
                dy = a.y - b.y;
                d = Math.sqrt(dx * dx + dy * dy);
                if (d > 0 && d < 80) {
                    F = (g * 1) / d;
                    fx += F * dx;
                    fy += F * dy;
                }
            }
            a.vx = (a.vx + fx) * 0.5;
            a.vy = (a.vy + fy) * 0.5;
            a.x += a.vx;
            a.y += a.vy;
            if (a.x <= 0 || a.x >= canvasWidth) { a.vx *= -50; }
            if (a.y <= 0 || a.y >= canvasHeight) { a.vy *= -50; }
        }
    };

    //create some particles
    yellow = create(particleCount, "yellow");
    green = create(particleCount, "green");
    red = create(particleCount, "red");
    blue = create(particleCount, "blue");

    //update the canvas

    update = () => {
        rule(yellow, yellow, 2.15);
        rule(green, green, -2.15);
        rule(red, red, 2.15);
        rule(blue, blue, 2.25);

        rule(yellow, green, 2.15);
        rule(yellow, red, -2.55);
        rule(yellow, blue, 2.65);
        rule(green, red, -2.25);
        rule(green, blue, 2.35);
        rule(blue, red, -2.35);
        rule(red, yellow, 2.15);

        m.clearRect(0, 0, canvasWidth, canvasHeight);
        draw(0, 0, "black", canvasWidth, canvasHeight);

        for (i = 0; i < particles.length; i++) {
            draw(particles[i].x, particles[i].y, particles[i].color, particleSize ,particleSize );
        }
        requestAnimationFrame(update);
    }

    
    update();
    
});

function updateSettings(){
    console.log(123);
}
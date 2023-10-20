
document.addEventListener("DOMContentLoaded", () => {

    //Variables
    
    var canvasHeight = $('#canvasWrapper').height(),
        canvasWidth = $('#canvasWrapper').width(),
        particleSize = 3,
        particleCount = 250,
        group1Color = 'yellow',
        group2Color = 'red',
        group3Color = 'green',
        group4Color = 'blue',
        g1g1 = 2,
        g1g2 = 2,
        g1g3 = 2,
        g1g4 = 2,
        g2g1 = 2,
        g2g2 = 2,
        g2g3 = 2,
        g2g4 = 2,
        g3g1 = 2,
        g3g2 = 2,
        g3g3 = 2,
        g3g4 = 2,
        g4g1 = 2,
        g4g2 = 2,
        g4g3 = 2,
        g4g4 = 2;



    $('.setting').on('change',function(){
        updateSettings();
        if(localStorage.getItem('simpleLifeSettings') !== null){
            var localStorageSettigns = JSON.parse(localStorage.getItem('simpleLifeSettings'));

            particleSize = localStorageSettigns['particleSize'];
            particleCount = localStorageSettigns['particleCount'];
            group1Color = localStorageSettigns['group1Color'];
            group2Color = localStorageSettigns['group2Color'];
            group3Color = localStorageSettigns['group3Color'];
            group4Color = localStorageSettigns['group4Color'];
            g1g1 = localStorageSettigns['g1g1'];
            g1g2 = localStorageSettigns['g1g2'];
            g1g3 = localStorageSettigns['g1g3'];
            g1g4 = localStorageSettigns['g1g4'];
            g2g1 = localStorageSettigns['g2g1'];
            g2g2 = localStorageSettigns['g2g2'];
            g2g3 = localStorageSettigns['g2g3'];
            g2g4 = localStorageSettigns['g2g4'];
            g3g1 = localStorageSettigns['g3g1'];
            g3g2 = localStorageSettigns['g3g2'];
            g3g3 = localStorageSettigns['g3g3'];
            g3g4 = localStorageSettigns['g3g4'];
            g4g1 = localStorageSettigns['g4g1'];
            g4g2 = localStorageSettigns['g4g2'];
            g4g3 = localStorageSettigns['g4g3'];
            g4g4 = localStorageSettigns['g4g4'];
        }

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
    groupParticles1 = create(particleCount, group1Color);
    groupParticles2 = create(particleCount, group2Color);
    groupParticles3 = create(particleCount, group3Color);
    groupParticles4 = create(particleCount, group4Color);

    //update the canvas

    update = () => {

        rule(groupParticles1, groupParticles1, g1g1);
        rule(groupParticles1, groupParticles2, g1g2);
        rule(groupParticles1, groupParticles3, g1g3);
        rule(groupParticles1, groupParticles4, g1g4);

        rule(groupParticles2, groupParticles1, g2g1);
        rule(groupParticles2, groupParticles2, g2g2);
        rule(groupParticles2, groupParticles3, g2g3);
        rule(groupParticles2, groupParticles4, g2g4);

        rule(groupParticles3, groupParticles1, g3g1);
        rule(groupParticles3, groupParticles2, g3g2);
        rule(groupParticles3, groupParticles3, g3g3);
        rule(groupParticles3, groupParticles4, g3g4);

        rule(groupParticles4, groupParticles1, g4g1);
        rule(groupParticles4, groupParticles2, g4g2);
        rule(groupParticles4, groupParticles3, g4g3);
        rule(groupParticles4, groupParticles4, g4g4);

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
    var settings = {};

    $( ".setting" ).each(function() {
        let value = $(this).val();
        let name = $(this).attr('name');
        settings[name]=value;
    });

    localStorage.setItem('simpleLifeSettings', JSON.stringify(settings));
}
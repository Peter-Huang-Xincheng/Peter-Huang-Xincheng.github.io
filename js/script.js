// initialize sound
window.onload = init;
var context;
var bufferLoader;

function init() {
    // Fix up prefixing
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    context = new AudioContext();

    bufferLoader = new BufferLoader(
        context, [
            'audio/rain.mp3',
            'audio/uh-oh.mp3'
        ],
        finishedLoading
    );

    bufferLoader.load();
}

var Rain = {
    play: function() {},
    stop: function() {}
};

var UhOh = {
    play: function() {},
    stop: function() {}
}


function finishedLoading(bufferList) {

    Rain.play = function() {
        var source = context.createBufferSource();
        var gainNode = context.createGain();

        source.buffer = bufferList[0];
        source.connect(gainNode);
        gainNode.connect(context.destination);
        source.loop = true;
        source.start(0);
        gainNode.gain.value = 0.2;
        gainNode.gain.exponentialRampToValueAtTime(1.0, context.currentTime + 5);
        this.source = source;
        this.gainNode = gainNode;
    };

    Rain.stop = function() {
        this.gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 5);
    }

    UhOh.play = function() {
        var source = context.createBufferSource();
        var gainNode = context.createGain();

        source.buffer = bufferList[1];
        source.connect(gainNode);
        gainNode.connect(context.destination);
        source.start(0);
        gainNode.gain.value = 1.0;
        this.source = source;
        this.gainNode = gainNode;
    };

    UhOh.stop = function() {
        this.source.stop();
    }


}

// scrollreveal
window.sr = ScrollReveal({
    duration: 2000,
    reset: true
});

sr.reveal('#scene-0', {
    viewFactor: 0.5
});

/*
    Scene 1
*/
sr.reveal('#scene-1', {
    viewFactor: 0.5
});

sr.reveal('#scene-1-1', {
    viewFactor: 0.5,
    afterReveal: function() {
        var bgWidth = $('#background-1-5').width()

        $("#balloon")
            .css({
                top: "100px",
                left: "100px",
                width: "600px",
                height: "650px",
            })
            .animate({
                top: "-700px",
                left: "100px",
                width: "600px",
                height: "650px"

            }, 2500, function() {
                console.log('balloon flies')
            })
    },
    beforeReset: function() {
        $('#balloon')
            .css({
                top: "100px",
                left: "100px",
                width: "600px",
                height: "650px",
            })
    }

});


/*
    Scene 2
*/
sr.reveal('#scene-2', {
    viewFactor: 0.5,
    afterReveal: function() {
        var bgWidth = $('#background-2').width()

        $("#oreo-1")
            .css({
                top: "-100px",
                left: "100px",
                width: "450px",
                height: "450px",
            })
            .animate({
                top: "150px",
                left: "+=" + (bgWidth * 0.5),
                width: "300px",
                height: "300px"

            }, 2500, function() {
                console.log('oreo has falled!')
            })
    },
    beforeReset: function() {
        $('#oreo-1')
            .css({
                top: "-100px",
                left: "100px",
                width: "450px",
                height: "450px",
            })
    }
});



/*
    Scene 3
*/
sr.reveal('#scene-3', {
    viewFactor: 0.5
});


/*
    Scene 4
*/
var scene4Start = false;

sr.reveal('#scene-4', {
    viewFactor: 0.5,
    beforeReveal: function() {
        scene4Start = true;

        console.log('beforereveal');
    },

    afterReveal: function() {
        Rain.play();
    },

    beforeReset: function() {
        scene4Start = false;
        Rain.stop();

    }
});

// rain!!!!
var canvas = $('#canvas1')[0];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    var w = canvas.width;
    var h = canvas.height;
    ctx.strokeStyle = 'rgba(174,194,224,0.5)';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';


    var init = [];
    var maxParts = 1000;
    for (var a = 0; a < maxParts; a++) {
        init.push({
            x: Math.random() * w,
            y: Math.random() * h,
            l: Math.random() * 1,
            xs: -4 + Math.random() * 4 + 2,
            ys: Math.random() * 10 + 50
        })
    }

    var particles = [];
    for (var b = 0; b < maxParts; b++) {
        particles[b] = init[b];
    }

    function draw() {
        if (scene4Start) {
            console.log('hi');
            ctx.clearRect(0, 0, w, h);
            for (var c = 0; c < particles.length; c++) {
                var p = particles[c];
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
                ctx.stroke();
            }
            move();
        }

    }

    function move() {
        for (var b = 0; b < particles.length; b++) {
            var p = particles[b];
            p.x += p.xs;
            p.y += p.ys;
            if (p.x > w || p.y > h) {
                p.x = Math.random() * w;
                p.y = -20;
            }
        }
    }

    setInterval(draw, 30);

}

/*
    Scene 5
*/
sr.reveal('#scene-5', {
    viewFactor: 0.5
});

/*
    Scene 6
*/
sr.reveal('#scene-6', {
    viewFactor: 0.5
});

$('#panel-6-audio-button').on('click', function() {
    UhOh.play();
})

$('#background-6').on('click', function() {
        UhOh.play();
    })
    /*
        Scene 7
    */
sr.reveal('#scene-7', {
    viewFactor: 0.5
});

/*
    Scene 8
*/
sr.reveal('#scene-8', {
    viewFactor: 0.5
});


// $("#panel-text-8-1").typed({
//         strings: ["Hi, tree!"],
//         typeSpeed: 0
//       });

$('#background-8-1').on('click', function() {
    $("#panel-text-8-1-sentence-1").typed({
        strings: ["Hi, Tree."],
        typeSpeed: 50,
        showCursor: false,
        onStringTyped: function() {
            $("#panel-text-8-1-sentence-2").typed({
                strings: ["Did you see my shadow?"],
                typeSpeed: 50,
                showCursor: false,
                onStringTyped: function() {
                    $("#panel-text-8-1-sentence-3").typed({
                        strings: ["He's my best friend."],
                        typeSpeed: 50,
                        showCursor: false,
                    });
                }
            });
        }
    });
})

$('#background-8-2').on('click', function() {
    $("#panel-text-8-2-sentence-1").typed({
        strings: ["Sorry, no."],
        typeSpeed: 50,
        showCursor: false,
        onStringTyped: function() {
            $("#panel-text-8-2-sentence-2").typed({
                strings: ["And come on,"],
                typeSpeed: 50,
                showCursor: false,
                onStringTyped: function() {
                    $("#panel-text-8-2-sentence-3").typed({
                        strings: ["who would ever make friends with their shadows?!."],
                        typeSpeed: 50,
                        showCursor: false,
                    });
                }
            });
        }
    });
})


// $(function() {
//     $("#panel-text-8-1").typed({
//         strings: ["Hi, I'm tree.", ""],
//         typeSpeed: 50
//     });
// });
/*
    Scene 9
*/
sr.reveal('#scene-9', {
    viewFactor: 0.5
});

/*
    Scene 10 Animation to be done here
*/
sr.reveal('#scene-10', {
    viewFactor: 0.5
});

/*
    Scene 11
*/
sr.reveal('#scene-11', {
    viewFactor: 0.5
});

/*
    Scene 12
*/
sr.reveal('#scene-12', {
    viewFactor: 0.5
});

$('#background-12').on('click', function () {
    $('#exhaust').fadeIn("slow");
})

/*
    Scene 13
*/
sr.reveal('#scene-13', {
    viewFactor: 0.5
});

/*
    Scene 14
*/
sr.reveal('#scene-14', {
    viewFactor: 0.5
});

$('#background-14').on('click', function() {
    $("#panel-text-14-sentence").typed({
        strings: ["Oreo: Hello, building, did you see my shadow?","He is my best friend.","Building: Sorry, no.", "And come on,","life is so busy","who would ever have time to care about friends?",""],
        typeSpeed: 40,
        showCursor: false,
    });
})

/*
    Scene 15
*/
sr.reveal('#scene-15', {
    viewFactor: 0.5
});

/*
    Scene 16
*/
sr.reveal('#scene-16', {
    viewFactor: 0.5
});

$('#background-16').on('click', function() {
    $("#panel-text-16-sentence").typed({
        strings: ["Hello! Hi! What's up! How are you?"],
        typeSpeed: 50,
        showCursor: false,
    });
})

/*
    Scene 16
*/
sr.reveal('#scene-17', {
    viewFactor: 0.5
});

$('#background-17').on('click', function() {
    $("#panel-text-17-sentence").typed({
        strings: ["I lost my shadow...","I am all alone","I am so lonely"],
        typeSpeed: 50,
        showCursor: false,
    });
})

/*
    Scene 18
*/
sr.reveal('#scene-18', {
    viewFactor: 0.5
});

$('#background-18').on('click', function() {
    $("#panel-text-18-sentence").typed({
        strings: ["That doesn't matter","You can play with me!"],
        typeSpeed: 50,
        showCursor: false,
    });
})

/*
    Scene 19
*/
sr.reveal('#scene-19', {
    viewFactor: 0.5
});


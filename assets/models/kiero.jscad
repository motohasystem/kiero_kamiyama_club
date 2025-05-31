function getParameterDefinitions() {
    return [
        // { name: 'kiero_type', type: 'choice', values:['接地型', '可搬型'], initial: '可搬型', caption: "キエーロのタイプ:" },
        { name: 'kiero_type', type: 'choice', values:['接地型', '可搬型'], initial: '接地型', caption: "キエーロのタイプ:" },

        { name: 'width', type: 'int', initial: 1000, caption: "本体ボックス外側の横幅:" },
        { name: 'depth', type: 'int', initial: 600, caption: "本体ボックス外側の奥行:" },
        { name: 'height', type: 'choice', values:[240, 480], initial: 480, caption: "本体ボックスの高さ:" },
 
        { name: 'thickness', type: 'int', initial: 18, caption: "板材の厚さ(option):" },
        { name: 'leg', type: 'int', initial: 100, caption: "本体ボックスの足の長さ(option):" },
        { name: 'pillar', type: 'int', initial: 40, caption: "角材の太さ(option):" },
        { name: 'backheight', type: 'int', initial: 150, caption: "フタを接続する柱の高さ(option):" }
    ];
}

function main(params) {
    var world = [];
    world.push( 
        sphere(0)
    );
    var type = params.kiero_type; // '接地型' or '可搬型'

    var width = params.width;   // outside width of main box
    var depth = params.depth;    // depth of main box
    var height = parseInt(params.height);   // height of main box

    var thickness = params.thickness; // thickness of sidar boards
    var leg = params.leg;      // length of legs of main box
    var pillar_size = params.pillar;      // square pillar size
    var backheight = params.backheight;   // backboards pillar height

    if( type === '接地型'){
        world.push(
            translate(
                [-width/2, -height/2, 0],
                enhanced_set(width, depth, height, thickness, leg, pillar_size, backheight) // 接地型
            )
        );
    }
    else {
        world.push(
            translate(
                [-width/2, -height/2, 0],
                beranda_set(width, depth, height, thickness, leg, pillar_size, backheight)  // 可搬型
            )
        );
    }

    const ratio = 0.4;
    return scale(
        [ratio, ratio, ratio],
        world
    );

}

// 接地型セット
function enhanced_set(width, depth, height, thickness, leg, pillar_size, backheight){
    return enhanced_body(width, depth, height, thickness, leg, pillar_size, backheight).concat(
            beranda_hatch(width-thickness*2, depth+pillar_size+pillar_size+thickness, height+leg, pillar_size, thickness, backheight)
        );
}

// 可搬型セット
function beranda_set(width, depth, height, thickness, leg, pillar_size, backheight){
    return beranda_body(width, depth, height, thickness, leg, pillar_size, backheight).concat(
            beranda_hatch(width-thickness*2, depth+pillar_size+pillar_size+thickness, height+leg, pillar_size, thickness, backheight)
        );
}

function enhanced_body(width, depth, height, thickness, leg, pillar_size, backheight){
    console.log("---- enhanced body ----");
    
    var tk = thickness;
    var p = pillar_size;

    var color_frond_back = "C9DCFF";
    var color_left_right = "E7FFB0";

    // front side board
    return [
        // front side board
        color(
            hex2color(color_frond_back), 0.8,
            translate(
                [tk, tk+tk+p, leg],
                rotate(
                    [90, 0, 0],
                    board(width-tk*2, height, tk)
                )
            ),

            translate(
                [tk+p, tk, 0],
                pillar(p, leg + height)
            ),

            translate(
                [width-tk-p-p, tk, 0],
                pillar(p, leg + height)
            )
        ),

        // back side board
        color(
            hex2color(color_frond_back), 0.8,
            translate(
                [tk, depth-pillar_size+tk, leg],
                rotate(
                    [90, 0, 0],
                    board(width-tk*2, height,tk)
                )
            ),
            translate(
                [tk+p, tk+depth-p, 0],
                pillar(p, leg + height + backheight)
            ),
            translate(
                [width-tk-p-p, depth - tk - tk, 0],
                pillar(p, leg + height + backheight)
            )
        ),

        // left side board
        color(
            hex2color(color_left_right), 0.8,
            translate(
                [0, tk, leg],
                rotate(
                    [90, 0, 90],
                    board(depth, height, tk)
                )
            ),
            translate(
                [tk, tk+depth-p, 0],
                pillar(p, leg + height)
            ),
            translate(
                [tk, tk, 0],
                pillar(p, leg + height)
            )
        ),

        // right side board
        color(
            hex2color(color_left_right), 0.8,
            translate(
                [width - tk, tk, leg],
                rotate(
                    [90, 0, 90],
                    board(depth, height, tk)
                )
            ),

            translate(
                [width-tk-p, tk, 0],
                pillar(p, leg + height)
            ),

            translate(
                [width-tk-p, depth -p + tk, 0],
                pillar(p, leg + height)
            )
        )
    ];
}

function beranda_body(width, depth, height, thickness, leg, pillar_size, backheight){
    console.log("---- beranda body ----");
    
    var tk = thickness;
    var p = pillar_size;
    
    var color_frond_back = "F4D03F";
    var color_left_right = "16A085";
    var color_bottom     = "CA6F1E";

    return [
        // front side board
        color(
            hex2color(color_frond_back), 0.8,
            translate(
                [tk, tk+tk+p, leg],
                rotate(
                    [90, 0, 0],
                    board(width-tk*2, height, tk)
                )
            ),
            translate(
                [tk+p, tk, 0],
                pillar(p, leg + height)
            ),
            translate(
                [width-tk-p-p, tk, 0],
                pillar(p, leg + height)
            ),
            translate(
                [tk, tk+tk+p, leg],
                rotate(
                    [90, 0, 90],
                    pillar(p, width-tk*2)
                )
            )
        ),

        // back side board
        color(
            hex2color(color_frond_back), 0.8,
            translate(
                [tk, depth-p+tk, leg],
                rotate(
                    [90, 0, 0],
                    board(width-tk*2, height,tk)
                )
            ),
            translate(
                [tk+p, tk+depth-p, 0],
                pillar(p, leg + height + backheight)
            ),
            translate(
                [width-tk-p-p, depth - tk - tk, 0],
                pillar(p, leg + height + backheight)
            ),
            translate(
                [tk, depth-p-p, leg],
                rotate(
                    [90, 0, 90],
                    pillar(p, width-tk*2)
                )
            )
        ),

        // left side board
        color(
            hex2color(color_left_right), 0.8,
            translate(
                [0, tk, leg],
                rotate(
                    [90, 0, 90],
                    board(depth, height, tk)
                )
            ),
            translate(
                [tk, tk+depth-p, 0],
                pillar(p, leg + height)
            ),
            translate(
                [tk, tk, 0],
                pillar(p, leg + height)
            )
        ),
            
        // right side board
        color(
            hex2color(color_left_right), 0.8,
            translate(
                [width - tk, tk, leg],
                rotate(
                    [90, 0, 90],
                    board(depth, height, tk)
                )
            ),
            translate(
                [width-tk-p, tk, 0],
                pillar(p, leg + height)
            ),
            translate(
                [width-tk-p, depth - tk - tk, 0],
                pillar(p, leg + height)
            )
        ),

        // bottom board
        color(
            hex2color(color_bottom), 0.8,
            translate(
                [tk, p+tk*2, leg+p],
                board(width-tk*2, depth-tk*2-p*2, tk)
            ),
            translate(
                [tk, depth/3*2, leg],
                rotate(
                    [90, 0, 90],
                    pillar(p, width-tk*2)
                )
            ),
            translate(
                [tk, depth/3, leg],
                rotate(
                    [90, 0, 90],
                    pillar(p, width-tk*2)
                )
            )
        )
    ]
}

function hex2color(hexStr){
    const r = parseInt(hexStr.substr(0,2), 16);
    const g = parseInt(hexStr.substr(2,2), 16);
    const b = parseInt(hexStr.substr(4,2), 16);

    console.log("colors : " + [r, g, b]);
    return [r/255, g/255, b/255];
}

function beranda_hatch(width, depth, height, pillar_size, thickness, backheight){
    console.log("---- hatch ----");
    var p = pillar_size;
    var tk = thickness;

    var hd = sqrt(pow(backheight,2) + pow(depth,2));   // hatch depth
    var margin = 0.2;

    return translate(
        [width+tk, depth-p*2 - p, height+backheight],
        rotate(
            [ 0, 0, 180],
            translate(
                [0, tk-p*2, 0],
                // depth beams
                color(
                    hex2color("B37C72"), 0.8,
                    rotate(
                        [-90, 0, 0],
                        translate(
                            [0, 0,  - p*2],
                        pillar(p, hd + p*2),
                        
                        translate(
                            [(width-p)/2, 0, 0],
                            pillar(p, hd + p*2)
                        ),
                        
                        translate(
                            [width-p, 0, 0],
                            pillar(p, hd + p*2)
                        )
                        )
                    )
                ),
                // horizontal beams
                color( 
                    hex2color("B37C72"), 0.8,
                    rotate(
                        [0, 90, 0],
                        translate(
                            [-p, -p*2, 0],
                            pillar(p, width)
                        ),

                        translate(
                            [-p, hd-p*2, 0],
                            pillar(p, width)
                        )
                    )
                ),

                // roof panel
                color(
                    "snow", 0.8,
                    translate(
                        [-width*margin/2, - hd * margin / 2 - p, p],
                        roof( width*(1+margin), hd*(1+margin), tk)
                    )
                )
            )
        )
    );
}

function pillar(width, height){
    append_list( "square pillar (length : " +  round(height) +  "mm, side:" + round(width) + "mm )");
    
    return cube([width, width, height]); 
}

function board(width, depth, thickness){
    append_list(" board ( thickness : " + round(thickness) +  "mm, width : " +  round(width) + "mm, depth : ", round(depth), "mm )");
    return cube([width, depth, thickness]);
}

function roof(width, depth, thickness ){
    append_list(" roof ( thickness : " + round(thickness) +  "mm, width : " +  round(width) + "mm, depth : " + round(depth) + "mm )");
    return cube([width, depth, thickness]);
}

//const KieroMaterials = [];
// window.KieroMaterials = []
// module.exports = KieroMaterials;
function append_list(str){
    console.log(str);
    var el = document.getElementById("listup_materials");
    el.textContent = str;
    el.appendChild(str);
}


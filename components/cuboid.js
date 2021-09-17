var d2Cuboid = Vue.component('d2-cuboid', {
    data: function () {
        return {
            offsetX: 250,
            offsetY: 100,
            scale: 0.05,
            position: [100, 100, 100],
            cuboid: [
                // [1, 1, -99],
                // [1, 99, -99],
                // [99, 99, -99],
                // [99, 1, -99],
                [0, 0, 0, [1, 3, 4]],
                [0, 222, 0],
                [222, 222, 0],
                [222, 0, 0],
                [0, 0, 222],
                [0, 222, 222],
                [222, 222, 222],
                [222, 0, 222],
            ],
            stick: [
                [50, 50, -500],
                [50, 50, 0],
                [50, 50, 500],
            ],
            // cuboidInitial: [],
            // faces: {},
            // lookingAtPoint: [10, 10, 1000],
            showVertices: true,
            showEdges: true,
        }
    },
    created() {
        // this.cuboidInitial = JSON.parse(JSON.stringify(this.cuboid));
        // this.cuboid.forEach(element => {
        //     if (element[2] != 0) {
        //         let initX = 1; let initY = 1;
        //         if (element[0] != 0) { initX = element[0] }
        //         if (element[1] != 0) { initY = element[1] }

        //         element[0] = (element[0] - this.lookingAtPoint[0]) * (element[2] / 80);
        //         element[1] = (element[1] - this.lookingAtPoint[1]) * (element[2] / 80);
        //     }
        // });
    },
    component: {
        'd2-vertices': d2Vertices,
        'd2-edges': d2Edges,
    },
    props: {
        xf: '',
        yf: '',
        width: Number,
        // height: Number,
        // depth: Number,
        // position: { x: 0, y: 0 }
    },
    template: `
    <g :transform="\`translate(\${position[0]}, \${position[1]})\`">
        <d2-edges :showEdges="showEdges" :xf="xf" :yf="yf" :points="stick" :position="position">
        </d2-edges>

        <d2-vertices :showVertices="showVertices" :xf="xf" :yf="yf" :points="stick" :position="position">
         </d2-vertices>
    </g>
    `
})

// [cuboid[0][0] + position.x, cuboid[0][1] + position.y],
//             [cuboid[1][0] + position.x, cuboid[1][1] + position.y],
//             [cuboid[2][0] + position.x, cuboid[2][1] + position.y],
//             [cuboid[3][0] + position.x, cuboid[3][1] + position.y],
//             [cuboid[4][0] + position.x, cuboid[4][1] + position.y],
//             [cuboid[5][0] + position.x, cuboid[5][1] + position.y],
//             [cuboid[6][0] + position.x, cuboid[6][1] + position.y],
//             [cuboid[7][0] + position.x, cuboid[7][1] + position.y]

// <polyline stroke="rgba(0,0,0)" stroke-width="1px" fill="rgba(0,0,0,0)"
// :points="\`
// \${cuboid[0][0] + position.x} \${cuboid[0][1] + position.y}, 
// \${cuboid[1][0] + position.x} \${cuboid[1][1] + position.y}, 
// \${cuboid[2][0] + position.x} \${cuboid[2][1] + position.y}, 
// \${cuboid[3][0] + position.x} \${cuboid[3][1] + position.y}, 
// \${cuboid[0][0] + position.x} \${cuboid[0][1] + position.y}
// \`" />

// [cuboid[0][0] + position.x, cuboid[0][1] + position.y, cuboid[1][0] + position.x, cuboid[1][1] + position.y],
// [cuboid[0][0] + position.x, cuboid[0][1] + position.y, cuboid[1][0] + position.x, cuboid[1][1] + position.y],

// [cuboid[1][0] + position.x, cuboid[1][1] + position.y, cuboid[2][0] + position.x, cuboid[2][1] + position.y],
// [cuboid[1][0] + position.x, cuboid[1][1] + position.y, cuboid[2][0] + position.x, cuboid[2][1] + position.y],

// [cuboid[2][0] + position.x, cuboid[2][1] + position.y, cuboid[3][0] + position.x, cuboid[3][1] + position.y],
// [cuboid[2][0] + position.x, cuboid[2][1] + position.y, cuboid[3][0] + position.x, cuboid[3][1] + position.y],

// [cuboid[3][0] + position.x, cuboid[3][1] + position.y, cuboid[0][0] + position.x, cuboid[0][1] + position.y],
// [cuboid[3][0] + position.x, cuboid[3][1] + position.y, cuboid[0][0] + position.x, cuboid[0][1] + position.y],

// [cuboid[4][0] + position.x, cuboid[4][1] + position.y, cuboid[5][0] + position.x, cuboid[5][1] + position.y],
// [cuboid[4][0] + position.x, cuboid[4][1] + position.y, cuboid[5][0] + position.x, cuboid[5][1] + position.y],

// [cuboid[5][0] + position.x, cuboid[5][1] + position.y, cuboid[6][0] + position.x, cuboid[6][1] + position.y],
// [cuboid[5][0] + position.x, cuboid[5][1] + position.y, cuboid[6][0] + position.x, cuboid[6][1] + position.y],

// [cuboid[6][0] + position.x, cuboid[6][1] + position.y, cuboid[7][0] + position.x, cuboid[7][1] + position.y],
// [cuboid[6][0] + position.x, cuboid[6][1] + position.y, cuboid[7][0] + position.x, cuboid[7][1] + position.y],

// [cuboid[7][0] + position.x, cuboid[7][1] + position.y, cuboid[4][0] + position.x, cuboid[4][1] + position.y],
// [cuboid[7][0] + position.x, cuboid[7][1] + position.y, cuboid[4][0] + position.x, cuboid[4][1] + position.y],

// [cuboid[0][0] + position.x, cuboid[0][1] + position.y, cuboid[4][0] + position.x, cuboid[4][1] + position.y],
// [cuboid[0][0] + position.x, cuboid[0][1] + position.y, cuboid[4][0] + position.x, cuboid[4][1] + position.y],

// [cuboid[1][0] + position.x, cuboid[1][1] + position.y, cuboid[5][0] + position.x, cuboid[5][1] + position.y],
// [cuboid[1][0] + position.x, cuboid[1][1] + position.y, cuboid[5][0] + position.x, cuboid[5][1] + position.y],

// [cuboid[2][0] + position.x, cuboid[2][1] + position.y, cuboid[6][0] + position.x, cuboid[6][1] + position.y],
// [cuboid[2][0] + position.x, cuboid[2][1] + position.y, cuboid[6][0] + position.x, cuboid[6][1] + position.y],

// [cuboid[3][0] + position.x, cuboid[3][1] + position.y, cuboid[7][0] + position.x, cuboid[7][1] + position.y],
// [cuboid[3][0] + position.x, cuboid[3][1] + position.y, cuboid[7][0] + position.x, cuboid[7][1] + position.y],
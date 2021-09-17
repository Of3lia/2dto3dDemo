var d2Edges = Vue.component('d2-edges', {
    data: function () {
        return {
        }
    },
    props: {
        xf: '',
        yf: '',
        position: Array,
        points: Array,
        showEdges: Boolean,
    },
    template: `
    <g v-if="showEdges">
        <g v-for="point in points">
            <path v-for="node in point[3]" :d="\`
                M \${point[0] + xf * (point[2] / 80)} \${points[i][1] - yf * (point[2] / 80)}
                L \${points[node][0] + xf * (points[node][2] / 80)} 
                \${points[node][1] - yf * (points[node][2] / 80)}
                \`" fill="transparent" stroke="black"/>
        </g>
    </g>
    `
})

var d2Edges = Vue.component('d2-edges', {
    data: function () {
        return {
        }
    },
    props: {
        edges: Array,
        showEdges: Boolean,
    },
    template: `
    <g v-if="showEdges">
        <line v-for="edge in edges" :x1="edge[0]" :y1="edge[1]" :x2="edge[2]" :y2="edge[3]" stroke="black"/>
    </g>
    `
})

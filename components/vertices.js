var d2Vertices = Vue.component('d2-vertices', {
    data: function () {
        return {
        }
    },
    props: {
        vertices: Array,
        showVertices: Boolean,
    },
    template: `
    <g v-if="showVertices">
        <circle v-for="vertex in vertices" :cx="vertex[0]" :cy="vertex[1]" r="4" fill="red"/>
    </g>
    `
})

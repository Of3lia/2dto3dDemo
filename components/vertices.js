var d2Vertices = Vue.component('d2-vertices', {
    data: function () {
        return {
        }
    },
    props: {
        xf: '',
        yf: '',
        position: Array,
        points: Array,
        showVertices: Boolean,
    },
    template: `
    <g v-if="showVertices">
        <circle v-for="point in points" 
        :cx="point[0] + xf * (point[2] / 80)" 
        :cy="point[1] - yf * (point[2] / 80)"
        :r="4" fill="red"/>
    </g>
    `
})

<template>

    <div class="canvas-view">
        <header class="title">
            <h1>Layers via array with Sorting</h1>
            <hr>
        </header>

        <section class="viewport">
            <div class="viewport-content" ratio="1x1">
                <canvas ref="canvas"></canvas>
            </div>

            <highlightjs language="js" :code="codeSnippet" />
            <a href="https://www.w3schools.com/js/js_array_sort.asp#mark_numeric">Sorteren van arrays (met objecten)</a>

            <h3>Extra uitleg</h3>
            <highlightjs language="js" :code="extraExplanation" />
        </section>

        <aside class="sidebar">
            <div class="options">
                <div class="option-group" name="Layers" >
                    <div class="row">
                        <div class="option">
                            <label>Layer type</label>
                            <select v-model="options.layerType">
                                <option :value="1">1) Vierkanten</option>
                                <option :value="2">2) Cirkel</option>
                                <option :value="3">3) Half vierkant diagonaal</option>
                            </select>
                        </div>
                        <button @click="addLayer" class="button">Add layer</button>
                    </div>
                </div>
                
                <div class="option-group" v-for="(layer, k) in sortedLayers" :key="k" :name="`Layer ${k+1} properties`">

                    <div class="row">
                        <div class="option">
                            <label>Show</label>
                            <input type="radio" :id="`layer-${k}x-layer1-v0`" :value="true" v-model="layer.show">
                            <label :for="`layer-${k}x-layer1-v0`">
                                yes
                            </label>
                            
                            <input type="radio" :id="`layer-${k}x-layer1-v1`" :value="false" v-model="layer.show">
                            <label :for="`layer-${k}x-layer1-v1`">
                                no
                            </label>
                        </div>


                        <div class="option">
                            <label :for="`layer-${k}color`">
                                Color
                            </label>
                            <input type="color" :id="`layer-${k}color`" v-model="layer.color" >
                        </div>
                        <div class="option" ">

                        <label>Position</label>
                            <select v-model="layer.position" @focus="prevPosition = layer.position" @change="updateOther(layer, sortedLayers[layer.position], prevPosition)">
                                <option :value="k" v-for="(v,k) in options.layers" :key="k">{{k}}</option>
                            </select>
                        </div>
                    </div>


                    <div class="row" v-if="layer.type == 1">
                        <div class="option">
                            <label :for="`layer-${k}-amount-of-squares`">
                                Amount of squares
                            </label>
                            <input type="range" :id="`layer-${k}-amount-of-squares`" min="1" max="4" step="1" v-model.number="layer.amountOfSquares">
                            <!-- optional number display-->
                            <input type="number" min="1" max="4" v-model.number="layer.amountOfSquares">
                        </div>

                        <div class="option">
                            <label :for="`layer-${k}-size`">
                                Size (in %)
                            </label>
                            <input type="range" :id="`layer-${k}-size`" min="0" max="100" step="1" v-model.number="layer.size">
                            <!-- optional number display-->
                            <input type="number" min="0" max="100" v-model.number="layer.size">
                        </div>
                    </div>
                    

                    <div class="option" v-if="layer.type == 2">
                        <label :for="`layer-${k}-diameter`">
                            Diameter (in px)
                        </label>
                        <input type="range" :id="`layer-${k}-diameter`" min="0" max="960" step="1" v-model.number="layer.diameter">
                        <!-- optional number display-->
                        <input type="number"  min="0" max="960" v-model.number="layer.diameter">
                    </div>


                    <div class="option" v-if="layer.type == 3">
                        <label>Diagonal position</label>
                        <select v-model="layer.diagonalPosition">
                            <option value="tl">Top left</option>
                            <option value="tr">Top right</option>
                            <option value="br">Bottom right</option>
                            <option value="bl">Bottom left</option>
                        </select>
                    </div>
                </div>


            </div>
        </aside>
    </div>
</template>


<script>
const codeSnippet = 
`
// Haal canvas element op en haal de context hiervan op
const canvas = getElementById("canvas")
const ctx = this.canvas.el.getContext("2d");

const layers = []

// Onderstaande code maakt een nieuwe array aan en voegt 
// daar alle items van de 'layers' array aan toe.
// Daarna wordt het op basis van de position gesorteerd
// Zie voor verdere uitleg het codeblock onderaan deze pagina
const sortedLayers = [...layers].sort((layerA, layerB) => {
    return layerA.position - layerB.position
})


// De drawLayer functies zijn hetzelfde als in de layers-with-multiple-properties demo 
const drawLayer1(...) {...}
const drawLayer2(...) {...}
const drawLayer3(...) {...}


updateCanvas() {
    // Reset canvas, zodat deze weer leeg is
    ctx.clearRect(0,0,this.canvas.width, this.canvas.height)

    // Teken de lagen
    for (const layer of sortedLayers) {

        // Als de laag verborgen staat, dan skippen we
        // de lus door naar de volgende stap door continue te gebruiken
        if (!layer.show) {
            continue;
        }

        if (layer.type === 1) {
            this.drawLayer1(layer)
        } else if (layer.type === 2) {
            this.drawLayer2(layer)
        } else if (layer.type === 3) {
            this.drawLayer3(layer)
        }
    }
}

`

const extraExplanation = 
`

/*****
 * Je zou het ook zonder de [...] kunnen doen, maar dan sorteer
 * je de bestaande 'layers' array, en 'sortedLayers' is dan eigenlijk
 * slechts een alias (of verwijzing) naar de 'layers' array
 *****/
const sortedLayers = layers.sort((layerA, layerB) => {
    return layerA.position - layerB.position
})

/*****
 * In bovenstaand voorbeeld zou het misschien zelf eenvoudiger zijn om
 * de hele 'sortedLayers' variabel weg te halen en gewoon alleen layers gebruiken
 *****/
layers.sort((layerA, layerB) => {
    return layerA.position - layerB.position
})

// Als je even voor jezelf wilt zien hoe het werk;
// Kopiëer dan onderstaande 4 regels naar de console.
// Dan zie je precies wat er gebeurd
var test = [{v:3}, {v:2}, {v:1}]
console.log("Voor: ",JSON.stringify(test))
test.sort((A, B) => A.v - B.v)
console.log("Na: ",JSON.stringify(test))

// Als je trouwens wilt weten waarom JSON.stringify hier gebruikt wordt, moet je het maar even weghalen en opnieuw runnen.
`

export default {
    props: [],
    data() {
        return {
            codeSnippet,
            extraExplanation,
            value: 0,
            canvas: {
                el: null,
                ctx: null,
                width: 960, // in pixels
                height: 960, // in pixels
            },
            options: {
                color: getComputedStyle(document.documentElement).getPropertyValue('--accentColor').trim(),
                layers: [],
                layerType: 2,
                // {
                //      type: 1 | 2 | 3
                //      position: number
                //      color: string
                //      amountOfSquare: number
                //      size: number
                //      diameter: number
                //      diagonalPosition: string
                // }
            },
            prevPosition: null
        }
    },
    watch: {
        "options": {
            handler(v) {
                if (this.canvas.ctx) {
                    this.updateCanvas()
                } else {
                    setTimeout(this.updateCanvas)
                }

                document.documentElement.style.setProperty("--accentColor", v.color)
                return parseFloat(v)
            },
            deep: true,
            immediate: true
        },
        
        "options.layers": {
            handler(value) {
                const layersSnippet = `const layers = ${JSON.stringify(this.options.layers, null, 4)}`
                this.codeSnippet = this.codeSnippet.replace(
                    /const layers = \[[\s\S]*?\]/,
                    layersSnippet
                )
            },
            deep: true,
        },
    },
    computed: {
        sortedLayers() {
            return [...this.options.layers].sort((layerA, layerB) => {
                return layerA.position - layerB.position
            })
        }
    },
    mounted() {
        this.canvas.el = this.$refs["canvas"]
        this.setCanvasDimensions()
        this.canvas.ctx = this.canvas.el.getContext("2d");
        this.addLayer()
    },
    methods: {
        addLayer() {
            const newLayer = {
                type: this.options.layerType,
                color: this.options.color,
                show: true,
                position: this.options.layers.length
            }

            if (this.options.layerType == 1) {
                newLayer.amountOfSquares = 2
                newLayer.size = 100
            } else if (this.options.layerType == 2) {
                newLayer.diameter = 480
            } else if (this.options.layerType == 3) {
                newLayer.diagonalPosition = "tl"
            } 

            this.options.layers.push(newLayer)
        },  
        updateOther(layer, otherLayer, oldPosition) {
            if (otherLayer && otherLayer !== layer) {
                otherLayer.position = oldPosition
            }
        },  
        setCanvasDimensions() {
            const canvas = this.canvas.el
            if (!canvas) {
                throw new Error("Can not find canvas")
            }

            canvas.width = this.canvas.width
            canvas.height = this.canvas.height

        },


        // Teken 2 vierkantjes
        drawLayer1(options = { color: "black", amountOfSquares: 2, size: 100 }) {

            const ctx = this.canvas.ctx
            ctx.fillStyle = options.color  
            // We delen size door 100 zodat de berekening klopt 
            const size = options.size / 100

            // Wanneer size 50 is, dan vermenigvuldigen we het met 0.5
            // Wanneer size 25 is, dan vermenigvuldigen we het met 0.25
            // Wanneer size 90 is, dan vermenigvuldigen we het met 0.9
            const width = this.canvas.width/2 * size
            const height = this.canvas.height/2 * size
            
            // Maak paden voor de vierkantjes
            ctx.beginPath()
            if (options.amountOfSquares >= 1) {
                ctx.rect(this.canvas.width - width, 0, width, height)
            }
            if (options.amountOfSquares >= 2) {
                ctx.rect(0, this.canvas.height - height, width, height)
            }
            if (options.amountOfSquares >= 3) {
                ctx.rect(this.canvas.width - width, this.canvas.height - height, width, height)
            }
            if (options.amountOfSquares >= 4) {
                ctx.rect(0, 0, width, height)
            }

            // Vul paden
            ctx.fill()
        },


        // Teken een cirkel
        drawLayer2(options = { color: "black", diameter: 100 }) {
            const ctx = this.canvas.ctx
            ctx.fillStyle = options.color  
            
            // Maak pad voor de cirkel
            const radius = options.diameter/2
            
            ctx.beginPath()
            ctx.ellipse( 
                this.canvas.width/2,
                this.canvas.height/2,
                radius,
                radius,
                0,
                0,
                Math.PI * 2
            )
            ctx.fill()
        },
        drawLayer3(options = { color: "black", diagonalPosition: "tl" }) {
            const ctx = this.canvas.ctx

            const pos = options.diagonalPosition

            // Maak pad voor de driehoek
            ctx.fillStyle = options.color  
            ctx.beginPath()
            // tl = Top left
            if (pos == "tl") {
                ctx.moveTo(0,0)
                ctx.lineTo(this.canvas.width, 0)
                ctx.lineTo(0,this.canvas.height)
            } else if (pos == "tr") {
                ctx.moveTo(0,0)
                ctx.lineTo(this.canvas.width, 0)
                ctx.lineTo(this.canvas.width, this.canvas.height)
            } else if (pos == "br") {
                ctx.moveTo(this.canvas.width,0)
                ctx.lineTo(this.canvas.width, this.canvas.height)
                ctx.lineTo(0,this.canvas.height)
            } else if (pos == "bl") {
                ctx.moveTo(this.canvas.width, this.canvas.height)
                ctx.lineTo(0, this.canvas.height)
                ctx.lineTo(0, 0)
            } 

            ctx.fill()
        },
        updateCanvas() {
            
            const ctx = this.canvas.ctx
            if (!ctx) {
                console.warn("Can not find canvas context")
                return 
            }

            // Reset canvas, zodat deze weer leeg is
            ctx.clearRect(0,0,this.canvas.width, this.canvas.height)
            for (const layer of this.sortedLayers) {

                if (!layer.show) {
                    continue;
                }
                
                if (layer.type == 1) {
                    this.drawLayer1(layer)
                } else if (layer.type == 2) {
                    this.drawLayer2(layer)
                } else if (layer.type == 3) {
                    this.drawLayer3(layer)
                } 
            }
        },
        drawBackgroundColor(color) {
            const ctx = this.canvas.ctx
            if (!ctx) {
                throw new Error("Can not find canvas context")
            }
            
            if (!color) {
                color = this.options.color
            }

            ctx.fillStyle = color;
            ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }
}
</script>


<style lang="css">
</style>

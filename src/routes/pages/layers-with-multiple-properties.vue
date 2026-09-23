<template>

    <div class="canvas-view">
        <header class="title">
            <h1>Layers with multiple properties</h1>
            <hr>
        </header>

        <section class="viewport">
            <div class="viewport-content" ratio="1x1">
                <canvas ref="canvas"></canvas>
            </div>

            <highlightjs language="js" :code="codeSnippet" />
            <a href="https://www.w3schools.com/js/js_object_intro.asp">Hoe werken objecten ook alweer?</a>
        </section>

        <aside class="sidebar">
            <div class="options">
                <div class="option-group" name="Layer 1 properties">
                    <div class="row">
                        <div class="option">
                            <label>Show</label>
                            <input type="radio" id="x-layer1-v0" :value="true" v-model="options.layer1.show">
                            <label for="x-layer1-v0">
                                yes
                            </label>
                            
                            <input type="radio" id="x-layer1-v1" :value="false" v-model="options.layer1.show">
                            <label for="x-layer1-v1">
                                no
                            </label>
                        </div>


                        <div class="option">
                            <label for="color">
                                Color
                            </label>
                            <input type="color" id="color" v-model="options.layer1.color" >
                        </div>
                    </div>


                    <div class="row">
                        <div class="option">
                            <label for="range">
                                Amount of squares
                            </label>
                            <input type="range" id="range" min="1" max="4" step="1" v-model.number="options.layer1.amountOfSquares">
                            <!-- optional number display-->
                            <input type="number"  min="1" max="4" v-model.number="options.layer1.amountOfSquares">
                        </div>

                        <div class="option">
                            <label for="range">
                                Size (in %)
                            </label>
                            <input type="range" id="range" min="0" max="100" step="1" v-model.number="options.layer1.size">
                            <!-- optional number display-->
                            <input type="number"  min="0" max="100" v-model.number="options.layer1.size">
                        </div>
                    </div>
                </div>
                
                
                <div class="option-group" name="Layer 2 properties">
                    <div class="row">
                        <div class="option">
                            <label>Show</label>
                            <input type="radio" id="x-layer2-v0" :value="true" v-model="options.layer2.show">
                            <label for="x-layer2-v0">
                                yes
                            </label>
                            
                            <input type="radio" id="x-layer2-v1" :value="false" v-model="options.layer2.show">
                            <label for="x-layer2-v1">
                                no
                            </label>
                        </div>

                        <div class="option">
                            <label for="color">
                                Color
                            </label>
                            <input type="color" id="color" v-model="options.layer2.color" >
                        </div>
                    </div>

                    <div class="option">
                        <label for="range">
                            Diameter (in px)
                        </label>
                        <input type="range" id="range" min="0" max="960" step="1" v-model.number="options.layer2.diameter">
                        <!-- optional number display-->
                        <input type="number"  min="0" max="960" v-model.number="options.layer2.diameter">
                    </div>

                </div>
                <div class="option-group" name="Layer 3 properties">
                    <div class="row">
                        <div class="option">
                            <label>Show</label>
                            <input type="radio" id="x-layer3-v0" :value="true" v-model="options.layer3.show">
                            <label for="x-layer3-v0">
                                yes
                            </label>
                            
                            <input type="radio" id="x-layer3-v1" :value="false" v-model="options.layer3.show">
                            <label for="x-layer3-v1">
                                no
                            </label>
                        </div>

                        <div class="option">
                            <label for="color">
                                Color
                            </label>
                            <input type="color" id="color" v-model="options.layer3.color" >
                        </div>
                    </div>


                    <div class="option">
                        <label>Position</label>
                        <select v-model="options.layer3.position">
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

const layer1 = {
    show: true,
    color: "#ff0099",
    amountOfSquares: 2,
    size: 100
}

const layer2 = {
    show: true,
    color: "#ff0099",
    diameter: 960
}

const layer3 = {
    show: true,
    color: "#ff0099",
    position: "tl"
}


// De drawLayer functies zijn vergelijkbaar met die uit de eerdere layers-with-color demo
// Maar nu heeft het een options object in plaats van een color string
// Hierdoor kun je meerdere eigenschappen in 1 keer doorgeven

////////////////////////
// LAYER 1
////////////////////////
const drawLayer1(options = { color: "black", amountOfSquares: 2, size: 100 }) {
    
    // Update de kleur
    ctx.fillStyle = options.color  

    // We delen size door 100 zodat de berekening klopt 
    const size = options.size / 100

    // Wanneer size 50 is, dan vermenigvuldigen we het met 0.5 (de helft)
    // Wanneer size 25 is, dan vermenigvuldigen we het met 0.25 (een kwart)
    // Wanneer size 90 is, dan vermenigvuldigen we het met 0.9 (90% van het origineel)
    const width = canvas.width/2 * size
    const height = canvas.height/2 * size
    
    // Maak paden voor de vierkantjes
    ctx.beginPath()
    if (options.amountOfSquares >= 1) {
        ctx.rect(canvas.width - width, 0, width, height)
    }
    if (options.amountOfSquares >= 2) {
        ctx.rect(0, canvas.height - height, width, height)
    }
    if (options.amountOfSquares >= 3) {
        ctx.rect(canvas.width - width, canvas.height - height, width, height)
    }
    if (options.amountOfSquares >= 4) {
        ctx.rect(0, 0, width, height)
    }

    // Vul paden
    ctx.fill()
}

////////////////////////
// LAYER 2
////////////////////////
const drawLayer2(options = { color: "black", diameter: 100 }) {

    // Update de kleur
    ctx.fillStyle = options.color  
    
    // Deel de diameter door 2 om de radius te krijgen
    const radius = options.diameter/2
    
    ctx.beginPath()
    ctx.ellipse(this.canvas.width/2, this.canvas.height/2, radius, radius, 0, 0, Math.PI * 2 )
    ctx.fill()
}

////////////////////////
// LAYER 3
////////////////////////
const drawLayer3(options = { color: "black", position: "tl" }) {
    
    // Update de kleur
    ctx.fillStyle = options.color  
    
    // Helper variabele om code leesbaarder te houden
    const pos = options.position

    ctx.beginPath()

    // tl = Top left
    if (pos == "tl") {
        ctx.moveTo(0,0)
        ctx.lineTo(this.canvas.width, 0)
        ctx.lineTo(0,this.canvas.height)

    // tr = Top right
    } else if (pos == "tr") {
        ctx.moveTo(0,0)
        ctx.lineTo(this.canvas.width, 0)
        ctx.lineTo(this.canvas.width, this.canvas.height)

    // br = Bottom right
    } else if (pos == "br") {
        ctx.moveTo(this.canvas.width,0)
        ctx.lineTo(this.canvas.width, this.canvas.height)
        ctx.lineTo(0,this.canvas.height)

    // bl = Bottom left
    } else if (pos == "bl") {
        ctx.moveTo(this.canvas.width, this.canvas.height)
        ctx.lineTo(0, this.canvas.height)
        ctx.lineTo(0, 0)
    } 

    ctx.fill()
}


////////////////////////
// UPDATE CANVAS
////////////////////////
updateCanvas() {
    // Reset canvas, zodat deze weer leeg is
    ctx.clearRect(0,0,this.canvas.width, this.canvas.height)

    // Teken de lagen
    if (layer1.show) { this.drawLayer1({ color: layer1.color, amountOfSquares: layer1.amountOfSquares, size: layer1.size }) }
    if (layer2.show) { this.drawLayer2({ color: layer2.color, diameter: layer2.diameter }) }
    if (layer3.show) { this.drawLayer3({ color: layer3.color, position: layer3.position }) }
}

`


export default {
    props: [],
    data() {
        return {
            codeSnippet,
            value: 0,
            canvas: {
                el: null,
                ctx: null,
                width: 960, // in pixels
                height: 960, // in pixels
            },
            options: {
                layer1: {
                    show: true,
                    color: "#ff0099",
                    amountOfSquares: 2,
                    size: 100
                },
                layer2: {
                    show: true,
                    color: "#ff0099",
                    diameter: 960,
                },
                layer3: {
                    show: true,
                    color: "#ff0099",
                    position: "tl"
                },
                color: getComputedStyle(document.documentElement).getPropertyValue('--accentColor').trim()                
            }
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
        
        "options.layer1": {
            handler(value) {
                const layer1Snippet = `const layer1 = {
    show: ${value.show},
    color: "${value.color}",
    amountOfSquares: ${value.amountOfSquares},
    size: ${value.size}
}`
                this.codeSnippet = this.codeSnippet.replace(
                    /const layer1 = \{[\s\S]*?\n\}/,
                    layer1Snippet
                )
            },
            deep: true,
        },
        "options.layer2": {
            handler(value) {
                const layer2Snippet = `const layer2 = {
    show: ${value.show},
    color: "${value.color}",
    diameter: ${value.diameter}
}`
                this.codeSnippet = this.codeSnippet.replace(
                    /const layer2 = \{[\s\S]*?\n\}/,
                    layer2Snippet
                )
            },
            deep: true,
        },
        "options.layer3": {
            handler(value) {
                const layer3Snippet = `const layer3 = {
    show: ${value.show},
    color: "${value.color}",
    position: "${value.position}"
}`
                this.codeSnippet = this.codeSnippet.replace(
                    /const layer3 = \{[\s\S]*?\n\}/,
                    layer3Snippet
                )
            },
            deep: true,
        },
    },
    mounted() {
        this.canvas.el = this.$refs["canvas"]
        this.setCanvasDimensions()
        this.canvas.ctx = this.canvas.el.getContext("2d");
    },
    methods: {
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
        drawLayer3(options = { color: "black", position: "tl" }) {
            const ctx = this.canvas.ctx

            const pos = options.position

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

            // Teken laag 1 (als dat moet)
            if (this.options.layer1.show) {
                this.drawLayer1({ 
                    color: this.options.layer1.color,
                    amountOfSquares: this.options.layer1.amountOfSquares,
                    size: this.options.layer1.size,
                })
            }
            // Teken laag 2 (als dat moet)
            if (this.options.layer2.show) {
                this.drawLayer2({ 
                    color: this.options.layer2.color,
                    diameter: this.options.layer2.diameter
                })
            }
            // Teken laag 3 (als dat moet)
            if (this.options.layer3.show) {
                this.drawLayer3({
                    color: this.options.layer3.color,
                    position: this.options.layer3.position
                })
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

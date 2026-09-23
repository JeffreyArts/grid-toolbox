<template>

    <div class="canvas-view">
        <header class="title">
            <h1>Layers with color property</h1>
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
                
                
                <div class="option-group" name="Layer 2 properties">
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
                <div class="option-group" name="Layer 3 properties">
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
    color: "#ff0099"
}

const layer2 = {
    show: true,
    color: "#333333"
}

const layer3 = {
    show: true,
    color: "#9900ff"
}

// Laag1 tekent twee vierkantjes
drawLayer1(color = "black") {

    // Update de kleur
    ctx.fillStyle = color  
    
    // Helper variabelen om de code beter leesbaar te houden
    const width = this.canvas.width/2
    const height = this.canvas.height/2
    
    // Maak paden voor de 2 vierkantjes
    ctx.beginPath()
    ctx.rect(width, 0, width, height)
    ctx.rect(0, height, width, height)

    // Vul paden
    ctx.fill()
}


// Laag2 tekent een cirkel
drawLayer2(color = "black") {
    
    // Update de kleur
    ctx.fillStyle = color  
    
    // Helper variabelen om de code beter leesbaar te houden
    const x = canvas.width/2
    const y = canvas.height/2
    const radius = this.canvas.width/2
    
    ctx.beginPath()
    ctx.ellipse(x, y, radius, radius, 0, 0, Math.PI * 2)
    ctx.fill()
}
    
// Laag3 tekent een half vierkant (diagonaal)
drawLayer3(color = "black") {
    
    // Update de kleur
    const ctx = this.canvas.ctx

    // Maak pad voor de driehoek
    ctx.fillStyle = color  

    // Begin linksbovenin, dan naar rechts & tot slot naar linksonder
    ctx.beginPath()
    ctx.moveTo(0,0)
    ctx.lineTo(this.canvas.width, 0)
    ctx.lineTo(0,this.canvas.height)
    ctx.fill()
}

////////////////////////
// UPDATE CANVAS
////////////////////////
// 1 Centrale functie die het canvas reset, en die de verschillende functies
// aanroept om de verschillende lagen te tekenen.
updateCanvas() {
    // Reset canvas, zodat deze weer leeg is
    ctx.clearRect(0,0,this.canvas.width, this.canvas.height)

    // Teken de lagen
    if (layer1.show) { this.drawLayer1(layer1.color) }
    if (layer2.show) { this.drawLayer1(layer2.color) }
    if (layer3.show) { this.drawLayer1(layer3.color) }
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
                    color: "#ff0099"
                },
                layer2: {
                    show: true,
                    color: "#333333"
                },
                layer3: {
                    show: true,
                    color: "#9900ff"
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
    color: "${value.color}"
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
    color: "${value.color}"
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
    color: "${value.color}"
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
        drawLayer1(color = "black") {

            const ctx = this.canvas.ctx

            // Update de kleur
            ctx.fillStyle = color  
            
            const width = this.canvas.width/2
            const height = this.canvas.height/2
            
            // Maak paden voor de 2 vierkantjes
            ctx.beginPath()
            ctx.rect(width, 0, width, height)
            ctx.rect(0, height, width, height)

            // Vul paden
            ctx.fill()
        },


        // Teken een cirkel
        drawLayer2(color = "black") {
            const ctx = this.canvas.ctx

            // Update de kleur
            ctx.fillStyle = color  
            
            // Maak pad voor de cirkel
            const radius = this.canvas.width/2
            
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
        drawLayer3(color = "black") {
            const ctx = this.canvas.ctx

            // Update de kleur
            ctx.fillStyle = color  
            
            // Maak pad voor de driehoek
            ctx.beginPath()
            ctx.moveTo(0,0)
            ctx.lineTo(this.canvas.width, 0)
            ctx.lineTo(0,this.canvas.height)
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
                this.drawLayer1(this.options.layer1.color)
            }
            // Teken laag 2 (als dat moet)
            if (this.options.layer2.show) {
                this.drawLayer2(this.options.layer2.color)
            }
            // Teken laag 3 (als dat moet)
            if (this.options.layer3.show) {
                this.drawLayer3( this.options.layer3.color)
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

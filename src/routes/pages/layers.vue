<template>

    <div class="canvas-view">
        <header class="title">
            <h1>Layers</h1>
            <hr>
        </header>

        <section class="viewport">
            <div class="viewport-content" ratio="1x1">
                <canvas ref="canvas"></canvas>
            </div>

            <highlightjs language="js" :code="codeSnippet" />
            <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder">Meer informatie over de modulus operator</a>
        </section>

        <aside class="sidebar">
            <div class="options">
                <div class="option-group" name="Selectables">

                    <div class="option">
                        <label>Layer 1</label>
                        <input type="radio" id="x-layer1-v0" :value="true" v-model="options.layer1">
                        <label for="x-layer1-v0">
                            yes
                        </label>

                        <input type="radio" id="x-layer1-v1" :value="false" v-model="options.layer1">
                        <label for="x-layer1-v1">
                            no
                        </label>
                    </div>

                    <div class="option">
                        <label>Layer 2</label>
                        <input type="radio" id="y-layer2-v0" :value="true" v-model="options.layer2">
                        <label for="y-layer2-v0">
                            yes
                        </label>

                        <input type="radio" id="y-layer2-v1" :value="false" v-model="options.layer2">
                        <label for="y-layer2-v1">
                            no
                        </label>
                    </div>
                    
                    <div class="option">
                        <label>Layer 3</label>
                        <input type="radio" id="y-layer3-v0" :value="true" v-model="options.layer3">
                        <label for="y-layer3-v0">
                            yes
                        </label>

                        <input type="radio" id="y-layer3-v1" :value="false" v-model="options.layer3">
                        <label for="y-layer3-v1">
                            no
                        </label>
                    </div>

<!-- 
                    <div class="option">
                        <label for="shape">
                            Shape
                        </label>
                        <select name="shape" v-model="options.shape">
                            <option value="circle"> Circle </option>
                            <option value="square"> Square </option>
                            <option value="plus"> Plus </option>
                            <option value="triangle"> Triangle </option>
                        </select>
                    </div> -->

                    <div class="option">
                        <label for="color">
                            Color
                        </label>
                        <input type="color" id="color" v-model="options.color" >
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

const showLayer1 = true
const showLayer2 = true
const showLayer3 = true
const color = "#f93e3e";


// Laag1 tekent twee vierkantjes
drawLayer1() {
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
drawLayer2() {
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
drawLayer3() {
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

// 1 Centrale functie die het canvas reset, en de verschillende functies
// aanroept om de verschillende lagen te tekenen.
updateCanvas() {
    const ctx = this.canvas.ctx
    if (!ctx) {
        console.error("Can not find canvas context")
        return 
    }

    // Reset canvas, zodat deze weer leeg is
    ctx.clearRect(0,0,this.canvas.width, this.canvas.height)

    // Teken laag 1 (als dat moet)
    if (showLayer1) { this.drawLayer1()}
    if (showLayer2) { this.drawLayer2()}
    if (showLayer3) { this.drawLayer3()}
},



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
                layer1: true,
                layer2: true,
                layer3: true,
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
            handler(value, oldValue) {
                this.codeSnippet = this.codeSnippet.replace(`const showLayer1 = ${oldValue}`,`const showLayer1 = ${value}`)
                this.updateCanvas()
            }
        },
        "options.layer2": {
            handler(value, oldValue) {
                this.codeSnippet = this.codeSnippet.replace(`const showLayer2 = ${oldValue}`,`const showLayer2 = ${value}`)
                this.updateCanvas()
            }
        },
        "options.layer3": {
            handler(value, oldValue) {
                this.codeSnippet = this.codeSnippet.replace(`const showLayer3 = ${oldValue}`,`const showLayer3 = ${value}`)
                this.updateCanvas()
            }
        },
        "options.color": {
            handler(v) {
                document.documentElement.style.setProperty("--accentColor", v)
                const regex = /(color\s*=\s*["'])#[0-9a-fA-F]{3,8}(["'])/g;
                this.codeSnippet = this.codeSnippet.replace(regex,`$1${v}$2`)
                
                this.updateCanvas()
                return parseFloat(v)
            },
            immediate: true
        }
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
        drawLayer1() {

            const ctx = this.canvas.ctx
            ctx.fillStyle = this.options.color  
            
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
        drawLayer2() {
            const ctx = this.canvas.ctx
            ctx.fillStyle = this.options.color  
            
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
        drawLayer3() {
            const ctx = this.canvas.ctx

            // Maak pad voor de driehoek
            ctx.fillStyle = this.options.color  

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
            if (this.options.layer1) {
                this.drawLayer1()
            }
            // Teken laag 2 (als dat moet)
            if (this.options.layer2) {
                this.drawLayer2()
            }
            // Teken laag 3 (als dat moet)
            if (this.options.layer3) {
                this.drawLayer3()
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

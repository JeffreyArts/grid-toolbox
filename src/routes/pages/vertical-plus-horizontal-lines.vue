<template>

    <div class="canvas-view">
        <header class="title">
            <h1>Vertical + Horizontal lines</h1>
            <hr>
        </header>

        <section class="viewport">
            <div class="viewport-content" ratio="1x1">
                <canvas ref="canvas"></canvas>
            </div>

            <highlightjs language="js" :code="codeSnippet" />
            <!-- <a href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/ellipse">Details ellipse functie</a> -->
        </section>

        <aside class="sidebar">
            <div class="options">
                <div class="option-group" name="Selectables">

                    <div class="option">
                        <label for="diameter">
                            Dot diameter
                        </label>
                        <input type="range" id="diameter" min="1" max="360" step="1" v-model.number="options.diameter">
                        <!-- optional number display-->
                        <input type="number"  min="1" max="360" v-model.number="options.diameter">
                    </div>
                    

                    <!-- <div class="option">
                        <label>Skip-a-dot</label>
                        <input type="radio" id="radio-v0" :value="true" v-model.boolean="options.skipDot">
                        <label for="radio-v0">
                            Yes
                        </label>

                        <input type="radio" id="radio-v1" :value="false" v-model.boolean="options.skipDot">
                        <label for="radio-v1">
                            No
                        </label>
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
// Belangrijke defaults (check horizontal-line voor details)
ctx.fillStyle = "#f00";
ctx.beginPath()
const diameter = 40
const radius = diameter/2 // De "breedte"/"hoogte" van een individuele stip
        
// Als eerste maken we een lus voor alle x-posities
for (let x = 0; x < canvas.width + diameter; x+=diameter) {
    
    // BINNEN deze lus, maken we een nieuwe lus voor alle y-posities
    for (let y = 0; y < canvas.height + diameter; y+=diameter) {
    
        // Dan tekenen we gewoon een cirkel net als normaal
        ctx.ellipse(x, y, radius, radius, 0, 0, Math.PI * 2)
    }
}         

// Vul alle lijnen weer in met de geselecteerde kleur 
ctx.fill()
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
                height: 960 // in pixels
            },
            options: {
                diameter: 40,
                skipDot: false,
                color: getComputedStyle(document.documentElement).getPropertyValue('--accentColor').trim()                
            }
        }
    },
    watch: {
        "options.diameter": {
            handler(value, oldValue) {
                this.codeSnippet = this.codeSnippet.replace(`const diameter = ${oldValue}`,`const diameter = ${value}`)
                if (this.canvas.ctx) {
                    this.updateCanvas()
                } else {
                    setTimeout(this.updateCanvas)
                }
                return parseFloat(value)
            },
            immediate: true
        },
        "options.color": {
            handler(v) {
                document.documentElement.style.setProperty("--accentColor", v)
                const regex = /(ctx\.fillStyle\s*=\s*["'])#[0-9a-fA-F]{3,8}(["'])/g;
                this.codeSnippet = this.codeSnippet.replace(regex,`$1${v}$2`)
                this.updateCanvas()
                return parseFloat(v)
            },
            immediate: true
        },
        "options.skipDot": {
            handler(v) {
                if (this.canvas.ctx) {
                    this.updateCanvas()
                } else {
                    setTimeout(this.updateCanvas)
                }
                return parseFloat(v)
            },
            immediate: true
        }
    },
    mounted() {
        this.canvas.el = this.$refs["canvas"]
        this.setCanvasDimensions()
        this.canvas.ctx = this.canvas.el.getContext("2d");
        // this.drawBackgroundColor()
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
        drawGrid() {
            const ctx = this.canvas.ctx
            if (!ctx) {
                console.error("Can not find canvas context")
                return 
            }

            // Maak het canvas schoon
            ctx.clearRect(0,0,this.canvas.width, this.canvas.height)

            // Bepaal de kleur van de stippen
            const color = this.options.color  
            ctx.fillStyle = color;
            
            // Bepaal het formaat van de cirkels
            const diameter = this.options.diameter
            
            // For-lus voor het aanpassen van de x-positie
            for (let x = 0; x < this.canvas.width + diameter; x+=diameter) {

                // Alle even stippen moeten worden overgeslagen wanneer skipDot == true
                // console.log(x, x/diameter, x/diameter % 2)
                if (this.options.skipDot && (x/diameter) % 2) {
                    continue;
                }
                this.drawVerticallLine(x)
            }            

        },
        drawVerticallLine(x) {
            const ctx = this.canvas.ctx
            if (!ctx) {
                console.error("Can not find canvas context")
                return 
            }

            // Bepaal de kleur van de stippen
            const color = this.options.color  
            ctx.fillStyle = color;
            
            // Bepaal het formaat van de cirkels
            const diameter = this.options.diameter
            const radius = diameter/2
            
            // For-lus voor het aanpassen van de x-positie
            for (let y = 0; y < this.canvas.width + diameter; y+=diameter) {

                // Alle even stippen moeten worden overgeslagen wanneer skipDot == true
                // console.log(x, x/diameter/2, x/diameter/2 % 2)
                if (this.options.skipDot && (y/diameter) % 2) {
                    continue;
                }

                // Teken de stip, het optellen van de y positie met diameter/2 zorgt ervoor dat de stip vanuit het midden wordt getekend
                ctx.beginPath()
                ctx.ellipse( x , y, radius, radius, 0, 0, Math.PI * 2)
                ctx.fill()
            }            

        },
        updateCanvas() {
            this.drawGrid()
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

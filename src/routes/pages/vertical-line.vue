<template>

    <div class="canvas-view">
        <header class="title">
            <h1>Vertical line</h1>
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
                        <label for="range">
                            Dot diameter
                        </label>
                        <input type="range" id="range" min="1" max="360" step="1" v-model.number="options.diameter">
                        <!-- optional number display-->
                        <input type="number"  min="1" max="360" v-model.number="options.diameter">
                    </div>
                    

                    <div class="option">
                        <label>Skip-a-dot</label>
                        <input type="radio" id="radio-v0" :value="true" v-model.boolean="options.skipDot">
                        <label for="radio-v0">
                            Yes
                        </label>

                        <input type="radio" id="radio-v1" :value="false" v-model.boolean="options.skipDot">
                        <label for="radio-v1">
                            No
                        </label>
                    </div>

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
const skipDot = false

// De x-positie van alle cirkels moet in het midden van het canvas komen
const x = canvas.width / 2
        
// We doen hier hetzelfde als bij de horizontale lijn, 
// maar dan voor de y-positie van de cirkels

for (let y = 0; y < canvas.height + diameter; y+=diameter) {

    // Met 'continue', skip je als het ware een stap in de lus.
    // In dit geval wanneer de stip een oneven stip is, dan skippen we de lus.
    if (y/diameter % 2) {
        continue;
    }

    // Deze code wordt alleen uitgevoerd wanneer de if-statement false is
    ctx.ellipse(x, y, size, size, 0, 0, Math.PI * 2)

}         

// Vul alle lijnen met de geselecteerde kleur 
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
            handler(value, oldValue) {
                this.codeSnippet = this.codeSnippet.replace(`const skipDot = ${oldValue}`,`const skipDot = ${value}`)
                if (this.canvas.ctx) {
                    this.updateCanvas()
                } else {
                    setTimeout(this.updateCanvas)
                }
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
        drawVerticallLine(x) {
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
            const radius = diameter / 2
            
            // For-lus voor het aanpassen van de x-positie
            for (let y = 0; y < this.canvas.width + diameter; y+=diameter) {

                // Alle even stippen moeten worden overgeslagen wanneer skipDot == true
                // console.log(x, x/diameter/2, x/diameter/2 % 2)
                if (this.options.skipDot && (y/diameter)  % 2) {
                    continue;
                }

                // Teken de stip, het optellen van de y positie met diameter/2 zorgt ervoor dat de stip vanuit het midden wordt getekend
                ctx.beginPath()
                ctx.ellipse( x , y - radius, radius, radius, 0, 0, Math.PI * 2)
                ctx.fill()
            }            

        },
        updateCanvas() {
            // Als de diameter 0 is, dan updaten we de lijn niet. 
            // Dan komt de tekenlus namelijk in een infinite loop.
            if (!this.options.diameter) {
                return
            }
            this.drawVerticallLine(this.canvas.width/2)
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

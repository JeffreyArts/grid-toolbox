<template>

    <div class="canvas-view">
        <header class="title">
            <h1>Dot</h1>
            <hr>
        </header>

        <section class="viewport">
            <div class="viewport-content" ratio="1x1">
                <canvas ref="canvas"></canvas>
            </div>

            <highlightjs language="js" :code="codeSnippet" />
            <a href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/ellipse">Details ellipse functie</a>
        </section>

        <aside class="sidebar">
            <div class="options">
                <div class="option-group" name="Selectables">

                    <div class="option">
                        <label for="range">
                            Dot size
                        </label>
                        <input type="range" id="range" min="1" max="360" step="1" v-model.number="options.dotSize">
                        <!-- optional number display-->
                        <input type="number"  min="8" max="64" v-model.number="options.dotSize">
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
// Bepaal vooraf de kleur waarmee de vorm gevuld moet worden
ctx.fillStyle = "RebeccaPurple";

// Zeg eerst dat je een nieuwe lijn wilt gaan beginnen
ctx.beginPath()

// Teken een lijn in de vorm van een cirkel
// ellipse(x, y, radiusX, radiusY, rotatie, startpunt, eindpunt)
ctx.ellipse( 
    canvas.width/2,
    canvas.height/2,
    dotSize,
    dotSize,
    0,
    0,
    Math.PI * 2
)

// Vul de lijn van de cirkel met de geselecteerde kleur 
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
                dotSize: 32,
                color: getComputedStyle(document.documentElement).getPropertyValue('--accentColor').trim()                
            }
        }
    },
    watch: {
        "options.dotSize": {
            handler(v) {
                if (this.canvas.ctx) {
                    this.updateCanvas()
                } else {
                    setTimeout(this.updateCanvas)
                }
                return parseFloat(v)
            },
            immediate: true
        },
        "options.color": {
            handler(v) {
                document.documentElement.style.setProperty("--accentColor", v)
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
        drawDot() {
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
            const dotSize = this.options.dotSize
            
            
            ctx.beginPath()
            ctx.ellipse( this.canvas.width/2 , this.canvas.height/2, dotSize, dotSize, 0, 0, Math.PI * 2)
            ctx.fill()
            

        },
        updateCanvas() {
            this.drawDot()
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

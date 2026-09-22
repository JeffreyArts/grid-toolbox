<template>

    <div class="canvas-view">
        <header class="title">
            <h1>Triangle</h1>
            <hr>
        </header>

        <section class="viewport">
            <div class="viewport-content" ratio="1x1">
                <canvas ref="canvas"></canvas>
            </div>

            <highlightjs language="js" :code="codeSnippet" />
            <a href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineTo">Details lineTo functie</a>
        </section>

        <aside class="sidebar">
            <div class="options">
                <div class="option-group" name="Selectables">

                    <div class="option">
                        <label for="range">
                            Triangle width
                        </label>
                        <input type="range" min="1" max="480" step="1" v-model.number="options.triangleWidth">
                        <!-- optional number display-->
                        <input type="number"  min="8" max="480" v-model.number="options.triangleWidth">
                    </div>
                    <div class="option">
                        <label for="range">
                            Triangle height
                        </label>
                        <input type="range" min="1" max="480" step="1" v-model.number="options.triangleHeight">
                        <!-- optional number display-->
                        <input type="number"  min="8" max="480" v-model.number="options.triangleHeight">
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
ctx.fillStyle = "#f93e3e";
const width = 100
const height = 100

// De x & y positie beginnen in het midden van het scherm
const x = this.canvas.width/2 
const y = this.canvas.height/2

// Zeg eerst dat je een nieuwe lijn wilt gaan beginnen
ctx.beginPath()

// Maak het canvas schoon
ctx.clearRect(0,0,this.canvas.width, this.canvas.height)

// Teken een lijn in de vorm van een driehoek
ctx.moveTo(x - width/2, y + height/2)     // Punt linksonder
ctx.lineTo(x, y - height/2)               // Punt midden boven
ctx.lineTo(x + width/2, y + height/2)     // Punt rechtsonder

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
                width: 480, // in pixels
                height: 480 // in pixels
            },
            options: {
                triangleHeight: 100,
                triangleWidth: 100,
                color: getComputedStyle(document.documentElement).getPropertyValue('--accentColor').trim()                
            }
        }
    },
    watch: {
        "options.triangleHeight": {
            handler(value,oldValue) {
                this.codeSnippet = this.codeSnippet.replace(`const height = ${oldValue}`,`const height = ${value}`)
                if (this.canvas.ctx) {
                    this.updateCanvas()
                } else {
                    setTimeout(this.updateCanvas)
                }
            },
            immediate: true
        },
        "options.triangleWidth": {
            handler(value,oldValue) {
                this.codeSnippet = this.codeSnippet.replace(`const width = ${oldValue}`,`const width = ${value}`)
                if (this.canvas.ctx) {
                    this.updateCanvas()
                } else {
                    setTimeout(this.updateCanvas)
                }
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
        drawRectangle() {
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
            
            // Bepaal het formaat van de rechthoeken
            const width = this.options.triangleWidth
            const height = this.options.triangleHeight

            // De x & y positie in de rect functie is het startpunt waar de width & height bij opgeteld worden
            const x = this.canvas.width/2 
            const y = this.canvas.height/2
            
            ctx.beginPath()
            ctx.moveTo(x - width/2, y + height/2)     // Punt linksonder
            ctx.lineTo(x, y - height/2)               // Punt midden boven
            ctx.lineTo(x + width/2, y + height/2)     // Punt rechtsonder
            ctx.fill()
            

        },
        updateCanvas() {
            this.drawRectangle()
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

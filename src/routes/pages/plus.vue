<template>

    <div class="canvas-view">
        <header class="title">
            <h1>Plus</h1>
            <hr>
        </header>

        <section class="viewport">
            <div class="viewport-content" ratio="1x1">
                <canvas ref="canvas"></canvas>
            </div>

            <highlightjs language="js" :code="codeSnippet" />
            <a href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rect">Details rect functie</a>
        </section>

        <aside class="sidebar">
            <div class="options">
                <div class="option-group" name="Selectables">

                    <div class="option">
                        <label for="range">
                            Plus width
                        </label>
                        <input type="range" min="1" max="480" step="1" v-model.number="options.rectangleWidth">
                        <!-- optional number display-->
                        <input type="number"  min="8" max="480" v-model.number="options.rectangleWidth">
                    </div>
                    <div class="option">
                        <label for="range">
                            Plus height
                        </label>
                        <input type="range" min="1" max="480" step="1" v-model.number="options.rectangleHeight">
                        <!-- optional number display-->
                        <input type="number"  min="8" max="480" v-model.number="options.rectangleHeight">
                    </div>
                    <div class="option">
                        <label for="range">
                            Plus thickness
                        </label>
                        <input type="range" min="1" :max="Math.min(options.rectangleHeight, options.rectangleWidth)" step="1" v-model.number="options.rectangleThickness">
                        <!-- optional number display-->
                        <input type="number"  min="1" :max="Math.min(options.rectangleHeight, options.rectangleWidth)" v-model.number="options.rectangleThickness">

                        {{ options.rectangleThickness }}
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
// Haal canvas element op en haal de context hiervan op
const canvas = getElementById("canvas")
const ctx = this.canvas.el.getContext("2d");

// Bepaal vooraf de kleur waarmee de vorm gevuld moet worden
ctx.fillStyle = "#f93e3e";
const width = 100
const height = 100
const thickness = 16

// De x & y positie in de rect functie is het startpunt waar de width & height bij opgeteld worden
const x = this.canvas.width/2 - width/2
const y = this.canvas.height/2 - height/2

// Zeg eerst dat je een nieuwe lijn wilt gaan beginnen
ctx.beginPath()

// Bepaal het formaat van de rechthoeken
const width = this.options.rectangleWidth
const height = this.options.rectangleHeight
const thickness = this.options.rectangleThickness

// Horizontale lijn
const x_hor = this.canvas.width/2 - width/2
const y_hor = this.canvas.height/2 - thickness/2
ctx.rect( x_hor, y_hor, width, thickness)

// Verticale lijn
const x_vert = this.canvas.width/2 - thickness/2
const y_vert = this.canvas.height/2 - height/2
ctx.rect( x_vert, y_vert, thickness, height)

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
                rectangleHeight: 100,
                rectangleWidth: 100,
                rectangleThickness: 16,
                color: getComputedStyle(document.documentElement).getPropertyValue('--accentColor').trim()                
            }
        }
    },
    watch: {
        "options.rectangleHeight": {
            handler(value,oldValue) {
                this.codeSnippet = this.codeSnippet.replace(`const height = ${oldValue}`,`const height = ${value}`)
                this.options.rectangleThickness = Math.min(this.options.rectangleHeight, this.options.rectangleThickness)

                if (this.canvas.ctx) {
                    this.updateCanvas()
                } else {
                    setTimeout(this.updateCanvas)
                }
            },
            immediate: true
        },
        "options.rectangleWidth": {
            handler(value,oldValue) {
                this.codeSnippet = this.codeSnippet.replace(`const width = ${oldValue}`,`const width = ${value}`)
                this.options.rectangleThickness = Math.min(this.options.rectangleWidth, this.options.rectangleThickness)

                if (this.canvas.ctx) {
                    this.updateCanvas()
                } else {
                    setTimeout(this.updateCanvas)
                }
            },
            immediate: true
        },
        "options.rectangleThickness": {
            handler(value,oldValue) {
                this.codeSnippet = this.codeSnippet.replace(`const thickness = ${oldValue}`,`const thickness = ${value}`)
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
        drawPlus() {
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
            const width = this.options.rectangleWidth
            const height = this.options.rectangleHeight
            const thickness = this.options.rectangleThickness
            
            ctx.beginPath()

            // Horizontale lijn
            const x_hor = this.canvas.width/2 - width/2
            const y_hor = this.canvas.height/2 - thickness/2
            ctx.rect( x_hor, y_hor, width, thickness)
            
            // Verticale lijn
            const x_vert = this.canvas.width/2 - thickness/2
            const y_vert = this.canvas.height/2 - height/2
            ctx.rect( x_vert, y_vert, thickness, height)

            ctx.fill()
        },
        updateCanvas() {
            this.drawPlus()
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

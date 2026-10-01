<template>

    <div class="canvas-view">
        <header class="title">
            <h1>Random color RGB + range</h1>
            <hr>
        </header>

        <section class="viewport">
            <div class="viewport-content" ratio="1x1">
                <canvas ref="canvas"></canvas>
            </div>

            <highlightjs language="js" :code="codeSnippet" />
            <!-- <a href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rect">Details rect functie</a> -->
        </section>

        <aside class="sidebar">
            <div class="options">
                <div class="option-group" name="RGB kleuren">

                    <div class="row">
                        <div class="option">
                            <label for="red">
                                Red
                            </label>
                            <input type="number" :min="options.red.min" :max="options.red.max" id="red" v-model="options.red.v" >
                        </div> 
                        
                        <div class="option">
                            <label for="red-min">
                                Min
                            </label>
                            <input type="number" min="0" :max="options.red.max" id="red-min" v-model="options.red.min" >
                        </div> 

                        <div class="option">
                            <label for="red-max">
                                Max
                            </label>
                            <input type="number" :min="options.red.min" max="255" id="red-max" v-model="options.red.max" >
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="option">
                            <label for="green">
                                Green
                            </label>
                            <input type="number" :min="options.green.min" :max="options.green.max" id="green" v-model="options.green.v" >
                        </div>

                        <div class="option">
                            <label for="green">
                                Min
                            </label>
                            <input type="number" min="0" :max="options.green.max" id="green" v-model="options.green.min" >
                        </div>

                        <div class="option">
                            <label for="green">
                                Max
                            </label>
                            <input type="number" :min="options.green.min" max="255" id="green" v-model="options.green.max" >
                        </div>

                    </div>

                    <div class="row">
                        <div class="option">
                            <label for="blue">
                                Blue
                            </label>
                            <input type="number" :min="options.blue.min" :max="options.blue.max" id="blue" v-model="options.blue.v" >
                        </div>
                        <div class="option">
                            <label for="blue">
                                Min
                            </label>
                            <input type="number" min="0" :max="options.blue.max" id="blue" v-model="options.blue.min" >
                        </div>
                        <div class="option">
                            <label for="blue">
                                Max
                            </label>
                            <input type="number" :min="options.blue.min" max="255" id="blue" v-model="options.blue.max" >
                        </div>
                    </div>

                    <button class="button" @click="regenerateColor">Change color</button>
                    <br>
                    <br>
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
const ctx = canvas.el.getContext("2d");

// RGB waarden kunnen een waarde hebben van 0 tot en met 255
// Met deze functie kun je een minimale en maximale waarde meegeven voor de RGB waarden
generateColorWithinRange() {
    let red   = {min: 100, max: 128}
    let green = {min: 0,   max: 32}
    let blue  = {min: 200, max: 255}

    const red = Math.floor(Math.random() * (red.max - red.min) + red.min) 
    const green = Math.floor(Math.random() * (green.max - green.min) + green.min) 
    const blue = Math.floor(Math.random() * (blue.max - blue.min) + blue.min) 

    return \`rgb(\${red}, \${green}, \${blue})\`
}

// Bepaal vooraf de kleur waarmee de vorm gevuld moet worden
ctx.fillStyle = generateColorWithinRange();
const width = canvas.width
const height = canvas.height

// Zeg eerst dat je een nieuwe lijn wilt gaan beginnen
ctx.beginPath()

// Maak het canvas schoon
ctx.clearRect(0,0,canvas.width, canvas.height)

// Teken een lijn in de vorm van een rechthoek
// rect(x, y, breedte, hoogte)
ctx.rect( 
    0,
    0,
    width,
    height
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
                red: {v:100, min: 100, max: 128},
                green: {v:10, min: 0, max: 32},
                blue: {v:200, min: 200, max: 255},
                color: getComputedStyle(document.documentElement).getPropertyValue('--accentColor').trim()                
            }
        }
    },
    computed: {
        color() {
            return `rgb(${this.options.red.v}, ${this.options.green.v}, ${this.options.blue.v})`
        }
    },
    watch: {
        "options.red.v": { handler() { this.updateCanvas()} },
        "options.green.v": { handler() { this.updateCanvas()} },
        "options.blue": { handler() { this.updateCanvas()} },
        "options.rectangleHeight": {
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
        "options.rectangleWidth": {
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
        regenerateColor() {
            const red = Math.floor(Math.random() * (this.options.red.max - this.options.red.min) + this.options.red.min) 
            const green = Math.floor(Math.random() * (this.options.green.max - this.options.green.min) + this.options.green.min) 
            const blue = Math.floor(Math.random() * (this.options.blue.max - this.options.blue.min) + this.options.blue.min) 

            this.options.red.v = red
            this.options.green.v = green
            this.options.blue.v = blue
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
            const color = this.color  
            ctx.fillStyle = color;
            
            // Bepaal het formaat van de rechthoek
            const width = this.canvas.width
            const height = this.canvas.height
            const x = 0
            const y = 0
            
            ctx.beginPath()
            ctx.rect( x, y, width, height)
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

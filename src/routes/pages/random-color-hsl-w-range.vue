<template>

    <div class="canvas-view">
        <header class="title">
            <h1>Random color HSL + range</h1>
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
                            <label for="hue">
                                Hue
                            </label>
                            <input type="number" :min="options.hue.min" :max="options.hue.max" id="hue" v-model="options.hue.v" >
                        </div> 
                        
                        <div class="option">
                            <label for="hue-min">
                                Min
                            </label>
                            <input type="number" min="0" :max="options.hue.max" id="hue-min" v-model="options.hue.min" >
                        </div> 

                        <div class="option">
                            <label for="hue-max">
                                Max
                            </label>
                            <input type="number" :min="options.hue.min" max="360" id="hue-max" v-model="options.hue.max" >
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="option">
                            <label for="saturation">
                                Saturation
                            </label>
                            <input type="number" :min="options.saturation.min" :max="options.saturation.max" id="saturation" v-model="options.saturation.v" >
                        </div>

                        <div class="option">
                            <label for="saturation">
                                Min
                            </label>
                            <input type="number" min="0" :max="options.saturation.max" id="saturation" v-model="options.saturation.min" >
                        </div>

                        <div class="option">
                            <label for="saturation">
                                Max
                            </label>
                            <input type="number" :min="options.saturation.min" max="100" id="saturation" v-model="options.saturation.max" >
                        </div>

                    </div>

                    <div class="row">
                        <div class="option">
                            <label for="lightness">
                                Lightness
                            </label>
                            <input type="number" :min="options.lightness.min" :max="options.lightness.max" id="lightness" v-model="options.lightness.v" >
                        </div>
                        <div class="option">
                            <label for="lightness">
                                Min
                            </label>
                            <input type="number" min="0" :max="options.lightness.max" id="lightness" v-model="options.lightness.min" >
                        </div>
                        <div class="option">
                            <label for="lightness">
                                Max
                            </label>
                            <input type="number" :min="options.lightness.min" max="100" id="lightness" v-model="options.lightness.max" >
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

// HSL staat voor Hue, Saturation & Lightness
// Hue is een waarde tussen 0-360 (graden)
// Saturation is het percentage van de kleurintensiteit (0% - 100%)
// Lightness bepaal je hoe donker (0%) of hoe licht (100%) de kleur is
generateColorWithinRange() {
    let hue   = {min: 0, max: 360}
    let saturation = {min: 0,   max: 100}
    let lightness  = {min: 0, max: 100}

    const hue = Math.floor(Math.random() * (hue.max - hue.min) + hue.min) 
    const saturation = Math.floor(Math.random() * (saturation.max - saturation.min) + saturation.min) 
    const lightness = Math.floor(Math.random() * (lightness.max - lightness.min) + lightness.min) 

    return \`hsl(\${hue} \${saturation} \${lightness})\`
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
                hue: {v:280, min: 280, max: 320},
                saturation: {v:90, min: 80, max: 100},
                lightness: {v:50, min: 40, max: 50},
                color: getComputedStyle(document.documentElement).getPropertyValue('--accentColor').trim()                
            }
        }
    },
    computed: {
        color() {
            return `hsl(${this.options.hue.v} ${this.options.saturation.v} ${this.options.lightness.v})`
        }
    },
    watch: {
        "options.hue.v": { handler() { this.updateCanvas()} },
        "options.saturation.v": { handler() { this.updateCanvas()} },
        "options.lightness": { handler() { this.updateCanvas()} },
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
            const hue = Math.floor(Math.random() * (this.options.hue.max - this.options.hue.min) + this.options.hue.min) 
            const saturation = Math.floor(Math.random() * (this.options.saturation.max - this.options.saturation.min) + this.options.saturation.min) 
            const lightness = Math.floor(Math.random() * (this.options.lightness.max - this.options.lightness.min) + this.options.lightness.min) 

            this.options.hue.v = hue
            this.options.saturation.v = saturation
            this.options.lightness.v = lightness

            this.options.color = `hsl(${this.options.hue.v} ${this.options.saturation.v} ${this.options.lightness.v})`
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

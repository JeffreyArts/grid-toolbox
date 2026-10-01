<template>

    <div class="canvas-view">
        <header class="title">
            <h1>Random color HSL</h1>
            <hr>
        </header>

        <section class="viewport">
            <div class="viewport-content" ratio="1x1">
                <canvas ref="canvas"></canvas>
            </div>

            <highlightjs language="js" :code="codeSnippet" />
            <a href="https://itpastorn.github.io/webbteknik/future-stuff/svg/color-wheel.html">HSL kleurencirkel</a>
        </section>

        <aside class="sidebar">
            <div class="options">
                <div class="option-group" name="RGB kleuren">
                    
                    <div class="option">
                        <label for="hue">
                            Hue
                        </label>
                        <input type="number" min="0" max="359" id="hue" v-model="options.hue" >
                    </div>
                    <div class="option">
                        <label for="saturation">
                            Saturation
                        </label>
                        <input type="number" min="0" max="100" id="saturation" v-model="options.saturation" >
                    </div>
                    <div class="option">
                        <label for="lightness">
                            Lightness
                        </label>
                        <input type="number" min="0" max="100" id="lightness" v-model="options.lightness" >
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
// Met Hue bepaal je de positie van het aantal graden van de kleurencirkel (0-360)
// Met Saturation bepaal je de verzadiging, hoog (100) = sterke kleur, laag (0) = lage kleur intensiteit
// Met Lightness bepaal je hoe donker (0) of hoe licht (100) de kleur is
regenerateColor() {
    const hue = Math.floor(Math.random()*360)
    const saturation = Math.floor(Math.random()*100)
    const lightness = Math.floor(Math.random()*100)

    return \`hsl(\${hue} \${saturation} \${lightness})\`
}

// Bepaal vooraf de kleur waarmee de vorm gevuld moet worden
ctx.fillStyle = regenerateColor();
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
                hue: 100,
                saturation: 100,
                lightness: 50,
                color: getComputedStyle(document.documentElement).getPropertyValue('--accentColor').trim()                
            }
        }
    },
    computed: {
        color() {
            return `hsl(${this.options.hue} ${this.options.saturation} ${this.options.lightness})`
        }
    },
    watch: {
        "options.hue": { handler() { this.updateCanvas()} },
        "options.saturation": { handler() { this.updateCanvas()} },
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
            const hue = Math.floor(Math.random()*360)
            const saturation = Math.floor(Math.random()*100)
            const lightness = Math.floor(Math.random()*100)

            this.options.hue = hue
            this.options.saturation = saturation
            this.options.lightness = lightness

            this.options.color = `hsl(${this.options.hue} ${this.options.saturation} ${this.options.lightness})`
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
        }
    }
}
</script>


<style lang="css">
</style>

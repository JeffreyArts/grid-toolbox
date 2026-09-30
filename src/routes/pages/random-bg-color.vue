<template>

    <div class="canvas-view">
        <header class="title">
            <h1>Random background color</h1>
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
                        <label for="color">
                            Color
                        </label>
                        <input type="color" id="color" v-model="options.color" >
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

// RGB waarden kunnen een waarde hebben van 0 tot en met 254
regenerateColor() {
    const red = Math.floor(Math.random()*255)
    const green = Math.floor(Math.random()*255)
    const blue = Math.floor(Math.random()*255)

    return \`rgb(\${red}, \${green}, \${blue})\`
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
                rectangleHeight: 100,
                rectangleWidth: 100,
                color: getComputedStyle(document.documentElement).getPropertyValue('--accentColor').trim()                
            }
        }
    },
    watch: {
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
            const red = Math.floor(Math.random()*255)
            const green = Math.floor(Math.random()*255)
            const blue = Math.floor(Math.random()*255)

            this.options.color = `rgb(${red}, ${green}, ${blue})`
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

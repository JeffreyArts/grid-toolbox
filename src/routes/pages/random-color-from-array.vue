<template>

    <div class="canvas-view">
        <header class="title">
            <h1>Random color via array</h1>
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
                <div class="option-group" name="Kleur selectie">
                    
                    <div class="option">
                        <label for="color">
                            Color
                        </label>

                        <select name="color" id="color" @change="updateColor" v-model.number="options.colorIndex">
                            <option :value="index" v-for="(color, index) in options.colors">{{ color }}</option>
                        </select>

                        <pre>
const colorIndex = {{ options.colorIndex }}
const colors = {{ options.colors }}
const color = colors[colorIndex] // {{ options.colors[options.colorIndex] }}
</pre>
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

let colorIndex = 3
const colors = [ "red", "green", "blue", "rebeccapurple" ]
let color = colors[colorIndex] // red

const changeColor = () => {
    // Math.random() = getal tussen 0 & 1
    // Dat getal vermenigvuldigen we met colors.length (3)
    // Zo kunnen er waarden uitkomen als:
    // 0.1234 * 3 = 3.702
    // 0.8421 * 3 = 2.5263
    // 0.1500 * 3 = 0.45
    // Deze getallen moeten we afronden, 
    // zodat we ze kunnen gebruiken als index voor de array
    // We gebruiken Math.floor om alles naar beneden af te ronden.
    // Het moet immers nooit hoger worden dan 3
    // 0.1234 * 3 = 3.702 // Math.round() wordt 4, Math.ceil() wordt ook 4
    colorIndex = Math.floor(Math.random() * colors.length)
    color = colors[colorIndex]
}


// Update de kleur
ctx.fillStyle = color;

// Zorg voor de basis
const width = canvas.width
const height = canvas.height
ctx.clearRect(0,0,canvas.width, canvas.height)

// Teken vorm
ctx.beginPath()
ctx.rect(0, 0, width, height) // rect(x, y, breedte, hoogte)
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
                colorIndex: 3,
                color: "rebeccapurple",
                colors: ["red", "green", "blue", "rebeccapurple"],
                saturation: 100,
                lightness: 50,
            }
        }
    },
    computed: {
        color() {
            return this.options.colors[this.options.colorIndex]
        }
    },
    watch: {
        "options.colorIndex": { 
            handler(value, oldValue) {
                const colorName = this.options.colors[value]

                this.updateCanvas(); 
                // Update de colorIndex
                this.codeSnippet = this.codeSnippet.replace(
                    /let colorIndex = \d+/,
                    `let colorIndex = ${value}`
                )
                
                // Update de color
                this.codeSnippet = this.codeSnippet.replace(
                    /let color = colors\[colorIndex\] \/\/.*$/m,
                    `let color = colors[colorIndex] // ${colorName}`
                )
                this.options.color = colorName
            }
        },
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
            
            // Genereer een willekeurig getal tussen 0 & het aantal opties in de array
            const randomNumber = Math.random() * this.options.colors.length
            // Rond naar beneden af, zodat 1.4218929 gewoon 1 wordt
            const index = Math.floor(randomNumber)
        
            this.options.colorIndex = index
        },  
        updateColor() {

        },
        drawRectangle() {
            const ctx = this.canvas.ctx
            if (!ctx) {
                console.error("Can not find canvas context")
                return 
            }
            console.log("Draw rectangle",this.options.colors[this.options.colorIndex]   )

            // Maak het canvas schoon
            ctx.clearRect(0,0,this.canvas.width, this.canvas.height)

            // Bepaal de kleur van de stippen
            const color = this.options.colors[this.options.colorIndex]  
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
.color-box {
    display: inline-block;
    width: 8px;
    height: 24px;
    margin-right: 16px;
    translate: 0 8px;
}
</style>

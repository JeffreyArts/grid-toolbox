<template>

    <div class="canvas-view">
        <header class="title">
            <h1>Ellipse</h1>
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
                            x Radius 
                        </label>
                        <input type="range" id="range" min="2" max="360" step="1" v-model.number="options.xRadius">
                        <!-- optional number display-->
                        <input type="number"  min="2" max="360" v-model.number="options.xRadius">
                    </div>
                    <div class="option">
                        <label for="range">
                            y Radius 
                        </label>
                        <input type="range" id="range" min="2" max="360" step="1" v-model.number="options.yRadius">
                        <!-- optional number display-->
                        <input type="number"  min="2" max="360" v-model.number="options.yRadius">
                    </div>
                    <div class="option">
                        <label for="range">
                            Rotatie
                        </label>
                        <input type="range" id="range" min="0" max="360" step="1" v-model.number="options.rotation">
                        <!-- optional number display-->
                        <input type="number"  min="0" max="360" v-model.number="options.rotation">
                    </div>
                    <div class="option">
                        <label for="range">
                            Startpunt
                        </label>
                        <input type="range" id="range" min="0" max="360" step="1" v-model.number="options.startPoint">
                        <!-- optional number display-->
                        <input type="number"  min="0" max="360" v-model.number="options.startPoint">
                    </div>
                    <div class="option">
                        <label for="range">
                            Eindpunt
                        </label>
                        <input type="range" id="range" min="0" max="360" step="1" v-model.number="options.endPoint">
                        <!-- optional number display-->
                        <input type="number"  min="0" max="360" v-model.number="options.endPoint">
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

const xRadius = 100
const yRadius = 200
const rotation = 0 * (Math.PI/180) // 0
const startPoint = 0 * (Math.PI/180) // 0
const endPoint = 360 * (Math.PI/180) // 0

// Zeg eerst dat je een nieuwe lijn wilt gaan beginnen
ctx.beginPath()

// Teken een lijn in de vorm van een cirkel
// ellipse(480, 480, 100, 200, 0, 0, 6.283185307179586)
// ellipse(x, y, radiusX, radiusY, rotatie, startpunt, eindpunt)
ctx.ellipse( 
    canvas.width/2,
    canvas.height/2,
    xRadius,
    yRadius,
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
                xRadius: 100,
                yRadius: 200,
                rotation: 0,
                startPoint: 0,
                endPoint: 360,
                color: getComputedStyle(document.documentElement).getPropertyValue('--accentColor').trim()                
            }
        }
    },
    watch: {
        "options": {
            handler(v, o) {
                if (this.canvas.ctx) {
                    this.updateCanvas()
                } else {
                    setTimeout(this.updateCanvas)
                }
                const ellipseRegex = /(\/\/ ellipse\()\s*[^,]+,\s*[^,]+,\s*[^,]+,\s*[^,]+,\s*[^,]+,\s*[^,]+,\s*[^)]+(\))/
                this.codeSnippet = this.codeSnippet.replace(
                    ellipseRegex,
                    `$1${this.canvas.width / 2}, ${this.canvas.height / 2}, ${v.xRadius}, ${v.yRadius}, ${v.rotation * (Math.PI / 180)}, ${v.startPoint * (Math.PI / 180)}, ${v.endPoint * (Math.PI / 180)}$2`
                )
                document.documentElement.style.setProperty("--accentColor", v.color)
            },
            immediate: true,
            deep: true
        },
        "options.xRadius": {
            handler(value, oldValue) {
                this.codeSnippet = this.codeSnippet.replace(`const xRadius = ${oldValue}`,`const xRadius = ${value}`)
            },
        },
        "options.yRadius": {
            handler(value, oldValue) {
                this.codeSnippet = this.codeSnippet.replace(`const yRadius = ${oldValue}`,`const yRadius = ${value}`)
            },
        },
        "options.rotation": {
            handler(value, oldValue) {
                this.codeSnippet = this.codeSnippet.replace(`const rotation = ${oldValue} * (Math.PI/180) // ${oldValue * (Math.PI/180)}`,`const rotation = ${value} * (Math.PI/180) // ${value * (Math.PI/180)}`)
            },
        },
        "options.startPoint": {
            handler(value, oldValue) {
                this.codeSnippet = this.codeSnippet.replace(`const startPoint = ${oldValue} * (Math.PI/180) // ${oldValue * (Math.PI/180)}`,`const startPoint = ${value} * (Math.PI/180) // ${value * (Math.PI/180)}`)
            },
        },
        "options.endPoint": {
            handler(value, oldValue) {
                this.codeSnippet = this.codeSnippet.replace(`const endPoint = ${oldValue} * (Math.PI/180) // ${oldValue * (Math.PI/180)}`,`const endPoint = ${value} * (Math.PI/180) // ${value * (Math.PI/180)}`)
            },
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
        drawEllipse() {
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
            const xRadius = this.options.xRadius
            const yRadius = this.options.yRadius

            // Converteer graden (0-360) naar radialen
            const rotation = this.options.rotation * (Math.PI/180)
            const startPoint = this.options.startPoint * (Math.PI/180)
            const endPoint = this.options.endPoint * (Math.PI/180)
            
            
            ctx.beginPath()
            ctx.ellipse( this.canvas.width/2 , this.canvas.height/2, xRadius, yRadius, rotation, startPoint, endPoint)
            ctx.fill()
            

        },
        updateCanvas() {
            this.drawEllipse()
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

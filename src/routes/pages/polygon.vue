<template>

    <div class="canvas-view">
        <header class="title">
            <h1>Polygon</h1>
            <hr>
        </header>

        <section class="viewport">
            <div class="viewport-content" ratio="1x1">
                <canvas ref="canvas"></canvas>
            </div>

            <highlightjs language="js" :code="codeSnippet" />
            <a href="https://developer.mozilla.org/en-US/blog/javascript-shape-drawing-function/">Hexagon tutorial</a>
        </section>

        <aside class="sidebar">
            <div class="options">
                <div class="option-group" name="Selectables">

                    <div class="option">
                        <label for="range">
                            Radius 
                        </label>
                        <input type="range" id="range" min="2" max="480" step="1" v-model.number="options.radius">
                        <!-- optional number display-->
                        <input type="number"  min="2" max="480" v-model.number="options.radius">
                    </div>

                    <div class="option">
                        <label for="range">
                            Hoeken 
                        </label>
                        <input type="range" id="range" min="3" max="16" step="1" v-model.number="options.points">
                        <!-- optional number display-->
                        <input type="number"  min="3" max="360" v-model.number="options.points">
                    </div>

                    <div class="option">
                        <label>Teken punten</label>
                        <input type="radio" id="chunks-v0" :value="true" v-model="options.drawChunks">
                        <label for="chunks-v0">
                            Ja
                        </label>

                        <input type="radio" id="chunks-v1" :value="false" v-model="options.drawChunks">
                        <label for="chunks-v1">
                            Nee
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
// Bepaal vooraf de kleur waarmee de vorm gevuld moet worden
ctx.fillStyle = "#f93e3e";

const points = 5
const radius = 320
const drawChunks = false
const startX = this.canvas.width / 2 
const startY = this.canvas.height / 2 

// Een chunk is hier de afstand tussen 2 punten op de rand van de cirkel
// Zet drawChunks aan om een beter beeld te krijgen van wat dit betekend
const chunk = (Math.PI * 2) / points

// Zeg eerst dat je een nieuwe lijn wilt gaan beginnen
ctx.beginPath()

// Deze for-lus voegt punten aan het pad toe op basis van 
for (let i = 0; i < points; i++) {
    // 1 Chunk is de afstand tussen 2 punten, door deze met 'i' te vermenigvuldigen
    // zorgen we ervoor dat telkens de volgende punt gebruikt wordt
    // Math.PI/180 berekening zorgt ervoor dat de 90 graden wordt ge-converteerd naar radialen
    // We trekken er 90 graden vanaf zodat het startpunt bovenaan is
    const rotation = chunk * i - 90 * (Math.PI/180)

    // Hier gebruiken we de sinus & cosinus functies om de x & y punten te berekenen
    const x = startX + radius * Math.cos(rotation)
    const y = startY + radius * Math.sin(rotation)
    // Weten waarom? Zie: https://betabijlesonline.nl/de-eenheidscirkel/
    
    // Als i == 0, dan gebruiken we moveTo om het startpunt van de lijn te bepalen
    if (i === 0) {
        ctx.moveTo(x, y);
        
        // Anders gebruiken we lineTo
    } else {
        ctx.lineTo(x, y);
    }
}

// Niet vergeten na afloop het pad met een kleur te vullen!
ctx.fill()


// Om de chunks beter zichtbaar te maken is onderstaande code toegevoegd in de demo
// Deze is hetzelfde als de vorige for-lus. Maar gebruikt ellipse om cirkels te tekenen,
// i.p.v lineTo/moveTo om 1 vorm te tekenen.
if (drawChunks) {
    ctx.fillStyle = "#333333"
    
    ctx.beginPath()
    for (let i = 0; i < points; i++) {
        const rotation = chunk * i - 90 * (Math.PI / 180)
        const x = startX + radius * Math.cos(rotation)
        const y = startY + radius * Math.sin(rotation)

        ctx.beginPath()
        ctx.ellipse(x, y, 10, 10, 0, 0, Math.PI * 2)
    }
    ctx.fill()
}
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
                points: 5,
                radius: 320,
                drawChunks: false,
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
                document.documentElement.style.setProperty("--accentColor", v.color)
            },
            immediate: true,
            deep: true
        },
        "options.points": {
            handler(value, oldValue) {
                this.codeSnippet = this.codeSnippet.replace(`const points = ${oldValue}`,`const points = ${value}`)
            },
        },
        "options.radius": {
            handler(value, oldValue) {
                this.codeSnippet = this.codeSnippet.replace(`const radius = ${oldValue}`,`const radius = ${value}`)
            },
        },
        "options.drawChunks": {
            handler(value, oldValue) {
                this.codeSnippet = this.codeSnippet.replace(`const drawChunks = ${oldValue}`,`const drawChunks = ${value}`)
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
        drawPolygon() {
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
            
            ctx.beginPath()
            const radius = this.options.radius
            const points = this.options.points
            const startX = this.canvas.width / 2 
            const startY = this.canvas.height / 2 
            const chunk = (Math.PI * 2) / points

            for (let i = 0; i < points; i++) {
                // calculate the rotation
                const rotation = chunk * i - 90 * (Math.PI/180)
                const x = startX + radius * Math.cos(rotation)
                const y = startY + radius * Math.sin(rotation)
                
                // Als i == 0, dan gebruiken we moveTo voor het bepalen
                // van het startpunt van de lijn
                if (i === 0) {
                    ctx.moveTo(x, y);
                    
                    // Anders gebruiken we lineTo
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.fill()
            
            if (this.options.drawChunks) {
                ctx.fillStyle = "#333333"
                
                ctx.beginPath()
                for (let i = 0; i < points; i++) {
                    const rotation = chunk * i - 90 * (Math.PI / 180)
                    const x = startX + radius * Math.cos(rotation)
                    const y = startY + radius * Math.sin(rotation)
                    const size = Math.max(4, radius/20)
                    ctx.beginPath()
                    ctx.ellipse(x, y, size, size, 0, 0, Math.PI * 2)
                    ctx.fill()
                }
                ctx.fill()
            }


        },
        updateCanvas() {
            this.drawPolygon()
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

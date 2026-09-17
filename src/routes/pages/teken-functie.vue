<template>

    <div class="canvas-view">
        <header class="title">
            <h1>Teken functie</h1>
            <hr>
        </header>

        <section class="viewport">
            <div class="viewport-content" ratio="1x1">
                <canvas ref="canvas"></canvas>
            </div>

            <highlightjs language="js" :code="codeSnippet" />
            <!-- <a href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/ellipse">Details ellipse functie</a> -->
        </section>

        <aside class="sidebar">
            <div class="options">
                <div class="option-group" name="Selectables">

                    <div class="option">
                        <label for="range">
                            Range input
                        </label>
                        <input type="range" id="range" min="1" max="360" step="1" v-model.number="options.radius">
                        <!-- optional number display-->
                        <input type="number"  min="8" max="64" v-model.number="options.radius">
                    </div>
                    

                    <div class="option">
                        <label for="shape">
                            Shape
                        </label>
                        <select name="shape" v-model="options.shape">
                            <option value="circle"> Circle </option>
                            <option value="square"> Square </option>
                            <option value="cross"> Cross </option>
                            <option value="triangle"> Triangle </option>
                        </select>
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
// Belangrijke defaults (check eerdere pagina's voor details)
// ...
let shape = "circle"        

const drawShape = (x, y, diameter) {

    if (this.options.shape == "circle") {

        const radius = diameter / 2

        ctx.ellipse(x, y, radius, radius, 0, 0, Math.PI * 2)
        
    } else if (this.options.shape == "square") {
        const size = diameter -2
        // Als we de vierkanten even groot maken als de diameter 
        // dan plakken ze allemaal aan elkaar en kunnen we ze niet zien
        // de -2 is dus eigenlijk een soort van marge tussen de vierkanten

        ctx.rect(x, y, size, size) 

    } else if (this.options.shape == "cross") {

        const thickness = diameter/10

        // Horizontale lijn
        ctx.rect(x, y, diameter, thickness)

        // Verticale lijn
        ctx.rect(x, y, thickness, diameter)

    } else if (this.options.shape == "triangle") {

        // Bepaal startpunt van de driehoek (links-onder)
        ctx.moveTo(x - diameter/2, y + diameter/2)
        
        // Bepaal het tweede punt van de driehoek (midden-boven)
        ctx.lineTo(x,y - diameter/2)

        // Bepaal het derde punt van de driehoek (rechts-onder)
        ctx.lineTo(x + diameter/2,y + diameter/2)
    } 
}


// Opnieuw een dubbele lus, maar nu met de drawShape functie er in

for (let x = 0; x < canvas.width + diameter; x+=diameter) {
    for (let y = 0; y < canvas.height + diameter; y+=diameter) {
        drawShape(x,y,diameter)
    }
}         

// Vul alle lijnen weer in met de geselecteerde kleur 
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
                radius: 32,
                shape: "circle",
                color: getComputedStyle(document.documentElement).getPropertyValue('--accentColor').trim()                
            }
        }
    },
    watch: {
        "options.radius": {
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
        "options.shape": {
            handler(v) {
                if (this.canvas.ctx) {
                    this.updateCanvas()
                }
            }
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
        // this.drawBackgroundColor()
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
        drawGrid() {
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
            const radius = this.options.radius
            const diameter = this.options.radius * 2
            
            // For-lus voor het aanpassen van de x-positie
            for (let x = 0; x < this.canvas.width + diameter; x+= diameter) {

                for (let y = 0; y < this.canvas.height + diameter; y+= diameter) {
                    ctx.beginPath()
                    this.drawShape(x,y,diameter)
                    ctx.fill()
                }
            }            


        },
        drawShape(x, y, diameter) {
            const ctx = this.canvas.ctx
            if (!ctx) {
                console.error("Can not find canvas context")
                return 
            }

            if (this.options.shape == "circle") {
                ctx.ellipse(x, y, diameter/2, diameter/2, 0, 0, Math.PI * 2)
            } else if (this.options.shape == "square") {
                // Als we de vierkanten even groot maken als de diameter 
                // dan plakken ze allemaal aan elkaar en kunnen we ze niet zien
                // de -2 is dus eigenlijk een soort van marge tussen de vierkanten
                ctx.rect(x, y, diameter - 2, diameter - 2) 
            } else if (this.options.shape == "cross") {
                // Horizontale lijn
                ctx.rect(x, y, diameter, diameter / 10)
                // Verticale lijn
                ctx.rect(x, y, diameter / 10, diameter)
            } else if (this.options.shape == "triangle") {
                // Bepaal startpunt van de driehoek
                ctx.moveTo(x - diameter/2, y + diameter/2)
                ctx.lineTo(x,y - diameter/2)
                ctx.lineTo(x + diameter/2,y + diameter/2)
            } 
        },
        updateCanvas() {
            this.drawGrid()
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

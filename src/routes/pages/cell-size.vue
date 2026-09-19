<template>

    <div class="canvas-view">
        <header class="title">
            <h1>Cell Size</h1>
            <hr>
        </header>

        <section class="viewport">
            <div class="viewport-content" ratio="1x1">
                <canvas ref="canvas"></canvas>
            </div>

            <highlightjs language="js" :code="codeSnippet" />
            <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder">Meer informatie over de modulus operator</a>
        </section>

        <aside class="sidebar">
            <div class="options">
                <div class="option-group" name="Selectables">

                    <div class="option">
                        <label for="cellWidth">
                            Cell width
                        </label>
                        <input type="range" id="cellWidth" min="1" max="360" step="1" v-model.number="options.cellWidth">
                        <!-- optional number display-->
                        <input type="number"  min="8" max="64" v-model.number="options.cellWidth">
                    </div>

                    <div class="option">
                        <label for="cellHeight">
                            Cell height
                        </label>
                        <input type="range" id="cellHeight" min="1" max="360" step="1" v-model.number="options.cellHeight">
                        <!-- optional number display-->
                        <input type="number"  min="8" max="64" v-model.number="options.cellHeight">
                    </div>

                    <div class="option">
                        <label>X-Offset</label>
                        <input type="radio" id="x-offset-v0" :value="true" v-model="options.xOffset">
                        <label for="x-offset-v0">
                            yes
                        </label>

                        <input type="radio" id="x-offset-v1" :value="false" v-model="options.xOffset">
                        <label for="x-offset-v1">
                            no
                        </label>
                    </div>

                    <div class="option">
                        <label>Y-Offset</label>
                        <input type="radio" id="y-offset-v0" :value="true" v-model="options.yOffset">
                        <label for="y-offset-v0">
                            yes
                        </label>

                        <input type="radio" id="y-offset-v1" :value="false" v-model="options.yOffset">
                        <label for="y-offset-v1">
                            no
                        </label>
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


/*******
 * Tot nu toe waren alle cellen van het grid vierkant.
 * In dit voorbeeld splitsen we de diameter variabel op
 * naar een cellWidth & cellHeight. Zo kunnen we de breedte
 * en hoogte van iedere cell apart aanpassen.
 *******/
const cellWidth = 40
const cellHeight = 80
        
// Voor de x-as vervangen we de diameter variabel met cellWidth
for (let x = 0; x < this.canvas.width + cellWidth; x+= cellWidth) {
    const isEvenX = x/cellWidth % 2

    // Voor de y-as wordt dit cellHeight
    for (let y = 0; y < this.canvas.height + cellHeight; y+= cellHeight) {
        const isEvenY = y/cellHeight % 2
        let finalX = x
        let finalY = y
        
        if (!isEvenY && this.options.xOffset) {
            finalX = x + cellWidth /2
        }
        if (!isEvenX && this.options.yOffset) {
            finalY = y + cellHeight /2
        }
                
        ctx.beginPath()
        this.drawShape(finalX, finalY, cellWidth, cellHeight)

        ctx.fill()
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
                cellWidth: 32,
                cellHeight: 32,
                shape: "circle",
                xOffset: false,
                yOffset: false,
                color: getComputedStyle(document.documentElement).getPropertyValue('--accentColor').trim()                
            }
        }
    },
    watch: {
        "options": {
            handler(v) {
                if (this.canvas.ctx) {
                    this.updateCanvas()
                } else {
                    setTimeout(this.updateCanvas)
                }

                document.documentElement.style.setProperty("--accentColor", v.color)
                return parseFloat(v)
            },
            immediate: true,
            deep: true
        },
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
            const cellWidth = this.options.cellWidth
            const cellHeight = this.options.cellHeight
            
            for (let x = 0; x < this.canvas.width + cellWidth; x+= cellWidth) {
                const isEvenX = x/cellWidth % 2
                for (let y = 0; y < this.canvas.height + cellHeight; y+= cellHeight) {
                    ctx.beginPath()
                    const isEvenY = y/cellHeight % 2
                    let finalX = x
                    let finalY = y

                    if (!isEvenY && this.options.xOffset) {
                        finalX = x + cellWidth /2
                    }
                    if (!isEvenX && this.options.yOffset) {
                        finalY = y + cellHeight /2
                    }

                    this.drawShape(finalX, finalY, cellWidth, cellHeight)

                    ctx.fill()
                }
            }            
        },
        drawShape(x, y, width, height) {
            const ctx = this.canvas.ctx
            if (!ctx) {
                console.error("Can not find canvas context")
                return 
            }

            if (this.options.shape == "circle") {
                ctx.ellipse(x, y, width/2, height/2, 0, 0, Math.PI * 2)
            } else if (this.options.shape == "square") {
                ctx.rect(x, y, width - 2, height - 2) 
            } else if (this.options.shape == "cross") {
                // Horizontale lijn
                ctx.rect(x, y, width, height / 10)
                // Verticale lijn
                ctx.rect(x, y, width / 10, height)
            } else if (this.options.shape == "triangle") {
                // Bepaal startpunt van de driehoek
                ctx.moveTo(x - width/2, y + height/2)
                ctx.lineTo(x,y - height/2)
                ctx.lineTo(x + width/2,y + height/2)
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

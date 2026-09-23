<template>

    <div class="canvas-view">
        <header class="title">
            <h1>Double Offset</h1>
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
                        <label for="diameter">
                            Cell diameter
                        </label>
                        <input type="range" id="diameter" min="1" max="480" step="1" v-model.number="options.diameter">
                        <input type="number"  min="1" max="480" v-model.number="options.diameter">
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
                            <option value="plus"> Plus </option>
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
// Haal canvas element op en haal de context hiervan op
const canvas = getElementById("canvas")
const ctx = this.canvas.el.getContext("2d");

const hasXOffset = false
const hasYOffset = false
const diameter = 32
const radius = diameter/2


/*******
 * Om het makkelijker te maken voor onszelf, gaan we niet meer de berekeningen 
 * voor x & y posities in de drawShape functie plaatsen, maar gebruiken we hiervoor 
 * aparte variabelen. Doen we dit niet, dan moeten we dubbele if-statements gaan schrijven
 * 
 * Want dan zou het zoiets moeten worden; Heel onoverzichtelijk, hoop dubbele code,
 * foutgevoelig, en vooral erg lastig om snel te zien wat er nu eigenlijk gebeurt
 * 
 * if (x != evenX) {
 *      if (y != evenY) {
 *          drawShape(x + diameter/2, y + diameter/2)
 *      } else {
 *          drawShape(x + diameter/2, y)
 *      }
 * } else {
 *      if (y != evenY) {
 *          drawShape(x, y + diameter/2)
 *      } else {
 *          drawShape(x, y)
 *      }
 * }
 * 
 *******/

 for (let x = 0; x < this.canvas.width + diameter; x+= diameter) {
 
    const isEvenX = x/diameter % 2
    for (let y = 0; y < this.canvas.height + diameter; y+= diameter) {
        const isEvenY = y/diameter % 2

        // Extra variabelen om de locaties van de x & y posities te onthouden
        let finalX = x
        let finalY = y
        
        // Pas x en/of y positie aan indien nodig
        if (!isEvenY && hasXOffset) {
            finalX = x - radius
        }
        if (!isEvenX && hasYOffset) {
            finalY = y - radius
        }   
        
        // Teken de vorm
        ctx.beginPath()
        drawShape(finalX, finalY, diameter)
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
                diameter: 32,
                shape: "circle",
                xOffset: false,
                yOffset: false,
                color: getComputedStyle(document.documentElement).getPropertyValue('--accentColor').trim()                
            }
        }
    },
    watch: {
        "options.diameter": {
            handler(value, oldValue) {
                this.codeSnippet = this.codeSnippet.replace(`const diameter = ${oldValue}`,`const diameter = ${value}`)
                if (this.canvas.ctx) {
                    this.updateCanvas()
                } else {
                    setTimeout(this.updateCanvas)
                }
                return parseFloat(value)
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
        "options.xOffset": {
            handler(value, oldValue) {
                this.codeSnippet = this.codeSnippet.replace(`const hasXOffset = ${oldValue}`,`const hasXOffset = ${value}`)
                if (this.canvas.ctx) {
                    this.updateCanvas()
                }
            }
        },
        "options.yOffset": {
            handler(value, oldValue) {
                this.codeSnippet = this.codeSnippet.replace(`const hasYOffset = ${oldValue}`,`const hasYOffset = ${value}`)
                
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
            const diameter = this.options.diameter
            const radius = diameter/2
            
            console.log(this.options)
            
            for (let x = 0; x < this.canvas.width + diameter; x+= diameter) {
                const isEvenX = x/diameter % 2
                for (let y = 0; y < this.canvas.height + diameter; y+= diameter) {
                    ctx.beginPath()
                    const isEvenY = y/diameter % 2
                    let finalX = x
                    let finalY = y

                    if (!isEvenY && this.options.xOffset) {
                        finalX = x - radius
                    }
                    if (!isEvenX && this.options.yOffset) {
                        finalY = y - radius
                    }

                    this.drawShape(finalX, finalY, diameter)

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
            } else if (this.options.shape == "plus") {
                const width = diameter
                const height = diameter
                // Horizontale lijn
                ctx.rect(x - width/2, y - height / 20, width, height / 10)
                // Verticale lijn
                ctx.rect(x - width/20, y - height/2, width / 10, height)
            } else if (this.options.shape == "triangle") {
                // Bepaal startpunt van de driehoek
                ctx.moveTo(x - diameter/2, y + diameter/2)
                ctx.lineTo(x,y - diameter/2)
                ctx.lineTo(x + diameter/2,y + diameter/2)
            } 
        },
        updateCanvas() {
            // Als de diameter 0 is, dan updaten we het grid niet. 
            // Dan komt de tekenlus namelijk in een infinite loop.
            if (!this.options.diameter) {
                return
            }
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

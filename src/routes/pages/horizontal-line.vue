<template>

    <div class="canvas-view">
        <header class="title">
            <h1>Horizontal line</h1>
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
                            Step size
                        </label>
                        <input type="range" id="range" min="1" max="360" step="1" v-model.number="options.stepSize">
                        <!-- optional number display-->
                        <input type="number"  min="8" max="64" v-model.number="options.stepSize">
                    </div>
                    

                    <div class="option">
                        <label>Skip-a-dot</label>
                        <input type="radio" id="radio-v0" :value="true" v-model.boolean="options.skipDot">
                        <label for="radio-v0">
                            Yes
                        </label>

                        <input type="radio" id="radio-v1" :value="false" v-model.boolean="options.skipDot">
                        <label for="radio-v1">
                            No
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
ctx.fillStyle = "RebeccaPurple";

// Zeg eerst dat je een nieuwe lijn wilt gaan beginnen (mogen meerdere losse lijnen zijn)
ctx.beginPath()

// Bepaal hoe groot de cirkels moeten worden
// De radius is de afstand vanaf het midden van een cirkel tot aan de rand
const radius = 40
const diameter = size*2 // De "breedte"/"hoogte" van de cirkel

// De y-positie van alle cirkels moet in het midden van het canvas komen
const y = canvas.height / 2

/************ 
 * Door het tekenen van een cirkel in een for-lus te plaatsen kunnen we er 
 * meerdere achter elkaar tekenen. We bepalen hier dat x eerst 0 is,
 * daarna tellen we er de diameter bij op. Dit doen we net zo lang totdat
 * de waarde van x groter is dan de breedte van het canvas. 
 * 
 * Of in dit geval eigenlijk de canvas.width + diameter. Mocht het canvas breedte namelijk
 * net niet lekker uitkomen, omdat deze 410 pixels breed is. Met 410 pixels is er immers
 * geen ruimte voor 11 cirkels, dus dan zou er na de tiende cirkel witruimte ontstaan.
************/
for (let x = 0; x < canvas.width + diameter; x+=diameter) {
    // ellipse(x, y, radiusX, radiusY, rotatie, startpunt, eindpunt)
    ctx.ellipse( 
        x,
        canvas.height/2,
        size,
        size,
        0,
        0,
        Math.PI * 2
    )
}         

// Vul de lijnen van de cirkels met de geselecteerde kleur 
ctx.fill()

/************ 
 * Voor het overslaan van de cirkels is er in de echte code een if-statement
 * geplaatst die ervoor zorgt dat de cirkels om-en-om geplaatst worden
************/

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
                stepSize: 32,
                skipDot: false,
                color: getComputedStyle(document.documentElement).getPropertyValue('--accentColor').trim()                
            }
        }
    },
    watch: {
        "options.stepSize": {
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
        "options.color": {
            handler(v) {
                document.documentElement.style.setProperty("--accentColor", v)
                this.updateCanvas()
                return parseFloat(v)
            },
            immediate: true
        },
        "options.skipDot": {
            handler(v) {
                if (this.canvas.ctx) {
                    this.updateCanvas()
                } else {
                    setTimeout(this.updateCanvas)
                }
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
        drawHorizontalLine(y) {

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
            const stepSize = this.options.stepSize
            // For-lus voor het aanpassen van de x-positie
            ctx.beginPath()
            
            for (let x = 0; x < this.canvas.width + stepSize*2; x+=stepSize*2) {
                // Alle even stippen moeten worden overgeslagen wanneer skipDot == true
                // console.log(x, x/stepSize/2, x/stepSize/2 % 2)
                if (this.options.skipDot && x/stepSize/2 % 2) {
                    continue;
                }

                // Teken de stip, het optellen van de y positie met stepSize/2 zorgt ervoor dat de stip vanuit het midden wordt getekend
                
                ctx.ellipse( x , y + stepSize/2, stepSize, stepSize, 0, 0, Math.PI * 2)
            }            
            ctx.fill()

        },
        updateCanvas() {
            this.drawHorizontalLine(this.canvas.height/2 - this.options.stepSize/2)
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

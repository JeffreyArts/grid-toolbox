<template>

    <div class="canvas-view">
        <header class="title">
            <h1>Horizontal line</h1>
        </header>

        <hr>
        <section class="viewport">
            <div class="viewport-content" ratio="1x1">
                <canvas ref="canvas"></canvas>
            </div>
        </section>

        <aside class="sidebar">
            <div class="options">
                <div class="option-group" name="Selectables">

                    <div class="option">
                        <label for="range">
                            Range input
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
                </div>


            </div>
        </aside>
    </div>
</template>


<script>
console.log("ASDF")
export default {
    props: [],
    data() {
        return {
            value: 0,
            canvas: {
                el: null,
                ctx: null,
                width: 960, // in pixels
                height: 960 // in pixels
            },
            options: {
                stepSize: 32,
                skipDot: false
            }
        }
    },
    watch: {
        "options.stepSize": {
            handler(v) {
                if (this.canvas.ctx) {
                    this.drawHorizontalLine(this.canvas.height/2 - this.options.stepSize/2)
                } else {
                    setTimeout(() => {
                        this.drawHorizontalLine(this.canvas.height/2 - this.options.stepSize/2)
                    })
                }
                return parseFloat(v)
            },
            immediate: true
        },
        "options.skipDot": {
            handler(v) {
                if (this.canvas.ctx) {
                    this.drawHorizontalLine(this.canvas.height/2 - this.options.stepSize/2)
                } else {
                    setTimeout(() => {
                        this.drawHorizontalLine(this.canvas.height/2 - this.options.stepSize/2)
                    })
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
            console.log("setCanvasDimensions")

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
            const color = getComputedStyle(document.documentElement).getPropertyValue('--accentColor').trim()    
            const stepSize = this.options.stepSize
            ctx.fillStyle = color;
            
            // For-lus voor het aanpassen van de x-positie
            for (let x = 0; x < this.canvas.width + stepSize*2; x+=stepSize*2) {

                // Alle even stippen moeten worden overgeslagen wanneer skipDot == true
                // console.log(x, x/stepSize/2, x/stepSize/2 % 2)
                if (this.options.skipDot && x/stepSize/2 % 2) {
                    continue;
                }

                // Teken de stip, het optellen van de y positie met stepSize/2 zorgt ervoor dat de stip vanuit het midden wordt getekend
                ctx.beginPath()
                ctx.ellipse( x , y + stepSize/2, stepSize, stepSize, 0, 0, Math.PI * 2)
                ctx.fill()
            }            

        },
        drawBackgroundColor(color) {
            const ctx = this.canvas.ctx
            if (!ctx) {
                throw new Error("Can not find canvas context")
            }
            
            if (!color) {
                color = getComputedStyle(document.documentElement).getPropertyValue('--accentColor').trim()                
            }

            ctx.fillStyle = color;
            ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }
}
</script>


<style lang="css">
</style>

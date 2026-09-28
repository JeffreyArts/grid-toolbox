<template>

    <div class="canvas-view">
        <header class="title">
            <h1>Curved line</h1>
            <hr>
        </header>

        <section class="viewport">
            <div class="viewport-content" ratio="1x1">
                <canvas ref="canvas"></canvas>
            </div>

            <highlightjs language="js" :code="codeSnippet" />
            <a href="https://www.w3schools.com/Tags/canvas_beziercurveto.asp">W3Schools bezier-curves</a>
        </section>

        <aside class="sidebar">
            <div class="options">
                <div class="option-group" name="Start">

                    <div class="row">
                        <div class="option">
                            <label for="range">
                                X
                            </label>
                            <input type="range" min="0" max="960" step="1" v-model.number="options.startPointX">
                            <!-- optional number display-->
                            <input type="number"  min="0" max="960" v-model.number="options.startPointX">
                        </div>
                        <div class="option">
                            <label for="range">
                                Y
                            </label>
                            <input type="range" min="0" max="960" step="1" v-model.number="options.startPointY">
                            <!-- optional number display-->
                            <input type="number"  min="0" max="960" v-model.number="options.startPointY">
                        </div>
                    </div>
                    <div class="row" style="--accentColor: red;">
                        <div class="option">
                            <label for="range">
                                Bezier X
                            </label>
                            <input type="range" min="0" max="960" step="1" v-model.number="options.bezierStartX">
                            <!-- optional number display-->
                            <input type="number"  min="0" max="960" v-model.number="options.bezierStartX">
                        </div>
                        <div class="option">
                            <label for="range">
                                Bezier Y
                            </label>
                            <input type="range" min="0" max="960" step="1" v-model.number="options.bezierStartY">
                            <!-- optional number display-->
                            <input type="number"  min="0" max="960" v-model.number="options.bezierStartY">
                        </div>
                    </div>
                </div>

                <div class="option-group" name="End">
                    <div class="row">
                        <div class="option">
                            <label for="range">
                                End X
                            </label>
                            <input type="range" min="0" max="960" step="1" v-model.number="options.endPointX">
                            <!-- optional number display-->
                            <input type="number"  min="0" max="960" v-model.number="options.endPointX">
                        </div>
                        <div class="option">
                            <label for="range">
                                End Y
                            </label>
                            <input type="range" min="0" max="960" step="1" v-model.number="options.endPointY">
                            <!-- optional number display-->
                            <input type="number"  min="0" max="960" v-model.number="options.endPointY">
                        </div>
                    </div>
                    <div class="row" style="--accentColor: yellow;">
                        <div class="option">
                            <label for="range">
                                End X
                            </label>
                            <input type="range" min="0" max="960" step="1" v-model.number="options.bezierEndX">
                            <!-- optional number display-->
                            <input type="number"  min="0" max="960" v-model.number="options.bezierEndX">
                        </div>
                        <div class="option">
                            <label for="range">
                                End Y
                            </label>
                            <input type="range" min="0" max="960" step="1" v-model.number="options.bezierEndY">
                            <!-- optional number display-->
                            <input type="number"  min="0" max="960" v-model.number="options.bezierEndY">
                        </div>
                    </div>
                </div>


                <div class="option-group" name="Options">
                    <div class="option">
                        <label for="range">
                            Line thickness
                        </label>
                        <input type="range" min="1" :max="128" step="1" v-model.number="options.lineThickness">
                        <!-- optional number display-->
                        <input type="number"  min="1" :max="128" v-model.number="options.lineThickness">
                    </div>


                    <div class="option">
                        <label>Show handels</label>
                        <input type="radio" id="show-handles-v0" :value="false" v-model="options.showHandles">
                        <label for="show-handles-v0">
                            No
                        </label>

                        <input type="radio" id="show-handles-v1" :value="true" v-model="options.showHandles">
                        <label for="show-handles-v1">
                            Yes
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
// Haal canvas element op en haal de context hiervan op
const canvas = getElementById("canvas")
const ctx = canvas.el.getContext("2d");

const startPointY = 480
const startPointX = 0

const bezierStartX = 480
const bezierStartY = 360

const endPointY = 480
const endPointX = 960

const bezierEndX = 480
const bezierEndY = 640

const thickness = 16
const showHandles = true

const drawCurvedLine() {

    // Maak het canvas schoon
    ctx.clearRect(0,0,this.canvas.width, this.canvas.height)
    
    // De code in dit if-statement kun je overslaan
    // Dit tekent de gele & rode stip om de hendels van de beziers
    // te tonen als die optie geselecteerd is
    if (showHandles) {
        ctx.beginPath()
        ctx.lineWidth = 2
        ctx.strokeStyle = "#ccc";
        
        // Teken lijn + cirkel van bezierStart
        ctx.moveTo(startX, startY);
        ctx.lineTo(bezierStartX, bezierStartY);
        ctx.stroke()
        
        ctx.beginPath()
        ctx.fillStyle = "red"
        ctx.ellipse(bezierStartX, bezierStartY, 8,8, 0, 0, Math.PI*2)
        ctx.fill()
        
        // Teken lijn + cirkel van bezierEnd
        ctx.beginPath()
        ctx.moveTo(endX, endY);
        ctx.lineTo(bezierEndX, bezierEndY);
        ctx.stroke()
        
        ctx.beginPath()
        ctx.fillStyle = "yellow"
        ctx.ellipse(bezierEndX, bezierEndY, 8,8, 0, 0, Math.PI*2)
        ctx.fill()
    }

    ////////////////////////
    // Teken de lijn
    ////////////////////////

    // Bepaal de kleur van de lijn
    const color = this.options.color  
    ctx.strokeStyle = color;
    
    // Bepaal de dikte van de lijn
    const thickness = this.options.lineThickness
    ctx.lineWidth = thickness

    // Begin een nieuw pad
    ctx.beginPath()
    
    // Bepaal het startpunt
    ctx.moveTo(startX, startY);

    // Bepaal het eindpunt (met curve)
    ctx.bezierCurveTo(bezierStartX, bezierStartY, bezierEndX, bezierEndY, endX, endY)

    // Teken de lijn
    ctx.stroke()
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
                startPointY: 480,
                startPointX: 0,
                bezierStartX: 480,
                bezierStartY: 360,
                bezierEndX: 480,
                bezierEndY: 640,
                endPointY: 480,
                endPointX: 960,
                lineThickness: 16,
                showHandles: true,
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
            deep: true,
            immediate: true
        },
        "options.startPointY": {
            handler(value,oldValue) {
                this.codeSnippet = this.codeSnippet.replace(`const startPointY = ${oldValue}`,`const startPointY = ${value}`)
            },
            immediate: true
        },
        "options.startPointX": {
            handler(value,oldValue) {
                this.codeSnippet = this.codeSnippet.replace(`const startPointX = ${oldValue}`,`const startPointX = ${value}`)
            },
            immediate: true
        },
        "options.bezierStartX": {
            handler(value,oldValue) {
                this.codeSnippet = this.codeSnippet.replace(`const bezierStartX = ${oldValue}`,`const bezierStartX = ${value}`)
            },
            immediate: true
        },
        "options.bezierStartY": {
            handler(value,oldValue) {
                this.codeSnippet = this.codeSnippet.replace(`const bezierStartY = ${oldValue}`,`const bezierStartY = ${value}`)
            },
            immediate: true
        },
        "options.endPointY": {
            handler(value,oldValue) {
                this.codeSnippet = this.codeSnippet.replace(`const endPointY = ${oldValue}`,`const endPointY = ${value}`)
            },
            immediate: true
        },
        "options.endPointX": {
            handler(value,oldValue) {
                this.codeSnippet = this.codeSnippet.replace(`const endPointX = ${oldValue}`,`const endPointX = ${value}`)
            },
            immediate: true
        },
        "options.bezierEndX": {
            handler(value,oldValue) {
                this.codeSnippet = this.codeSnippet.replace(`const bezierEndX = ${oldValue}`,`const bezierEndX = ${value}`)
            },
            immediate: true
        },
        "options.bezierEndY": {
            handler(value,oldValue) {
                this.codeSnippet = this.codeSnippet.replace(`const bezierEndY = ${oldValue}`,`const bezierEndY = ${value}`)
            },
            immediate: true
        },
        "options.lineThickness": {
            handler(value,oldValue) {
                this.codeSnippet = this.codeSnippet.replace(`const thickness = ${oldValue}`,`const thickness = ${value}`)
            },
            immediate: true
        },
        "options.showHandles": {
            handler(value,oldValue) {
                this.codeSnippet = this.codeSnippet.replace(`const showHandles = ${oldValue}`,`const showHandles = ${value}`)
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
        drawCurvedLine() {
            const ctx = this.canvas.ctx
            if (!ctx) {
                console.error("Can not find canvas context")
                return 
            }

            // Maak het canvas schoon
            ctx.clearRect(0,0,this.canvas.width, this.canvas.height)

            // Haal alle punten op
            const startX = this.options.startPointX
            const startY = this.options.startPointY

            const endX = this.options.endPointX
            const endY = this.options.endPointY

            const bezierStartX = this.options.bezierStartX
            const bezierStartY = this.options.bezierStartY

            const bezierEndX = this.options.bezierEndX
            const bezierEndY = this.options.bezierEndY


            // Dit maakt de bezier curves een beetje beter zichtbaar door ze te tekenen
            if (this.options.showHandles) {
                ctx.beginPath()
                ctx.lineWidth = 2
                ctx.strokeStyle = "#ccc";
                
                // Teken lijn + cirkel van bezierStart
                ctx.moveTo(startX, startY);
                ctx.lineTo(bezierStartX, bezierStartY);
                ctx.stroke()
                
                ctx.beginPath()
                ctx.fillStyle = "red"
                ctx.ellipse(bezierStartX, bezierStartY, 8,8, 0, 0, Math.PI*2)
                ctx.fill()
                
                // Teken lijn + cirkel van bezierEnd
                ctx.beginPath()
                ctx.moveTo(endX, endY);
                ctx.lineTo(bezierEndX, bezierEndY);
                ctx.stroke()
                
                ctx.beginPath()
                ctx.fillStyle = "yellow"
                ctx.ellipse(bezierEndX, bezierEndY, 8,8, 0, 0, Math.PI*2)
                ctx.fill()
            }



            // Bepaal de kleur van de lijn
            const color = this.options.color  
            ctx.strokeStyle = color;
            
            // Bepaal de dikte van de lijn
            const thickness = this.options.lineThickness
            ctx.lineWidth = thickness

            ctx.beginPath()

            ctx.moveTo(startX, startY);
            ctx.bezierCurveTo(bezierStartX, bezierStartY, bezierEndX, bezierEndY, endX, endY)

            ctx.stroke()
        },
        updateCanvas() {
            this.drawCurvedLine()
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

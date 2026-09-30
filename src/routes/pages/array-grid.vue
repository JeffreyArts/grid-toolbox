<template>

    <div class="canvas-view">
        <header class="title">
            <h1>Grid from array</h1>
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
                        <label for="color">
                            Grid
                        </label>


                        <div class="grid">
                            <input type="checkbox" :checked="options.grid[0][0]" v-on:input="options.grid[0][0] = !options.grid[0][0]">
                            <input type="checkbox" :checked="options.grid[0][1]" v-on:input="options.grid[0][1] = !options.grid[0][1]">
                            <input type="checkbox" :checked="options.grid[0][2]" v-on:input="options.grid[0][2] = !options.grid[0][2]">
                            <input type="checkbox" :checked="options.grid[0][3]" v-on:input="options.grid[0][3] = !options.grid[0][3]">
                            <input type="checkbox" :checked="options.grid[0][4]" v-on:input="options.grid[0][4] = !options.grid[0][4]">

                            <input type="checkbox" :checked="options.grid[1][0]" v-on:input="options.grid[1][0] = !options.grid[1][0]">
                            <input type="checkbox" :checked="options.grid[1][1]" v-on:input="options.grid[1][1] = !options.grid[1][1]">
                            <input type="checkbox" :checked="options.grid[1][2]" v-on:input="options.grid[1][2] = !options.grid[1][2]">
                            <input type="checkbox" :checked="options.grid[1][3]" v-on:input="options.grid[1][3] = !options.grid[1][3]">
                            <input type="checkbox" :checked="options.grid[1][4]" v-on:input="options.grid[1][4] = !options.grid[1][4]">

                            <input type="checkbox" :checked="options.grid[2][0]" v-on:input="options.grid[2][0] = !options.grid[2][0]">
                            <input type="checkbox" :checked="options.grid[2][1]" v-on:input="options.grid[2][1] = !options.grid[2][1]">
                            <input type="checkbox" :checked="options.grid[2][2]" v-on:input="options.grid[2][2] = !options.grid[2][2]">
                            <input type="checkbox" :checked="options.grid[2][3]" v-on:input="options.grid[2][3] = !options.grid[2][3]">
                            <input type="checkbox" :checked="options.grid[2][4]" v-on:input="options.grid[2][4] = !options.grid[2][4]">

                            <input type="checkbox" :checked="options.grid[3][0]" v-on:input="options.grid[3][0] = !options.grid[3][0]">
                            <input type="checkbox" :checked="options.grid[3][1]" v-on:input="options.grid[3][1] = !options.grid[3][1]">
                            <input type="checkbox" :checked="options.grid[3][2]" v-on:input="options.grid[3][2] = !options.grid[3][2]">
                            <input type="checkbox" :checked="options.grid[3][3]" v-on:input="options.grid[3][3] = !options.grid[3][3]">
                            <input type="checkbox" :checked="options.grid[3][4]" v-on:input="options.grid[3][4] = !options.grid[3][4]">

                            <input type="checkbox" :checked="options.grid[4][0]" v-on:input="options.grid[4][0] = !options.grid[4][0]">
                            <input type="checkbox" :checked="options.grid[4][1]" v-on:input="options.grid[4][1] = !options.grid[4][1]">
                            <input type="checkbox" :checked="options.grid[4][2]" v-on:input="options.grid[4][2] = !options.grid[4][2]">
                            <input type="checkbox" :checked="options.grid[4][3]" v-on:input="options.grid[4][3] = !options.grid[4][3]">
                            <input type="checkbox" :checked="options.grid[4][4]" v-on:input="options.grid[4][4] = !options.grid[4][4]">
                        </div>

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

const grid = [
    [0,1,0,0,0],
    [0,1,0,0,0],
    [0,1,0,0,0],
    [0,1,0,0,0],
    [0,1,0,0,0]
]

// Bepaal de afmetingen van een grid cel,
// De 5 hier is het aantal kolommen/rijen van de array
const cellWidth = this.canvas.width/5
const cellHeight = this.canvas.height/5
// Volgende zou slimmer zijn:
// const cellWidth = this.canvas.width / grid[0].length
// const cellHeight = this.canvas.height / grid.length


// We loopen door de waarden van de array grid heen
// Let op! We beginnen met de kolommen, daarin de rijen
grid.forEach((column, y) => {
    column.forEach((value, x) => {
        // De indexes van de array kunnen we vermenigvuldigen met de 
        // breedte/hoogte van de cellen om de juiste positie te berekenen. 
        // De cellWidth/2 & cellHeight/2 verplaatst alleen het startpunt
        const finalX = x * cellWidth + cellWidth/2
        const finalY = y * cellHeight + cellHeight/2
        
        // De standaard waarde is 10 (klein)
        let width = 10
        let height = 10

        // Als de waarde 1 is, dan maken we de cirkel groot
        if (value === 1) {
            width = cellWidth
            height = cellHeight
        }
        
        // Teken de vorm
        ctx.beginPath()
        this.drawShape(finalX, finalY, width, height)
        ctx.fill()
    })     
})       
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
                cellWidth: 40,
                cellHeight: 80,
                shape: "circle",
                shapeDiameter: 40,
                xOffset: false,
                yOffset: false,
                grid: [
                    [0,1,0,0,0],
                    [0,1,0,0,0],
                    [0,1,0,0,0],
                    [0,1,0,0,0],
                    [0,1,0,0,0]
                ],
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
        "options.grid": {
            handler(value) {
                const gridSnippet = `const grid = [\n${value
                    .map(row => `    [${row.map(Number).join(",")}]`)
                    .join(",\n")}\n]`
                this.codeSnippet = this.codeSnippet.replace(
                    /const grid = \[[\s\S]*?\n\]/,
                    gridSnippet
                )
            },
            deep: true
        },
        "options.cellWidth": {
            handler(value, oldValue) {
                this.codeSnippet = this.codeSnippet.replace(`const cellWidth = ${oldValue}`,`const cellWidth = ${value}`)
            },
        },
        "options.cellHeight": {
            handler(value, oldValue) {
                this.codeSnippet = this.codeSnippet.replace(`const cellHeight = ${oldValue}`,`const cellHeight = ${value}`)
            },
        },
        "options.shapeDiameter": {
            handler(value, oldValue) {
                this.codeSnippet = this.codeSnippet.replace(`const shapeDiameter = ${oldValue}`,`const shapeDiameter = ${value}`)
            },
        },
        "options.xOffset": {
            handler(value, oldValue) {
                this.codeSnippet = this.codeSnippet.replace(`const hasXOffset = ${oldValue}`,`const hasXOffset = ${value}`)
            },
        },
        "options.yOffset": {
            handler(value, oldValue) {
                this.codeSnippet = this.codeSnippet.replace(`const hasYOffset = ${oldValue}`,`const hasYOffset = ${value}`)
            },
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

            
            const grid = this.options.grid
            
            // Bepaal de afmetingen van een grid cel,
            // De 5 hier is het aantal kolommen/rijen van de array
            const cellWidth = this.canvas.width/5
            const cellHeight = this.canvas.height/5
            // Volgende zou slimmer zijn:
            // const cellWidth = this.canvas.width / grid[0].length
            // const cellHeight = this.canvas.height / grid.length


            // We loopen door de waarden van de array grid heen
            // Let op! We beginnen met de kolommen, daarin de rijen
            grid.forEach((column, y) => {
                column.forEach((value, x) => {
                    // De indexes van de array kunnen we vermenigvuldigen met de 
                    // breedte/hoogte van de cellen om de juiste positie te berekenen. 
                    // De cellWidth/2 & cellHeight/2 verplaatst alleen het startpunt
                    const finalX = x * cellWidth + cellWidth/2
                    const finalY = y * cellHeight + cellHeight/2
                    
                    // De standaard waarde is 10 (klein)
                    let width = 10
                    let height = 10

                    // Als de waarde 1 is, dan maken we de cirkel groot
                    if (value) {
                        width = cellWidth
                        height = cellHeight
                    }
                    
                    // Teken de vorm
                    ctx.beginPath()
                    this.drawShape(finalX, finalY, width, height)
                    ctx.fill()
                })     
            })       
            
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
            } else if (this.options.shape == "plus") {
                // Horizontale lijn
                ctx.rect(x - width/2, y - height / 20, width, height / 10)
                // Verticale lijn
                ctx.rect(x - width/20, y - height/2, width / 10, height)
            } else if (this.options.shape == "triangle") {
                // Bepaal startpunt van de driehoek
                ctx.moveTo(x - width/2, y + height/2)
                ctx.lineTo(x,y - height/2)
                ctx.lineTo(x + width/2,y + height/2)
            } else if (this.options.shape == "hexagon") {

                const points = 6
                const chunk = (Math.PI * 2) / points
                const radiusX = width/2
                const radiusY = height/2
            
                for (let i = 0; i < points; i++) {
                    const rotation = chunk * i - 90 * (Math.PI/180)

                    const xPos = x + radiusX * Math.cos(rotation)
                    const yPos = y + radiusY * Math.sin(rotation)
                    
                    if (i === 0) {
                        ctx.moveTo(xPos, yPos);
                    } else {
                        ctx.lineTo(xPos, yPos);
                    }
                }
            }
        },
        updateCanvas() {
            // Als cell height of width 0 is, dan updaten we het grid niet. 
            // Dan komt de tekenlus namelijk in een infinite loop.
            if (!this.options.cellHeight || !this.options.cellWidth) {
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
.options .grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 8px;

    input[type="checkbox"] {
        display: inline-block;
    }
}
</style>

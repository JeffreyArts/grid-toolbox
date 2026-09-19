<template>

    <div class="canvas-view">
        <header class="title">
            <h1>Cell Image</h1>
            <hr>
        </header>

        <section class="viewport">
            <div class="viewport-content" ratio="1x1">
                <canvas ref="canvas"></canvas>
                <div class="cell-image-container">
                    <img src="/ganzen.png" id="cell-image" ref="cell-image">
                    <span>cell image</span>
                </div>
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
                        <input type="range" id="cellWidth" min="1" max="480" step="1" v-model.number="options.cellWidth">
                        <!-- optional number display-->
                        <input type="number"  min="8" max="640" v-model.number="options.cellWidth">
                    </div>

                    <div class="option">
                        <label for="cellHeight">
                            Cell height
                        </label>
                        <input type="range" id="cellHeight" min="1" max="480" step="1" v-model.number="options.cellHeight">
                        <!-- optional number display-->
                        <input type="number"  min="8" max="640" v-model.number="options.cellHeight">
                    </div>
                    <div class="option">
                        <label for="imageWidth">
                            Image width
                        </label>
                        <input type="range" id="imageWidth" min="1" max="360" step="1" v-model.number="options.imageWidth">
                        <!-- optional number display-->
                        <input type="number"  min="8" max="640" v-model.number="options.imageWidth">
                    </div>
                    <div class="option">
                        <label for="imageHeight">
                            Image height
                        </label>
                        <input type="range" id="imageHeight" min="1" max="360" step="1" v-model.number="options.imageHeight">
                        <!-- optional number display-->
                        <input type="number"  min="8" max="640" v-model.number="options.imageHeight">
                    </div>
                    <div class="option">
                        <label for="imageSource">
                            Image source
                        </label>
                        <input type="file" v-on:change="changeImageSource">
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
                    
<!-- 
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
                    </div> -->

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

const imageWidth = 122
const imageHeight = 112
const cellWidth = 100
const cellHeight = 78
const hasXOffset = false
const hasYOffset = false
const image = document.querySelector("#cell-image")

// Eerst wachten tot de afbeelding geladen 
image.onload = () => {
    drawGrid()
}

// Helper functie voor het tekenen van de afbeelding
const drawShape = (x, y, width, height) {
    // Teken afbeelding geschaald
    // drawImage(image, bron_X, bron_Y, bron_breedte, bron_height, x, y, breedte, hoogte)
    context.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight, x - width/2, y - height/2, width, height);
}


// Helper functie voor het tekenen van het grid
const drawGrid = () => {
    for (let x = 0; x < this.canvas.width + cellWidth; x+= cellWidth) {
        const isEvenX = x/cellWidth % 2

        // Voor de y-as wordt dit cellHeight
        for (let y = 0; y < this.canvas.height + cellHeight; y+= cellHeight) {
            this.drawImage(x, y, imageWidth, imageHeight)
        }
    }          
}          





/*****
 * Voor ondersteuning van het veranderen van de afbeelding via een file-upload
 * pas je gewoon de image source aan, en voer je opnieuw de drawGrid() method uit.
 * De volgende functie is gekoppeld aan het onchange event van je input veld
 * <input type="file" onchange="imageUpload(event)" />
*****/
const imageUpload = (event) => {
    // Gebruik de files array om het ge-uploade bestand op te halen
    const file = event.target.files[0]
    
    // Als er een bestand is ge-upload, pas de image source aan
    if (file) {
        image.src = URL.createObjectURL(file)
        // URL.createObjectURL is een helper functie van de browser.
        // Meer info: https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL_static
    }
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
                height: 960, // in pixels
                cellImage: null
            },
            options: {
                cellWidth: 100,
                cellHeight: 78,
                shape: "circle",
                imageWidth: 122,
                imageHeight: 112,
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
        "options.imageWidth": {
            handler(value, oldValue) {
                this.codeSnippet = this.codeSnippet.replace(`const imageWidth = ${oldValue}`,`const imageWidth = ${value}`)
            },
        },
        "options.imageHeight": {
            handler(value, oldValue) {
                this.codeSnippet = this.codeSnippet.replace(`const imageHeight = ${oldValue}`,`const imageHeight = ${value}`)
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


        this.canvas.cellImage = this.$refs["cell-image"]

        this.canvas.cellImage.onload = () => {
            this.updateCanvas()
        }
        
        // this.drawBackgroundColor()
    },
    methods: {
        changeImageSource(e) {
            
            const file = e.target.files[0]
            const img = this.$refs["cell-image"]
            if (file) {
                img.src = URL.createObjectURL(file)
            }

            this.canvas.cellImage.onload = () => {
                this.updateCanvas()
            }
            
        },
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
            const image = this.canvas.cellImage

            if (!image) {
                throw new Error()
            }
            
            for (let x = 0; x < this.canvas.width + cellWidth; x+= cellWidth) {
                const isEvenX = x/cellWidth % 2
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

                    this.drawImage(finalX, finalY, this.options.imageWidth, this.options.imageHeight)
                }
            }            
        },
        drawImage (x, y, width, height) {
            // Teken afbeelding geschaald
            // drawImage(image, bron_X, bron_Y, bron_breedte, bron_height, x, y, breedte, hoogte)

            const cellImage = this.canvas.cellImage

            this.canvas.ctx.drawImage(cellImage, 0, 0, cellImage.naturalWidth, cellImage.naturalHeight, x - width/2, y - height/2, width, height);
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
.cell-image-container {
    position: absolute;
    bottom: 0;
    right: 0;
    display: flex;
    flex-flow: column;
    text-align: center;
    gap: 8px;
    padding: 16px;
    z-index: 1;

    img {
        width: 120px;
    }
}
</style>

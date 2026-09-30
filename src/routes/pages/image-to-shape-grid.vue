<template>

    <div class="canvas-view" id="image-to-shape-grid">
        <header class="title">
            <h1>Image to shape grid (Advanced)</h1>
            <hr>
        </header>

        <section class="viewport">
            <div class="viewport-content" ratio="1x1">
                <canvas ref="canvas"></canvas>
                <div class="canvas-image-container">
                    <img src="/ganzen.png" id="canvas-image" ref="canvas-image">
                    <span>uploaded image</span>
                </div>
            </div>

            <highlightjs language="js" :code="codeSnippet" />
            <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder">Meer informatie over de modulus operator</a>
        </section>

        <aside class="sidebar">
            <div class="options">
                <div class="option-group" name="Selectables">

                    <div class="option">
                        <label for="imageSource">
                            Image source
                        </label>
                        <input type="file" v-on:change="changeImageSource">
                    </div>

                    <div class="option">
                        <label for="cellWidth">
                            Cell width
                        </label>
                        <input type="range" id="cellWidth" min="1" max="64" step="1" v-model.number="options.cellWidth">
                        <!-- optional number display-->
                        <input type="number"  min="1" max="64" v-model.number="options.cellWidth">
                    </div>

                    <div class="option">
                        <label for="cellHeight">
                            Cell height
                        </label>
                        <input type="range" id="cellHeight" min="1" max="64" step="1" v-model.number="options.cellHeight">
                        <!-- optional number display-->
                        <input type="number"  min="1" max="64" v-model.number="options.cellHeight">
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
                            <option value="hexagon"> Hexagon </option>
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
const ctx = canvas.el.getContext("2d");


/*******
 * Deze demo is een combinatie van de volgende demo's:
 *  - Loading image
 *  - Retrieve pixel data
 *  - Cell size + shape size
 *  - Greyscale
 * Verder is deze demo vooral bedoel als inspiratievoorbeeld om te laten zien
 * wat je kunt wanneer je de verschillende technieken combineert
 * Code hieronder wijkt af van het resultaat op deze pagina 
 * en is een versimpelde variant om te begrijpen wat er gebeurd
 *******/


const getPixelData(x, y, ctx) {

    // Deze functie haalt de pixel data op van het canvas op de x & y coördinaten
    const pixel = ctx.getImageData(Math.floor(x), Math.floor(y), 1, 1).data
    if (!pixel) {
        throw new Error("Can not get pixel data")
    }

    // Doordat de afbeelding grijs is, zijn de rgb waarden allemaal hetzelfde
    const r = pixel[0]

    // We willen echter niet de pixel waarde (0 - 254),
    // Maar een percentage, zodat het het percentage kunnen gebruiken
    // voor de afmeting van de vorm
    return 1-(r/255)

    // De 1- ervoor draait de waarde om 
    // 0.9 wordt 0.1
    // 0.75 wordt 0.25
    // enzovoorts
    // 
    // Een laag percentage zorgt ervoor dat de diameter van de vorm kleiner wordt
    // Zo zorgen we ervoor dat donkere kleuren in grote vormen worden getekend
    // en lichtere kleuren in kleinere vormen
},

// Laad afbeelding uit DOM
const image = document.getElementById("sourceImage")

// Converteer afbeelding naar greyscale 
// (let op! hier wordt de context gebruikt ipv het canvas element)
const greyScaleCTX = generateGreyScale(image)

for (let x = 0; x < canvas.width + cellWidth; x+= cellWidth) {
    const isEvenX = x/cellWidth % 2
    for (let y = 0; y < canvas.height + cellHeight; y+= cellHeight) {
        ctx.beginPath()

        // Converteer greyscale waarde naar percentage
        const size = getPixelData(x, y, greyScaleCanvas)

        // Gebruik het percentage om de afmetingen van de vorm te bepalen
        drawShape(finalX, finalY, options.cellWidth * size, options.cellHeight * size)

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
                cellWidth: 16,
                cellHeight: 16,
                shape: "circle",
                shapeDiameter: 40,
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
        
        setTimeout(this.updateCanvas, 100)
    },
    methods: {
        changeImageSource(e) {
            
            const file = e.target.files[0]
            const img = this.$refs["canvas-image"]
            if (file) {
                img.src = URL.createObjectURL(file)
            }

            img.onload = () => {
                this.canvas.width = img.naturalWidth
                this.canvas.height = img.naturalHeight
                this.setCanvasDimensions()
                this.updateCanvas()
            }
            
        },
        getPixelData(x, y, ctx) {

            // Deze functie haalt de pixel data op van het canvas op de x & y coördinaten
            const pixel = ctx.getImageData(Math.floor(x), Math.floor(y), 1, 1).data
            if (!pixel) {
                throw new Error("Can not get pixel data")
            }

            // Doordat de afbeelding grijs is, zijn de rgb waarden allemaal hetzelfde
            const r = pixel[0]

            // We willen echter niet de pixel waarde (0 - 254),
            // Maar een percentage, zodat het het percentage kunnen gebruiken
            // voor de afmeting van de vorm
            return 1-(r/255)
        },  
        generateGreyScale(img) {
            const greyScaleCanvas = document.createElement("canvas")
            const greyCtx = greyScaleCanvas.getContext("2d")

            greyScaleCanvas.height = img.naturalHeight
            greyScaleCanvas.width = img.naturalWidth

            greyCtx.drawImage(img, 0, 0, greyCtx.canvas.width, greyCtx.canvas.height);
            let imgData = greyCtx.getImageData(0, 0, greyCtx.canvas.width, greyCtx.canvas.height);
            let pixels = imgData.data;
            for (var i = 0; i < pixels.length; i += 4) {

                let lightness = parseInt((pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3);

                pixels[i] = lightness;
                pixels[i + 1] = lightness;
                pixels[i + 2] = lightness;
            }

            greyCtx.putImageData(imgData, 0, 0);   

            return greyCtx
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
            const image = this.$refs["canvas-image"]
            if (!image || !image.naturalWidth) {
                console.error("Can not find image")
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

            const greyScaleCanvas = this.generateGreyScale(image)
            
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

                    const size = this.getPixelData(finalX, finalY, greyScaleCanvas)

                    this.drawShape(finalX, finalY, this.options.cellWidth * size, this.options.cellHeight * size)

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
#image-to-shape-grid {
    .viewport-content {
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>

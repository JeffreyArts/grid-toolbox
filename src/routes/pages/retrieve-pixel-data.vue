<template>

    <div class="canvas-view" id="canvas-image-page">
        <header class="title">
            <h1>Read pixel data</h1>
            <hr>
        </header>

        <section class="viewport">
            <div class="viewport-content" ratio="1x1">
                <canvas ref="canvas" @mousemove="drawPixelData($event)"></canvas>
                <div class="canvas-image-container">
                    <img src="/ganzen.png" id="canvas-image" ref="canvas-image">
                    <span>uploaded image</span>
                </div>
            </div>
            <br>
            <highlightjs language="js" :code="codeSnippet" />
            <a href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData">getImageData functie</a>
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
                        <label for="inputText">
                           Beweeg met je muis over de afbeelding op de pixeldata op te halen.
                        </label>

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

const getPixelData = (event) => {
    // De afmetingen van het canvas (DOM)element kunnen anders
    // zijn dan de daadwerkelijke afmetingen van het canvas 
    // Daarom moeten we de originele muispositie vertalen naar x & y coördinaten van het canvas
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    const x = (event.clientX - rect.left) * scaleX
    const y = (event.clientY - rect.top) * scaleY

    // Deze functie haalt de pixel data op van het canvas op de x & y coördinaten
    const pixel = ctx.getImageData(Math.floor(x), Math.floor(y), 1, 1).data
    if (!pixel) {
        throw new Error("Can not get pixel data")
    }
    // pixel is een array van 4 elementen: [red, green, blue, alpha].
    const r = pixel[0]
    const g = pixel[1]
    const b = pixel[2]
    // (alpha is 0-255, waarbij 0 volledig transparant is en 255 volledig ondoorzichtig)
    const a = pixel[3]

    // console .log('Pixel data:', pixel)
    // console.log('Pixel data:', { x: Math.floor(x), y: Math.floor(y), rgba: [r, g, b, a] })

    return {
        x: Math.floor(x),
        y: Math.floor(y),
        red: r,
        green: g,
        blue: b,
        alpha: a,
    }
}

const drawPixelData = (event) => {
    const pixelData = getPixelData(event)

    // Teken een rechtoek rechtsonder in het canvas met de kleur van de pixel data
    ctx.fillStyle = \`rgba(\${pixelData.red}, \${pixelData.green}, \${pixelData.blue}, \${pixelData.alpha / 255})\`
    const width = canvas.width/2
    const height = 128
    const x = canvas.width - width
    const y = canvas.height - height
    ctx.beginPath()
    ctx.rect(x, y, width, height)
    ctx.fill()
    
    // Schrijf op de rechthoek de pixeldata in het zwart
    ctx.fillStyle = "#333"
    // Bereken de font size op basis van de breedte van het canvas zodat de tekst leesbaar blijft
    const fontSize = Math.max(16, Math.floor(canvas.width / 32))
    ctx.font = \`\${fontSize}px Arial\`
    // Regel 1
    ctx.fillText(\`x: \${pixelData.x}, y: \${pixelData.y}\`, canvas.width/2 + 40, canvas.height - 20)
    // Regel 2
    ctx.fillText(\`r: \${pixelData.red}, g: \${pixelData.green}, b: \${pixelData.blue}, a: \${pixelData.alpha}\`, canvas.width/2 + 40, canvas.height - 80)
}



// Voeg een event listener toe aan het canvas element zodat de drawPixelData 
// functie wordt uitgevoerd wanneer de muis beweegt over het canvas
canvas.addEventListener("mousemove", drawPixelData)        
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
            }
        }
    },
    watch: {
    },
    mounted() {
        this.canvas.el = this.$refs["canvas"]
        this.setCanvasDimensions()
        this.canvas.ctx = this.canvas.el.getContext("2d");
    },
    methods: {
        drawPixelData(event) {
            const pixelData = this.getPixelData(event)

            const ctx = this.canvas.ctx
            
            
            // draw rectangle with the pixel color
            ctx.fillStyle = `rgba(${pixelData.red}, ${pixelData.green}, ${pixelData.blue}, ${pixelData.alpha / 255})`
            const width = this.canvas.width/2
            const height = 128
            const x = this.canvas.width - width
            const y = this.canvas.height - height
            ctx.beginPath()
            ctx.rect(x, y, width, height)
            ctx.fill()
            
            ctx.fillStyle = "#333"
            // write the pixel data as text on the canvas
            const fontSize = Math.max(16, Math.floor(this.canvas.width / 32))
            ctx.font = `${fontSize}px Arial`
            ctx.fillText(`x: ${pixelData.x}, y: ${pixelData.y}`, this.canvas.width/2 + 40, this.canvas.height - 20)
            ctx.fillText(`r: ${pixelData.red}, g: ${pixelData.green}, b: ${pixelData.blue}, a: ${pixelData.alpha}`, this.canvas.width/2 + 40, this.canvas.height - 80)
        },
        getPixelData(event) {
            const canvas = this.canvas.el
            if (!canvas) {
                throw new Error("Can not find canvas")
            }
            
            const ctx = this.canvas.ctx

            // De afmetingen van het canvas (DOM)element kunnen anders
            // zijn dan de daadwerkelijke afmetingen van het canvas 
            // Daarom moeten we de originele muispositie vertalen naar x & y coördinaten van het canvas
            const rect = canvas.getBoundingClientRect()
            const scaleX = canvas.width / rect.width
            const scaleY = canvas.height / rect.height
            const x = (event.clientX - rect.left) * scaleX
            const y = (event.clientY - rect.top) * scaleY

            // Deze functie haalt de pixel data op van het canvas op de x & y coördinaten
            const pixel = ctx.getImageData(Math.floor(x), Math.floor(y), 1, 1).data
            if (!pixel) {
                throw new Error("Can not get pixel data")
            }
            // pixel is een array van 4 elementen: [red, green, blue, alpha].
            const r = pixel[0]
            const g = pixel[1]
            const b = pixel[2]
            // (alpha is 0-255, waarbij 0 volledig transparant is en 255 volledig ondoorzichtig)
            const a = pixel[3]

            console .log('Pixel data:', pixel)

            // console.log('Pixel data:', { x: Math.floor(x), y: Math.floor(y), rgba: [r, g, b, a] })
            return {
                x: Math.floor(x),
                y: Math.floor(y),
                red: r,
                green: g,
                blue: b,
                alpha: a,
            }
        },
        setCanvasDimensions() {
            const canvas = this.canvas.el
            if (!canvas) {
                throw new Error("Can not find canvas")
            }

            canvas.width = this.canvas.width
            canvas.height = this.canvas.height

            this.$refs["canvas-image"].onload = () => {
                this.updateCanvas()
            }

        },
        drawImage() {
            const canvasImage = this.$refs["canvas-image"]
            console.log("drawImage")
            // drawImage(image, bron_X, bron_Y, bron_breedte, bron_height, x, y, breedte, hoogte)
            this.canvas.ctx.drawImage(canvasImage, 0, 0, canvasImage.naturalWidth, canvasImage.naturalHeight, 0, 0, this.canvas.width, this.canvas.height);
            

        },
        updateCanvas() {
            this.drawImage()
        },
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
.canvas-image-container {
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

#canvas-image-page {
    .viewport-content {
        background-color: #ccc;
        background-image: linear-gradient(45deg, #eee 25%, transparent 25%), linear-gradient(-45deg, #eee 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #eee 75%), linear-gradient(-45deg, transparent 75%, #eee 75%);
        background-size: 24px 24px;
        background-position: 0 0, 0 12px, 12px -12px, -12px 0;
        display:flex;
        justify-content: center;
        align-items: center;
        canvas {
            width: auto;
            max-width: 100%;
        }
    }

}
</style>
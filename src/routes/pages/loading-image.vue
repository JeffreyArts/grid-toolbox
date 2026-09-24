<template>

    <div class="canvas-view" id="canvas-image-page">
        <header class="title">
            <h1>Canvas image</h1>
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
            <br>
            <small>HTML</small>
            <highlightjs language="html" :code="htmlSnippet" />
            <small>JavaScript</small>
            <highlightjs language="js" :code="codeSnippet" />
            <a href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage">Draw image functie</a>
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

                </div>


            </div>
        </aside>
    </div>
</template>


<script>

const htmlSnippet = `
<canvas id="canvas" />
<img src="/ganzen.png" id="canvas-image" onload="updateCanvas(event)">
<input type="file" onchange="changeImage(event)" />
`
const codeSnippet = 
`
// Haal canvas element op en haal de context hiervan op
const canvas = getElementById("canvas")
const ctx = this.canvas.el.getContext("2d");

// Helper functie die automatisch wordt uitgevoerd wanneer je een bestand upload
const changeImage = (event) => {
    const file = event.target.files[0]
    const img = event
    
    if (file) {
       img.src = URL.createObjectURL(file)
    }
}
        
// Helper functie die automatisch wordt uitgevoerd wanneer een afbeelding geladen is
const updateCanvas = (event) => {
    // Pak het image element
    const img = event.target

    // En gebruik dat om de afmetingen van het canvas element te updaten
    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight
    
    // Teken vervolgens de afbeelding op het canvas
    
    // Laad de canvas context in:
    const ctx = canvas.getContext("2d");

    // Teken de afbeelding op het canvas met drawImage
    // drawImage(image, bron_X, bron_Y, bron_breedte, bron_height, x, y, breedte, hoogte)
    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, canvas.width, canvas.height);
}
        
`


export default {
    props: [],
    data() {
        return {
            htmlSnippet,
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
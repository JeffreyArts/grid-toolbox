<template>

    <div class="canvas-view">
        <header class="title">
            <h1>Different images per cell</h1>
            <hr>
        </header>

        <section class="viewport">
            <div class="viewport-content" ratio="1x1">
                <canvas ref="canvas"></canvas>
            </div>

            <highlightjs language="js" :code="codeSnippet" />
            <a href="https://www.w3schools.com/JS/js_async_promises.asp">JavaScript promises</a>
        </section>

        <aside class="sidebar">
            <div class="options">
                <div class="option-group" name="Selectables">

                    <div class="option">
                        <label for="cellsHorizontal">
                            Cells Horizontal
                        </label>
                        <input type="range" id="cellsHorizontal" min="2" max="16" step="1" v-model.number="options.cellsHorizontal">
                        <!-- optional number display-->
                        <input type="number"  min="2" max="640" v-model.number="options.cellsHorizontal">
                    </div>

                    <div class="option">
                        <label for="cellsVertical">
                            Cells Vertical
                        </label>
                        <input type="range" id="cellsVertical" min="2" max="16" step="1" v-model.number="options.cellsVertical">
                        <!-- optional number display-->
                        <input type="number"  min="2" max="640" v-model.number="options.cellsVertical">
                    </div>

                
                    <div class="option">
                        <label for="cellsVertical">
                            Shuffle images
                        </label>
                        <input type="radio" id="radio-v0" :value="true" v-model="options.shuffleImages">
                        <label for="radio-v0">
                            Yes
                        </label>

                        <input type="radio" id="radio-v1" :value="false" v-model="options.shuffleImages">
                        <label for="radio-v1">
                            No
                        </label>
                    </div>

                    
                    <div class="option" v-if="options.shuffleImages">
                        <button @click="drawGrid" class="button">Reshuffle</button>
                    </div>

                </div>


            </div>
        </aside>
    </div>
</template>


<script>
import _ from "lodash"

const codeSnippet = 
`
/******
 * In dit voorbeeld gebruiken we een array van afbeeldingen, 
 * en tekenen we elke afbeelding in een cel van het grid.
******/

// Variabelen

const canvas = getElementById("canvas")
const ctx = canvas.el.getContext("2d");

const cellsHorizontal = 4
const cellsVertical = 4

const imageCache = {}
// imageCache is een object (associatieve array) waar we de geladen afbeeldingen opslaan,
// zodat we ze niet opnieuw hoeven te laden wanneer ze al een keer geladen zijn.
const images = [
    {"src": "chips/chips-1.jpg"},
    {"src": "chips/chips-2.jpg"},
    {"src": "chips/chips-3.jpg"},
    {"src": "chips/chips-4.jpg"},
    // ...
]
// images is een array met objecten {src: "string"}. 
// Had ook een array van strings kunnen zijn, maar we hebben objecten
// nodig voor het volgende voorbeeld (sorteren). 

// Deze functie returnt een Promise met de afbeelding
// Als de afbeelding al in de cache zit, returnt hij die direct.
// Anders maakt het een nieuwe afbeelding aan met Image(), 
// en zodra die geladen is, wordt de afbeelding in de cache opgeslagen en ge-returnt.
const async loadImage = (src) => {

    // Check eerst of de afbeelding al in de cache zit. 
    if (imageCache[src]) {
        // return Promise met de afbeelding uit de cache
        return Promise.resolve(imageCache[src])
    }

    return new Promise((resolve, reject) => {
        const img = new Image()

        // Deze functie wordt aangeroepen zodra de afbeelding geladen is.
        img.onload = () => {

            // Sla de afbeelding op in de cache
            imageCache[src] = img
            
            // return Promise met de afbeelding 
            resolve(img)
        }

        // Deze functie wordt aangeroepen als er een fout optreedt bij het laden van de afbeelding.
        img.onerror = () => reject(new Error(\`Kan afbeelding niet laden: \${src}\`))

        // Update de src van de afbeelding, zodat de afbeelding wordt geladen.
        img.src = src
    })
}


// Teken functie
const async drawImage(x, y, width, height, src) {
    try {
        // We laden eerst de afbeelding met loadImage()
        // Zo weten we zeker dat de afbeelding geladen is voordat we hem tekenen.
        const cellImage = await loadImage(src)

        // Daarna tekenen we de afbeelding met drawImage()
        ctx.drawImage( cellImage, 0, 0, cellImage.naturalWidth, cellImage.naturalHeight, x - width / 2, y - height / 2, width, height )
    } catch (error) {
        console.error(error)
    }
}


////////////////////////
// Tekenen van het grid
////////////////////////

// We maken een kopie van de images array voor het husselen van de afbeeldingen
let cellImages = [...images]
const totalCells = cellsHorizontal * cellsVertical // 16

// Als er minder afbeeldingen in cellImages zit dan dat we nodig hebben
// Dan voegen we de gewoon nog een keer de afbeeldingen aan de array toe
while (cellImages.length < totalCells) {
    cellImages.push(...images)
}

// Als de afbeeldingen gehusselt moeten worden, dan doen we dat
// met een functie van de lodash library 
// (die moet apart worden geïmporteerd, en valt buiten de scope van deze demonstratie)
// https://lodash.com/docs/4.17.15#shuffle
if (shuffleImages) {
    cellImages = _.shuffle(cellImages)
}

// En hier komt het grid. 
// We gebruiken de index variabel om steeds een andere afbeelding 
// te selecteren uit de cellImages array.
let index = 0

const cellWidth = canvas.width / cellsHorizontal
const cellHeight = canvas.height / cellsVertical

for (let x = 0; x < canvas.width; x += cellWidth) {
    for (let y = 0; y < canvas.height; y += cellHeight) {
        const src = cellImages[index].src
        if (src) {
            drawImage(x + cellWidth / 2, y + cellHeight / 2, cellWidth, cellHeight, src)
        }
        // Niet vergeten de index te verhogen!
        index++
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
            imageCache: {},
            images: [
                {"src": "chips/chips-1.jpg"},
                {"src": "chips/chips-2.jpg"},
                {"src": "chips/chips-3.jpg"},
                {"src": "chips/chips-4.jpg"},
                {"src": "chips/chips-5.jpg"},
                {"src": "chips/chips-6.jpg"},
                {"src": "chips/chips-7.jpg"},
                {"src": "chips/chips-8.jpg"},
                {"src": "chips/chips-9.jpg"},
                {"src": "chips/chips-10.jpg"},
                {"src": "chips/chips-11.jpg"},
                {"src": "chips/chips-12.jpg"},
                {"src": "chips/chips-13.jpg"},
                {"src": "chips/chips-14.jpg"},
                {"src": "chips/chips-15.jpg"},
                {"src": "chips/chips-16.jpg"},
                {"src": "chips/chips-17.jpg"},
                {"src": "chips/chips-18.jpg"},
                {"src": "chips/chips-19.jpg"},
                {"src": "chips/chips-20.jpg"},
                {"src": "chips/chips-21.jpg"},
                {"src": "chips/chips-22.jpg"},
                {"src": "chips/chips-23.jpg"},
                {"src": "chips/chips-24.jpg"},
                {"src": "chips/chips-25.jpg"},
                {"src": "chips/chips-26.jpg"},
                {"src": "chips/chips-27.jpg"},
                {"src": "chips/chips-28.jpg"},
                {"src": "chips/chips-29.jpg"},
                {"src": "chips/chips-30.jpg"},
                {"src": "chips/chips-31.jpg"},
                {"src": "chips/chips-32.jpg"},
                {"src": "chips/chips-33.jpg"},
                {"src": "chips/chips-34.jpg"},
                {"src": "chips/chips-35.jpg"},
                {"src": "chips/chips-36.jpg"},
                {"src": "chips/chips-37.jpg"},
                {"src": "chips/chips-38.jpg"},
                {"src": "chips/chips-39.jpg"},
                {"src": "chips/chips-40.jpg"},
                {"src": "chips/chips-41.jpg"},
                {"src": "chips/chips-42.jpg"},
                {"src": "chips/chips-43.jpg"},
                {"src": "chips/chips-44.jpg"},
                {"src": "chips/chips-45.jpg"},
                {"src": "chips/chips-46.jpg"},
                {"src": "chips/chips-47.jpg"},
                {"src": "chips/chips-48.jpg"},
                {"src": "chips/chips-49.jpg"},
                {"src": "chips/chips-50.jpg"},
                {"src": "chips/chips-51.jpg"},
                {"src": "chips/chips-52.jpg"},
                {"src": "chips/chips-53.jpg"},
                {"src": "chips/chips-54.jpg"},
                {"src": "chips/chips-55.jpg"},
                {"src": "chips/chips-56.jpg"},
                {"src": "chips/chips-57.jpg"},
                {"src": "chips/chips-58.jpg"},
                {"src": "chips/chips-59.jpg"},
                {"src": "chips/chips-60.jpg"},
                {"src": "chips/chips-61.jpg"},
                {"src": "chips/chips-62.jpg"},
                {"src": "chips/chips-63.jpg"},
                {"src": "chips/chips-64.jpg"},
                {"src": "chips/chips-65.jpg"},
                {"src": "chips/chips-66.jpg"},
                {"src": "chips/chips-67.jpg"},
                {"src": "chips/chips-68.jpg"},
                {"src": "chips/chips-69.jpg"},
                {"src": "chips/chips-70.jpg"}
            ],
            options: {
                cellsHorizontal: 4,
                cellsVertical: 4,
                shuffleImages: false,
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
        "options.cellsHorizontal": {
            handler(value, oldValue) {
                this.codeSnippet = this.codeSnippet.replace(`const cellsHorizontal = ${oldValue}`,`const cellsHorizontal = ${value}`)
                this.codeSnippet = this.codeSnippet.replace(`const totalCells = cellsHorizontal * cellsVertical // ${oldValue * this.options.cellsVertical}`,`const totalCells = cellsHorizontal * cellsVertical // ${value * this.options.cellsVertical}`)
            },
        },
        "options.cellsVertical": {
            handler(value, oldValue) {
                this.codeSnippet = this.codeSnippet.replace(`const cellsVertical = ${oldValue}`,`const cellsVertical = ${value}`)
                this.codeSnippet = this.codeSnippet.replace(`const totalCells = cellsHorizontal * cellsVertical // ${oldValue * this.options.cellsHorizontal}`,`const totalCells = cellsHorizontal * cellsVertical // ${value * this.options.cellsHorizontal}`)
            },
        },
    },
    mounted() {
        this.canvas.el = this.$refs["canvas"]
        this.setCanvasDimensions()
        this.canvas.ctx = this.canvas.el.getContext("2d");
        this.updateCanvas()
        
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
        loadImage(src) {
            if (this.imageCache[src]) {
                return Promise.resolve(this.imageCache[src])
            }

            return new Promise((resolve, reject) => {
                const img = new Image()
                img.onload = () => {
                    this.imageCache[src] = img
                    resolve(img)
                }
                img.onerror = () => reject(new Error(`Kan afbeelding niet laden: ${src}`))
                img.src = src
            })
        },
        async drawGrid() {
            const ctx = this.canvas.ctx
            if (!ctx) {
                console.error("Can not find canvas context")
                return
            }

            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

            const color = this.options.color
            ctx.fillStyle = color
            const totalCells = this.options.cellsHorizontal * this.options.cellsVertical
            const cellWidth = this.canvas.width / this.options.cellsHorizontal
            const cellHeight = this.canvas.height / this.options.cellsVertical
            let images = [...this.images]

            while (images.length < totalCells) {
                images.push(...this.images)
            }

            if (this.options.shuffleImages) {
                images = _.shuffle(images)
            }

            const renderJobs = []
            let index = 0

            for (let x = 0; x < this.canvas.width; x += cellWidth) {
                for (let y = 0; y < this.canvas.height; y += cellHeight) {
                    const src = images[index]?.src
                    if (src) {
                        this.drawImage(x + cellWidth / 2, y + cellHeight / 2, cellWidth, cellHeight, src)
                    }
                    index++
                }
            }

            await Promise.all(renderJobs)
        },
        async drawImage(x, y, width, height, src) {
            try {
                const cellImage = await this.loadImage(src)

                this.canvas.ctx.drawImage(
                    cellImage,
                    0,
                    0,
                    cellImage.naturalWidth,
                    cellImage.naturalHeight,
                    x - width / 2,
                    y - height / 2,
                    width,
                    height
                )
            } catch (error) {
                console.error(error)
            }
        },
        updateCanvas() {
            if (!this.options.cellsVertical || !this.options.cellsHorizontal) {
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

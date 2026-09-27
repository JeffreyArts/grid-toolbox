<template>

    <div class="canvas-view">
        <header class="title">
            <h1>Cell images with sorting</h1>
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
let images = [
    {"src": "chips/chips-1.jpg", "size" : "l"},
    {"src": "chips/chips-2.jpg", "size" : "m"},
    {"src": "chips/chips-3.jpg", "size" : "xs"},
    {"src": "chips/chips-4.jpg", "size" : "s"},
    {"src": "chips/chips-5.jpg", "size" : "m"},
    {"src": "chips/chips-6.jpg", "size" : "m"},
    {"src": "chips/chips-7.jpg", "size" : "m"},
    {"src": "chips/chips-8.jpg", "size" : "l"},
    {"src": "chips/chips-9.jpg", "size" : "s"},
    {"src": "chips/chips-10.jpg", "size" : "s"}
    //...
]
const order = ["xs", "s", "m", "l"]

// Via indexOf(image.size) krijgen we de positie van de waarde hiervan in de sort-array (0, 1, 2 of 3)
// Vervolgens gebruiken we die waarde om de afbeeldingen in de array te sorteren 
images = images.sort((a, b) => {
    const orderA = order.indexOf(a.size)
    const orderB = order.indexOf(b.size)
    return orderA - orderB
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
                height: 960, // in pixels
                cellImage: null
            },
            imageCache: {},
            images: [
                {"src": "chips/chips-1.jpg", "size" : "l"},
                {"src": "chips/chips-2.jpg", "size" : "m"},
                {"src": "chips/chips-3.jpg", "size" : "xs"},
                {"src": "chips/chips-4.jpg", "size" : "s"},
                {"src": "chips/chips-5.jpg", "size" : "m"},
                {"src": "chips/chips-6.jpg", "size" : "m"},
                {"src": "chips/chips-7.jpg", "size" : "m"},
                {"src": "chips/chips-8.jpg", "size" : "l"},
                {"src": "chips/chips-9.jpg", "size" : "s"},
                {"src": "chips/chips-10.jpg", "size" : "s"},
                {"src": "chips/chips-11.jpg", "size" : "s"},
                {"src": "chips/chips-12.jpg", "size" : "m"},
                {"src": "chips/chips-13.jpg", "size" : "m"},
                {"src": "chips/chips-14.jpg", "size" : "xs"},
                {"src": "chips/chips-15.jpg", "size" : "s"},
                {"src": "chips/chips-16.jpg", "size" : "m"},
                {"src": "chips/chips-17.jpg", "size" : "l"},
                {"src": "chips/chips-18.jpg", "size" : "l"},
                {"src": "chips/chips-19.jpg", "size" : "m"},
                {"src": "chips/chips-20.jpg", "size" : "xs"},
                {"src": "chips/chips-21.jpg", "size" : "xs"},
                {"src": "chips/chips-22.jpg", "size" : "m"},
                {"src": "chips/chips-23.jpg", "size" : "s"},
                {"src": "chips/chips-24.jpg", "size" : "l"},
                {"src": "chips/chips-25.jpg", "size" : "xs"},
                {"src": "chips/chips-26.jpg", "size" : "m"},
                {"src": "chips/chips-27.jpg", "size" : "m"},
                {"src": "chips/chips-28.jpg", "size" : "s"},
                {"src": "chips/chips-29.jpg", "size" : "l"},
                {"src": "chips/chips-30.jpg", "size" : "m"},
                {"src": "chips/chips-31.jpg", "size" : "m"},
                {"src": "chips/chips-32.jpg", "size" : "s"},
                {"src": "chips/chips-33.jpg", "size" : "l"},
                {"src": "chips/chips-34.jpg", "size" : "s"},
                {"src": "chips/chips-35.jpg", "size" : "xs"},
                {"src": "chips/chips-36.jpg", "size" : "m"},
                {"src": "chips/chips-37.jpg", "size" : "s"},
                {"src": "chips/chips-38.jpg", "size" : "l"},
                {"src": "chips/chips-39.jpg", "size" : "l"},
                {"src": "chips/chips-40.jpg", "size" : "s"},
                {"src": "chips/chips-41.jpg", "size" : "xs"},
                {"src": "chips/chips-42.jpg", "size" : "xs"},
                {"src": "chips/chips-43.jpg", "size" : "l"},
                {"src": "chips/chips-44.jpg", "size" : "xs"},
                {"src": "chips/chips-45.jpg", "size" : "xs"},
                {"src": "chips/chips-46.jpg", "size" : "m"},
                {"src": "chips/chips-47.jpg", "size" : "l"},
                {"src": "chips/chips-48.jpg", "size" : "xs"},
                {"src": "chips/chips-49.jpg", "size" : "s"},
                {"src": "chips/chips-50.jpg", "size" : "xs"},
                {"src": "chips/chips-51.jpg", "size" : "m"},
                {"src": "chips/chips-52.jpg", "size" : "s"},
                {"src": "chips/chips-53.jpg", "size" : "l"},
                {"src": "chips/chips-54.jpg", "size" : "l"},
                {"src": "chips/chips-55.jpg", "size" : "xs"},
                {"src": "chips/chips-56.jpg", "size" : "s"},
                {"src": "chips/chips-57.jpg", "size" : "s"},
                {"src": "chips/chips-58.jpg", "size" : "s"},
                {"src": "chips/chips-59.jpg", "size" : "xs"},
                {"src": "chips/chips-60.jpg", "size" : "m"},
                {"src": "chips/chips-61.jpg", "size" : "m"},
                {"src": "chips/chips-62.jpg", "size" : "m"},
                {"src": "chips/chips-63.jpg", "size" : "s"},
                {"src": "chips/chips-64.jpg", "size" : "l"},
                {"src": "chips/chips-65.jpg", "size" : "s"},
                {"src": "chips/chips-66.jpg", "size" : "s"},
                {"src": "chips/chips-67.jpg", "size" : "xs"},
                {"src": "chips/chips-68.jpg", "size" : "m"},
                {"src": "chips/chips-69.jpg", "size" : "s"},
                {"src": "chips/chips-70.jpg", "size" : "m"}
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
            },
        },
        "options.cellsVertical": {
            handler(value, oldValue) {
                this.codeSnippet = this.codeSnippet.replace(`const cellsVertical = ${oldValue}`,`const cellsVertical = ${value}`)
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

            const order = ["xs", "s", "m", "l"]
            images = images.sort((a, b) => {
                const orderA = order.indexOf(a.size)
                const orderB = order.indexOf(b.size)
                return orderA - orderB
            })

            console.log(images)

            const renderJobs = []
            let index = 0

            for (let x = 0; x < this.canvas.width; x += cellWidth) {
                for (let y = 0; y < this.canvas.height; y += cellHeight) {
                    const src = images[index]?.src
                    if (src) {
                        renderJobs.push(this.drawImage(x + cellWidth / 2, y + cellHeight / 2, cellWidth, cellHeight, src))
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

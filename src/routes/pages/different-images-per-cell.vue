<template>

    <div class="canvas-view">
        <header class="title">
            <h1>Cell Image</h1>
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
uitleg volgt...



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
                {"src": "public/chips/chips-18.jpg"},
                {"src": "public/chips/chips-19.jpg"},
                {"src": "public/chips/chips-20.jpg"},
                {"src": "public/chips/chips-21.jpg"},
                {"src": "public/chips/chips-22.jpg"},
                {"src": "public/chips/chips-23.jpg"},
                {"src": "public/chips/chips-24.jpg"},
                {"src": "public/chips/chips-25.jpg"},
                {"src": "public/chips/chips-26.jpg"},
                {"src": "public/chips/chips-27.jpg"},
                {"src": "public/chips/chips-28.jpg"},
                {"src": "public/chips/chips-29.jpg"},
                {"src": "public/chips/chips-30.jpg"},
                {"src": "public/chips/chips-31.jpg"},
                {"src": "public/chips/chips-32.jpg"},
                {"src": "public/chips/chips-33.jpg"},
                {"src": "public/chips/chips-34.jpg"},
                {"src": "public/chips/chips-35.jpg"},
                {"src": "public/chips/chips-36.jpg"},
                {"src": "public/chips/chips-37.jpg"},
                {"src": "public/chips/chips-38.jpg"},
                {"src": "public/chips/chips-39.jpg"},
                {"src": "public/chips/chips-40.jpg"},
                {"src": "public/chips/chips-41.jpg"},
                {"src": "public/chips/chips-42.jpg"},
                {"src": "public/chips/chips-43.jpg"},
                {"src": "public/chips/chips-44.jpg"},
                {"src": "public/chips/chips-45.jpg"},
                {"src": "public/chips/chips-46.jpg"},
                {"src": "public/chips/chips-47.jpg"},
                {"src": "public/chips/chips-48.jpg"},
                {"src": "public/chips/chips-49.jpg"},
                {"src": "public/chips/chips-50.jpg"},
                {"src": "public/chips/chips-51.jpg"},
                {"src": "public/chips/chips-52.jpg"},
                {"src": "public/chips/chips-53.jpg"},
                {"src": "public/chips/chips-54.jpg"},
                {"src": "public/chips/chips-55.jpg"},
                {"src": "public/chips/chips-56.jpg"},
                {"src": "public/chips/chips-57.jpg"},
                {"src": "public/chips/chips-58.jpg"},
                {"src": "public/chips/chips-59.jpg"},
                {"src": "public/chips/chips-60.jpg"},
                {"src": "public/chips/chips-61.jpg"},
                {"src": "public/chips/chips-62.jpg"},
                {"src": "public/chips/chips-63.jpg"},
                {"src": "public/chips/chips-64.jpg"},
                {"src": "public/chips/chips-65.jpg"},
                {"src": "public/chips/chips-66.jpg"},
                {"src": "public/chips/chips-67.jpg"},
                {"src": "public/chips/chips-68.jpg"},
                {"src": "public/chips/chips-69.jpg"},
                {"src": "public/chips/chips-70.jpg"}
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

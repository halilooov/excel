import {$} from '@core/dom';

export function resizeHandler($root, event) {
        const $resizer = $(event.target)
        const typeResize = $resizer.data.resize
        const $parent = $resizer.closest('[data-type="resizable"]')
        const coords = $parent.getCoords()
        const cells = $root.findAll(`[data-col="${$parent.data.col}"]`)

        document.onmousemove = e => {
            if (typeResize === 'col') {
                const delta = e.pageX - coords.right
                const value = coords.width + delta
                $resizer.css({right: `${-delta}px`})
                document.onmouseup = () => {
                    document.onmousemove = document.onmouseup = null
                    $parent.css({width: `${value}px`})
                    $resizer.css({right: '0'})
                    cells.forEach(el => el.style.width = value + 'px')
                }
            } else {
                const delta = e.pageY - coords.bottom
                const value = coords.height + delta
                $resizer.css({bottom: `${-delta}px`})
                document.onmouseup = () => {
                    document.onmousemove = document.onmouseup = null
                    $parent.css({height: `${value}px`})
                    $resizer.css({bottom: '0'})
                }
            }
        }
}

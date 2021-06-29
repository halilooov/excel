import {capitalize} from '@core/utils';

export class DomListener {
    constructor($root, listeners = []) {
        if (!$root) {
            throw new Error(`No $root provided for DomListener!`)
        }
        this.$root = $root
        this.listeners = listeners
    }

    initDOMListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            if (!this[method]) {
                    console.log(this)
                    const name = this.name
                    throw new Error(
                        `Method ${method} is not implemented in ${this.name} Component`
                )
            }
            this[method] = this[method].bind(this)
            // Тоже самое что и addEventListener
            this.$root.on(listener, this[method])
        })
    }

    removeDOMListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)

            // Тоже самое что и removeEventListener
            this.$root.off(listener, this[method])
        })
    }
}

function getMethodName(eventName) {
    return 'on' + capitalize(eventName)
}

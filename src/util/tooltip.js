import { addClass, removeClass } from './helpers'

export default {
  install (Vue) {
    Vue.directive('tooltip', {
      bind(el, bindings) {
        let span = document.createElement('SPAN')
        let text = document.createTextNode('seats available: ' + bindings.value.seats)
        span.appendChild(text)
        addClass(span, 'tooltip')
        el.appendChild(span)
        let div = el.getElementsByTagName('DIV')[0]
        div.addEventListener('mouseover', function() {
          addClass(span, 'tooltip-show')
        })
        div.addEventListener('mouseout', function() {
          removeClass(span, 'tooltip-show')
        })
      },
      unbind(el) {
        let div = el.getElementsByTagName('DIV')[0]
        div.removeEventListener('mouseover', function() {
        })
        div.removeEventListener('mouseout', function() {
        })
      }
    })
  }
}

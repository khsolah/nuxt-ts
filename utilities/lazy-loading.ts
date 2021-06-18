export default class Observer {
  private static instance: IntersectionObserver
  private constructor() {
    Observer.instance = new IntersectionObserver(this.callback, this.optoins)
  }

  static getInstance() {
    /* eslint-disable no-new */
    if (!Observer.instance) new Observer()

    return Observer.instance
  }

  private callback: IntersectionObserverCallback = (entries, observer) => {
    Array.prototype.forEach.call(
      entries,
      ({ isIntersecting, target }: IntersectionObserverEntry) => {
        if (isIntersecting) {
          observer.unobserve(target)
          const dataSrc = target.getAttribute('data-src')
          const arg = target.getAttribute('arg')

          if (!dataSrc)
            throw new Error('data-src is not found on this element!')

          switch (arg) {
            case 'background':
              target.setAttribute(
                'style',
                `${
                  target.getAttribute('style') || ''
                }background-image:url(${dataSrc});background-position: center;background-size: 100% 100%;background-repeat: no-repeat;`
              )
              break
            default:
              target.setAttribute('src', dataSrc)
          }
        }
      }
    )
  }

  private optoins: IntersectionObserverInit = {
    root: null,
    rootMargin: '30px',
    threshold: [0]
  }
}

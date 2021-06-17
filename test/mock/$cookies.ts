import { Primitive } from '~/@types/basic'

export default class Cookies {
  private static instance: Cookies
  /* eslint-disable no-useless-constructor */
  private constructor(private $cookies: { [key: string]: Primitive }) {}

  static getInstance = () => {
    if (!Cookies.instance) Cookies.instance = new Cookies({})
    return Cookies.instance
  }

  get = jest
    .fn()
    .mockImplementation(
      (key: string): Primitive | undefined => this.$cookies[key]
    )

  getAll = jest
    .fn()
    .mockImplementation((): { [key: string]: Primitive } => this.$cookies)

  set = jest.fn().mockImplementation((key: string, value: Primitive): void => {
    this.$cookies[key] = value
  })

  setAll = jest
    .fn()
    .mockImplementation(
      (cookieArray: { key: string; value: Primitive }[]): void => {
        cookieArray.forEach(cookie => {
          this.$cookies[cookie.key] = cookie.value
        })
      }
    )

  remove = jest.fn().mockImplementation((key: string): void => {
    delete this.$cookies[key]
  })

  removeAll = jest.fn().mockImplementation((): void => {
    this.$cookies = {}
  })
}

class AbstractStorageManager {
  get (key) {
    return JSON.parse(this.storage.getItem(key))
  }
  set (key, newValue = undefined) {
    this.storage.setItem(
      key,
      JSON.stringify(newValue)
    )

    return newValue
  }
  remove (key) {
    this.storage.removeItem(key)

    return true
  }
  clear () {
    this.storage.clear()

    return true
  }
}

class LocalStorageManager extends AbstractStorageManager {
  constructor () {
    super()
    this.storage = window.localStorage
  }
}

class SessionStorageManager extends AbstractStorageManager {
  constructor () {
    super()
    this.storage = window.sessionStorage
  }
}

export const localStorage = new LocalStorageManager()
export const sessionStorage = new SessionStorageManager()

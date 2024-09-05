export function wrapInPromise (action:() => any): () => Promise<any> {
  return () => {
    return new Promise((resolve, reject) => {
      try {
        resolve(action())
      } catch (error) {
        reject(error)
      }
    })
  }
}

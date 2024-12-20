type ApiResponse<T> =
    | {
          data: T
          error: null
      }
    | {
          data: null
          error: string
      }

const MOCK_API_DELAY = 1000

class Api {
    inputValues: Record<string, string> = {}

    public setInputValue(
        key: string,
        value: string,
    ): Promise<ApiResponse<string>> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() < 0.2) {
                    reject({ data: null, error: 'Something went wrong' })
                    return
                }

                this.inputValues[key] = value

                resolve({ data: value, error: null })
            }, MOCK_API_DELAY)
        })
    }

    public getInputValue(key: string): string | null {
        return this.inputValues[key] ?? null
    }
}

export const api = new Api()

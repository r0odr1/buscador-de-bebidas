
export default {
  async generateRecipe(prompt: string) {
    const res = await fetch('http://localhost:3001/api/generate-recipe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    })

    if (!res.ok) {
      let message = 'Error generando receta'

      try {
        const data = await res.json()
        message = data.error || message
      } catch (error) {
        console.log(error);

      }

      throw new Error(message)
    }

    if (!res.body) {
      throw new Error('No stream received')
    }

    // Convertimos el ReadableStream en async iterable
    const reader = res.body.getReader()
    const decoder = new TextDecoder()

    async function* streamText() {
      while (true) {
        const { value, done } = await reader.read()
        if (done) break
        yield decoder.decode(value, { stream: true })
      }
    }

    return streamText()
  }
}
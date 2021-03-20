import { Message } from 'discord.js'

/**
 * Evite la guerre Chocolatine / Pain au chocolat
 */
export default class OkBoomerFilter {
  filter (message: Message): boolean {
    if (message.content.toLowerCase().match(/boomer/i) !== null) {
      message.channel
        .send(
          `OK Boomer !`
        )
        .catch(console.error)
      return true
    }
    return false
  }
}

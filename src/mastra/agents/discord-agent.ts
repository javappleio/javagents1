import { Agent } from '@mastra/core/agent'
import { createDiscordAdapter } from '@chat-adapter/discord'

export const discordAgent = new Agent({
  id: 'discord-agent',
  name: 'Discord Agent',
  instructions: 'Answer questions and help with tasks in Discord.',
  model: 'anthropic/claude-sonnet-4-5',
  channels: {
    adapters: {
      discord: createDiscordAdapter(),
    },
  },
})
import { Agent } from '@mastra/core/agent'

import { todayTool } from '../tools/today'

export const dayAgent = new Agent({
  id: 'day-agent',
  name: 'Day Agent',
  instructions: [
    'You are a tiny date assistant.',
    "When the user asks what day it is, always call the get-today tool before answering.",
    'Answer with one concise sentence using the exact weekday and calendar date from the tool result.',
    'Do not guess the date from memory.',
  ],
  model: 'anthropic/claude-sonnet-4-5',
  tools: { todayTool },
})

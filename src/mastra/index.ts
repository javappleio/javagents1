import { Mastra } from '@mastra/core/mastra';
import { MySQLStore } from '@mastra/mysql'
import { MastraEditor } from '@mastra/editor'
import {
  MastraStorageExporter,
  MastraPlatformExporter,
  Observability,
  SensitiveDataFilter,
} from '@mastra/observability';

import { discordAgent } from './agents/discord-agent'

export const mastra = new Mastra({
  bundler: {
    externals: ['@duckdb/node-bindings'],
  },
  agents: { discordAgent },
  tools: {},
  storage: new MySQLStore({
    id: 'mysql-storage',
    connectionString: process.env.MYSQL_URL!,
  }),
  editor: new MastraEditor(),
  observability: new Observability({
    configs: {
      default: {
        serviceName: 'mastra',
        exporters: [new MastraStorageExporter(), new MastraPlatformExporter()],
        spanOutputProcessors: [new SensitiveDataFilter()],
      },
    },
  }),
});

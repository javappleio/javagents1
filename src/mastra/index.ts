import { Mastra } from '@mastra/core/mastra';
import { MastraCompositeStore } from '@mastra/core/storage';
import { MySQLStore } from '@mastra/mysql'
import { DuckDBStore } from '@mastra/duckdb'
import { MastraEditor } from '@mastra/editor'
import {
  MastraStorageExporter,
  MastraPlatformExporter,
  Observability,
  SensitiveDataFilter,
} from '@mastra/observability';

import { discordAgent } from './agents/discord-agent'
import { dayAgent } from './agents/day-agent'
import { todayTool } from './tools/today'

export const mastra = new Mastra({
  bundler: {
    externals: ['@duckdb/node-bindings'],
  },
  agents: { discordAgent, dayAgent },
  tools: { todayTool },
  storage: new MastraCompositeStore({
    id: 'composite-storage',
    default: new MySQLStore({
      id: 'mysql-storage',
      connectionString: process.env.MYSQL_URL!,
    }),
    domains: {
      observability: new DuckDBStore({ path: './mastra-observability.duckdb' }).observability,
    },
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

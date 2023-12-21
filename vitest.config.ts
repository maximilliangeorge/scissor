import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    forceRerunTriggers: ['./**'],
    logHeapUsage: true,
    poolOptions: {
      threads: {
        minThreads: 1,
        maxThreads: 2
      },
      forks: {
        singleFork: true
      },
      vmThreads: {
        memoryLimit: '256M'
      }
    }
  },
})
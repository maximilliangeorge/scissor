import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue()
  ],
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
import { defineConfig } from 'orval';

/**
 * Конфигурация для генерации API клиентов из OpenAPI спецификации
 *
 * Решение проблемы дублирования схем:
 * - Используем режим tags-split для разбиения endpoints по тегам
 * - Общие схемы остаются в корне (они используются несколькими тегами)
 * - Специфичные схемы для каждого тега будут в папках тегов
 */
export default defineConfig({
  pokemon: {
    hooks: {},
    input: {
      target: 'src/services/openapi.yml',
    },
    output: {
      client: 'react-query',
      docs: true,
      httpClient: 'fetch',
      indexFiles: false,
      mode: 'tags',
      namingConvention: 'kebab-case',
      override: {
        useTypeOverInterfaces: false,
      },
      prettier: true,
      // Общие схемы в корне - они используются несколькими тегами
      // Это нормально, так как избегаем дублирования
      schemas: 'src/services/generated/schemas',
      target: 'src/services/generated/',
    },
  },
});

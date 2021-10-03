// keystone.ts

import { config, list } from '@keystone-next/keystone';
import { text } from '@keystone-next/keystone/fields';
import { document } from '@keystone-next/fields-document';
import { componentBlocks } from './component-blocks';

const Post = list({
  fields: {
    title: text({ isRequired: true }),
    slug: text(),
    content: document({
      formatting: true,
      links: true,
      componentBlocks,
      ui: {
        views: require.resolve('./component-blocks')
      },
      layouts: [
        [1, 1],
        [1, 1, 1],
        [2, 1],
        [1, 2],
        [1, 2, 1]
      ],
      dividers: true
      /* ... */
    }),
  }
});

export default config({
  db: { provider: 'sqlite', url: 'file:./app.db' },
  experimental: {
    generateNextGraphqlAPI: true,
    generateNodeAPI: true,
  },
  lists: { Post },
});
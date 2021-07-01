import React from 'react';
import { NotEditable, component, fields } from '@keystone-next/fields-document/component-blocks';
import ReactPlayer from "react-player"

// naming the export componentBlocks is important because the Admin UI
// expects to find the components like on the componentBlocks export
export const componentBlocks = {
  quote: component({
    component: ({ attribution, content }) => {
      return (
        <div
          style={{
            borderLeft: '3px solid #CBD5E0',
            paddingLeft: 16,
          }}
        >
          <div style={{ fontStyle: 'italic', color: '#4A5568' }}>{content}</div>
          <div style={{ fontWeight: 'bold', color: '#718096' }}>
            <NotEditable>— </NotEditable>
            {attribution}
          </div>
        </div>
      );
    },
    label: 'Quote',
    props: {
      content: fields.child({
        kind: 'block',
        placeholder: 'Quote...',
        formatting: { inlineMarks: 'inherit', softBreaks: 'inherit' },
        links: 'inherit',
      }),
      attribution: fields.child({ kind: 'inline', placeholder: 'Attribution...' }),
    },
    chromeless: true,
  }),
  video: component({
    component: props => {
      
      return (
        <div
        contentEditable={false}
          style={{
            padding: '0 0 0 0',
            position: 'relative',
            userSelect: "none",
          }} >
          <ReactPlayer
        url={props.url.value}
        />
        </div>
      )
    },
    label: "Video",
    props: {
      url: fields.url({
        label: 'Video URL',
        defaultValue: 'https://www.youtube.com/'
      })
  },
  })
};
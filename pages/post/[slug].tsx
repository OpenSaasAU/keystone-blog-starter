// pages/post/[slug].tsx

import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import Link from 'next/link';
import { lists } from '.keystone/api';
import { DocumentRenderer, DocumentRendererProps } from '@keystone-next/document-renderer';
import { InferRenderersForComponentBlocks } from '@keystone-next/fields-document/component-blocks';
import { componentBlocks } from '../../component-blocks';
import ReactPlayer from "react-player"

const renderers: DocumentRendererProps['renderers'] = {
  // use your editor's autocomplete to see what other renderers you can override
  inline: {
    bold: ({ children }) => {
      return <strong>{children}</strong>;
    },
  },
  block: {
    paragraph: ({ children, textAlign }) => {
      return <p style={{ textAlign }}>{children}</p>;
    },
  },
};

const componentBlockRenderers: InferRenderersForComponentBlocks<typeof componentBlocks> = {
  quote: props => {
    return (
      <div
        style={{
          borderLeft: '3px solid #CBD5E0',
          paddingLeft: 16,
        }}
      >
        <div style={{ fontStyle: 'italic', color: '#4A5568' }}>{props.content}</div>
        <div style={{ fontWeight: 'bold', color: '#718096' }}>
          — {props.attribution}
        </div>
      </div>
    )
  },
  video: props => {
    const { url } = props

    return (
      <div contentEditable={false}>
        <div
          style={{
            padding: '0 0 0 0',
            position: 'relative',
          }}
        >
          <ReactPlayer
            url={url}
          />
        </div>
      </div>
    )
  }
};

export default function PostPage({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {


  return (
    <div>
      <main style={{ margin: "3rem" }}>
        <h1>{post.title}</h1>
        <DocumentRenderer document={post.content.document} renderers={renderers} componentBlocks={componentBlockRenderers} />
      </main>
    </div>
  );
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const posts = await lists.Post.findMany({
    query: `slug`,
  });

  const paths = posts
    .map(post => post.slug)
    .filter((slug): slug is string => !!slug)
    .map(slug => `/post/${slug}`);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext) {
  const [post] = await lists.Post.findMany({
    where: { slug: params!.slug as string },
    query: 'id title content { document }',
  });
  return { props: { post } };
}
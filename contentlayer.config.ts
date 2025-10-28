import { defineDocumentType, makeSource } from 'contentlayer/source-files'

const computedFields = {
  url: {
    type: 'string' as const,
    resolve: (doc: any) => `/${doc._raw.flattenedPath}`,
  },
}

export const Person = defineDocumentType(() => ({
  name: 'Person',
  filePathPattern: `people/*.mdx`,
  contentType: 'mdx',
  fields: {
    id: { type: 'string', required: true },
    name: { type: 'string', required: true },
    name_en: { type: 'string' },
    name_zh: { type: 'string' },
    role: { type: 'enum', required: true, options: ['PI', 'Faculty', 'PhD', 'Master', 'Alumni'] },
    title: { type: 'string' },
    org: { type: 'string' },
    topics: { type: 'list', of: { type: 'string' } },
    areas: { type: 'list', of: { type: 'string' } },
    email: { type: 'string' },
    website: { type: 'string' },
    scholar: { type: 'string' },
    photo: { type: 'string' },
    cover: { type: 'string' },
    layout: { type: 'enum', options: ['lumina', 'cal'] },
    highlights: { type: 'list', of: { type: 'string' } },
    selected_pubs: { type: 'list', of: { type: 'string' } },
    summary: { type: 'string' },
    year_from: { type: 'number' },
    year_to: { type: 'number' },
  },
  computedFields,
}))

export const Publication = defineDocumentType(() => ({
  name: 'Publication',
  filePathPattern: `publications/*.mdx`,
  contentType: 'mdx',
  fields: {
    id: { type: 'string', required: true },
    title: { type: 'string', required: true },
    authors: { type: 'list', of: { type: 'string' }, required: true },
    venue: { type: 'string' },
    year: { type: 'number' },
    tags: { type: 'list', of: { type: 'string' } },
    abstract: { type: 'string' },
    paper: { type: 'string' },
    code: { type: 'string' },
    page: { type: 'string' },
    thumbnail: { type: 'string' },
    award: { type: 'string' },
  },
  computedFields,
}))

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `posts/*.mdx`,
  contentType: 'mdx',
  fields: {
    id: { type: 'string', required: true },
    title: { type: 'string', required: true },
    date: { type: 'string', required: true },
    cover: { type: 'string' },
    tags: { type: 'list', of: { type: 'string' } },
    category: { type: 'enum', options: ['Blog', 'Guide', 'News'] },
    summary: { type: 'string' },
  },
  computedFields: {
    ...computedFields,
    slug: {
      type: 'string' as const,
      resolve: (doc: any) => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
    },
  },
}))

export const Event = defineDocumentType(() => ({
  name: 'Event',
  filePathPattern: `events/*.mdx`,
  contentType: 'mdx',
  fields: {
    id: { type: 'string', required: true },
    title: { type: 'string', required: true },
    date: { type: 'string', required: true },
    location: { type: 'string' },
    tags: { type: 'list', of: { type: 'string' } },
    summary: { type: 'string' },
    kind: { type: 'enum', options: ['Talk', 'Workshop', 'Seminar', 'Challenge'] },
    cover: { type: 'string' },
    signup: { type: 'string' },
    replay: { type: 'string' },
    slides: { type: 'string' },
    org: { type: 'string' },
  },
  computedFields,
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Person, Publication, Post, Event],
})

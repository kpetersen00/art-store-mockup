import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  projectId: 'c2ld0k9u',
  dataset: 'production',
  apiVersion: '2022-03-10',
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => {
  const src = builder.image(source).options.source.asset._ref;
  return src
    .replace('image-', `https://cdn.sanity.io/images/c2ld0k9u/production/`)
    .replace('-jpg', '.jpg');
};

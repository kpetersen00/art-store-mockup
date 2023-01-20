export default {
  name: 'banner',
  title: 'Banner',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'position',
      title: 'Position',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    { name: 'smallText', title: 'SmallText', type: 'string' },
    { name: 'largeText', title: 'LargeText', type: 'string' },
    { name: 'midText', title: 'MidText', type: 'string' },
  ],
};

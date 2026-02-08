import featuredBlogsData from '@site/static/content/featuredblogs.json';

const useFetchRecentBlogs = () => {
  // Map the data to match the expected format
  const recentBlogs = featuredBlogsData.map((blog) => ({
    title: blog.title,
    link: blog.link,
    pubDate: blog.pubDate,
    description: blog.description,
    readingTime: blog.readingTime,
    imageUrl: blog.imageUrl,
  }));

  return { recentBlogs, error: null };
};

export default useFetchRecentBlogs;

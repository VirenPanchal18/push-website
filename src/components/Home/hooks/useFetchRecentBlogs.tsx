import { useEffect, useState } from 'react';

const FEATURED_BLOGS_URL = '/content/featuredblogs.json';

const useFetchRecentBlogs = () => {
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedBlogs = async () => {
      try {
        const response = await fetch(FEATURED_BLOGS_URL);
        if (!response.ok) throw new Error('Failed to fetch featured blogs.');

        const blogs = await response.json();

        // Map the data to match the expected format
        const formattedBlogs = blogs.map((blog) => ({
          title: blog.title,
          link: blog.link,
          pubDate: blog.pubDate,
          description: blog.description,
          readingTime: blog.readingTime,
          imageUrl: blog.imageUrl,
        }));

        setRecentBlogs(formattedBlogs);
      } catch (err) {
        console.error('Error fetching featured blogs:', err);
        setError(err.message);
      }
    };

    fetchFeaturedBlogs();
  }, []);

  return { recentBlogs, error };
};

export default useFetchRecentBlogs;

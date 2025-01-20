export const placeholderPosts = [
  {
    id: '1',
    title: 'Lost Cat: Please Help!',
    content: "Our beloved cat, Whiskers, has gone missing. He's a orange tabby with white paws and a distinctive black spot on his nose. Last seen near Central Park. If you've seen him or have any information, please contact us immediately. Whiskers is very friendly but may be scared. We're offering a reward for his safe return. Thank you for your help in bringing our furry family member home!",
    location: '40.78, -73.97',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Community Cleanup This Weekend',
    content: "Join us this Saturday for a community cleanup event! We'll be meeting at the corner of Main St. and Oak Ave. at 9 AM. Gloves and trash bags will be provided, but feel free to bring your own if you prefer. This is a great opportunity to meet your neighbors and make a positive impact on our local environment. All ages are welcome, and we'll have refreshments available. Let's work together to keep our community clean and beautiful!",
    location: '40.71, -74.01',
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
  {
    id: '3',
    title: 'Free Piano Lessons for Beginners',
    content: "I'm offering free piano lessons for beginners every Tuesday evening from 6-7 PM at the community center. Whether you've always wanted to learn or are looking to pick up a new hobby, this is a great opportunity to start your musical journey. No equipment necessary - we have keyboards available for use. Space is limited to 10 students per session, so please sign up in advance. All ages welcome!",
    location: '40.73, -73.99',
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    attachment: 'https://example.com/piano_lesson_flyer.pdf',
  },
]


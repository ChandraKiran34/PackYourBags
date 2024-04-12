import React from 'react';

const AdminReviews = () => {
  const reviews = [
    { id: 1, user: 'chandra',email:"chandra@raga.com", comment: 'Exceptional service and attention to detail! The team went above and beyond to ensure a delightful experience!' },
    { id: 2, user: 'Abhinav',email:"abhinav@mars.com",  comment: 'Excellent service!' },
    { id: 3, user: 'Rayudu', email:"rayudu@kamala.com",comment: 'Could be better.' },
    // Add more reviews as needed
  ];

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">User Reviews</h2>
      <table className="  border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className='border p-2'>Email</th>
            <th className="border p-2">User</th>
            <th className="border p-2">Comment</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review.id}>
              <td className="border p-2">{review.id}</td>
              <td className="border p-2">{review.email}</td>
              <td className="border p-2">{review.user}</td>
              <td className="border p-2">{review.comment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminReviews;

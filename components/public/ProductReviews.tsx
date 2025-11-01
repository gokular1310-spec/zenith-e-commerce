import React, { useState } from 'react';
import { Review, NewReview } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/mockApiService';
import Button from '../common/Button';
import StarRating from './StarRating';

interface ProductReviewsProps {
  productId: number;
  reviews: Review[];
  onReviewAdded: (review: Review) => void;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId, reviews, onReviewAdded }) => {
  const { user } = useAuth();
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const averageRating = reviews.length > 0
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 0;
    
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newRating === 0 || !newComment.trim() || !user) {
        setError('Please provide a rating and a comment.');
        return;
    }
    setError('');
    setIsSubmitting(true);
    
    try {
        const reviewData: NewReview = {
            author: user.email,
            rating: newRating,
            comment: newComment
        };
        const addedReview = await api.addProductReview(productId, reviewData);
        if (addedReview) {
            onReviewAdded(addedReview);
            setNewRating(0);
            setNewComment('');
        }
    } catch (err) {
        setError('Failed to submit review. Please try again.');
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4 text-gray-800">Customer Reviews</h3>
      <div className="flex items-center mb-6">
        <StarRating rating={averageRating} />
        <span className="ml-2 text-gray-600">{averageRating.toFixed(1)} out of 5</span>
        <span className="ml-4 text-sm text-gray-500">({reviews.length} reviews)</span>
      </div>
      
      {/* Add Review Form */}
      {user && (
        <form onSubmit={handleSubmit} className="mb-8 p-4 border rounded-lg bg-gray-50">
            <h4 className="font-semibold mb-2">Write a review</h4>
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Your Rating</label>
                <StarRating rating={newRating} onRatingChange={setNewRating} />
            </div>
            <div className="mb-4">
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Your Comment</label>
                <textarea 
                    id="comment"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={3}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Tell us what you think..."
                />
            </div>
            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </Button>
        </form>
      )}

      {/* Existing Reviews */}
      <div className="space-y-6">
        {reviews.length > 0 ? (
          reviews.map(review => (
            <div key={review.id} className="border-b pb-4">
              <div className="flex items-center mb-1">
                <StarRating rating={review.rating} />
                <p className="ml-2 font-semibold text-gray-800">{review.author}</p>
              </div>
              <p className="text-sm text-gray-500 mb-2">{new Date(review.date).toLocaleDateString()}</p>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet. Be the first to write one!</p>
        )}
      </div>
    </div>
  );
};

export default ProductReviews;
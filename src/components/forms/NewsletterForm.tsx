import React, { useState } from 'react';
import { supabase } from '../../supabase/client';

interface NewsletterFormProps {
  className?: string;
}

const NewsletterForm: React.FC<NewsletterFormProps> = ({ className = '' }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      // Enregistrer dans la table 'newsletters' de Supabase (email + name)
      const { error: dbError } = await supabase
        .from('newsletters')
        .insert([{ email, name: name || null }]);

      if (dbError) {
        throw dbError;
      }

      // Appeler votre Edge Function Supabase si nécessaire
      await supabase.functions.invoke('newsletter-notification', {
        body: {
          email,
          name: name || null,
          source: 'Website Newsletter Form'
        }
      });

      setMessage('✅ Thank you for subscribing! Please check your email for confirmation.');
      setEmail('');
      setName('');
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setMessage('Failed to subscribe or email already registered.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} data-readdy-form className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name (optional)"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            required
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </button>
        </div>
      </form>
      {message && (
        <p className={`mt-2 text-sm ${message.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default NewsletterForm;

import React, { useState, useEffect } from 'react';
import { Construction, Clock, Mail, ArrowRight } from 'lucide-react';

export default function UnderConstructionPage() {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 30);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const difference = launchDate.getTime() - now.getTime();

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      setDays(d);
      setHours(h);
      setMinutes(m);
      setSeconds(s);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is invalid');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-800 text-white flex flex-col">
      <nav className="p-6 flex justify-between items-center">
        <div className="text-2xl font-bold">BikeKade.lk</div>
        <div className="flex space-x-4"></div>
      </nav>

      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-8 py-12 text-center">
        <div className="mb-8">
          <Construction size={64} className="mx-auto mb-6 text-blue-300" />
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          Something <span className="text-blue-300">Amazing</span> Is Coming Soon
        </h1>
        
        <p className="text-xl mb-12 max-w-2xl opacity-80">
          We're working hard to bring you an exceptional experience. Our website is under construction, but we're nearly there!
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-blue-800 bg-opacity-40 rounded-lg p-4 backdrop-blur-sm">
            <div className="text-3xl md:text-4xl font-bold">{days}</div>
            <div className="text-sm uppercase tracking-wider opacity-70">Days</div>
          </div>
          <div className="bg-blue-800 bg-opacity-40 rounded-lg p-4 backdrop-blur-sm">
            <div className="text-3xl md:text-4xl font-bold">{hours}</div>
            <div className="text-sm uppercase tracking-wider opacity-70">Hours</div>
          </div>
          <div className="bg-blue-800 bg-opacity-40 rounded-lg p-4 backdrop-blur-sm">
            <div className="text-3xl md:text-4xl font-bold">{minutes}</div>
            <div className="text-sm uppercase tracking-wider opacity-70">Minutes</div>
          </div>
          <div className="bg-blue-800 bg-opacity-40 rounded-lg p-4 backdrop-blur-sm">
            <div className="text-3xl md:text-4xl font-bold">{seconds}</div>
            <div className="text-sm uppercase tracking-wider opacity-70">Seconds</div>
          </div>
        </div>
        
        <div className="w-full max-w-md mx-auto mb-16 px-4">
          <h3 className="text-xl mb-4 flex items-center justify-center gap-2">
            <Clock size={20} />
            <span>Get Notified When We Launch</span>
          </h3>
          
          {submitted ? (
            <div className="bg-green-800 bg-opacity-30 border border-green-500 rounded-lg p-4 text-center">
              <p>Thank you! We'll notify you when we launch.</p>
            </div>
          ) : (
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-10 pr-4 py-3 bg-blue-900 bg-opacity-50 border border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                />
              </div>
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <button
                onClick={handleSubmit}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 transition-colors rounded-lg py-3 px-4 font-semibold"
              >
                Notify Me <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-blue-800 bg-opacity-30 rounded-lg p-6 backdrop-blur-sm border border-blue-700">
            <h3 className="font-bold text-xl mb-2">Premium Bikes</h3>
            <p className="opacity-80">Explore our collection of high-quality bicycles for every type of rider.</p>
          </div>
          <div className="bg-blue-800 bg-opacity-30 rounded-lg p-6 backdrop-blur-sm border border-blue-700">
            <h3 className="font-bold text-xl mb-2">Accessories</h3>
            <p className="opacity-80">Complete your riding experience with our range of professional accessories.</p>
          </div>
          <div className="bg-blue-800 bg-opacity-30 rounded-lg p-6 backdrop-blur-sm border border-blue-700">
            <h3 className="font-bold text-xl mb-2">Expert Service</h3>
            <p className="opacity-80">Our team of bike specialists is ready to provide assistance whenever you need it.</p>
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-sm opacity-70">
        <p>© {new Date().getFullYear()} BikeKade.lk. All rights reserved.</p>
      </footer>
    </div>
  );
}
import React from 'react';
import Navbar from './NavBar';
import Footer from './Footer';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-lightest flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-4 py-12 bg-lightest">
        <div className="w-full max-w-3xl space-y-10">
          <header className="text-center">
            <h1 className="text-4xl font-bold text-midnight mb-4">About Us</h1>
            <p className="text-lg text-gray-700">
              Our mission is to provide an easy and efficient way to recognize handwritten documents using the latest OCR technology.
            </p>
          </header>

          <section className="bg-white p-6 rounded-lg shadow-md transition hover:shadow-lg">
            <h2 className="text-2xl font-semibold text-midnight text-center mb-2">Our Vision</h2>
            <p className="text-gray-700 text-center">
              We believe that technology can greatly simplify our daily tasks, especially when it comes to recognizing handwritten documents.
              Our application uses advanced algorithms to recognize text, enabling users to quickly and accurately convert their documents.
            </p>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md transition hover:shadow-lg">
            <h2 className="text-2xl font-semibold text-midnight text-center mb-2">Our Team</h2>
            <p className="text-gray-700 text-center">
              Our team consists of experienced engineers and AI experts who are dedicated to developing a product that meets the needs of our users.
              Our passion for innovation drives us to constantly improve our product.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;

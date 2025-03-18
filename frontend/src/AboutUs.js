import React from 'react';
import Navbar from './NavBar';
import Footer from './Footer';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-lightest">
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen px-20  bg-lightest">
       
          <header className="text-center mb-8">
            <h1 className="text-3xl font-semibold text-midnight">About Us</h1>
          </header>
          <section className="space-y-6">
            <p className="text-lg text-center text-gray-700">
              Our mission is to provide an easy and efficient way to recognize handwritten documents using the latest OCR technology. 
              Our team is dedicated to developing an application that allows users to easily convert their handwritten documents into digital format.
            </p>
            <div>
              <h2 className="text-xl text-center font-semibold text-midnight">Our Vision</h2>
              <p className="text-lg text-center text-gray-700">
                We believe that technology can greatly simplify our daily tasks, especially when it comes to recognizing handwritten documents. 
                Our application uses advanced algorithms to recognize text, enabling users to quickly and accurately convert their documents.
              </p>
            </div>
            <div>
              <h2 className="text-xl text-center font-semibold text-midnight">Our Team</h2>
              <p className="text-lg text-center text-gray-700">
                Our team consists of experienced engineers and AI experts who are dedicated to developing a product that meets the needs of our users. 
                Our passion for innovation drives us to constantly improve our product.
              </p>
            </div>
          </section>
        </div>
        <Footer/>
      </div>
    
  );
};

export default AboutUs;

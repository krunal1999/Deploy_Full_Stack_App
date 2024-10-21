import React from "react";

import { dummyData } from "../../assets/data/dummyData";

const HomePage = () => {
  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-5xl font-bold text-gray-800">{dummyData.title}</h1>
        <h2 className="text-3xl text-gray-600 mt-2">{dummyData.subtitle}</h2>
        <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
          {dummyData.description}
        </p>
        <a
          href="#services"
          className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-500 transition"
        >
          Explore Services
        </a>
      </div>

      {/* Services Section */}
      <section id="services" className="container mx-auto py-12">
        <h2 className="text-4xl font-semibold text-center mb-8">
          Our Services
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {dummyData.services.map((service) => (
            <div
              key={service.id}
              className="bg-white shadow-lg rounded-lg p-6 text-center transition-transform transform hover:scale-105"
            >
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-semibold">{service.name}</h3>
              <p className="mt-2 text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-200 py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-8">What Our Clients Say</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {dummyData.testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white shadow-md rounded-lg p-6"
              >
                <p className="italic text-gray-600">"{testimonial.text}"</p>
                <p className="mt-4 font-semibold text-gray-800">
                  - {testimonial.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
       {/* Contact Section  */}
      <section className="container mx-auto py-12 text-center">
        <h2 className="text-4xl font-semibold mb-4">Get In Touch</h2>
        <p className="text-lg text-gray-600">
          Phone: {dummyData.contactInfo.phone}
        </p>
        <p className="text-lg text-gray-600">
          Email:{" "}
          <a
            href={`mailto:${dummyData.contactInfo.email}`}
            className="text-blue-600 hover:underline"
          >
            {dummyData.contactInfo.email}
          </a>
        </p>
      </section>
    </div>
  );
};

export default HomePage;

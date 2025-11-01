import React from 'react';

const TeamMember = ({ name, title, imageUrl }: { name: string, title: string, imageUrl: string }) => (
  <div className="text-center">
    <img className="mx-auto h-40 w-40 rounded-full object-cover" src={imageUrl} alt={name} />
    <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">{name}</h3>
    <p className="text-sm leading-6 text-gray-600">{title}</p>
  </div>
);

const AboutPage = () => {
  return (
    <div className="bg-white py-12 sm:py-16 rounded-lg shadow-lg">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600">Our Story</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            About Zenith E-Commerce
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Founded in 2024, Zenith was born from a passion for cutting-edge technology and minimalist design. We believe that the right tools can not only enhance productivity but also bring joy and inspiration to everyday life.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl text-center mb-12">Our Mission</h3>
          <p className="text-lg leading-8 text-gray-600 text-center">
            Our mission is to curate a collection of the world's finest electronics and lifestyle products, offering them to our customers with an unparalleled shopping experience. We focus on quality, performance, and aesthetic appeal, ensuring every item in our store meets our high standards.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl text-center mb-12">Meet Our Team</h3>
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 text-center sm:grid-cols-2 lg:grid-cols-3">
            <TeamMember name="Alex Johnson" title="Founder & CEO" imageUrl="https://placehold.co/400x400/1e40af/white?text=Alex" />
            <TeamMember name="Maria Garcia" title="Head of Product" imageUrl="https://placehold.co/400x400/1d4ed8/white?text=Maria" />
            <TeamMember name="James Smith" title="Lead Developer" imageUrl="https://placehold.co/400x400/2563eb/white?text=James" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

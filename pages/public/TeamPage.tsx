import React from 'react';

const TeamMemberCard = ({ name, title, bio, imageUrl }: { name: string, title: string, bio: string, imageUrl: string }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden text-center p-6 transform transition duration-500 hover:scale-105">
    <img className="mx-auto h-40 w-40 rounded-full object-cover mb-4" src={imageUrl} alt={name} />
    <h3 className="text-xl font-semibold leading-7 tracking-tight text-gray-900">{name}</h3>
    <p className="text-sm leading-6 text-primary-600 font-semibold">{title}</p>
    <p className="mt-4 text-gray-600">{bio}</p>
  </div>
);

const TeamPage = () => {
  const teamMembers = [
    { name: "Alex Johnson", title: "Founder & CEO", bio: "Alex drives the vision for Zenith with a passion for innovation and customer satisfaction.", imageUrl: "https://placehold.co/400x400/1e40af/white?text=Alex" },
    { name: "Maria Garcia", title: "Head of Product", bio: "Maria curates our product collection, ensuring every item meets our high standards for quality and design.", imageUrl: "https://placehold.co/400x400/1d4ed8/white?text=Maria" },
    { name: "James Smith", title: "Lead Developer", bio: "James is the architect behind our seamless online experience, constantly pushing the boundaries of e-commerce technology.", imageUrl: "https://placehold.co/400x400/2563eb/white?text=James" },
    { name: "Priya Chen", title: "Marketing Director", bio: "Priya tells the Zenith story to the world, creating campaigns that connect and inspire.", imageUrl: "https://placehold.co/400x400/3b82f6/white?text=Priya" },
    { name: "David Lee", title: "Operations Manager", bio: "David ensures your order gets to you quickly and safely, overseeing all logistics and supply chain.", imageUrl: "https://placehold.co/400x400/60a5fa/white?text=David" },
    { name: "Sofia Rodriguez", title: "Customer Support Lead", bio: "Sofia and her team are dedicated to providing friendly and effective support for our valued customers.", imageUrl: "https://placehold.co/400x400/93c5fd/white?text=Sofia" }
  ];

  return (
    <div className="bg-white py-12 sm:py-16 rounded-lg shadow-lg">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600">Our Experts</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Meet the Team Behind Zenith
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We are a dedicated group of tech enthusiasts, designers, and customer advocates united by a single goal: to bring you the best products with an exceptional experience.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map(member => (
              <TeamMemberCard key={member.name} {...member} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
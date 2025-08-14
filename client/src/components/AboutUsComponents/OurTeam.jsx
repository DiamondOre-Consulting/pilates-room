import React from "react";

const teamMembers = [
  {
    picture:
      "https://res.cloudinary.com/dmpkp9ux2/image/upload/v1755149660/IMG_2124_qj5g12.jpg",
    fullName: "Shivani",
    designation: "Founder & Lead Instructor",
    bio: `Shivani is a certified Classical Pilates instructor with a deep understanding of the method's history, principles, and application. Her passion for teaching shines through in every session, as she guides clients with meticulous instruction, personalized attention, and a genuine commitment to their success.\n\nWhat motivates Shivani?\n\n- Witnessing the positive impact of Classical Pilates on her clients' lives\n- Sharing the knowledge of this timeless practice with the North Indian community\n- Building a supportive community where everyone feels empowered to reach their fitness goals`,
  },
  {
    picture:
      "https://st4.depositphotos.com/9998432/24360/v/450/depositphotos_243600690-stock-illustration-person-gray-photo-placeholder-girl.jpg",
    fullName: "Jamjuree",
    designation: "Classical Pilates Instructor",
    bio: `Sharing Shivani's passion for Classical Pilates, Jamjuree brings her own unique experience and expertise to The Pilates Room. With a strong foundation in the principles of the practice, Jamjuree creates a supportive and encouraging environment where clients feel empowered to reach their full potential. Her meticulous attention to detail ensures proper form and technique for optimal results.\n\nTogether, Shivani and Jamjuree offer a combined wealth of knowledge and a genuine commitment to your well-being. They are dedicated to tailoring sessions to your individual needs and goals, ensuring a safe and rewarding Pilates experience.`,
  },
];

const TeamMemberItem = ({ member, index }) => (
  <div
    className={`flex flex-col ${
      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
    } items-center gap-8 md:gap-12 my-16 max-w-6xl mx-auto px-4`}
  >
    {/* Image Section */}
    <div className="w-full md:w-1/2 lg:w-2/5">
      <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg">
        <img
          src={member.picture}
          alt={member.fullName}
          className="w-full h-full object-cover object-top  hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
      </div>
    </div>

    {/* Text Section */}
    <div className="w-full md:w-1/2 lg:w-3/5">
      <div className="h-full flex flex-col justify-center">
        <h3 className="text-3xl md:text-4xl font-bold mb-2">
          {member.fullName}
        </h3>
        <p className="text-lg text-[#FF6950] font-medium mb-6">
          {member.designation}
        </p>
        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
          {member.bio}
        </p>
      </div>
    </div>
  </div>
);

const OurTeam = () => {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-[#0b1727]">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Meet The Team</h2>
          <p className="text-xl font-semibold text-[#FF6950] mb-4">
            Your Guides to a Stronger, Healthier You
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            The Pilates Room is a passionate team dedicated to helping you
            achieve your fitness goals through the transformative power of
            Classical Pilates. We are dedicated to teaching and practicing the
            traditional exercises and ideas taught by Joseph Pilates. All of our
            Pilates teachers are classically and comprehensively trained with
            500+ hour comprehensive teacher training across all Pilates
            apparatus.
          </p>
        </div>

        {/* Team Members */}
        <div className="space-y-20">
          {teamMembers.map((member, index) => (
            <TeamMemberItem member={member} index={index} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeam;

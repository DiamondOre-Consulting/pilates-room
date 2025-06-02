import React from "react";

const teamMembers = [
  {
    picture:
      "https://st4.depositphotos.com/9998432/24360/v/450/depositphotos_243600690-stock-illustration-person-gray-photo-placeholder-girl.jpg",
    fullName: "Shivani",
    designation: "Founder & Lead Instructor",
    bio: `Shivani is a certified Classical Pilates instructor with a deep understanding of the method's history, principles, and application. Her passion for teaching shines through in every session, as she guides clients with meticulous instruction, personalized attention, and a genuine commitment to their success.\n\nWhat motivates Shivani?\n\n- Witnessing the positive impact of Classical Pilates on her clients' lives.\n- Sharing the knowledge of this timeless practice with the North Indian community.\n- Building a supportive community where everyone feels empowered to reach their fitness goals.`,
  },
  {
    picture:
      "https://st4.depositphotos.com/9998432/24360/v/450/depositphotos_243600690-stock-illustration-person-gray-photo-placeholder-girl.jpg",
    fullName: "Jamjuree",
    designation: "Classical Pilates Instructor",
    bio: `Sharing Shivani's passion for Classical Pilates, Jamjuree brings her own unique experience and expertise to The Pilates Room. With a strong foundation in the principles of the practice, Jamjuree creates a supportive and encouraging environment where clients feel empowered to reach their full potential. Her meticulous attention to detail ensures proper form and technique for optimal results. Together, Shivani and Jamjuree offer a combined wealth of knowledge and a genuine commitment to your well-being. They are dedicated to tailoring sessions to your individual needs and goals, ensuring a safe and rewarding Pilates experience.`,
  },
];

const TeamMemberItem = ({ member, index }) => (
  <div className="grid md:grid-cols-12 md:mx-40 mt-12">
    <div
      className={`col-span-12 md:col-span-5 ${
        index % 2 === 0 && "md:order-2 md:col-start-8"
      }`}
    >
      <img
        src={member.picture}
        alt={member.fullName}
        className="h-auto mx-auto w-full rounded-lg"
      />
    </div>

    <div
      className={`col-span-12 md:col-span-6 mt-4 md:mt-0 ${
        index % 2 === 1 && "md:col-start-7"
      }`}
    >
      <div className="h-full flex flex-col justify-center">
        <h4 className="text-4xl font-medium mb-1">{member.fullName}</h4>
        <p className="mb-6">{member.designation}</p>

        <p className="opacity-80 whitespace-pre-line mb-0">{member.bio}</p>
      </div>
    </div>
  </div>
);

const OurTeam = () => {
  return (
    <div>
      <section className="ezy__team20 light py-14 md:py-24 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white">
        <div className="px-4 mx-auto">
          <div className="flex justify-center text-center">
            <div className="sm:max-w-lg">
              <h3 className="text-3xl leading-none md:text-[45px] font-bold">
                Meet The Team
              </h3>
              <p className="text-lg font-semibold">
                Your Guides to a Stronger, Healthier You
              </p>
              <p className="font-medium opacity-80 leading-wide tracking-wide mt-4 mb-12">
                The Pilates Room is a passionate team dedicated to helping you
                achieve your fitness goals through the transformative power of
                Classical Pilates. We are dedicated to teaching and practicing
                the traditional exercises and ideas taught by Joseph Pilates.
                All of our Pilates teachers are classically and comprehensively
                trained. This means that our instructors have been through a
                500+ hour comprehensive teacher training program across all of
                the Pilates apparatus. Meet our inspiring minds below!
              </p>
            </div>
          </div>
          {teamMembers.map((member, i) => (
            <TeamMemberItem member={member} index={i + 1} key={i} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default OurTeam;

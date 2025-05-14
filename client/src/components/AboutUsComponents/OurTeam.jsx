import React from 'react'



const teamMembers = [
	{
		img: "https://cdn.easyfrontend.com/pictures/team/team_square_1.jpeg",
		name: "Aksay Kumar",
		designation: "Founder / CEO",
	},
	{
		img: "https://cdn.easyfrontend.com/pictures/team/team_square_2.jpeg",
		name: "Raima Ray",
		designation: "Business Head",
	},
	{
		img: "https://cdn.easyfrontend.com/pictures/team/team_square_4.jpeg",
		name: "Elicia Perry",
		designation: "Marketing Head",
	},
	{
		img: "https://cdn.easyfrontend.com/pictures/team/team_square_3.jpeg",
		name: "Arjun Kapur",
		designation: "UI Designer",
	},
];

const TeamMemberItem = ({ member }) => (
	<div className="bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-4">
		<div>
			<img
				src={member.img}
				alt={member.name}
				className="w-full rounded-t-2xl"
			/>
			<div className="p-3">
				<h5 className="text-xl mb-1 font-bold">{member.name}</h5>
				<p className="text-sm opacity-75">{member.designation}</p>
			</div>
		</div>
	</div>
);

const OurTeam = () => {
  return (
    <div>
         	<section className="ezy__team20 light py-14 md:py-24 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white">
			<div className="container px-4 mx-auto">
				<div className="flex justify-center text-center">
					<div className="sm:max-w-lg">
						<h3 className="text-3xl leading-none md:text-[45px] font-bold">
							Our Team Member
						</h3>
						<p className="font-medium opacity-60 mt-4 mb-12">
							Assumenda non repellendus distinctio nihil dicta sapiente,
							quibusdam maiores, illum at, aliquid blanditiis eligendi qui.
						</p>
					</div>
				</div>
				<div className="grid grid-cols-4 gap-6">
					{teamMembers.map((member, i) => (
						<div className="col-span-4 sm:col-span-2 lg:col-span-1" key={i}>
							<TeamMemberItem member={member} />
						</div>
					))}

			
				</div>
			</div>
		</section>
    </div>
  )
}

export default OurTeam
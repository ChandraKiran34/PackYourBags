import React from 'react';
import "../AboutUs/Styles/AboutUsCards.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const AboutUsCards = () => {
  const teamMembers = [
    {
      photo: 'src/Assets/Araku.jpg',
      name: 'Chandra Kiran',
      role: 'Admin',
      description: 'Chandra Kiran oversees the administration and ensures smooth operations...',
    },
    {
      name: 'Abhinav Mars',
      role: 'Member',
      description: 'Abhinav Mars contributes his expertise as a valuable member of the team...',
    },
    {
      name: 'Manikanta Rayudu',
      role: 'Member',
      description: 'Manikanta Rayudu brings extensive experience and skills to the team...',
    },
    {
      name: 'S V S Apparao',
      role: 'Member',
      description: 'S V S Apparao plays a crucial role in supporting the team with his diverse skills...',
    },
    {
      name: 'Nagaram Akash',
      role: 'Member',
      description: 'Nagaram Akash is a dedicated team member focused on delivering exceptional results...',
    },
  ];

  return (
    <div className="about-us">
      <h1>Our Team</h1>
        <p> Lorem ipsum dolor sit at. chitecto pariatur blanditiis!</p>
      <div className="team-members">

        
        {teamMembers.map((member, index) => (
          <div key={index} className="team-member">
            <FontAwesomeIcon icon={faUser} className="team-member-icon" />
            <h3>{member.name}</h3>
            <p>{member.role}</p>
            <p>{member.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUsCards;

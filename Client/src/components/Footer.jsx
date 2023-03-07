import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faLinkedin, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';


const Footer = () => {
    const socialLinks = [
        { icon: faYoutube, link: 'https://www.youtube.com/' },
        { icon: faLinkedin, link: 'https://www.linkedin.com/' },
        { icon: faFacebook, link: 'https://www.facebook.com/' },
        { icon: faInstagram, link: 'https://www.instagram.com/' },
    ];

    return (
        <footer style={{ backgroundColor: '#19052a', color: 'white', padding: '4rem 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                </div> 
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                {socialLinks.map((socialLink, index) => (
                    <a key={index} href={socialLink.link} target="_blank" rel="noopener noreferrer" style={{ marginRight: '1.5rem' }}>
                        <FontAwesomeIcon icon={socialLink.icon} size="2x" style={{ color: 'white' }} />
                    </a>
                ))}
            </div>
            <p style={{ textAlign: 'center', margin: 0 }}>© {new Date().getFullYear()} DEVMEET. All rights reserved.</p>
        </footer>
    );
};

export default Footer;

import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Section from './components/Section';
import './App.css';

const App = () => {
  useEffect(() => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        section.scrollIntoView({ behavior: 'smooth' });
      });
    });

    // Active section highlighting
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      const navLinks = document.querySelectorAll('nav a');
      
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 150) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href').slice(1) === current ? '#ffd700' : 'white';
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Navbar />
      <Section id="home">
        <h1>Welcome to Jingya's Home</h1>
        <p>Welcome to my personal website! I'm excited to share my journey with you.</p>
      </Section>
      <Section id="about" title="About Me">
        <p>I am passionate about creating meaningful digital experiences and solving complex problems.</p>
      </Section>
      <Section id="portfolio" title="Portfolio">
        <p>Here are some of my recent projects and achievements.</p>
      </Section>
      <Section id="contact" title="Contact">
        <p>Get in touch with me for collaborations and opportunities.</p>
      </Section>
    </>
  );
};

export default App;

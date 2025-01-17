import Logo from '../../assets/images/EngageGPTLogoIocn.png';
import { footerSections } from '../../assets/data/footerData';
import { Socials } from './Socials';

function Footer() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-sky-900">
      <footer className="bg-sky-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 justify-around items-start">
            <div className="flex flex-col">
              <div
                className="flex items-center justify-start cursor-pointer"
                onClick={() => scrollToSection('home')}
              >
                <img src={Logo} alt="Logo" className="h-12 mr-3" />
                <span className="font-medium text-2xl">EngageGPT</span>
              </div>
            </div>
            {footerSections.map((section, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold mb-2">{section.title}</h3>
                <ul>
                  {section.links.map((link, idx) => (
                    <li key={idx} className="mb-2">
                      {link.icon ? (
                        <a
                          href={link.href}
                          target={link.target || '_self'}
                          rel={link.rel || undefined}
                          className="flex items-center"
                        >
                          <link.icon className="h-5 w-5 mr-2" />
                          {link.label}
                        </a>
                      ) : link.section ? (
                        <p
                          onClick={() => scrollToSection(link.section)}
                          className="cursor-pointer"
                        >
                          {link.label}
                        </p>
                      ) : (
                        <a
                          href={link.href}
                          target={link.target || '_self'}
                          rel={link.rel || undefined}
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <Socials />
          </div>
        </div>
      </footer>
      <div className=" z-40 flex w-full bg-sky-900 items-center justify-center">
        <h2 className="text-center z-10 mb-10 w-full text-5xl lg:text-8xl bg-sky-900 text-sky-800">
          {'AI for LinkedIn'.split('').map((child, idx) => (
            <span className="hoverText h-56 w-full" key={idx}>
              {child}
            </span>
          ))}
        </h2>
      </div>
      <p className="text-white text-2xl text-center mb-4">
        Made with ❤️ in India
      </p>
    </div>
  );
}

export default Footer;

import Logo from '../assets/images/EngageGPTLogoIocn.png';
import { footerSections } from '../assets/data/footerData';

function Footer() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className='bg-sky-900 text-white py-8'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          <div
            className='flex items-start justify-center cursor-pointer'
            onClick={() => scrollToSection('home')}
          >
            <img src={Logo} alt='Logo' className='h-8 mr-2' />
            <span className='font-medium text-lg'>EngageGPT</span>
          </div>
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className='text-lg font-semibold mb-2'>{section.title}</h3>
              <ul>
                {section.links.map((link, idx) => (
                  <li key={idx} className='mb-2'>
                    {link.icon ? (
                      <a href={link.href} target={link.target || '_self'} rel={link.rel || undefined} className='flex items-center'>
                        <link.icon className='h-5 w-5 mr-2' />
                        {link.label}
                      </a>
                    ) : link.section ? (
                      <p onClick={() => scrollToSection(link.section)} className='cursor-pointer'>
                        {link.label}
                      </p>
                    ) : (
                      <a href={link.href} target={link.target || '_self'} rel={link.rel || undefined}>
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;

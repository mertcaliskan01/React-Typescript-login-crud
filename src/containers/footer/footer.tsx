import './footer.css';

const currentDate = new Date();

const Footer = () => (
  <div className="book_app__footer section__padding">
    <div className="book_app__footer-heading">
      <a href="https://www.digitalocean.com/?refcode=15a21394c7c7&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge"><img src="https://web-platforms.sfo2.cdn.digitaloceanspaces.com/WWW/Badge%201.svg" alt="DigitalOcean Referral Badge" /></a>
      <a href="https://www.digitalocean.com/?refcode=15a21394c7c7&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge"><img src="https://web-platforms.sfo2.digitaloceanspaces.com/WWW/Badge%203.svg" alt="DigitalOcean Referral Badge" /></a>
      <a href="https://www.digitalocean.com/?refcode=15a21394c7c7&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge"><img src="https://web-platforms.sfo2.digitaloceanspaces.com/WWW/Badge%202.svg" alt="DigitalOcean Referral Badge" /></a>
    </div>

    <div className="book_app__footer-copyright">
      
      <p>{currentDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })}</p>
    </div>
  </div>
);

export default Footer;

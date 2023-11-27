import '../styles/contact.css';
import facebook from '../utils/facebook.png';
import instagram from '../utils/instagram.png';

const Contact = () => {
    return (
        <div className="contact">
            <img src={facebook} alt="facebook" />
            <img src={instagram} alt="instagram" />
            <p>@Copyright</p>
        </div>
    )
}

export default Contact;
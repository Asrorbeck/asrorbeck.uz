import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="container">
        <div className="not-found__wrapper">
          <div className="not-found__content">
            <h1 className="not-found__title">404</h1>
            <h2 className="not-found__subtitle">Sahifa topilmadi</h2>
            <p className="not-found__message">
              Kechirasiz, siz qidirayotgan sahifa mavjud emas yoki o'chirilgan.
            </p>
            <div className="not-found__actions">
              <Link to="/" className="not-found__button not-found__button--primary">
                Bosh sahifaga qaytish
              </Link>
              <Link to="/blog" className="not-found__button not-found__button--secondary">
                Blogni ko'rish
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;


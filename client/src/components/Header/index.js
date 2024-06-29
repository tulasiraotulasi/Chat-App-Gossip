import SmsIcon from "@mui/icons-material/Sms";
import { FcGlobe } from "react-icons/fc";
import "./index.css";

const Header = () => {
  return (
    <div className="Header">
      <h1>
        Gossip...
        <FcGlobe size={50} />
      </h1>
      <h5>
        Global Chat Loading...
        <SmsIcon fontSize="medium" color="info" />
      </h5>
    </div>
  );
};

export default Header;

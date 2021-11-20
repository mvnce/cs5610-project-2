import { useDispatch } from "react-redux";
import { ACTION_TYPE, GAME_MODE } from "../constants";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectGameModeHandler = (mode) => {
    dispatch({
      type: ACTION_TYPE.CLICK_RESET,
      mode: mode,
    });

    navigate("/gameplay", { replace: true });
  };

  return (
    <div className="primary-container">
      <div className="home-container">
        <div className="header-title">Please choose a mode</div>
        <div
          className="primary-button button-unselected"
          onClick={() => selectGameModeHandler(GAME_MODE.FREE)}
        >
          Free Mode
        </div>
        <div
          className="primary-button button-unselected"
          onClick={() => selectGameModeHandler(GAME_MODE.BOT)}
        >
          AI Mode
        </div>
      </div>
    </div>
  );
};

export default Home;

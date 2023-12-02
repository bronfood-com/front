import Popup from '../../Popup/Popup';
import InfoImage from '../../../InfoImage/InfoImage';

const PopupSignupSuccess = () => {
    return (
        <Popup title="Спасибо за регистрацию!" mode="info">
            <InfoImage mode="red_tube" />
        </Popup>
    );
};

export default PopupSignupSuccess;

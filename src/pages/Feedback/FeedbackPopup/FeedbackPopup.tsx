import { useNavigate } from 'react-router-dom';
import Popup from '../../../components/Popups/Popup/Popup';
import Button from '../../../components/Button/Button';
import { Form, useForm } from 'react-hook-form';
import styles from './FeedbackPopup.module.scss';

function FeedbackPopup() {
    const { /* register, */ control } = useForm();
    const navigate = useNavigate();
    const onClose = () => {
        navigate('/');
    };
    return (
        <Popup title="Обратная связь" arrowBack onClose={onClose}>
            <div className={styles.FeedbackPopup__layout}>
                <div>+7 (999) 999-99-99</div>
                <Form control={control}>
                    <input></input>
                    <Button>Отправить</Button>
                </Form>
                <div>О нас</div>
                <div>Превью</div>
                <div>Договор оферты</div>
                <div>Политика конфиденциальности</div>
            </div>
        </Popup>
    );
}

export default FeedbackPopup;

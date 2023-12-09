import { useState } from 'react';
import Button from '../../../Button/Button';
import Form from '../../../Form/Form';
import FormInputs from '../../../FormInputs/FormInputs';
import Input from '../../../Input/Input';
import Popup from '../../Popup/Popup';
import styles from './CardDetails.module.scss';

const CardDetails = () => {
    const onSubmit = () => {};
    const [isSaving, setIsSaving] = useState(false);
    const handleChangeSaveStatus = () => {
        setIsSaving(!isSaving);
    }
    return (
        <Popup title={'Реквизиты'}>
            <Form name="form-card-details" onSubmit={onSubmit}>
                <FormInputs>
                    <Input type="number" name="input_card_number" placeholder="0000 0000 0000 0000" nameLabel="Номер карты"></Input>
                    <Input type="text" name="input_card_cardholder" placeholder="Владислав Иванов" nameLabel="Имя Фамилия"></Input>
                    <div className={styles.details__input_twins}>
                        <Input type="number" name="input_card_expire" placeholder="05/2025" nameLabel="Месяц/год"></Input>
                        <Input type="number" name="input_card_cvv" placeholder="123" nameLabel="CVV"></Input>
                    </div>
                    <div className={styles.details__saving}>
                        <button className={`${styles.details__button} ${isSaving ? styles.details__button_active : styles.details__button_inactive}`} type='button' onClick={handleChangeSaveStatus}></button>
                        <p className={styles.details__button_title}>Сохранить данные</p>
                    </div>
                </FormInputs>
                <Button>Далее</Button>
            </Form>
        </Popup>
    );
};

export default CardDetails;

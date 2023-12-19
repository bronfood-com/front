import Button from '../../../Button/Button';
import Form from '../../../Form/Form';
import Input from '../../../Input/Input';
import Popup from '../../Popup/Popup';
import styles from './SignIn.module.scss';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { regexPassword } from '../../../../utils/consts';
import InputPhone from '../../../InputPhone/InputPhone';

const SignIn = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit: SubmitHandler<FieldValues> = () => {};
    return (
        <Popup title={'Вход'}>
            <Form name="form-signin" onSubmit={handleSubmit(onSubmit)}>
                <div className={`${styles.form__notice} ${styles.form__notice_invisible}`}>
                    <div className={styles.form__warning}></div>
                    <span className={styles.form__error}>Телефон или пароль введен неверно, повторите попытку еще раз.</span>
                </div>
                <InputPhone register={register} errors={errors}></InputPhone>
                <Input type="password" name="input_password" placeholder="******" nameLabel="Пароль" register={register} errors={errors} pattern={regexPassword}></Input>
                <a href="/" className={`${styles.link_recovery} link`}>
                    Забыли пароль?
                </a>
                <Button>Вход</Button>
                <a href="/" className={`${styles.link_registration} link`}>
                    Регистрация
                </a>
            </Form>
        </Popup>
    );
};

export default SignIn;

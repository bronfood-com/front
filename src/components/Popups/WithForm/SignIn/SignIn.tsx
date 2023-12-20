import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../Button/Button';
import Form from '../../../Form/Form';
import FormInputs from '../../../FormInputs/FormInputs';
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
    const navigate = useNavigate();
    const onSubmit: SubmitHandler<FieldValues> = () => {
        navigate('/');
    };
    return (
        <Popup title={'Вход'}>
            <Form name="form-signin" onSubmit={handleSubmit(onSubmit)}>
                <div className={`${styles.form__notice} ${styles.form__notice_invisible}`}>
                    <div className={styles.form__warning}></div>
                    <span className={styles.form__error}>Телефон или пароль введен неверно, повторите попытку еще раз.</span>
                </div>
                <FormInputs>
                    <InputPhone register={register} errors={errors}></InputPhone>
                    <Input type="password" name="input_password" placeholder="******" nameLabel="Пароль" register={register} errors={errors} pattern={regexPassword}></Input>
                </FormInputs>

                <Link to="/recovery_pass" className={`${styles.link_recovery} link`}>
                    Забыли пароль?
                </Link>
                <Button>Вход</Button>
                <Link to="/signup" className={`${styles.link_registration} link`}>
                    Регистрация
                </Link>
            </Form>
        </Popup>
    );
};

export default SignIn;

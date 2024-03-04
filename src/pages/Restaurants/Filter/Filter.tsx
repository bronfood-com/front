import { useEffect, MouseEvent, useState, useId } from 'react';
import styles from './Filter.module.scss';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Option from './Option/Option';

const OptionList = ({ options, selected, action }) => {
    return (
        <ul className={`${styles.filter__options} ${!selected && styles.filter__options_nowrap}`}>
            {options.map((option) => (
                <li key={option.id}>
                    <Option text={option.name} selected={selected} action={() => action(option)} />
                </li>
            ))}
        </ul>
    );
};

const Filter = ({ options, close, selectedOptions, setSelectedOptions }) => {
    const [suggestedOptions, setSuggestedOptions] = useState([]);
    const { t } = useTranslation();
    const id = useId();
    const navigate = useNavigate();
    const selectOption = (option) => {
        const isDouble = selectedOptions.find((opt) => opt.id === option.id);
        if (isDouble) {
            return;
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };
    const deleteOption = (option) => {
        setSelectedOptions(selectedOptions.filter((opt) => opt.id !== option.id));
    };
    const handleChange = (e) => {
        const userInput = e.target.value;
        if (userInput) {
            const linked = options.filter((opt) => opt.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1);
            setSuggestedOptions(linked);
        } else {
            setSuggestedOptions([]);
        }
    };
    const handleOverlayClick = (e: MouseEvent) => {
        if (e.target === e.currentTarget) {
            navigate('/restaurants');
        }
    };
    useEffect(() => {
        const handleCloseByEsc = (e: KeyboardEvent) => (e.key === 'Escape' || e.key === 'Esc') && navigate('/restaurants');
        document.addEventListener('keydown', handleCloseByEsc);
        return () => document.removeEventListener('keydown', handleCloseByEsc);
    });
    return (
        <div className={styles.filter_overlay} onClick={handleOverlayClick}>
            <div className={styles.filter}>
                <div className={styles.filter__title_container}>
                    <button className={styles.filter__icon_back} type="button" onClick={close} />
                    <p className={`${styles.filter__text} ${styles.filter__text_bold}`}>{t('pages.filter.filters')}</p>
                </div>
                <div className={styles.filter__search_container}>
                    <label htmlFor={id} className={styles.filter__text}>
                        {t('pages.filter.enterSearchString')}
                    </label>
                    <div className={styles.filter__options_container}>
                        <div className={styles.filter__input_container}>
                            <div className={styles.filter__icon_search} />
                            <input id={id} onChange={handleChange} className={styles.filter__input} type="text" placeholder={t('pages.filter.placeholder')} />
                        </div>
                        <div className={styles.filter__options_list}>
                            <OptionList options={suggestedOptions} selected={false} action={selectOption} />
                            <OptionList options={selectedOptions} selected={true} action={deleteOption} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filter;

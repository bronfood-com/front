import { useEffect, MouseEvent, useState, useId, ChangeEvent } from 'react';
import styles from './Filter.module.scss';
import { useTranslation } from 'react-i18next';
import OptionElement from './Option/Option';
import { useRestaurants } from '../../../utils/hooks/useRestaurants/useRestaurants';
import { Option } from '../../../contexts/RestaurantsContext';

const OptionList = ({ options, selected, action }: { options: Option[]; selected: boolean; action: (option: Option) => void }) => {
    return (
        <ul className={`${styles.filter__options} ${!selected && styles.filter__options_nowrap}`}>
            {options.map((option) => (
                <li key={option.id}>
                    <OptionElement text={option.name} selected={selected} action={() => action(option)} />
                </li>
            ))}
        </ul>
    );
};

const Filter = () => {
    const { options, filter } = useRestaurants();
    const [suggestedOptions, setSuggestedOptions] = useState<Option[]>([]);
    const { t } = useTranslation();
    const id = useId();
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const userInput = e.target.value;
        if (userInput) {
            const linked = options.all.filter((opt) => opt.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1);
            setSuggestedOptions(linked);
        } else {
            setSuggestedOptions([]);
        }
    };
    const handleOverlayClick = (e: MouseEvent) => {
        if (e.target === e.currentTarget) {
            filter.close();
        }
    };
    useEffect(() => {
        const handleCloseByEsc = (e: KeyboardEvent) => (e.key === 'Escape' || e.key === 'Esc') && filter.close();
        document.addEventListener('keydown', handleCloseByEsc);
        return () => document.removeEventListener('keydown', handleCloseByEsc);
    });
    return (
        <div className={styles.filter_overlay} onClick={handleOverlayClick}>
            <div className={styles.filter}>
                <div className={styles.filter__title_container}>
                    <button className={styles.filter__icon_back} type="button" onClick={filter.close} />
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
                            <OptionList options={suggestedOptions} selected={false} action={options.addOption} />
                            <OptionList options={options.selectedOptions} selected={true} action={options.deleteOption} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filter;

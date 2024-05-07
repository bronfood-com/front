import { useTranslation } from 'react-i18next';
import styles from './MealsFilter.module.scss';
import { MealType } from '../../../../utils/api/restaurantsService/restaurantsService';
import ChipWithIcon from './ChipWithIcon/ChipWithIcon';

type MealsFilterProps = {
    types: MealType[];
    selectedTypes: MealType[];
    addType: (type: MealType) => void;
    deleteType: (type: MealType) => void;
};

function MealsFilter({
    types,
    selectedTypes,
    addType,
    deleteType,
}: MealsFilterProps) {
    const { t } = useTranslation();
    return (
        <ul className={`${styles.meals_filter}`}>
            {types.map((type) => {
                const isActive = selectedTypes.includes(type);
                return (
                    <li key={type}>
                        <ChipWithIcon
                            text={t(`pages.restaurant.${type}`)}
                            icon={type}
                            isActive={isActive}
                            add={() => addType(type)}
                            delete={() => deleteType(type)}
                        />
                    </li>
                );
            })}
        </ul>
    );
}

export default MealsFilter;

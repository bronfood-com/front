import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FieldValues, SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import { useRestaurants } from '../../utils/hooks/useRestaurants/useRestaurants';
import { useBasket } from '../../utils/hooks/useBasket/useBasket';
import MealPopup from './MealPopup/MealPopup';
import MealImage from './MealImage/MealImage';
import MealDescription from './MealDescription/MealDescription';
import MealTotal from './MealTotal/MealTotal';
import MealFeatureList from './MealFeatureList/MealFeatureList';
import Preloader from '../../components/Preloader/Preloader';
import { Feature, Meal, Restaurant } from '../../utils/api/restaurantsService/restaurantsService';
import { sumBy } from 'lodash';

function MealPage() {
    const [features, setFeatures] = useState<Feature[]>([]);
    const navigate = useNavigate();
    const params = useParams();
    const { restaurantsOnMap } = useRestaurants();
    const { addMeal, isLoading } = useBasket();
    const methods = useForm();
    const { watch } = methods;
    const restaurant: Restaurant | undefined = restaurantsOnMap.find((restaurant) => restaurant.id === params.restaurantId);
    const meal: Meal | undefined = restaurant && restaurant.meals.find((meal) => meal.id === params.mealId);
    const price = sumBy(features, (feature) => {
        const isChosen = feature.choices.some((choice) => choice.chosen);
        if (isChosen) {
            return feature.choices.filter((choice) => choice.chosen)[0].price;
        } else {
            return feature.choices.filter((choice) => choice.default)[0].price;
        }
    });
    const goBack = () => {
        navigate(`/restaurants/${params.restaurantId}`);
    };
    const close = () => {
        navigate('/restaurants');
    };
    useEffect(() => {
        const formValues = watch((value, { name }) => {
            const nextFeatures = features.map((feature: Feature) => {
                if (feature.name === name) {
                    const choices = feature.choices.map((choice) => {
                        if (choice.name === value[name]) {
                            return { ...choice, chosen: true };
                        } else return { ...choice, chosen: false };
                    });
                    return { ...feature, choices };
                } else return feature;
            });
            setFeatures(nextFeatures);
        });
        return () => formValues.unsubscribe();
    }, [watch, features]);

    useEffect(() => {
        if (meal) {
            setFeatures(meal.features);
        }
    }, [meal]);

    if (meal && meal.features.length > 0) {
        const onSubmit: SubmitHandler<FieldValues> = async () => {
            await addMeal(meal.id, features);
            goBack();
        };
        return (
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <MealPopup goBack={goBack} close={close}>
                        <MealImage image={meal.photo} />
                        <MealDescription name={meal.name} description={meal.description} />
                        <MealFeatureList features={meal.features} />
                        <MealTotal price={price} buttonDisabled={isLoading} />
                        {isLoading && <Preloader />}
                    </MealPopup>
                </form>
            </FormProvider>
        );
    }
}

export default MealPage;

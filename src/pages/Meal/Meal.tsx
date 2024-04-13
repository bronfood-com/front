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
import { useEffect, useState } from 'react';

function Meal() {
    const [features, setFeatures] = useState([]);
    const navigate = useNavigate();
    const params = useParams();
    const { restaurantsFiltered } = useRestaurants();
    const { addMeal, isLoading } = useBasket();
    const methods = useForm();
    const { watch } = methods;
    const restaurant: RestaurantProps | undefined = restaurantsFiltered.find((restaurant) => restaurant.id === params.restaurantId);
    const meal = restaurant.meals.find((meal) => meal.id === params.mealId);
    const featuresPrice = features.reduce((acc, current) => {
        const selectedChoice = current.choices.find((choice) => choice.default === true);
        return acc + selectedChoice.price;
    }, 0);
    const goBack = () => {
        navigate(`/restaurants/${params.restaurantId}`);
    };
    const close = () => {
        navigate('/restaurants');
    };
    const onSubmit: SubmitHandler<FieldValues> = async () => {
        await addMeal(meal.id);
        goBack();
    };
    useEffect(() => {
        const formValues = watch((value, { name }) => {
            const nextFeatures = features.map((feature) => {
                if (feature.name === name) {
                    const choices = feature.choices.map((choice) => {
                        if (choice.name === value[name]) {
                            return { ...choice, default: true };
                        } else return { ...choice, default: false };
                    });
                    return { ...feature, choices };
                } else return feature;
            });
            setFeatures(nextFeatures);
        });
        return () => formValues.unsubscribe();
    }, [watch, features]);

    useEffect(() => {
        setFeatures(meal.features);
    }, [meal]);

    if (meal) {
        return (
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <MealPopup goBack={goBack} close={close}>
                        <MealImage image={meal.photo} />
                        <MealDescription name={meal.name} description={meal.description} />
                        <MealFeatureList features={meal.features} />
                        <MealTotal price={meal.price + featuresPrice} />
                        {isLoading && <Preloader />}
                    </MealPopup>
                </form>
            </FormProvider>
        );
    }
}

export default Meal;

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

function Meal() {
    const navigate = useNavigate();
    const params = useParams();
    const { restaurantsFiltered } = useRestaurants();
    const { addMeal, isLoading } = useBasket();
    const methods = useForm();
    const restaurant: RestaurantProps | undefined = restaurantsFiltered.find((restaurant) => restaurant.id === params.restaurantId);
    const meal = restaurant.meals.find((meal) => meal.id === params.mealId);
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
    if (meal) {
        return (
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <MealPopup goBack={goBack} close={close}>
                        <MealImage image={meal.photo} />
                        <MealDescription name={meal.name} description={meal.description} />
                        <MealFeatureList features={meal.features} />
                        <MealTotal price={200} />
                        {isLoading && <Preloader />}
                    </MealPopup>
                </form>
            </FormProvider>
        );
    }
}

export default Meal;

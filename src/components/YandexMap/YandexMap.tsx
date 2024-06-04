import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import styles from './YandexMap.module.scss';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import navigationIcon from '../../vendor/images/icons/navigation.svg';
import placeIcon from '../../vendor/images/icons/navigation_grey.svg';
import placeIconActive from '../../vendor/images/icons/navigation_active.svg';
import { useCurrentUser } from '../../utils/hooks/useCurrentUser/useCurretUser';
import { useRestaurants } from '../../utils/hooks/useRestaurants/useRestaurants';
import { useAllRestaurantsQuery } from '../../utils/hooks/useAllRestaurantsQuery/useAllRestaurantsQuery';
import { useNavigate } from 'react-router-dom';
import { RestaurantWithoutMeals } from '../../utils/api/restaurantsService/restaurantsService';

const YandexMap = ({ setCity }: { setCity: Dispatch<SetStateAction<string>> }) => {
    const [version, setVersion] = useState(0);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { restaurantsFiltered, inView } = useRestaurants();
    const { data, isSuccess } = useAllRestaurantsQuery();
    const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
    const [userLocation, setUserLocation] = useState({ latitude: 43.246345, longitude: 76.921552 });
    const { isLogin } = useCurrentUser();
    const [activePlaceId, setActivePlaceId] = useState<string>('');

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setUserLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });
                setVersion((version) => version + 1);
            });
        }
    }, []);

    useEffect(() => {
        if (inView) {
            setActivePlaceId(inView);
            const place = restaurantsFiltered.find((place) => place.id === inView);
            if (place) {
                setLocation({ latitude: place.coordinates.latitude, longitude: place.coordinates.longitude });
            }
        }
    }, [inView, restaurantsFiltered]);

    const handlePlacemarkClick = (placeId: string, latitude: number, longitude: number) => {
        setLocation({ latitude, longitude });
        navigate(`/restaurants/${placeId}`);
    };

    const center = activePlaceId ? [location.latitude, location.longitude] : [userLocation.latitude, userLocation.longitude];
    return (
        <YMaps key={version} query={{ apikey: '15c31511-a1d5-4084-85c0-96cce06323bf' }}>
            <div className={styles.yamap}>
                <Map
                    state={{ center: center, zoom: 12 }}
                    width="100%"
                    height="100vh"
                    options={{
                        suppressMapOpenBlock: true,
                        yandexMapDisablePoiInteractivity: true, // turn off other balloons
                    }}
                    modules={['geocode']}
                    onLoad={(ymaps) => {
                        ymaps.geocode([userLocation.latitude, userLocation.longitude], { kind: 'locality' }).then((res) => {
                            const city = res.geoObjects.get(0).properties.get('name', { kind: 'locality', name: t('components.header.placeName') });
                            setCity(city.toString());
                        });
                    }}
                    instanceRef={(map) => {
                        if (map) {
                            if (isLogin) {
                                const currentGlobalPixelCenter = map.getGlobalPixelCenter();
                                const newGlobalPixelCenter = [currentGlobalPixelCenter[0], currentGlobalPixelCenter[1] + 170];
                                map.setGlobalPixelCenter(newGlobalPixelCenter);
                            }
                        }
                    }}
                >
                    {userLocation && (
                        //* user
                        <Placemark
                            className={styles.grayscaleMap}
                            geometry={[userLocation.latitude, userLocation.longitude]}
                            options={{
                                preset: 'islands#redDotIcon',
                                iconLayout: 'default#image', // icon mark on map
                                iconImageHref: navigationIcon,
                                iconImageSize: [30, 40],
                                iconImageOffset: [-15, -35],
                            }}
                            properties={{
                                hintContent: 'Вы здесь',
                            }}
                            modules={['geoObject.addon.hint']}
                        />
                    )}
                    //* restaurants
                    {isSuccess &&
                        data.map((place: RestaurantWithoutMeals) => {
                            const marked = activePlaceId === place.id.toString();
                            return (
                                <Placemark
                                    key={place.id}
                                    geometry={[place.coordinates.latitude, place.coordinates.longitude]}
                                    options={{
                                        preset: 'islands#redDotIcon',
                                        iconLayout: 'default#image',
                                        iconImageHref: marked ? placeIconActive : placeIcon,
                                        iconImageSize: [30, 40],
                                        iconImageOffset: [-15, -35],
                                    }}
                                    properties={{
                                        hintContent: place.name, //tooltip(hover)
                                    }}
                                    modules={['geoObject.addon.hint']}
                                    onClick={() => handlePlacemarkClick(place.id.toString(), place.coordinates.latitude, place.coordinates.longitude)}
                                />
                            );
                        })}
                </Map>
            </div>
        </YMaps>
    );
};

export default YandexMap;

import { FC, ButtonHTMLAttributes } from 'react';
import styles from './ButtonRound.module.scss';
import close from '../../vendor/images/icons/restaurant/close.svg';
import add from '../../vendor/images/icons/restaurant/add.svg';
import favourite from '../../vendor/images/icons/restaurant/favorite.svg';
import arrowBack from '../../vendor/images/icons/restaurant/arrow-back.svg';

interface ButtonRound extends ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Button's background color
     */
    backgroundColor: 'orange' | 'white';
    /**
     * Icon inside button
     */
    icon: 'close' | 'add' | 'favourite' | 'arrow-back';
    /**
     * Button's position relative to closest positioned parent
     */
    position: {
        top?: string;
        right?: string;
        bottom?: string;
        left?: string;
    };
}

const ButtonRound: FC<ButtonRound> = ({ backgroundColor = 'white', icon = 'close', position = { top: 0, right: 0, bottom: 0, left: 0 }, ...props }) => {
    return (
        <button
            {...props}
            type="button"
            className={`${styles.button_round}`}
            style={{
                backgroundColor: backgroundColor,
                backgroundImage: `url(${icon === 'close' ? close : icon === 'add' ? add : icon === 'favourite' ? favourite : arrowBack})`,
                opacity: `${backgroundColor === 'white' ? '85%' : '100%'}`,
                width: `${backgroundColor === 'white' ? '43px' : '41px'}`,
                top: position.top,
                right: position.right,
                bottom: position.bottom,
                left: position.left,
            }}
        />
    );
};

export default ButtonRound;

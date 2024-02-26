import React, { useMemo } from 'react';
import styles from './FeedOrder.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { TWebsocketOrder } from '../../../utils/types';
import { useAppSelector } from '../../../utils/hooks';
import { translateStatus } from '../../../utils/functions';

interface FeedOrderProps {
  order: TWebsocketOrder;
  isProfile?: boolean
}

function FeedOrder({ order, isProfile = false }: FeedOrderProps): React.ReactElement {
  const ingredients = useAppSelector((store) => store.ingredients);
  const statusClass = order.status === 'done' ? styles.statusDone : '';
  // Считаем стоимость бургера
  const totalPrice = useMemo(() => {
    return order.ingredients.reduce((acc, ingredientId) => {
      const ingredient = ingredients.find(item => item._id === ingredientId);
      // Если ингредиет найден, проверяем булочка ли это, так как булочку надо считать 2 раза
      return acc + (ingredient ? (ingredient.type === 'bun' ? ingredient.price * 2 : ingredient.price) : 0);
    }, 0);
  }, [order.ingredients, ingredients]);

  // Достаём первые 6 уникальных картинок
  const { ingredientImages, extraImagesCount } = useMemo(() => {
    const allUniqueImages = order.ingredients
      .map(ingredientId => {
        const ingredient = ingredients.find(item => item._id === ingredientId);
        return ingredient ? ingredient.image_mobile : '';
      })
      .filter((image, index, self) => image && self.indexOf(image) === index);

    return {
      ingredientImages: allUniqueImages.slice(0, 6),
      extraImagesCount: allUniqueImages.length > 6 ? allUniqueImages.length - 6 : 0
    };
  }, [order.ingredients, ingredients]);

  return (
    <div className={`${styles.cardOrder} mr-2 mb-4`}>
      <div className={styles.orderID}>
        <p className="text text_type_digits-default">#{order.number.toString().padStart(6, '0')}</p>
        <time className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(order.createdAt)} />
        </time>
      </div>
      <div>
        <h2 className="text text_type_main-medium">{order.name}</h2>
        {isProfile ? <p className={`text text_type_main-default mt-2 ${statusClass}`}>{translateStatus(order.status)}</p> : ''}
      </div>
      <div className={styles.componentsOrder}>
        <div className={styles.imageContainer}>
          {ingredientImages.map((image, index) => (
            <img
              key={index}
              className={styles.image}
              style={{ zIndex: `${ingredientImages.length - index}` }}
              src={image}
              alt="ingredient"
            />
          ))}
          {extraImagesCount > 0 && (
            <div className={styles.imageOverlayContainer}>
              <span className={`${styles.extraImagesCount} text text_type_main-default`}>+{extraImagesCount}</span>
            </div>
          )}
        </div>
        <div className={styles.componentsOrder_price}>
          <span className="text text_type_digits-default">{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}

export default FeedOrder;
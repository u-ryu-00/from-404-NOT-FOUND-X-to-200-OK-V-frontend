import { useForm } from 'react-hook-form';
import { useState } from 'react';
import useShopStore from '../hooks/useShopStore';
import numberFormat from '../utils/numberFormat';
import KakaoPaymentLogo from '../../img/payment_icon_yellow_medium.png';
import Post from './Post';

export default function OrderForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const shopStore = useShopStore();

  const {
    userId,
    productId,
    name,
    description,
    image,
    price,
    inventory,
    quantity,
    totalPrice,
  } = shopStore;

  const onSubmit = async (data) => {
    const {
      receiver, address, zonecode, phoneNumber, deliveryMessage,
    } = data;

    // await shopStore.requestOrder({
    //   userId,
    //   productId,
    //   name,
    //   description,
    //   image,
    //   price,
    //   inventory,
    //   quantity,
    //   receiver,
    //   address,
    //   phoneNumber,
    //   deliveryMessage,
    // });

    await shopStore.requestKakaoPay({
      userId,
      productId,
      name,
      description,
      image,
      price,
      inventory,
      quantity,
      receiver,
      address,
      zonecode,
      phoneNumber,
      deliveryMessage,
      totalPrice,
    });

    window.open(shopStore.kakaoPayPcUrl, '_self');
  };

  const [enrollCompany, setEnrollCompany] = useState({
    address: '',
  });

  console.log(`---${enrollCompany.address}`);
  console.log(`---${enrollCompany.zonecode}`);

  const handleInput = (e) => {
    setEnrollCompany({
      ...enrollCompany,
      [e.target.name]: e.target.value,
    });
  };

  // const handleComplete = (data) => {
  //   let fullAddress = data.address;
  //   let extraAddress = '';

  //   if (data.addressType === 'R') {
  //     if (data.bname !== '') {
  //       extraAddress += data.bname;
  //     }
  //     if (data.buildingName !== '') {
  //       extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
  //     }
  //     fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
  //   }

  //   console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
  // };

  return (
    <div>
      <p>주문서 작성</p>
      <img src={shopStore.image} alt="상품 사진" style={{ width: '45rem', height: '45rem' }} />
      <h1>
        상품 이름 :
        {' '}
        {shopStore.name}
      </h1>
      <h1>
        수량 :
        {' '}
        {shopStore.quantity}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} action="kakao.jsp">
        <script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" />
        <label htmlFor="receiver">받으시는 분*</label>
        <input
          id="receiver"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('receiver', { required: true })}
        />
        {errors.receiver ? (
          <p>받으시는 분 성함을 입력해주세요.</p>
        ) : null}
        <br />
        <div>
          <label htmlFor="address">주소*</label>
          <input
            id="address"
            placeholder="주소"
            type="text"
            required
            name="address"
            onChange={handleInput}
            value={enrollCompany.address}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('address', { required: true })}
          />
        </div>
        <div>
          <label htmlFor="zonecode">우편번호*</label>
          <input
            id="zonecode"
            placeholder="우편번호"
            type="text"
            required
            name="zonecode"
            onChange={handleInput}
            value={enrollCompany.zonecode}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('zonecode', { required: true })}
          />
        </div>
        <Post company={enrollCompany} setcompany={setEnrollCompany} />

        <br />
        <label htmlFor="phoneNumber">휴대전화*</label>
        <input
          id="phoneNumber"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('phoneNumber', { required: true })}
        />
        <br />
        <label htmlFor="deliveryMessage">배송메시지</label>
        <input
          id="deliveryMessage"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('deliveryMessage', { required: true })}
        />
        <p>
          총 합계 :
          {' '}
          {numberFormat(shopStore.totalPrice)}
          원
        </p>
        <button type="submit">결제하기</button>
        <button type="submit"><img src={KakaoPaymentLogo} alt="카카오페이로고" /></button>
      </form>
    </div>
  );
}

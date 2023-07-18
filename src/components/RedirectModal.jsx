import React, { useEffect } from 'react';
import ReactModal from 'react-modal';
import useShopStore from '../hooks/useShopStore';

export default function RedirectModal({ isOpen, closeModal }) {
  const onClick = () => {
    window.location.href
  };
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => closeModal(true)}
    >
      <p>리다이렉팅 중입니다.</p>
      <button type="button" onClick={onClick}>니다이렉트</button>
    </ReactModal>
  );
}

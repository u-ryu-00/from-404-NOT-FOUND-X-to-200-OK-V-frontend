import DaumPostcodeEmbed from 'react-daum-postcode';

export default function Post({ setcompany, company, handleClose }) {
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';
    const { zonecode } = data;

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }

    setcompany({
      ...company,
      address: fullAddress,
      zonecode,
    });

    handleClose(); // 주소 선택이 완료되면 모달/팝업을 닫습니다.
  };

  return (
    <DaumPostcodeEmbed
      onComplete={handleComplete}
    />
  );
}

import DaumPostcodeEmbed from 'react-daum-postcode';

export default function Post(props) {
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

    console.log(data);
    console.log(fullAddress);
    console.log(data.zonecode);
    console.log(data.roadAddress);
    console.log(data.jibunAddress);

    props.setcompany({
      ...props.company,
      address: fullAddress,
      zonecode,

    });
  };

  return (
    <DaumPostcodeEmbed
      onComplete={handleComplete}
      // {...props}
    />
  );
}

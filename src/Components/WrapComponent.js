import React, { useState } from 'react';
import HeaderComponent from './HeaderComponent';
import MainComponent from './MainComponent';
import FooterComponent from './FooterComponent';
import ModalComponent from './ModalComponent';

const WrapComponent = () => {
  //모달 상태관리
  const [modal,setModal] = useState({title:'', isShow:false});

  //모달 보이기 함수
  const modalOpen=(tit)=>{
    setModal({...modal, title:tit, isShow:true});
  }

  //모달 숨기기 함수
  const modalClose=()=>{
    setModal({...modal, isShow:false});
  }

  return (
    <div id="wrap">
      <HeaderComponent />
      <MainComponent modalOpen={modalOpen} />
      <FooterComponent />
      <ModalComponent modal={modal} modalClose={modalClose} />
    </div>
  );
};

export default WrapComponent;
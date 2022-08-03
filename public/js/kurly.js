(function($){

  var chkboxBtn = $('.chkbox-btn');
  var idOk=false;
  var pw1Ok=false;
  var pw2Ok=false;
  var pw3Ok=false;
  var emailOk=false;
  var pwConfirm=false;
  var ok=false;

  //마우스가 입력상자에 클릭 다운되면 가이드 텍스트 보이기(show())
  $('#inputId').on({
    mousedown:function(){
      $('.guide-id').show();
    }
  });

  //키보드가 내려가서 올라올 때(keyup) 점검
  $('#inputId').on({
    keyup:function(event){
      event.preventDefault();
      var regExp = /^(((?=.*[A-Za-z])+(?=.*[0-9])*)+([^가-힣ㄱ-ㅎㅏ-ㅣ!@#$%^&*\(\)-_\=\+\\\{\}\[\]\?\/\.\,\>\<\~\`\:\;\'\"]))[^\s][A-Za-z0-9]{6,}$/g;
      var idValue=$(this).val().toString();

      if(idValue===''){ //입력값이 없으면: 글자가 기본값으로 설정이 되어야 함
        $('.guide-id p').eq(0).removeClass('error');
        $('.guide-id p').eq(0).removeClass('success');
        idOk=false;
      }
      else { //입력값이 있으면, 정규표현식 비교 진위여부
        if(regExp.test(idValue)){
          $('.guide-id p').eq(0).removeClass('error');
          $('.guide-id p').eq(0).addClass('success');
          idOk=true;
        }
        else {
          $('.guide-id p').eq(0).removeClass('success'); //클래스가 삭제되어야 에러가 표시된다
          $('.guide-id p').eq(0).addClass('error');
          idOk=false;
        }
      }
    }
  });

  //아이디 중복확인 함수
  function idDoubleChk(){
    var inputId=$('#inputId').val();
    var ok=false;
    for(let i=0; i<localStorage.length; i++){
      if(JSON.parse(localStorage.getItem(localStorage.key(i))).아이디===inputId){
        ok=true;
      }
    }
    if(ok){
      alert('이미 등록된 아이디입니다.');
      idOk=false;
      $('.guide-id p').eq(1).removeClass('success');
      $('.guide-id p').eq(1).addClass('error');
    }
    else {
      alert('사용 가능한 아이디입니다.');
      idOk=true;
      $('.guide-id p').eq(1).removeClass('error');
      $('.guide-id p').eq(1).addClass('success');
    }
  }


  //아이디 버튼 클릭 이벤트
  $('.id-double-btn').on({
    click:function(e){
      e.preventDefault();
      var regExp = /^(((?=.*[A-Za-z])+(?=.*[0-9])*)+([^가-힣ㄱ-ㅎㅏ-ㅣ!@#$%^&*\(\)-_\=\+\\\{\}\[\]\?\/\.\,\>\<\~\`\:\;\'\"]))[^\s][A-Za-z0-9]{6,}$/g;
      var idValue=$('#inputId').val().toString();

          if(idValue===''){ //입력값이 없으면: 글자가 기본값으로 설정이 되어야 함
            $('.guide-id p').eq(0).removeClass('error');
            $('.guide-id p').eq(0).removeClass('success');
            modal('아이디를 입력해 주세요.'); //모달창 띄우기
            idOk=false;
            return;
          }
          else { //입력값이 있으면, 정규표현식 비교 진위여부
            if(regExp.test(idValue)){
              $('.guide-id p').eq(0).removeClass('error');
              $('.guide-id p').eq(0).addClass('success');
              idOk=true;
              idDoubleChk();
            }
            else {
              $('.guide-id p').eq(0).removeClass('success');
              $('.guide-id p').eq(0).addClass('error');
              modal('아이디는 6자 이상의 영문 혹은 영문과 숫자 조합만 가능합니다'); //모달창 띄우기
              idOk=false;
              return;
            }
          }
    }
  });

  // 가이드 텍스트 보이기: 마우스 다운하면
  $('#inputPw').on({
    mousedown:function(){
      $('.guide-pw').show();
    }
  });

// 비밀번호
  $('#inputPw').on({
    keyup:function(e){
      e.preventDefault();
      var regExp1=/.{10,}/;
      var regExp2=/((?=.*[A-Za-z])+((?=.*[0-9])+|(?=.*[!@#$%&*_-])+)+)[^\s][A-Za-z0-9!@#$%&*_-]{10,}/;
      var regExp3=/(.)\1\1\1/;
      var pwValue=$(this).val().toString();
      //1. 10자 이상
      if(pwValue===''){
        $('.guide-pw p').eq(0).removeClass('error');
        $('.guide-pw p').eq(0).removeClass('success');
        pw1Ok=false;
      }
      else {
        if(regExp1.test(pwValue)){
          $('.guide-pw p').eq(0).removeClass('error');
          $('.guide-pw p').eq(0).addClass('success');
          pw1Ok=true;
        }
        else {
          $('.guide-pw p').eq(0).removeClass('success');
          $('.guide-pw p').eq(0).addClass('error');
          pw1Ok=false;
        }
      }
      //2. 영문 필수+(숫자 또는 특수문자)+ => 2가지 이상 조합
      if(pwValue===''){
        $('.guide-pw p').eq(1).removeClass('error');
        $('.guide-pw p').eq(1).removeClass('success');
        pw2Ok=false;
      }
      else {
        if(regExp2.test(pwValue)){
          $('.guide-pw p').eq(1).removeClass('error');
          $('.guide-pw p').eq(1).addClass('success');
          pw2Ok=true;
        }
        else {
          $('.guide-pw p').eq(1).removeClass('success');
          $('.guide-pw p').eq(1).addClass('error');
          pw2Ok=false;
        }
      }
      //3. 동일한 숫자 3개 이상 연속 사용 불가
      if(pwValue===''){
        $('.guide-pw p').eq(2).removeClass('error');
        $('.guide-pw p').eq(2).removeClass('success');
        pw3Ok=false;
      }
      else {
        if(regExp3.test(pwValue)){ //숫자가 연속 3개 이상 사용했다면
          $('.guide-pw p').eq(2).removeClass('success');
          $('.guide-pw p').eq(2).addClass('error');
          pw3Ok=false;
        }
        else {
          $('.guide-pw p').eq(2).removeClass('error');
          $('.guide-pw p').eq(2).addClass('success');
          pw3Ok=true;
        }
      }
    }
  });

  $('#inputPwConfirm').on({
    mousedown:function(){
      $('.guide-pw-confirm').show();
    }
  })

  // 비밀번호 확인
  $('#inputPwConfirm').on({
    keyup:function(){
      if($(this).val()===''){
        $('.guide-pw-confirm p').removeClass('error');
        $('.guide-pw-confirm p').removeClass('success');
        pwConfirm=false;
      }
      else {
        $('.guide-pw-confirm').show()
        if($('#inputPw').val()===$(this).val()){
          $('.guide-pw-confirm p').removeClass('error');
          $('.guide-pw-confirm p').addClass('success');
          pwConfirm=true;
        }
        else {
          $('.guide-pw-confirm p').removeClass('success');
          $('.guide-pw-confirm p').addClass('error');
          pwConfirm=false;
        }
      }
    }
  });

  // 이름
  $('#inputName').on({
    keyup:function(){
      //영문,한글,공백만 입력 나머진 모두 삭제
      $(this).val($(this).val().toString().replace(/[^A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ\s]/g,''));
    }
  });

  //이메일 - 영문,숫자,특수문자(.-_)
  //시작문자 ^
  //끝문자 $
  // ? 0자 또는 1자

  //입력이 완료되면 우측 버튼을 클릭하여 입력정보데이터를 정규표현식으로 진위여부를 판단하고
  //입력 데이터 오류가 있으면 알림창을 모달창으로 띄운다

  //그리고 오류가 없으면(로컬스토리지에 저장데이터 구현한 후 작업) 저장된 데이터 전체와 입력데이터를 비교하여 중복확인한다

  //이메일 중복체크 함수
  function emailDoubleChk(){
    var inputEmail=$('#inputEmail').val();
    var ok=false;
    for(let i=0; i<localStorage.length; i++){
      if(JSON.parse(localStorage.getItem(localStorage.key(i))).이메일===inputEmail){
        ok=true;
      }
    }

    if(ok){
      alert('중복된 이메일입니다.');
      emailOk=false;
    }
    else {
      alert('사용 가능한 이메일입니다.');
      emailOk=true;
    }
  }

  $('.email-double-btn').on({
    click:function(e){
      e.preventDefault();
      var EmailValue=$('#inputEmail').val();
      var inputEmail=$('#inputEmail');
      var regExpEmail=/^[A-Za-z0-9]([-_\.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_\.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
      var message='';
         //버튼 클릭시 초기화
          inputEmail.removeClass('error');
          if(EmailValue===''){ //입력값이 없으면 알림창 띄우기
            message='이메일 주소를 입력해주세요.';
            modal(message); //모달함수에게 전달인자를 보내줌(Argument)
            emailOk=false;
          }
          else { //입력값이 있으면 정규표현식 검증
            if(regExpEmail.test(EmailValue)===false){
              inputEmail.addClass('error')
              inputEmail.focus();
              message='잘못된 이메일 형식입니다.';
              modal(message);
              emailOk=false;
            }
            else {
              inputEmail.removeClass('error');
              emailOk=true;
              emailDoubleChk();
            }
          }
    }
  });

  //휴대폰번호 입력제한 - 숫자만 입력
  $('#inputPhone').on({
    keyup:function(e){
      e.preventDefault();
      var regExp1=/[^0-9]/;
      var phoneValue=$(this).val().toString();
      $(this).val(phoneValue.replace(regExp1,'')); //숫자 아닌 것 삭제(공백)

        if(phoneValue===''){
          $(this).removeClass('error');
          $('.phone-btn').removeClass('on');
        }
        else {
          if(phoneValue.length>=10){
            $('.phone-btn').addClass('on');
          }
          else {
            $('.phone-btn').removeClass('on');
          }   
       }
    }
  });

  //휴대폰 인증번호 받기: 클릭 이벤트
  $('.phone-btn').eq(0).on({
    click:function(e){
      e.preventDefault();
      var regExp2=/^01[0|6|7|8|9]+\d{3,4}\d{4}/;
      var phoneValue=$('#inputPhone').val().toString();
      
      //휴대폰 번호에 입력값이 없으면 클릭을 무시한다
      if($('#inputPhone').val()<10){
        return; //리턴값이 없다
      }
      if(regExp2.test(phoneValue)===false){
        $('#inputPhone').addClass('error');
        modal('잘못된 휴대폰 번호입니다. 확인 후 다시 시도해주세요.');
      }
      else {
        modal('휴대폰으로 인증번호가 전송되었습니다.');
        $('#inputPhone').removeClass('error');
        $('#inputPhoneok,.phone-ok-btn,.count-timer').show();
        countTimer();
      }
    }
  });

  var setId=0;

  function countTimer(){
    var seconds=60;
    var minutes=2;
    
    setId=setInterval(function(){
      seconds--;
      if(seconds<0){
        minutes--;
        seconds=59;
        if(minutes<0){
          clearInterval(setId);
          $('#inputPhoneok, .phone-ok-btn').prop('disabled',true);
          $('#inputPhoneok, .phone-ok-btn').addClass('ok');
          modal('인증 제한 시간이 지났습니다.');
          $('.count-timer').html('');
          return;
        }
      }
      $('.count-timer').html(minutes+':'+(seconds<10?'0'+seconds:seconds));
    },1000);
  }

  //인증번호 확인 버튼 클릭 이벤트
  $('.phone-btn').eq(1).on({
    click:function(e){
      e.preventDefault();
      var okkey='123456';
      if($('#inputPhoneok').val()===okkey){
        clearInterval(setId);
          $('#inputPhoneok, .phone-ok-btn').prop('disabled',true);
          $('#inputPhoneok, .phone-ok-btn').addClass('ok');
          $('.count-timer').html('');
          $('#inputPhoneok').val('');
            modal('인증이 확인되었습니다.');
            ok=true;
            return;
      }
      else {
        modal('인증을 다시 시도해주세요.');
        return;
      }
    }
  });

  //주소 검색 버튼 클릭 이벤트
  $('.address-btn').on({
    click:function(e){
      e.preventDefault();
      $('.address-box input').show();
      var txt='';
      var str='';

      //주소검색 카카오(다음) 구현
      new daum.Postcode({
        oncomplete:function(data){
          $('#inputAddress1').val(`${data.zonecode} ${data.address}`);
          $('#inputAddress2').focus(); //커서가 깜빡거린다. 입력대기
          $('.guide-transfer').addClass('on');

          str=$('#inputAddress1').val();

          if(str.indexOf('서울')>=0){
            txt='샛별배송';
          }
          else if(str.indexOf('경기')>=0){
            txt='샛별배송';
          }
          else if(str.indexOf('제주')>=0){
            txt='배송불가';
          }
          else if(str.indexOf('울릉')>=0){
            txt='배송불가';
          }
          else if(str.indexOf('독도')>=0){
            txt='배송불가';
          }
          else {
            txt='택배배송';
          }

          $('.guide-transfer h4').text(txt);
          $('#addressBtn').removeClass('address-btn');
          $('.address-text').text('재검색');
        }
      }).open();
    }
  });

  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  //생년월일 구현 알고리즘 시작

  //입력상자의 값이 숫자가 아니면 모두 제거하는 함수
  function inputBoxRegExpCheck(value){
    return value.trim().replace(/[^\d]/g,'');
  }

  function birthdayCheck(){
    //현재 년월일 데이터
    var nowYear=new Date().getFullYear(); //년 4자리
    var nowMonth=new Date().getMonth()+1; //월 0~11
    var nowDate=new Date().getDate(); //일

    //현재 년월일 데이터
    var today=new Date(nowYear,nowMonth,nowDate);

    //생년월일 데이터
    var year=$('#year').val().trim().toString();
    var month=$('#month').val().trim().toString();
    var date=$('#date').val().trim().toString();
    var birthLastDate=new Date(year,month,0); //생년월일의 말일이 나옴

    //1. 모두빈값이면 아무 반응안한다.
    if($('#year').val()==='' && $('#month').val()==='' && $('#date').val()===''){
        return;
    }
    else{
        //year  
        /* if(/^(?:19\d\d|2\d\d\d)$/g.test(value)===false){ //가이드텍스트 보이기(show()) */
        if(!/^(?:19[0-9][0-9]|2[0-9][0-9][0-9])$/g.test(year)){ //가이드텍스트 보이기(show())
          $('.guide-birthday-confirm p').show().text('태어난 년도 4자리를 정확하게 입력해주세요.');                
          return;
        }
        else{  //year 정상                  
            $('.guide-birthday-confirm p').hide()

            //month 
            if(!/^(?:0?[1-9]|1[0-2])$/g.test(month)){
              $('.guide-birthday-confirm p').show().text('태어난 월을 정확하게 입력해주세요.');                
              return;
            }
            else{   //month 정상
                $('.guide-birthday-confirm p').hide();
                
                //date
                //추가항목: 태어난 월의 말일을 찾아서 본인 생일의 날짜랑 비교
                //생일이 크면 잘못 입력된 날짜
                //console.log(date);
                //console.log(birthLastDate); 
                //console.log(birthLastDate.getFullYear()); //년
                //console.log(birthLastDate.getMonth()+1); //월 0-11까지 나옴 그래서 +1이 필요함
                //console.log(birthLastDate.getDate()); //마지막 날(일)
                if(!/^(?:0?[1-9]|1[0-9]|2[0-9]|3[0-1])$/g.test(date)||date>birthLastDate.getDate()){
                  $('.guide-birthday-confirm p').show().text('태어난 일을 정확하게 입력해주세요.');                
                  return;
                }
                else{ //date 정상                          
                    $('.guide-birthday-confirm p').hide();

                    //일까지 모두 정상이면
                    //14세 미만
                    //현재 년도의 년,월,일
                    const nowYear120=new Date(nowYear-120,nowMonth,nowDate); //100세 초과 변수
                    const nowYear14=new Date(nowYear-14,nowMonth,nowDate); //14세 미만 변수
                    const birthDay=new Date(year,month,date); //생년월일

                    //생년월일 모두 입력완료 된 후에 처리할 내용 3가지

                    //1. 오늘보다 더 큰 날짜(미래)
                    if(birthDay>today){
                      $('.guide-birthday-confirm p').show().text('생년월일이 미래로 입력되었어요.');                
                      return;
                    }
                    else {
                      $('.guide-birthday-confirm p').hide();
                    }

                    //2. 14세 미만 체크 확인
                    if(birthDay>nowYear14){
                      $('.guide-birthday-confirm p').show().text('만 14세 미만은 가입이 불가합니다.');                
                      return;
                    }
                    else {
                      $('.guide-birthday-confirm p').hide();
                    }

                    //3. 120세 초과
                    if(birthDay<nowYear120){
                      $('.guide-birthday-confirm p').show().text('생년월일을 다시 확인해주세요.');                
                      return;
                    }
                    else {
                      $('.guide-birthday-confirm p').hide();
                    }

                } //date
            } //month 
        }//year
    } //하나이상 빈칸이 있으면 else
  } // 모두 빈칸인 경우 if

  //년도 입력상자 이벤트: keyup, focusout
  $('#year').on({
    keyup:function(){
      $(this).val(inputBoxRegExpCheck($(this).val()));
    },
    focusout:function(){
      birthdayCheck();
    }
  });

  //월 입력상자 이벤트
  $('#month').on({
    keyup:function(){
      $(this).val(inputBoxRegExpCheck($(this).val()));
    },
    focusout:function(){
      birthdayCheck();
    },
    focusin:function(){
      birthdayCheck();
    }
  });

  //일 입력상자 이벤트
  $('#date').on({
    keyup:function(){
      $(this).val(inputBoxRegExpCheck($(this).val()));
    },
    focusout:function(){
      birthdayCheck();
    },
    focusin:function(){
      birthdayCheck();
    }
  });

  //생년월일 구현 알고리즘 끝
  ////////////////////////////////////////////////////////////////////////////////////////////////////////

  //추가입력사항
  $('.add-contents').on({
    change:function(){
      $('.add-input-box').show();
      if($(this).val()==='추천인 아이디'){
        $('#inputAdd').attr("placeholder",'추천인 아이디를 입력해주세요.');
      }
      else {
        $('#inputAdd').attr("placeholder",'참여 이벤트명을 입력해주세요.');
      }
    }
  });

  //약관등록
  //체크4 누르면 체크5,6이 체크로 변경
  $('#chk4').on({
    change:function(){
      if($(this).is(':checked')){
        $('#chk5').prop('checked',true);
        $('#chk6').prop('checked',true);
      }
      else {
        $('#chk5').prop('checked',false);
        $('#chk6').prop('checked',false);
      }
    }
  });

  //체크5와 체크6 변화에 따라 체크4의 체크 상태를 변경한다
  $('#chk5').on({
    change:function(){
      if($('#chk5').is(':checked')===false || $('#chk6').is(':checked')===false){
        $('#chk4').prop('checked',false);
      }
      else { //모두 true이면
        $('#chk4').prop('checked',true);
      }
    }
  });
  $('#chk6').on({
    change:function(){
      if($('#chk5').is(':checked')===false || $('#chk6').is(':checked')===false){
        $('#chk4').prop('checked',false);
      }
      else {
        $('#chk4').prop('checked',true);
      }
    }
  });

  //부분체크한 모든 내용은 위에 코딩하고 여기에서는 전체 체크상태를 확인
  //그리고 카운트 체크하여 변경사항을 반영한다.

  //체크박스 이벤트 - 7개 반복 처리(each 메서드 사용)
  chkboxBtn.each(function(idx){
    $(this).on({
      change:function(){
        //console.log(idx); //선택한 체크박스 인덱스 번호
        //console.log($(this).is(':checked')); //체크상태 확인
        //console.log( $(this).val() ); //선택항목의 값

        var cnt=0; //카운트 체크박스 체크된 것만 전체 개수 증가하는 변수
        for(var i=0; i<chkboxBtn.length; i++){
          if(chkboxBtn.eq(i).is(':checked')===true){ //7개를 반복 확인
            cnt++;
          }
        }
        //선택된 체크박스 개수를 확인
        //console.log(cnt);
        if(cnt===7){
          $('#chkAll').prop('checked',true); //전체 선택을 선택 체크한다.
        }
        else {
          $('#chkAll').prop('checked',false); //전체 선택을 선택 체크 해제한다.
        }
      }
    });
  });

  //모두 체크하는 chkAll 버튼 이벤트
  $('#chkAll').on({
    change:function(){
      if($(this).is(':checked')){
        $('.chkbox-btn').prop('checked',true); //7개 모두를 체크
      }
      else {
        $('.chkbox-btn').prop('checked',false); //7개 모두를 체크 해제
      }
    }
  });

  //모달창 이벤트 함수
  function modal(m){
    $('.modal-message').text(m);
    $('#modal').addClass('show');
  }

  $('.modal-close').on({
    click:function(){
      $('#modal').removeClass('show');
    }
  });

  // 가입버튼 누르면 초기화
  $('.submit-btn').on({
    click:function(e){
      e.preventDefault();

      var idVal=$('#inputId').val();
      var pwVal=$('#inputPw').val();
      var nameVal=$('#inputName').val();
      var emailVal=$('#inputEmail').val();
      var phoneVal=$('#inputPhone').val();
      var addressVal=$('#inputAddress1').val()+''+$('#inputAddress2').val();
      var genderVal='';
      var birthDayVal=$('#year').val()+'-'+$('#month').val()+'-'+$('#date').val();
      var addInputVal='';
      var serviceVal=[];

      // 성별
      if($('#male').is(':checked')){
        genderVal=$('#male').val();
      }
      else if($('#female').is(':checked')){
        genderVal=$('#female').val();
      }
      else {
        genderVal=$('#none').val();
      }

      // 추가입력
      if($('#add1').is(':checked')){
        addInputVal=$('#add1').val();
      }
      else {
        addInputVal=$('#add2').val();
      }

      // 약관동의
      $('.chkbox-btn').each(function(){
        if($(this).is(':checked')){
          serviceVal.push($(this).val());
        }
      });

      var cnt=0;

      for(var i=0; i<serviceVal.length; i++){
        if(serviceVal[i].indexOf('필수')!==-1){
          cnt++;
        }
      }

      if(idVal===''||pwVal===''||nameVal===''||emailVal===''||phoneVal===''||addressVal===''||cnt<3||ok===false||$('#inputAddress2').val()===''){
        if(idVal===''){
          alert('아이디를 입력하세요.');
        }
        else if(pwVal===''){
          alert('비밀번호를 입력하세요.');
        }
        else if(nameVal===''){
          alert('이름을 입력하세요.');
        }
        else if(emailVal===''){
          alert('이메일을 입력하세요.');
        }
        else if(phoneVal===''){
          alert('휴대폰 번호를 입력하세요.');
        }
        else if(addressVal===''){
          alert('주소를 입력하세요.');
        }
        else if(cnt<3){
          alert('이용약관동의 필수사항을 선택하세요.');
        }
        else if(ok===false){
          alert('휴대폰 인증번호를 진행하세요.');
        }
        else if($('#inputAddress2').val()===''){
          alert('세부주소를 입력하세요.');
        }
        return; //전송취소
      }
      else if(idOk===false||pw1Ok===false||pw2Ok===false||pw3Ok===false||pwConfirm===false||emailOk===false){
        if(idOk===false){
          alert('아이디를 다시 확인해주세요.');
        }
        else if(pw1Ok===false){
          alert('비밀번호는 10자 이상입니다.');
        }
        else if(pw2Ok===false){
          alert('영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합해주세요.');
        }
        else if(pw3Ok===false){
          alert('동일한 숫자 3개 이상 연속 사용 불가능합니다.');
        }
        else if(pwConfirm===false){
          alert('동일한 비밀번호를 입력해주세요.');
        }
        else if(emailOk===false){
          alert('이메일을 다시 확인해주세요.');
        }
        return; //전송취소
      }
      else {
        var 회원가입={
          아이디:idVal,
          비밀번호:pwVal,
          이름:nameVal,
          이메일:emailVal,
          휴대폰:phoneVal,
          주소:addressVal,
          생년월일:birthDayVal,
          추가입력사항:addInputVal,
          이용약관:serviceVal,
        }

        localStorage.setItem(회원가입.아이디,JSON.stringify(회원가입));
        format();
      }

      function format(){
      $('#inputId').val('');
      $('#inputPw').val('');
      $('#inputPwConfirm').val('');
      $('#inputName').val('');
      $('#inputEmail').val('');
      $('#inputPhone').val('');
      $('#inputAddress1').val('');
      $('#inputAddress2').val('');
      $('#year').val('');
      $('#month').val('');
      $('#date').val('');
      serviceVal=[];

      //라디오 버튼 초기화
      $('#male').prop('checked',false);
      $('#female').prop('checked',false);
      $('#none').prop('checked',false);

      //추가입력
      $('#add1').prop('checked',false);
      $('#add2').prop('checked',false);

      //체크박스 초기화
      $('#chkAll').prop('checked',false);

      //7개 체크
      $('.chkbox-btn').each(function(){
        $(this).prop('checked',false);
      });

      //모든 입력제한으로 인한 클래스 지정 속성들 초기화
      $('.guide-text').hide();
      $('.guide-id p').removeClass('error');
      $('.guide-id p').removeClass('success');
      $('.guide-pw p').removeClass('error');
      $('.guide-pw p').removeClass('success');
      $('.guide-pw-confirm').hide();
      $('.guide-pw-confirm p').removeClass('error');
      $('.guide-pw-confirm p').removeClass('success');
      $('#inputEmail').removeClass('error');
      $('.phone-btn').removeClass('on');
      $('#inputPhone').removeClass('error');
      $('.guide-birthday-confirm p').hide();

      $('.address-box input').hide();
      $('#addressBtn').addClass('address-btn');
      $('.address-text').text('주소 검색');

      $('#inputPhoneok,.phone-ok-btn,.count-timer').hide();
      $('#inputPhoneok,.phone-ok-btn').prop('disabled',false);
      $('#inputPhoneok,.phone-ok-btn').removeClass('ok');

      $('.add-input-box').hide();

      $('#inputId').focus();
      }
    }
  });

})(jQuery);
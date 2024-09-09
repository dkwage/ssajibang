// 합계를 계산하고 업데이트하는 함수
function updateTotalMembers() {
  const dorm1Total =
    parseInt(document.getElementById("dorm1Total").value, 10) || 0;
  const dorm2Total =
    parseInt(document.getElementById("dorm2Total").value, 10) || 0;
  const totalMembers = dorm1Total + dorm2Total;
  document.getElementById("totalMembers").value = totalMembers;

  const vacation1 =
    parseInt(document.getElementById("vacation1").value, 10) || 0;

  const vacation2 =
    parseInt(document.getElementById("vacation2").value, 10) || 0;

  const exceptions = vacation1 + vacation2;
  document.getElementById("exceptions").value = exceptions;

  const currentMembers = totalMembers - exceptions;
  document.getElementById("currentMembers").value = currentMembers;

  const dorm1Current = dorm1Total - vacation1;
  document.getElementById("dorm1Current").value = dorm1Current;

  const dorm2Current = dorm2Total - vacation2;
  document.getElementById("dorm2Current").value = dorm2Current;

  const dorm1Saji =
    parseInt(document.getElementById("dorm1Saji").value, 10) || 0;
  const dorm1Chedan =
    parseInt(document.getElementById("dorm1Chedan").value, 10) || 0;
  const dorm1NightShift =
    parseInt(document.getElementById("dorm1NightShift").value, 10) || 0;
  const dorm1Duty =
    parseInt(document.getElementById("dorm1Duty").value, 10) || 0;
  const dorm1Sleeping =
    dorm1Current - dorm1Saji - dorm1Chedan - dorm1NightShift - dorm1Duty;
  document.getElementById("dorm1Sleeping").value = dorm1Sleeping;

  const dorm2Saji =
    parseInt(document.getElementById("dorm2Saji").value, 10) || 0;
  const dorm2Chedan =
    parseInt(document.getElementById("dorm2Chedan").value, 10) || 0;
  const dorm2NightShift =
    parseInt(document.getElementById("dorm2NightShift").value, 10) || 0;
  const dorm2Duty =
    parseInt(document.getElementById("dorm2Duty").value, 10) || 0;
  const dorm2Sleeping =
    dorm2Current - dorm2Saji - dorm2Chedan - dorm2NightShift - dorm2Duty;
  document.getElementById("dorm2Sleeping").value = dorm2Sleeping;

  const sleepingInDorm = dorm1Sleeping + dorm2Sleeping;
  document.getElementById("sleepingInDorm").value = sleepingInDorm;
}

// 입력 필드 값이 변경될 때마다 합계 업데이트
document
  .getElementById("dorm1Total")
  .addEventListener("input", updateTotalMembers);
document
  .getElementById("dorm2Total")
  .addEventListener("input", updateTotalMembers);

document
  .getElementById("vacation1")
  .addEventListener("input", updateTotalMembers);

document
  .getElementById("vacation2")
  .addEventListener("input", updateTotalMembers);
document
  .getElementById("dorm1Saji")
  .addEventListener("input", updateTotalMembers);
document
  .getElementById("dorm1Chedan")
  .addEventListener("input", updateTotalMembers);
document
  .getElementById("dorm1NightShift")
  .addEventListener("input", updateTotalMembers);
document
  .getElementById("dorm1Duty")
  .addEventListener("input", updateTotalMembers);

document
  .getElementById("dorm2Saji")
  .addEventListener("input", updateTotalMembers);
document
  .getElementById("dorm2Chedan")
  .addEventListener("input", updateTotalMembers);
document
  .getElementById("dorm2NightShift")
  .addEventListener("input", updateTotalMembers);
document
  .getElementById("dorm2Duty")
  .addEventListener("input", updateTotalMembers);

function generateAndCopyText() {
  // 선택된 시간을 가져옵니다.
  const hours = document.getElementById("timeSelect").value;

  // 합계를 최신 상태로 업데이트
  updateTotalMembers();

  const text = `3포대 ${hours}시 인원 보고
  가. 총원 : ${document.getElementById("totalMembers").value}명
      1) 1생활관 : ${document.getElementById("dorm1Total").value}명
      2) 2생활관 : ${document.getElementById("dorm2Total").value}명

  나. 열외 : ${document.getElementById("exceptions").value}명
      1) 1생활관 : 휴가 ${document.getElementById("vacation1").value}명
      2) 2생활관 : 휴가 ${document.getElementById("vacation2").value}명

  다. 현재원 : ${document.getElementById("currentMembers").value}명 중 ${
    document.getElementById("sleepingInDorm").value
  }명 생활관 취침
      1) 1생활관 : ${document.getElementById("dorm1Current").value}명 중 ${
    document.getElementById("dorm1Sleeping").value
  }명 취침
      * 사지방 ${document.getElementById("dorm1Saji").value}명, 체단 ${
    document.getElementById("dorm1Chedan").value
  }명, 불침번 ${document.getElementById("dorm1NightShift").value}명, 당직 ${
    document.getElementById("dorm1Duty").value
  }명
      2) 2생활관 : ${document.getElementById("dorm2Current").value}명 중 ${
    document.getElementById("dorm2Sleeping").value
  }명 취침
      * 사지방 ${document.getElementById("dorm2Saji").value}명, 체단 ${
    document.getElementById("dorm2Chedan").value
  }명, 불침번 ${document.getElementById("dorm2NightShift").value}명, 당직 ${
    document.getElementById("dorm2Duty").value
  }명

  이상입니다!`;

  navigator.clipboard.writeText(text).then(() => {
    alert("문장이 클립보드에 복사되었습니다.");
  });
}

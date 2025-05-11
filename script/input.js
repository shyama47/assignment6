document.getElementById("faq-btn").addEventListener('click',function(){
    document.getElementById('faq-section').scrollIntoView({behavior:'smooth'})
})
document.getElementById("learn-btn").addEventListener('click',function(){
    document.getElementById('learn-section').scrollIntoView({behavior:'smooth'})
})


document.getElementById('click-btn').addEventListener('click',function(){
    const inputText=document.getElementById('Text');
    const inputPin=document.getElementById('Pin')
    const text=inputText.value;
    const pin=inputPin.value;
    if(text!==''){
      if(pin=='123456'){
document.getElementById('faq-section').scrollIntoView({behavior:'smooth'})
      }
      else{
        alert('pin tikh nai')
      }
    }
    else{
        alert('plz enter your name')
    }
})
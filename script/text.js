
const showLooder =()=>{
    document.getElementById('looder').classList.remove("hidden");
    document.getElementById('words-container').classList.add("hidden");

}
const hideLooder =()=>{
    document.getElementById('looder').classList.add("hidden");
    document.getElementById('words-container').classList.remove("hidden");

}




// api 1 load
const loadAllLevel=()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res=>res.json())
    .then(data=>showAllLevel(data.data))
}
// api 1 ui te show
const showAllLevel=(lessons)=>{
// console.log(lessons)
const lessonContainer=document.getElementById('lesson-container')
lessons.forEach(lesson=>{
    // console.log(lesson)
    const div =document.createElement('div')
    div.innerHTML=`
    <button id="btn-${lesson.level_no}" onclick="loadCatagoryLevel(${lesson.level_no})" class="btn py-7 text-blue-600 border-blue-600 rounded-lg hover:text-white hover:bg-blue-700">${lesson.lessonName}</button>
    `
    lessonContainer.appendChild(div)
})
}
// api 4 load
const loadAllWords=()=>{
    showLooder();
    fetch('https://openapi.programming-hero.com/api/words/all')
    .then(res=>res.json())
    .then(data=>{
        removeActiveClass()
        document.getElementById("btn-all").classList.add("active")
        showAllWords(data.data)
    })
}
// api 4 ui te show
const showAllWords=(words)=>{
// console.log(words)

const wordsContainer=document.getElementById('words-container')
wordsContainer.innerHTML='';
if(words.length==0){
    wordsContainer.innerHTML=`
    
    <div class="w-11/12 mx-auto py-16 flex flex-col rounded-3xl text-center justify-center items-center space-y-4 col-span-full">
  <img class="w-[120px]" src="assets/alert-error.png" alt="">
  <p class="text-[13px] text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
  <h5 class="font-medium text-[34px]">নেক্সট Lesson এ যান</h5>
</div>
    `
    hideLooder()
        return;
}
for(const word of words){
    // console.log(word)
    
    const div=document.createElement('div')
    div.innerHTML=`
     <div class="card flex flex-col text-center  py-3  rounded-lg bg-white h-[300px] w-[550px] ">
            <div class="space-y-3 my-5">
                <h1 class="font-bold text-4xl">${word.word}</h1>
                <p class="font-medium text-xl">meaning/pronunciation</p>
                <h3 class="font-semibold text-2xl mb-6 object-cover">${word.meaning} / ${word.pronunciation}</h3>
            </div>
            <div class="flex justify-between">
<button onclick="loadWordDetails('${word.id}')" class="btn btn-square ml-6  bg-indigo-200 rounded-lg">
 <i class="fa-solid fa-info "></i>
</button>
<button class="btn btn-square mr-6 bg-indigo-200 rounded-lg">
 <i class="fa-solid fa-volume-high "></i>
</button>       
            </div>
        </div>
    `
    wordsContainer.appendChild(div)
    hideLooder();
}
}
// api 3 load
const loadWordDetails=(wordDatilsId)=>{
    console.log(wordDatilsId)
    const url=(`https://openapi.programming-hero.com/api/word/${wordDatilsId}`)
    console.log(url);
    fetch(url)
    .then(res=>res.json())
    .then(data=>showWordDatails(data.data))
}
// api 3 ui te show
const showWordDatails=(details)=>{
console.log(details)
document.getElementById('word_details').showModal();
const detailsContainer =document.getElementById('details-container')
const div=document.createElement('div')
detailsContainer.innerHTML='';
div.innerHTML=`

  
<div class=" rounded-2xl bg-white ">
  <div class="space-y-4 p-4 m-4 rounded-2xl border border-blue-300">
  <h1 class="font-semibold text-3xl">${details.word}</H1>
  <h3 class="font-semibold text-2xl">meaning</H3>
  <h4 class=" font-medium text-xl">${details.meaning}</H4>
  <h5 class="font-semibold text-xl">Example</H5>
  <p>${details.sentence}</P>
  <h4 class="font-medium  mb-3 text-xl">সমার্থক শব্দ গুলো</H4>
  <div class="flex gap-3">
    <button class="p-3 bg-indigo-50 rounded-xl">${details.
synonyms[0]}</button>
    <button class="p-3 bg-indigo-50 rounded-xl">${details.
synonyms[1]}</button class="p-3 bg-indigo-50 rounded-xl">
    <button class="p-3 bg-indigo-50 rounded-xl">${details.
synonyms[2]}</button>
  </div>
  </div>
</div>
    
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn bg-blue-700 mr-64 text-white font-medium text-xl rounded-xl">Complete Learning</button>
      </form>
    </div>

`
detailsContainer.appendChild(div)

}
// api 2 load
const loadCatagoryLevel=(id)=>{
     showLooder();
const url=`https://openapi.programming-hero.com/api/level/${id}`;
console.log(url);
fetch(url)
.then(res=>res.json())
.then(data=>{
    removeActiveClass();
    const clickButton=document.getElementById(`btn-${id}`)
    // console.log(clickButton)
    clickButton.classList.add("active")
    showAllWords(data.data)
})

}

const removeActiveClass=()=>{
    const allActiveClass=document.getElementsByClassName("active")
    for(let btn of allActiveClass){
        btn.classList.remove("active")
    }
    console.log(allActiveClass)
}

loadAllLevel();
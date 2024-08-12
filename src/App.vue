<template>
  <div class="field" @click="clickScreen($event)">
    <div class="box1">
      <span>SCORE:</span>
      <span>{{ scoreText }}</span>
    </div>
    <div class="box1">
      <span>{{ levelText }}</span>
    </div>
    <div class="box2">
      <label>TIME:</label>
      <output :value="timeCnt"></output>
      <span>&nbsp;</span>
      <progress :value="timeBar" max="60"></progress>
    </div>
    <div class="posiStart">
      <button @click="startGame()" class="btnStart" v-show="isProcessing">START</button>
    </div>
    <div v-show="isGameEnd" class="endText" id="gameEnd">GAME END</div>
    <div v-show="isGameEnd" class="endText" id="scoreEnd">
      <span>SCORE:</span>
      <span>{{ scoreText }}</span>
    </div>

    <img v-if="isSpecial" :src="imgAnpan" class="imgSpecial">

    <img v-show="isHummer" :src="hitHummer" :style="hummerStyle" class="imgHummer">

    <img v-for="(img, index) in effectGroup" :key="'eft' + index" :src="img.src" :style="img.style">

    <div class="container" ref="imgArea">
      <img v-for="img in imgGroup" :key="img.id" :src="img.src" :style="img.style" :id="'img-' + img.id"
        @click="clickImg(img, $event)" class="imgGroup" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import anime from 'animejs';
// import anime from 'animejs/lib/anime.es.d.ts';
// 背景インポート
import img_back1 from '@/assets/img/back/back1.jpg';
import img_back2 from '@/assets/img/back/back2.jpg';
import img_back3 from '@/assets/img/back/back3.jpg';
import img_back4 from '@/assets/img/back/back4.jpg';
import img_back5 from '@/assets/img/back/back5.jpg';
const aly_backimg = new Array(
  img_back1, img_back2, img_back3, img_back4, img_back5)

// キャラインポート
import img_boss1 from '@/assets/img/cha/boss1.png';
import img_boss2 from '@/assets/img/cha/boss2.png';
import img_boss3 from '@/assets/img/cha/boss3.png';
import img_boss4 from '@/assets/img/cha/boss4.png';
import img_boss5 from '@/assets/img/cha/boss5.png';
import img_cha1 from '@/assets/img/cha/cha1.png';
import img_cha2 from '@/assets/img/cha/cha2.png';
import img_cha3 from '@/assets/img/cha/cha3.png';
import img_cha4 from '@/assets/img/cha/cha4.png';
import img_cha5 from '@/assets/img/cha/cha5.png';
import img_cha6 from '@/assets/img/cha/cha6.png';
import img_cha7 from '@/assets/img/cha/cha7.png';
import img_cha8 from '@/assets/img/cha/cha8.png';
import img_cha9 from '@/assets/img/cha/cha9.png';
import img_cha10 from '@/assets/img/cha/cha10.png';
import img_cha11 from '@/assets/img/cha/cha11.png';
import img_cha12 from '@/assets/img/cha/cha12.png';
const alyHit = new Array(
  img_boss1, img_boss2, img_boss3, img_boss4, img_boss5,
  img_cha1, img_cha2, img_cha3, img_cha4, img_cha5,
  img_cha6, img_cha7, img_cha8, img_cha9, img_cha10,
  img_cha11, img_cha12)

// 効果音（文字）インポート
import img_eft1 from '@/assets/img/effect/eft1.png';
import img_eft2 from '@/assets/img/effect/eft2.png';
import img_eft3 from '@/assets/img/effect/eft3.png';
import img_eft4 from '@/assets/img/effect/eft4.png';
import img_eft5 from '@/assets/img/effect/eft5.png';
import img_eft6 from '@/assets/img/effect/eft6.png';
const alyImgEffect = new Array(
  img_eft1, img_eft2, img_eft3, img_eft4, img_eft5, img_eft6,)

// BGMインポート
import msc_back1 from '@/assets/bgm/back/msc1.mp3';
import msc_back2 from '@/assets/bgm/back/msc2.mp3';
import msc_back3 from '@/assets/bgm/back/msc3.mp3';
import msc_back4 from '@/assets/bgm/back/msc4.mp3';
import msc_back5 from '@/assets/bgm/back/msc5.mp3';
import msc_back6 from '@/assets/bgm/back/msc6.mp3';
const alyBackMusic = new Array(
  msc_back1, msc_back2, msc_back3, msc_back4, msc_back5)

// 効果音インポート
import dwn_eft1 from '@/assets/bgm/effect/down/ax-slash-1.mp3';
import dwn_eft2 from '@/assets/bgm/effect/down/bomb1.mp3';
import dwn_eft3 from '@/assets/bgm/effect/down/cannon1.mp3';
import dwn_eft4 from '@/assets/bgm/effect/down/打撃6.mp3';
import dwn_eft5 from '@/assets/bgm/effect/down/全力で踏み込む.mp3';
const alyEffectDown = new Array(
  dwn_eft1, dwn_eft2, dwn_eft3, dwn_eft4, dwn_eft5)
// クリック時ハンマー
import hitHummer from '@/assets/img/hummer.png';
// 効果音
import effectApr from '@/assets/bgm/effect/apr1.mp3'; //出現
import effectHit from '@/assets/bgm/effect/kick-light1.mp3'; //クリック時
import effectAnp from '@/assets/bgm/effect/anpunch1.mp3'; //アンパンチ
//特殊技
import imgAnpan from '@/assets/img/effect/punch1.gif';

// 出現時間（最大）
const numAprMax = new Array(
  1500, 1300, 1100, 900, 700)
// 出現時間（最小）
const numAprMin = new Array(
  800, 700, 600, 500, 400)
// 消える時間
const numDsplist = new Array(
  4000, 3500, 3000, 2500, 2000)
// 大きくなるまでの時間
const numExtlist = new Array(
  3500, 3000, 2500, 2000, 1500)
// ボスの(HP)
const numHplist = new Array(
  2, 2, 3, 3, 5)
// ゲームレベル
const alyLevel = new Array(
  "EASY", "NORMAL", "HARD", "VERY HARD", "EXTREME")
// ゲーム時間
const endTime = 60000;
const intTime = 60;
// エフェクト音量
const volumeBack = 0.3;
const volumeEffect1 = 0.5;
const volumeEffect2 = 1;
const volumeEffect3 = 0.5;
const volumeEffect4 = 1;
// 特種技
const cntUlt = 10;

// 画像表示エリア
const imgArea = ref<HTMLDivElement | null>(null);

// ターゲッの画像
const imgGroup = ref<Array<{ id: string, num: number, src: string, style: any }>>([]);

// エフェクト画像
const effectGroup = ref<Array<{ id: string, src: string, style: any }>>([]);
//const effectGroup = ref<Array<{ id: string, src: string, x: number, y: number }>>([]);

// const hummerStyle = ref({ position: 'fixed', top: '0px', left: '0px' });
const hummerStyle = ref<any>({ position: 'fixed', top: '0px', left: '0px' });

const isProcessing = ref(true);
const scoreText = ref(0);
const levelText = ref("EASY");
const timeCnt = ref("60")
const timeBar = ref(60)
const isGameEnd = ref(false);

let backMusic = new Audio();
let mscEffect1 = new Audio(effectApr);
// msc_eft1.src = eft_apr;
mscEffect1.volume = volumeEffect1;
let mscEffect2 = new Audio();
mscEffect2.volume = volumeEffect2;
let mscEffect3 = new Audio(effectHit);
// msc_eft3.src = eft_hit; 
mscEffect3.volume = volumeEffect3;
let mscEffect4 = new Audio(effectAnp);
// msc_eft4.src = eft_anp;
mscEffect4.volume = volumeEffect4;
let alyHp = new Array(5).fill(0);

// 背景設定
let numLevel = 0;
let imgBack = ref("url(" + aly_backimg[numLevel] + ")");
// 型の宣言
let score: number;
let rdmTime: number;
let cntAnpan: number;
let count: number;
let idTimeout: number;
let numEffect: number;
let timer: number;
let numHit: number;

// ランダム整数取得
document.onselectstart = () => false;
const randRange = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

// ------------------------------------------------------------
// メイン処理
// ------------------------------------------------------------
function startGame() {
  // 初期処理
  score = 0;
  numLevel = 0;
  rdmTime = 0;
  cntAnpan = 0;
  count = intTime;
  idTimeout = 0;
  isProcessing.value = false;
  isGameEnd.value = false;
  scoreText.value = 0;
  levelText.value = alyLevel[numLevel];
  numEffect = Math.floor(Math.random() * alyEffectDown.length);
  mscEffect2.src = alyEffectDown[numEffect];

  imgBack.value = "url(" + aly_backimg[numLevel] + ")";
  backMusic.src = alyBackMusic[numLevel];
  backMusic.volume = volumeBack;
  backMusic.play();
  // カウントダウン処理
  idTimeout = window.setInterval(countdown, 1000);
  // ランダム表示
  rdmTime = Math.round(Math.random() * (numAprMax[numLevel] - numAprMin[numLevel])) + numAprMin[numLevel];
  timer = window.setTimeout(hithyoji, rdmTime);
  // 終了処理
  setTimeout(() => {
    clearTimeout(timer);
    imgArea.value!.textContent = null;
    backMusic.src = msc_back6;
    backMusic.play();
    isGameEnd.value = true;
    setTimeout(() => {
      isProcessing.value = true;
    }, 3000)
  }, endTime)
};
// ------------------------------------------------------------
// カウントダウン
// ------------------------------------------------------------
function countdown() {
  timeBar.value = count;
  timeCnt.value = String(count);
  if (count <= 0) {
    timeCnt.value = "END";
    clearTimeout(idTimeout);
  }
  count--;
}
// ------------------------------------------------------------
// 画像のランダム表示
// ------------------------------------------------------------
async function hithyoji() {
  // ランダム画像の選択
  numHit = Math.floor(Math.random() * alyHit.length);
  // imgGroupに追加
  let imgHit = {
    id: String(Date.now()),
    num: numHit,
    src: alyHit[numHit],
    style: {
      position: 'fixed',
      left: Math.floor(Math.random() * (document.body.clientWidth - 200)) + 'px',
      top: Math.floor(Math.random() * (document.body.clientHeight - 150)) + 'px'
    }
  };
  console.log('hithyoji', imgHit)
  imgGroup.value.push(imgHit);
  // 出現音
  mscEffect1.currentTime = 0;
  mscEffect1.play();
  // domの更新待ち
  await nextTick()
  // ?秒後に拡大
  anime({
    targets: `#img-${imgHit.id}`,
    translateX: [
      { value: randRange(-50, 50), duration: randRange(500, 1000), delay: randRange(0, 100) },
      { value: randRange(-50, 50), duration: randRange(500, 1000), delay: randRange(0, 100) },
      { value: randRange(-50, 50), duration: randRange(500, 1000), delay: randRange(0, 100) }
    ],
    translateY: [
      { value: randRange(-50, 50), duration: randRange(500, 1000), delay: randRange(0, 100) },
      { value: randRange(-50, 50), duration: randRange(500, 1000), delay: randRange(0, 100) },
      { value: randRange(-50, 50), duration: randRange(500, 1000), delay: randRange(0, 100) }
    ],
    scale: 2,
    delay: numExtlist[numLevel]
  });
  // 消えるまでの時間
  setTimeout(() => {
    // imgHit.remove();
    imgGroup.value = imgGroup.value.filter(target => target.id !== imgHit.id);
  }, numDsplist[numLevel]);
  // }
  // ランダム表示間隔　取得
  rdmTime = Math.round(Math.random() * (numAprMax[numLevel] - numAprMin[numLevel])) + numAprMin[numLevel];
  timer = window.setTimeout(hithyoji, rdmTime);
}
// ------------------------------------------------------------
// 画像をたたいた時の処理
// ------------------------------------------------------------
const clickImg = (imgHit: { id: string, num: number, src: string, style: any }, event: MouseEvent) => {
  // 叩いた後の演出
  // 効果音
  mscEffect2.currentTime = 0;
  mscEffect2.play();
  // 効果音（文字）
  let imgEffect = {
    id: String(Date.now()),
    src: alyImgEffect[Math.floor(Math.random() * alyImgEffect.length)],
    style: {
      position: 'absolute',
      left: event.clientX + 'px',
      top: event.clientY - 30 + 'px'
    }
  };
  effectGroup.value.push(imgEffect);

  console.log('clickImg', imgEffect)

  setTimeout(() => {
    // img_eft.remove();
    effectGroup.value = effectGroup.value.filter(target => target.id !== imgEffect.id);
  }, 500);
  // 鬼の場合、HP減
  if (imgHit.num <= 4) {
    alyHp[imgHit.num]++;
  }
  // 連続ヒットのカウント
  cntAnpan++;
  // カウントで特種技
  if (cntAnpan == cntUlt) {
    fncimgult();
    cntAnpan = 0;
  }
  // 倒した後の処理
  if (imgHit.num > 4 || alyHp[imgHit.num] >= numHplist[imgHit.num]) {
    // 叩かれた後のアニメーション
    anime({
      targets: `#img-${imgHit.id}`,
      translateX: randRange(-500, 500),
      translateY: randRange(-500, 500),
      rotate: '1.8turn',
      scale: [1, 0.4],
      duration: numAprMax[numLevel],
      easing: 'easeOutExpo',
    });
    // 消えるまでの時間
    setTimeout(() => {
      imgGroup.value = imgGroup.value.filter(target => target.id !== imgHit.id);
      // img_hit.remove();
    }, numAprMax[numLevel]);
    // スコア加算
    if (imgHit.num > 4) {
      score++;
    } else {
      score += numHplist[imgHit.num] * 2;
      alyHp[imgHit.num] = 0;
    }
    // レベル判定
    fnclvlup1();
  }
}

// ------------------------------------------------------------
// 特種技
// ------------------------------------------------------------
const isSpecial = ref((false))
function fncimgult() {
  //特殊技を表示
  isSpecial.value = true
  // おたけび
  mscEffect4.play();
  // 効果音
  mscEffect2.currentTime = 0;
  // 全標的取得
  setTimeout(() => {
    mscEffect2.play();
    // 全標的を取得
    let aly_allhit: HTMLCollection
    aly_allhit = imgArea.value!.getElementsByTagName('img');
    for (let i = 0; i < aly_allhit.length; i++) {
      anime({
        targets: aly_allhit[i],
        translateX: randRange(-500, 500),
        translateY: randRange(-500, 500),
        rotate: '1.8turn',
        scale: [1, 0.4],
        duration: numAprMax[numLevel],
        easing: 'easeOutExpo',
      });
      // スコア加算
      if (Number(aly_allhit[i].id) > 4) {
        score++;
      } else {
        score += alyHp[Number(aly_allhit[i].id)] * 2;
        alyHp[Number(aly_allhit[i].id)] = 0;
      }
      fnclvlup1();
    }
  }, 1200);
  // 秒後に消える
  setTimeout(() => {
    isSpecial.value = false
    imgGroup.value = []
  }, 1600);
}
// ------------------------------------------------------------
// レベル判定
// ------------------------------------------------------------
function fnclvlup1() {
  scoreText.value = score;
  // レベル判定
  if (score >= 15 && numLevel == 0) {
    numLevel = 1;
    fnclvlup2();
  } else if (score >= 30 && numLevel == 1) {
    numLevel = 2;
    fnclvlup2();
  } else if (score >= 45 && numLevel == 2) {
    numLevel = 3;
    fnclvlup2();
  } else if (score >= 60 && numLevel == 3) {
    numLevel = 4;
    fnclvlup2();
  }
}
// ------------------------------------------------------------
// レベルアップ時
// ------------------------------------------------------------
function fnclvlup2() {
  imgBack.value = "url(" + aly_backimg[numLevel] + ")";
  backMusic.src = alyBackMusic[numLevel];
  backMusic.play()
  levelText.value = alyLevel[numLevel];
  numEffect = Math.floor(Math.random() * alyEffectDown.length);
  mscEffect2.src = alyEffectDown[numEffect];
}
// ------------------------------------------------------------
// クリック時の処理
// ------------------------------------------------------------
const isHummer = ref(false)
// const hummerId = ref()
function clickScreen(event: MouseEvent) {
  // 叩いた音
  mscEffect3.currentTime = 0;
  mscEffect3.play();
  //ハンマーを表示
  console.log('clickScreen', event.clientX, event.clientY)
  hummerStyle.value = { position: 'fixed', top: event.clientY - 40 + `px`, left: event.clientX - 40 + `px` };
  isHummer.value = true
  // 画像の回転
  anime({
    targets: '.imgHummer',
    translateY: 30,
    rotate: '-0.3turn',
    duration: 200,
    easing: 'easeOutElastic',
    complete: function () { //callback関数
      anime.set('.imgHummer', {
        translateY: 0,
        rotate: 0,
      });
    }
  });
  // ミリ秒後に消える
  setTimeout(() => {
    isHummer.value = false
    // img_hummer.remove();
  }, 250);
};

</script>

<style scoped>
.field {
  background-image: v-bind(imgBack);
  background-repeat: no-repeat;
  background-position: center top;
  height: 100vh;
  text-align: center;
  background-size: cover;
  font-family: 'Fourkid', sans-serif;
  font-size: 26px;
}

.field:hover {
  cursor: url(@/assets/img/hummer.cur) 40 40, auto;
}

.box1 {
  color: #FFFF99;
  background: #000050;
  /* border: solid 4px #fd9535; */
  border: solid 3px #FFFF99;
  /*丸み*/
  border-radius: 15px;
  /*角の丸み*/
  float: left;
  /* width: 150px; */
  padding: 5px 10px;
  margin: 5px;
  animation: slide 2s;
}

.box2 {
  color: #FFFF99;
  background: #000050;
  border: solid 3px #FFFF99;
  /*線*/
  border-radius: 15px;
  /*角の丸み*/
  float: left;
  /* width: 330px; */
  padding: 5px 10px;
  margin: 5px;
  animation: slide 2.5s;
}

@keyframes slide {
  0% {
    opacity: 0;
    transform: translateX(500px);
  }

  100% {
    opacity: 1;
  }
}

progress {
  width: 180px;
  /* background-color: orange; */
}

.posiStart {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 70%;
  left: 50%;
}

.btnStart {
  /* bottom:; */
  padding: 10px 30PX;
  margin: 5px 10px;
  font-family: 'Fourkid', sans-serif;
  font-size: 60px;
  text-decoration: none;
  color: #FFFF99;
  border-radius: 30px;
  box-shadow: inset 0 3px 0 rgba(255, 255, 255, 0.2), inset 0 -2px 0 rgba(0, 0, 0, 0.05);
  border: solid 5px #101060;
  border-bottom: solid 10px #101040;
  animation: skew 3s;
  background: repeating-linear-gradient(30deg, rgba(40, 0, 240, 1), rgba(128, 66, 180, 1) 36%, rgba(165, 93, 148, 1) 64%, rgba(255, 160, 71, 1));
  ;
  -webkit-text-stroke: 2px #000050;
}

/* CSSアニメーションの設定 */
@keyframes skew {
  0% {
    opacity: 0;
    transform: skew(100deg, 100deg);
  }

  100% {
    opacity: 1;
  }
}

progress {
  width: 180px
}

.endText {
  font-size: 60px;
  font-weight: bold;
  position: absolute;
  white-space: nowrap;
  transform: translate(-50%, -50%);
}

#gameEnd {
  top: 40%;
  left: 50%;
  color: #FFFF99;
  -webkit-text-stroke: 2px #000050;
}

#scoreEnd {
  top: 52%;
  left: 50%;
  color: transparent;
  background: repeating-linear-gradient(40deg, #B67B03 0.1em, #DAAF08 0.2em, #FEE9A0 0.3em, #DAAF08 0.4em, #B67B03 0.5em);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-stroke: 2px #000050;
}

.container {
  width: 10px;
  height: 10px;
  display: flex;
}

.imgGroup {
  animation: fadeIn 0.5s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.imgSpecial {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}
</style>